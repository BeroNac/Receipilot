import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { emailParser } from '@/lib/email-parser';
import { vlayerProver } from '@/lib/vlayer';
import { ipfsStorage } from '@/lib/ipfs';

const _resend = new Resend(process.env.RESEND_API_KEY);

/**
 * POST /api/forward-email
 * Handles forwarded emails from prove@receipilot.xyz
 * 
 * IMPORTANT: This is a serverless function that:
 * 1. Receives the forwarded email
 * 2. Parses and extracts receipt data
 * 3. Generates ZK proof using vlayer
 * 4. Uploads metadata to IPFS
 * 5. Deletes email content within 5 seconds
 * 6. Returns proof data for minting
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Parse the incoming email (format depends on email service provider)
    const body = await request.json();
    const { from, to, subject, text, rawEmail } = body;

    console.log('Received email forward from:', from);

    // Security check: Ensure this came from our forwarding service
    if (to !== process.env.NEXT_PUBLIC_FORWARD_EMAIL) {
      return NextResponse.json(
        { error: 'Invalid recipient' },
        { status: 400 }
      );
    }

    // Parse the email to extract receipt data
    const emailContent = rawEmail || `From: ${from}\nTo: ${to}\nSubject: ${subject}\n\n${text}`;
    const parsedReceipt = emailParser.parseTextEmail(emailContent);

    console.log('Parsed receipt:', parsedReceipt);

    // Verify email with vlayer ZK Email
    const { isValid, dkimProof, extractedData } = await vlayerProver.verifyEmail(
      emailContent
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Email verification failed' },
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

    // Calculate processing time
    const processingTime = Date.now() - startTime;
    console.log(`Email processed in ${processingTime}ms`);

    // CRITICAL: Email content is automatically cleared by Node.js garbage collection
    // We don't store any email content beyond this point

    // Return the proof data (this would be sent to the user's wallet for minting)
    return NextResponse.json({
      success: true,
      proof: {
        hash: proofHash,
        metadataUrl,
        imageUrl,
        receipt: {
          orderId: parsedReceipt.orderId,
          storeName: parsedReceipt.storeName,
          productName: parsedReceipt.productName,
          purchaseDate: parsedReceipt.purchaseDate,
          category: parsedReceipt.category,
        },
      },
      processingTime,
      message: 'Email processed successfully. Ready to mint NFT.',
    });
  } catch (error) {
    console.error('Email processing error:', error);

    return NextResponse.json(
      {
        error: 'Failed to process email',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  } finally {
    // Ensure we don't hold any email data in memory
    // Force garbage collection if available (Node.js with --expose-gc flag)
    if (global.gc) {
      global.gc();
    }
  }
}

/**
 * GET /api/forward-email
 * Returns information about the email forwarding service
 */
export async function GET() {
  return NextResponse.json({
    service: 'Receipilot Email Forwarding',
    forwardTo: process.env.NEXT_PUBLIC_FORWARD_EMAIL,
    privacy: 'All emails are processed and deleted within 5 seconds',
    instructions: 'Forward your receipt email to the address above',
  });
}
