import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-cyan">
                <svg
                  className="h-6 w-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">
                Receipt<span className="text-neon-cyan">ilot</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Turn any online purchase email into a beautiful, cryptographically verified
              NFT in seconds — impossible to fake.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-neon-cyan">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-neon-cyan">
                  Demo
                </Link>
              </li>
              <li>
                <Link href="/my-receipts" className="hover:text-neon-cyan">
                  My Receipts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-neon-cyan">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="mailto:hello@receipilot.xyz" className="hover:text-neon-cyan">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/receipilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neon-cyan"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Stay Connected</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/receipilot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-neon-cyan"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/receipilot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-neon-cyan"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@receipilot.xyz"
                className="text-muted-foreground transition-colors hover:text-neon-cyan"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Coming to your pocket as a smart mobile app very soon.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>
              © {currentYear} Receipilot. All rights reserved. Powered by{' '}
              <a
                href="https://vlayer.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-purple hover:underline"
              >
                vlayer
              </a>
            </p>
            <p className="text-xs">
              Built with Next.js · Solidity · Base · IPFS · Love
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
