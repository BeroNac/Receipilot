import Link from 'next/link';
import { Github, Twitter, Mail, Receipt } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500">
                <Receipt className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                Recei<span className="gradient-text">pilot</span>
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
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Demo
                </Link>
              </li>
              <li>
                <Link href="/my-receipts" className="hover:text-blue-600 dark:hover:text-blue-400">
                  My Receipts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="mailto:hello@receipilot.xyz" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/receipilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
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
                className="text-muted-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/receipilot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@receipilot.xyz"
                className="text-muted-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
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
                className="text-violet-600 hover:underline dark:text-violet-400"
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
