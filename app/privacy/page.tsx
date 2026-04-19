export const metadata = {
  title: 'Privacy Policy - Receipilot',
  description: 'How we protect your data and privacy',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-20">
      <h1 className="mb-8 text-5xl font-bold">Privacy Policy</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Last updated: March 11, 2026
      </p>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="mb-4 text-3xl font-semibold">Our Privacy Promise</h2>
          <p className="text-muted-foreground">
            At Receipilot, your privacy is paramount. We&rsquo;ve designed our entire system
            around the principle that your personal data should never be stored on our
            servers.
          </p>
        </section>

        <section className="clean-card rounded-2xl p-8">
          <h2 className="mb-4 text-2xl font-semibold text-blue-600 dark:text-blue-400">
            What We NEVER Store
          </h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>Your full email content or body</li>
            <li>Personal information from your receipts (name, address, phone)</li>
            <li>Payment information or credit card details</li>
            <li>Email passwords or SMTP credentials</li>
            <li>Private keys or wallet seed phrases</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">How Email Forwarding Works</h2>
          <p className="mb-4 text-muted-foreground">
            When you forward an email to prove@receipilot.xyz:
          </p>
          <ol className="list-inside list-decimal space-y-3 text-muted-foreground">
            <li>
              Our serverless function receives the email and immediately begins parsing
            </li>
            <li>
              We extract only the necessary data: order ID, date, store name, and product
              name
            </li>
            <li>
              A zero-knowledge proof is generated using vlayer&rsquo;s technology to verify the
              DKIM signature
            </li>
            <li>
              The cryptographic proof hash is sent to the blockchain
            </li>
            <li>
              <strong className="text-blue-600 dark:text-blue-400">
                The entire email content is permanently deleted within 5 seconds
              </strong>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">What We Store</h2>
          <p className="mb-4 text-muted-foreground">
            We only store the absolute minimum required for the service:
          </p>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>
              Cryptographic proof hashes (these cannot be reverse-engineered to obtain
              your email)
            </li>
            <li>NFT metadata (order ID, store name, product name, date)</li>
            <li>Your wallet address (public information on the blockchain)</li>
            <li>
              Premium subscription status (if you upgrade to premium features)
            </li>
          </ul>
        </section>

        <section className="clean-card rounded-2xl p-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            Client-Side Processing
          </h2>
          <p className="text-muted-foreground">
            When you use the &quot;Paste Text&quot; option, all processing happens entirely in your
            browser. The text never leaves your computer until the final proof is
            submitted to the blockchain.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Third-Party Services</h2>
          <p className="mb-4 text-muted-foreground">
            We use the following trusted third-party services:
          </p>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>
              <strong>vlayer</strong> - Zero-knowledge proof generation (they never see
              your email content)
            </li>
            <li>
              <strong>Base/Ethereum</strong> - Blockchain network for storing proofs
            </li>
            <li>
              <strong>IPFS/Web3.Storage</strong> - Decentralized storage for NFT metadata
            </li>
            <li>
              <strong>Supabase</strong> - Database for storing non-sensitive proof hashes
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Your Rights</h2>
          <p className="mb-4 text-muted-foreground">You have the right to:</p>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>Request deletion of your NFT metadata at any time</li>
            <li>Export all data associated with your wallet address</li>
            <li>Opt out of premium features and cancel your subscription</li>
            <li>
              Access the source code of our smart contracts (fully open source on GitHub)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Cookies and Analytics</h2>
          <p className="text-muted-foreground">
            We use minimal, privacy-respecting analytics to understand how users interact
            with our platform. We do not use tracking cookies or sell your data to third
            parties. Ever.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about our privacy practices, please contact us at{' '}
            <a
              href="mailto:privacy@receipilot.xyz"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              privacy@receipilot.xyz
            </a>
          </p>
        </section>

        <section className="clean-card rounded-2xl p-8">
          <h2 className="mb-4 text-2xl font-semibold">Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this privacy policy from time to time. We will notify you of any
            changes by posting the new policy on this page and updating the &quot;Last updated&quot;
            date.
          </p>
        </section>
      </div>
    </div>
  );
}
