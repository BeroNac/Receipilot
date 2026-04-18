import { NextRequest, NextResponse } from 'next/server';
import { emailParser } from '@/lib/email-parser';
import { vlayerProver } from '@/lib/vlayer';
import { ipfsStorage } from '@/lib/ipfs';
import { saveProofRecord } from '@/lib/supabase';

function logError(message: string, error?: unknown) {
  const detail = error instanceof Error ? `: ${error.message}` : '';
  process.stderr.write(`${message}${detail}\n`);
}

/**
 * POST /api/mint
 * Handles the complete minting flow:
 * 1. Parse email content (from .eml file or text)
 * 2. Generate ZK proof with vlayer
 * 3. Upload metadata to IPFS
 * 4. Return data for on-chain minting
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const walletAddress = formData.get('walletAddress') as string;
    const emailContent = formData.get('emailContent') as string;
    const emailFile = formData.get('emailFile') as File | null;

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address required' },
        { status: 400 }
      );
    }

    if (!emailContent && !emailFile) {
      return NextResponse.json(
        { error: 'Email content or file required' },
        { status: 400 }
      );
    }

    // Parse email based on input type
    let parsedReceipt;
    let content: string;

    if (emailFile) {
      content = await emailFile.text();
      parsedReceipt = await emailParser.parseEmlFile(content);
    } else {
      content = emailContent;
      parsedReceipt = emailParser.parseTextEmail(content);
    }

    // Verify email with vlayer
    const { isValid, dkimProof, extractedData } = await vlayerProver.verifyEmail(
      content
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Email verification failed. DKIM signature invalid.' },
        { status: 400 }
      );
    }

    // Generate ZK proof
    const proofHash = await vlayerProver.generateProof(dkimProof, extractedData);

    // Upload to IPFS
    const { imageUrl, metadataUrl } = await ipfsStorage.uploadToIPFS({
      orderId: parsedReceipt.orderId,
      storeName: parsedReceipt.storeName,
      productName: parsedReceipt.productName,
      purchaseDate: parsedReceipt.purchaseDate,
      category: parsedReceipt.category,
      proofHash,
    });

    // Save to Supabase (proof hash only, no email content)
    try {
      await saveProofRecord({
        wallet_address: walletAddress.toLowerCase(),
        proof_hash: proofHash,
        order_id: parsedReceipt.orderId,
        store_name: parsedReceipt.storeName,
        product_name: parsedReceipt.productName,
        purchase_date: parsedReceipt.purchaseDate,
        category: parsedReceipt.category,
        ipfs_url: metadataUrl,
        token_id: '', // Will be updated after minting
      });
    } catch (dbError) {
      logError('Database save failed', dbError);
      // Continue even if DB fails - the on-chain data is what matters
    }

    return NextResponse.json({
      success: true,
      proof: {
        hash: proofHash,
        metadataUrl,
        imageUrl,
      },
      receipt: {
        orderId: parsedReceipt.orderId,
        storeName: parsedReceipt.storeName,
        productName: parsedReceipt.productName,
        purchaseDate: parsedReceipt.purchaseDate,
        category: parsedReceipt.category,
        totalAmount: parsedReceipt.totalAmount,
      },
      message: 'Proof generated successfully. Ready to mint NFT.',
    });
  } catch (error) {
    logError('Mint API error', error);

    return NextResponse.json(
      {
        error: 'Failed to process receipt',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
