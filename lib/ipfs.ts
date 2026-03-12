// IPFS/Web3.Storage integration for NFT metadata and SVG storage

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  external_url?: string;
}

interface ReceiptNFTData {
  orderId: string;
  storeName: string;
  productName: string;
  purchaseDate: string;
  category: 'physical' | 'digital' | 'virtual';
  proofHash: string;
}

export class IPFSStorage {
  private web3StorageToken: string;

  constructor() {
    this.web3StorageToken = process.env.WEB3_STORAGE_TOKEN || '';
    
    if (!this.web3StorageToken) {
      console.warn('Web3.Storage token not configured. IPFS uploads will fail.');
    }
  }

  /**
   * Generate dynamic SVG for the receipt NFT
   */
  generateReceiptSVG(data: ReceiptNFTData): string {
    const { orderId, storeName, productName, purchaseDate, category } = data;

    const categoryColors = {
      physical: { primary: '#3B82F6', secondary: '#06B6D4' },
      digital: '#10B981',
      virtual: { primary: '#A855F7', secondary: '#EC4899' },
    };

    const categoryIcons = {
      physical: `<rect x="30" y="30" width="40" height="40" fill="#3B82F6" rx="8"/>`,
      digital: `<circle cx="50" cy="50" r="20" fill="#10B981"/>`,
      virtual: `<polygon points="50,30 70,60 30,60" fill="#A855F7"/>`,
    };

    const color = typeof categoryColors[category] === 'string' 
      ? categoryColors[category] 
      : (categoryColors[category] as { primary: string }).primary;

    const svg = `
      <svg width="1000" height="1000" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#000;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="holographicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#00f0ff;stop-opacity:1" />
            <stop offset="25%" style="stop-color:#bf40ff;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#ff10f0;stop-opacity:1" />
            <stop offset="75%" style="stop-color:#4d79ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#00f0ff;stop-opacity:1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="1000" height="1000" fill="url(#bgGradient)"/>
        
        <!-- Glass effect border -->
        <rect x="40" y="40" width="920" height="920" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2" rx="20"/>
        
        <!-- Category icon -->
        ${categoryIcons[category]}
        
        <!-- Store name -->
        <text x="500" y="150" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">${this.escapeXml(storeName)}</text>
        
        <!-- Product name -->
        <text x="500" y="250" font-family="Arial, sans-serif" font-size="32" fill="#999" text-anchor="middle">${this.escapeXml(productName.length > 40 ? productName.substring(0, 37) + '...' : productName)}</text>
        
        <!-- Order ID -->
        <text x="500" y="400" font-family="monospace" font-size="24" fill="#666" text-anchor="middle">Order ID</text>
        <text x="500" y="450" font-family="monospace" font-size="36" fill="${color}" text-anchor="middle" filter="url(#glow)">${this.escapeXml(orderId)}</text>
        
        <!-- Date -->
        <text x="500" y="550" font-family="monospace" font-size="24" fill="#666" text-anchor="middle">Purchase Date</text>
        <text x="500" y="600" font-family="monospace" font-size="32" fill="white" text-anchor="middle">${purchaseDate}</text>
        
        <!-- Category badge -->
        <rect x="350" y="680" width="300" height="60" fill="${color}" rx="30"/>
        <text x="500" y="720" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="black" text-anchor="middle">${category.toUpperCase()}</text>
        
        <!-- Verified stamp -->
        <rect x="200" y="800" width="600" height="80" fill="url(#holographicGradient)" rx="10"/>
        <text x="500" y="850" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="black" text-anchor="middle">VERIFIED BY VLAYER</text>
      </svg>
    `;

    return svg.trim();
  }

  /**
   * Upload SVG and metadata to IPFS
   */
  async uploadToIPFS(data: ReceiptNFTData): Promise<{
    imageUrl: string;
    metadataUrl: string;
  }> {
    try {
      console.log('Uploading to IPFS...');

      // Generate SVG
      const svg = this.generateReceiptSVG(data);
      const _svgBlob = new Blob([svg], { type: 'image/svg+xml' });

      // In production, this would use Web3.Storage client
      // For now, we'll simulate the upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockImageCid = 'bafybeig' + Math.random().toString(36).substring(7);
      const imageUrl = `ipfs://${mockImageCid}`;

      // Create metadata
      const metadata: NFTMetadata = {
        name: `Receipt: ${data.productName}`,
        description: `Cryptographically verified receipt from ${data.storeName} for order ${data.orderId}. Impossible to fake. Powered by vlayer ZK technology.`,
        image: imageUrl,
        attributes: [
          { trait_type: 'Store', value: data.storeName },
          { trait_type: 'Order ID', value: data.orderId },
          { trait_type: 'Purchase Date', value: data.purchaseDate },
          { trait_type: 'Category', value: data.category },
          { trait_type: 'Proof Hash', value: data.proofHash },
          { trait_type: 'Verified By', value: 'vlayer' },
        ],
        external_url: 'https://receipilot.xyz',
      };

      const _metadataBlob = new Blob([JSON.stringify(metadata, null, 2)], {
        type: 'application/json',
      });

      // Simulate metadata upload
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockMetadataCid = 'bafybeig' + Math.random().toString(36).substring(7);
      const metadataUrl = `ipfs://${mockMetadataCid}`;

      return {
        imageUrl,
        metadataUrl,
      };
    } catch (error) {
      console.error('IPFS upload failed:', error);
      throw new Error('Failed to upload to IPFS');
    }
  }

  /**
   * Retrieve content from IPFS
   */
  async getFromIPFS(cid: string): Promise<string> {
    try {
      // In production, this would fetch from IPFS gateway
      const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch from IPFS');
      }

      return await response.text();
    } catch (error) {
      console.error('IPFS fetch failed:', error);
      throw error;
    }
  }

  private escapeXml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}

export const ipfsStorage = new IPFSStorage();
