import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const target = formData.get('target') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedImageTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/x-icon'];
    const allowedFontTypes = [
      'font/ttf', 'font/otf', 'font/woff', 'font/woff2',
      'application/font-woff', 'application/font-woff2',
      'application/x-font-ttf', 'application/x-font-otf',
      'application/octet-stream', // some browsers send this for fonts
    ];
    const allowedFontExts = ['ttf', 'otf', 'woff', 'woff2'];
    const ext = file.name.split('.').pop()?.toLowerCase() || '';

    const isFontTarget = target === 'font-logo' || target === 'font-body';
    const isFontExt = allowedFontExts.includes(ext);

    if (isFontTarget) {
      if (!isFontExt) {
        return NextResponse.json({ error: 'Invalid font type. Use TTF, OTF, WOFF, or WOFF2.' }, { status: 400 });
      }
    } else if (!allowedImageTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Use PNG, JPG, WebP, SVG, or ICO.' }, { status: 400 });
    }

    // Limit file size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 5MB.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine filename based on target
    let filename: string;

    switch (target) {
      case 'receipt':
        filename = `receipt-card.${ext}`;
        break;
      case 'favicon':
        filename = 'favicon.ico';
        break;
      case 'og':
        filename = `og-image.${ext}`;
        break;
      case 'logo':
        filename = `logo.${ext}`;
        break;
      case 'partner': {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase();
        const partnersDir = join(process.cwd(), 'public', 'partners');
        await mkdir(partnersDir, { recursive: true });
        filename = `partners/${safeName}`;
        break;
      }
      case 'font-logo':
      case 'font-body': {
        const safeFontName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase();
        const fontsDir = join(process.cwd(), 'public', 'fonts');
        await mkdir(fontsDir, { recursive: true });
        filename = `fonts/${safeFontName}`;
        break;
      }
      default: {
        // Sanitize filename to prevent path traversal
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        filename = safeName;
      }
    }

    const publicDir = join(process.cwd(), 'public');
    const filePath = join(publicDir, filename);

    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true, path: `/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
