import { simpleParser, ParsedMail } from 'mailparser';

export interface ParsedReceipt {
  orderId: string;
  storeName: string;
  productName: string;
  purchaseDate: string;
  totalAmount?: string;
  category: 'physical' | 'digital' | 'virtual';
  rawEmail?: string;
}

export class EmailParser {
  /**
   * Parse .eml file content
   */
  async parseEmlFile(fileContent: string): Promise<ParsedReceipt> {
    try {
      const parsed = await simpleParser(fileContent);
      return this.extractReceiptData(parsed);
    } catch (error) {
      console.error('Failed to parse .eml file:', error);
      throw new Error('Invalid .eml file format');
    }
  }

  /**
   * Parse plain text email content
   */
  parseTextEmail(textContent: string): ParsedReceipt {
    try {
      const orderId = this.extractOrderId(textContent);
      const storeName = this.extractStoreName(textContent);
      const productName = this.extractProductName(textContent);
      const purchaseDate = this.extractDate(textContent);
      const totalAmount = this.extractTotal(textContent);
      const category = this.determineCategory(productName, storeName);

      return {
        orderId,
        storeName,
        productName,
        purchaseDate,
        totalAmount,
        category,
      };
    } catch (error) {
      console.error('Failed to parse text email:', error);
      throw new Error('Unable to extract receipt data from text');
    }
  }

  private extractReceiptData(parsed: ParsedMail): ParsedReceipt {
    const textContent = parsed.text || '';
    const htmlContent = parsed.html || '';
    const subject = parsed.subject || '';
    const from = parsed.from?.text || '';

    // Combine all text sources for better extraction
    const fullContent = `${subject}\n${from}\n${textContent}\n${htmlContent}`;

    const orderId = this.extractOrderId(fullContent);
    const storeName = this.extractStoreFromEmail(from) || this.extractStoreName(fullContent);
    const productName = this.extractProductName(fullContent);
    const purchaseDate = this.extractDate(fullContent) || this.extractDateFromHeaders(parsed);
    const totalAmount = this.extractTotal(fullContent);
    const category = this.determineCategory(productName, storeName);

    return {
      orderId,
      storeName,
      productName,
      purchaseDate,
      totalAmount,
      category,
    };
  }

  private extractOrderId(content: string): string {
    const patterns = [
      /Order\s*(?:ID|Number|#)?\s*:?\s*([A-Z0-9-]{8,})/i,
      /Order\s*([A-Z]{2,5}-\d{3,}-\d{6,})/i,
      /Confirmation\s*(?:Number|Code)?\s*:?\s*([A-Z0-9-]{8,})/i,
      /#(\d{10,})/,
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) return match[1];
    }

    return 'ORDER-' + Date.now();
  }

  private extractStoreName(content: string): string {
    const patterns = [
      /Thank you for (?:your order|shopping) (?:at|with) ([A-Za-z\s]+)/i,
      /Your ([A-Za-z\s]+) order/i,
      /Order from ([A-Za-z\s]+)/i,
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) return match[1].trim();
    }

    return 'Unknown Store';
  }

  private extractStoreFromEmail(fromHeader: string): string | null {
    const emailMatch = fromHeader.match(/@([\w-]+)\./);
    if (!emailMatch) return null;

    const domain = emailMatch[1].toLowerCase();
    const storeMap: Record<string, string> = {
      amazon: 'Amazon',
      ebay: 'eBay',
      paypal: 'PayPal',
      nike: 'Nike',
      adidas: 'Adidas',
      steam: 'Steam',
      epicgames: 'Epic Games',
      apple: 'Apple',
      bestbuy: 'Best Buy',
      target: 'Target',
      walmart: 'Walmart',
      shopify: 'Shopify',
    };

    return storeMap[domain] || null;
  }

  private extractProductName(content: string): string {
    const patterns = [
      /Product:\s*(.+?)(?:\n|<br>|$)/i,
      /Item:\s*(.+?)(?:\n|<br>|$)/i,
      /You (?:ordered|purchased):\s*(.+?)(?:\n|<br>|$)/i,
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) return match[1].trim();
    }

    return 'Product';
  }

  private extractDate(content: string): string {
    const patterns = [
      /(?:Purchase |Order |Transaction )?Date:\s*(.+?)(?:\n|$)/i,
      /(\d{1,2}\/\d{1,2}\/\d{4})/,
      /(\d{4}-\d{2}-\d{2})/,
      /(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}/i,
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        try {
          const dateStr = match[1] || match[0];
          const date = new Date(dateStr);
          if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0];
          }
        } catch {
          continue;
        }
      }
    }

    return new Date().toISOString().split('T')[0];
  }

  private extractDateFromHeaders(parsed: ParsedMail): string {
    if (parsed.date) {
      return new Date(parsed.date).toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  }

  private extractTotal(content: string): string | undefined {
    const patterns = [
      /Total:\s*\$?([\d,]+\.?\d*)/i,
      /Amount:\s*\$?([\d,]+\.?\d*)/i,
      /\$(\d{1,},?\d{3}\.?\d{0,2})/,
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) return match[1].replace(/,/g, '');
    }

    return undefined;
  }

  private determineCategory(productName: string, storeName: string): 'physical' | 'digital' | 'virtual' {
    const product = productName.toLowerCase();
    const store = storeName.toLowerCase();

    // Digital stores and products
    if (
      store.includes('steam') ||
      store.includes('epic') ||
      store.includes('gog') ||
      product.includes('download') ||
      product.includes('digital') ||
      product.includes('software') ||
      product.includes('game') ||
      product.includes('ebook')
    ) {
      return 'digital';
    }

    // Virtual/NFT products
    if (
      product.includes('nft') ||
      product.includes('metaverse') ||
      product.includes('virtual') ||
      product.includes('crypto')
    ) {
      return 'virtual';
    }

    // Default to physical
    return 'physical';
  }
}

export const emailParser = new EmailParser();
