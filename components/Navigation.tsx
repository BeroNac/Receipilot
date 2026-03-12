'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/demo', label: 'Demo' },
    { href: '/my-receipts', label: 'My Receipts' },
    { href: '/privacy', label: 'Privacy' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
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
        </Link>

        <div className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-neon-cyan',
                pathname === link.href
                  ? 'text-neon-cyan'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hidden rounded-lg p-2 hover:bg-accent md:block"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <div className="hidden md:block">
            <ConnectButton />
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border/40 md:hidden">
          <div className="container mx-auto space-y-4 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block text-sm font-medium transition-colors hover:text-neon-cyan',
                  pathname === link.href
                    ? 'text-neon-cyan'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
