import Link from 'next/link';
import { Github, Twitter, Mail, Receipt } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-black/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
                <Receipt className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Recei<span className="gradient-text">pilot</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transform online purchase emails into cryptographically verified NFTs.
              Impossible to fake, forever on-chain.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Product</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/demo', label: 'Live Demo' },
                { href: '/my-receipts', label: 'My Receipts' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-violet-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-white/70 transition-colors hover:text-violet-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="mailto:hello@receipilot.xyz" className="text-sm text-white/70 transition-colors hover:text-violet-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/receipilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 transition-colors hover:text-violet-400"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Connect</h3>
            <div className="flex space-x-3">
              {[
                { href: 'https://twitter.com/receipilot', icon: Twitter, label: 'Twitter' },
                { href: 'https://github.com/receipilot', icon: Github, label: 'GitHub' },
                { href: 'mailto:hello@receipilot.xyz', icon: Mail, label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-400"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Mobile app coming soon
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/5 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>
              © {currentYear} Receipilot. Powered by{' '}
              <a
                href="https://vlayer.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:underline"
              >
                vlayer
              </a>
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                All systems operational
              </span>
              <span>Base · IPFS · ZK</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
