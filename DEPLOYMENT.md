# Receipilot — Deployment Guide

## Environment Variables

Create a `.env.local` file (never commit this) with the following:

```bash
# Required — WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Required — Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Required — Smart Contracts
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0xYourSepoliaContract
NEXT_PUBLIC_CONTRACT_ADDRESS_BASE=0xYourBaseContract

# Optional — Sanity CMS (defaults provided)
NEXT_PUBLIC_SANITY_PROJECT_ID=mbgeq55v
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-11

# Optional — RPC URLs (defaults to public endpoints)
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://sepolia.base.org

# Optional — vlayer ZK Prover
NEXT_PUBLIC_VLAYER_API_KEY=your_vlayer_api_key
VLAYER_PROVER_URL=https://prover.vlayer.xyz

# Optional — Email forwarding (Resend)
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_FORWARD_EMAIL=receipts@yourdomain.com

# Optional — IPFS / Web3.Storage
WEB3_STORAGE_TOKEN=your_web3_storage_token
```

---

## Vercel Deployment

### 1. Connect Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repository `BeroNac/Receipilot`
3. Framework preset: **Next.js** (auto-detected)

### 2. Configure Build Settings

These are already defined in `vercel.json`:

| Setting | Value |
|---------|-------|
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |
| Node.js Version | 18.x or 20.x |

### 3. Set Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add all variables from the list above. Use Vercel's encrypted secrets for sensitive values.

### 4. Deploy

Push to `main` — Vercel auto-deploys on every push.

### Custom Domain

1. Go to Project Settings → Domains
2. Add your domain and configure DNS as instructed

---

## Railway Deployment

### 1. Create Project

1. Go to [railway.app/new](https://railway.app/new)
2. Select **Deploy from GitHub repo** → `BeroNac/Receipilot`

### 2. Configure Service

Railway auto-detects Next.js. Verify these settings under service **Settings**:

| Setting | Value |
|---------|-------|
| Build Command | `npm run build` |
| Start Command | `npm run start` |
| Port | `3000` |

The app uses `output: 'standalone'` in `next.config.js`, so the build is self-contained.

### 3. Set Environment Variables

In Railway service → **Variables** tab, add the same environment variables listed above.

### 4. Networking

1. Go to service **Settings** → **Networking**
2. Click **Generate Domain** for a `*.up.railway.app` URL
3. Or add a custom domain and configure DNS

### 5. Deploy

Railway auto-deploys on push to `main`. You can also trigger manual deploys from the dashboard.

---

## Smart Contracts (Foundry)

The Solidity contracts live in `contracts/`. To deploy:

```bash
# Build
cd contracts && forge build

# Test
forge test

# Deploy to Base Sepolia
forge script script/DeploySepolia.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --verify

# Deploy to Base Mainnet
forge script script/Deploy.s.sol --rpc-url $BASE_RPC_URL --broadcast --verify
```

After deploying, update `NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA` and `NEXT_PUBLIC_CONTRACT_ADDRESS_BASE` in your hosting platform's environment variables.

---

## Sanity CMS

The Sanity Studio is embedded in the project. To manage content:

```bash
npm run sanity:dev    # Local studio
npm run sanity:build  # Build studio
npm run sanity:deploy # Deploy hosted studio
```

Project ID: `mbgeq55v` | Dataset: `production`

---

## Quick Checklist

- [ ] All environment variables set
- [ ] WalletConnect project ID is valid
- [ ] Supabase project is running with correct schema
- [ ] Smart contracts deployed and addresses set
- [ ] Sanity CORS origins include your production URL
- [ ] Custom domain configured (if applicable)
