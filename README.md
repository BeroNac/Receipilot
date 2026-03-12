# Receipilot

> **Turn any online purchase email into a beautiful, cryptographically verified NFT in seconds — impossible to fake.**

Powered by [vlayer](https://vlayer.xyz) ZK technology, Receipilot transforms ordinary receipts into verified digital assets on the Base blockchain.

---

## 🌟 Vision

**The MVP is just the door. The real product is enterprise partnerships.**

- We solve real pain for e-commerce: receipt forgery and warranty claim disputes
- Users can earn real money when product prices rise or items become discontinued
- Freemium model: 2 free mints/week, then premium ($9/mo or $79/yr)
- Coming soon as a smart mobile app

---

## 🚀 Features

### Core Features
- ✅ **Dynamic SVG NFTs** with auto logo, order ID, date, category icons
- ✅ **Three upload methods**: .eml file, paste text, or forward to `prove@receipilot.xyz`
- ✅ **ZK Email verification** using vlayer's DKIM + regex proofs
- ✅ **Freemium model**: 2 free mints per week per wallet (on-chain tracked)
- ✅ **Gas-free minting** via Base paymaster (sponsored transactions)
- ✅ **Full-text search** by order ID, product, date, store
- ✅ **Beautiful proof animation** matching vlayer demo quality
- ✅ **Demo mode** with simulated flow
- ✅ **Privacy-first**: Emails deleted within 5 seconds, only proof hash on-chain
- ✅ **Sanity CMS** for managing partners and FAQ content
- ✅ **Dark/light theme** with glassmorphism design

### Tech Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Wallet**: wagmi, viem, RainbowKit
- **Blockchain**: Base mainnet + Sepolia testnet
- **Smart Contracts**: Solidity 0.8.28, Foundry
- **Verification**: @vlayer/sdk (ZK Email + Web Proofs)
- **Database**: Supabase
- **Storage**: IPFS/Web3.Storage
- **CMS**: Sanity.io
- **Email**: Resend API

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.x or higher
- **pnpm** or **npm** or **yarn**
- **Foundry** (for smart contracts)
- **Git**

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/receipilot.git
cd receipilot
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Install Foundry (for Smart Contracts)

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### 4. Install Foundry Dependencies

```bash
cd contracts
forge install OpenZeppelin/openzeppelin-contracts
cd ..
```

---

## ⚙️ Configuration

### 1. Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Fill in the following variables in `.env`:

#### Blockchain & Wallet
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# After deployment
NEXT_PUBLIC_CONTRACT_ADDRESS_BASE=0x...
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0x...
NEXT_PUBLIC_PAYMASTER_ADDRESS_BASE=0x...
NEXT_PUBLIC_PAYMASTER_ADDRESS_SEPOLIA=0x...

# For deployment only (NEVER commit these)
PRIVATE_KEY_DEPLOYER=your_deployer_private_key
PRIVATE_KEY_SPONSOR=your_sponsor_wallet_private_key
```

**Where to get:**
- WalletConnect Project ID: [WalletConnect Cloud](https://cloud.walletconnect.com/)
- Infura API Key: [Infura](https://infura.io/)

#### vlayer SDK
```env
NEXT_PUBLIC_VLAYER_API_KEY=your_vlayer_api_key
VLAYER_PROVER_URL=https://prover.vlayer.xyz
```

**Where to get:**
- vlayer API Key: [vlayer.xyz](https://vlayer.xyz)

#### Supabase
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Setup Supabase:**

1. Create a new project at [Supabase](https://supabase.com)
2. Go to Project Settings > API to get your keys
3. Create the `receipts` table:

```sql
CREATE TABLE receipts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address TEXT NOT NULL,
  proof_hash TEXT NOT NULL UNIQUE,
  order_id TEXT NOT NULL,
  store_name TEXT NOT NULL,
  product_name TEXT NOT NULL,
  purchase_date DATE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('physical', 'digital', 'virtual')),
  ipfs_url TEXT NOT NULL,
  token_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_wallet_address ON receipts(wallet_address);
CREATE INDEX idx_order_id ON receipts(order_id);
CREATE INDEX idx_created_at ON receipts(created_at);
```

#### IPFS / Web3 Storage
```env
WEB3_STORAGE_TOKEN=your_web3_storage_token
```

**Where to get:**
- Web3.Storage Token: [web3.storage](https://web3.storage)

#### Email Service (Resend)
```env
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_FORWARD_EMAIL=prove@receipilot.xyz
```

**Setup Email Forwarding:**

1. Sign up at [Resend](https://resend.com)
2. Verify your domain (or use Resend's testing domain for development)
3. Create an API key
4. Set up email forwarding to your API endpoint:
   - Endpoint: `https://your-domain.com/api/forward-email`
   - Method: POST

#### Sanity CMS
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=mbgeq55v
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-11
SANITY_API_TOKEN=your_sanity_api_token
```

**Setup Sanity CMS:**

1. The project is already configured to use Organization ID: `oVb58dKGZ` and Project ID: `mbgeq55v`
2. Install Sanity CLI globally:
   ```bash
   npm install -g @sanity/cli
   ```
3. Login to Sanity:
   ```bash
   sanity login
   ```
4. Initialize the studio:
   ```bash
   npm run sanity:dev
   ```
5. Open Studio at `http://localhost:3000/studio`
6. Create content:
   - Add partners (name, logo, coming soon status)
   - Add FAQs (question, answer, category)

**Get API Token:**
- Go to [Sanity Manage](https://www.sanity.io/manage)
- Select your project
- Go to API > Tokens
- Create a new token with Editor permissions

---

## 🔐 Smart Contract Deployment

### 1. Deploy to Sepolia (Testnet)

```bash
cd contracts

# Set environment variables
export PRIVATE_KEY_DEPLOYER="your_deployer_private_key"
export SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/YOUR_KEY"
export BASESCAN_API_KEY="your_basescan_api_key"

# Deploy
forge script script/DeploySepolia.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --verify

# Copy the deployed contract address to .env
```

### 2. Deploy to Base Mainnet

```bash
export BASE_RPC_URL="https://mainnet.base.org"
forge script script/Deploy.s.sol --rpc-url $BASE_RPC_URL --broadcast --verify
```

### 3. Fund the Paymaster

The paymaster wallet needs ETH to sponsor gas fees:

```bash
# Send ETH to PRIVATE_KEY_SPONSOR address
# Recommended: 0.1 ETH for testing, 1+ ETH for production
```

### 4. Run Tests

```bash
cd contracts
forge test
```

---

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Run Sanity Studio

In a separate terminal:

```bash
npm run sanity:dev
```

Open [http://localhost:3000/studio](http://localhost:3000/studio)

### Build for Production

```bash
npm run build
npm run start
```

---

## 📧 Email Forwarding Service

### How It Works

1. User forwards receipt email to `prove@receipilot.xyz`
2. Resend webhook sends email to `/api/forward-email`
3. Email is parsed and verified with vlayer ZK Email (DKIM signature)
4. ZK proof is generated
5. Metadata uploaded to IPFS
6. **Email content is deleted within 5 seconds**
7. User receives confirmation with mint link

### Setup Email Forwarding

**Option A: Using Resend (Recommended)**

1. Verify your domain in Resend
2. Add MX records to your domain DNS
3. Create an email route:
   - Forward from: `prove@receipilot.xyz`
   - Forward to: `https://your-domain.com/api/forward-email`

**Option B: Using Gmail/Other (Development)**

1. Set up email forwarding to a webhook service like [Zapier](https://zapier.com) or [Make](https://make.com)
2. Configure the webhook to POST to your API endpoint

### Testing Email Forwarding

```bash
curl -X POST http://localhost:3000/api/forward-email \
  -H "Content-Type: application/json" \
  -d '{
    "from": "orders@amazon.com",
    "to": "prove@receipilot.xyz",
    "subject": "Your Amazon order #112-8475638",
    "text": "Thank you for your order!\n\nOrder ID: AMZ-112-8475638\nProduct: MacBook Pro 16\"\nDate: 2026-03-01\nTotal: $3,499.00"
  }'
```

---

## 🎨 Customization

### Modify NFT SVG Design

Edit the SVG generation in `lib/ipfs.ts`:

```typescript
// lib/ipfs.ts
generateReceiptSVG(data: ReceiptNFTData): string {
  // Customize colors, layout, fonts, etc.
}
```

### Add New Partners

1. Go to Sanity Studio: `/studio`
2. Click "Partner" → "Create new"
3. Fill in name, upload logo, set order
4. Mark as "Coming Soon" if not yet active
5. Publish

### Update FAQ

1. Go to Sanity Studio: `/studio`
2. Click "FAQ" → "Create new"
3. Add question, answer, category, order
4. Publish

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add all environment variables
5. Deploy

### Deploy to Other Platforms

The app can be deployed to any platform supporting Next.js 15:
- Netlify
- Railway
- Render
- AWS Amplify
- Self-hosted with Docker

---

## 🔍 Key Directories

```
Receipilot/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes (mint, forward-email)
│   ├── demo/              # Demo page
│   ├── my-receipts/       # User's receipts page
│   ├── privacy/           # Privacy policy
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── Hero.tsx          # Hero section
│   ├── PartnersCarousel.tsx
│   ├── UploadFlow.tsx
│   ├── ProofAnimation.tsx
│   └── ...
├── lib/                   # Utilities
│   ├── vlayer.ts         # vlayer SDK integration
│   ├── ipfs.ts           # IPFS storage
│   ├── email-parser.ts   # Email parsing
│   ├── supabase.ts       # Supabase client
│   ├── contracts.ts      # Contract hooks
│   └── wagmi-config.ts   # Web3 configuration
├── contracts/             # Solidity smart contracts
│   ├── src/
│   │   └── ReceipilotNFT.sol
│   ├── script/           # Deployment scripts
│   ├── test/             # Contract tests
│   └── foundry.toml
├── sanity/               # Sanity CMS
│   ├── schemas/          # Content schemas
│   └── lib/              # Sanity client
└── public/               # Static assets
```

---

## 🧪 Testing

### Frontend Tests

```bash
npm run test
```

### Contract Tests

```bash
cd contracts
forge test -vvv
```

### E2E Testing

Use the demo page at `/demo` to test the full flow without real wallet/email.

---

## 🔒 Security

### Privacy Guarantees

1. **Email content is NEVER stored**: Processed in memory and deleted within 5 seconds
2. **Only proof hashes on-chain**: No personal data ever touches the blockchain
3. **Client-side processing**: Text paste option processes entirely in browser
4. **Zero-knowledge proofs**: vlayer ensures cryptographic verification without revealing data

### Smart Contract Security

- OpenZeppelin contracts for ERC721
- ReentrancyGuard on mint function
- Proof hash uniqueness enforced
- Weekly mint limits tracked on-chain
- Owner-only functions for premium subscriptions

### Audit Recommendations

Before mainnet launch, consider:
- Smart contract audit (Trail of Bits, OpenZeppelin, etc.)
- Penetration testing for API endpoints
- Code review for vlayer integration

---

## 💰 Freemium Model

### Free Tier
- 2 mints per week per wallet
- Resets every Sunday at midnight UTC
- Tracked on-chain via `getUserMintCount()`
- Gas fees sponsored by paymaster

### Premium Tier ($9/mo or $79/yr)
- Unlimited mints
- Batch processing
- Custom NFT designs
- Priority support
- Early access to enterprise features

To upgrade users to premium:

```solidity
// Call from owner account
receipilotNFT.subscribePremium(userAddress, 30 days);
```

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 🆘 Troubleshooting

### Common Issues

**"Smart contract not deployed"**
- Run deployment scripts for Sepolia or Base
- Update contract addresses in `.env`

**"Email forwarding not working"**
- Check Resend API key and domain verification
- Verify webhook endpoint is publicly accessible
- Check `/api/forward-email` logs

**"Sanity Studio not loading"**
- Run `sanity login`
- Verify project ID matches Organization ID `oVb58dKGZ`
- Check SANITY_API_TOKEN permissions

**"vlayer proof generation failing"**
- Verify VLAYER_API_KEY is correct
- Check email has valid DKIM signature
- Ensure prover URL is accessible

**"IPFS upload failing"**
- Check WEB3_STORAGE_TOKEN is valid
- Verify token has upload permissions
- Try using IPFS gateway for testing

---

## 📞 Support

- **Email**: hello@receipilot.xyz
- **Discord**: [Join our community](#)
- **Twitter**: [@receipilot](#)
- **GitHub Issues**: [github.com/receipilot/receipilot/issues](#)

---

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ MVP launch
- ✅ Freemium model
- ✅ Base mainnet deployment

### Phase 2 (Q2 2026)
- 🔄 Mobile app (iOS/Android)
- 🔄 Batch minting
- 🔄 Custom NFT templates
- 🔄 Stripe integration for premium

### Phase 3 (Q3 2026)
- 🔜 Enterprise API
- 🔜 E-commerce integrations (Shopify, WooCommerce)
- 🔜 Warranty claims portal
- 🔜 Secondary market for rare receipts

### Phase 4 (Q4 2026)
- 🔜 Cross-chain support (Ethereum, Polygon)
- 🔜 AI-powered receipt categorization
- 🔜 Loyalty rewards program
- 🔜 B2B partnerships with major retailers

---

## 🙏 Acknowledgments

- **vlayer** for powerful ZK technology
- **Base** for gas-efficient blockchain
- **OpenZeppelin** for secure contracts
- **Vercel** for hosting
- **Sanity** for CMS

---

Made with ❤️ by the Receipilot team

**Turn receipts into wealth. Prove what you own.**
