'use client';

import { clsx } from 'clsx';
import { Heart, User } from 'lucide-react';

import { Link } from '~/components/link';

type LinkValue = { href: string } | null | undefined;

export interface MakeswiftHeaderTopBarProps {
  className?: string;
  messageText?: string;
  wishlistLabel?: string;
  wishlistLink?: LinkValue;
  loginLabel?: string;
  loginLink?: LinkValue;
  backgroundColor?: string;
  hoverColor?: string;
}

const DEFAULT_MESSAGE = 'Get a free 30 day money back guarantee';
const DEFAULT_WISHLIST_LABEL = 'My Wishlist';
const DEFAULT_LOGIN_LABEL = 'Login';

export function MakeswiftHeaderTopBar({
  className,
  messageText = DEFAULT_MESSAGE,
  wishlistLabel = DEFAULT_WISHLIST_LABEL,
  wishlistLink,
  loginLabel = DEFAULT_LOGIN_LABEL,
  loginLink,
  backgroundColor = '#043D70',
  hoverColor = '#ED1C2E',
}: MakeswiftHeaderTopBarProps) {
  const resolvedMessage = messageText?.trim() || DEFAULT_MESSAGE;

  return (
    <section
      className={clsx('w-full', className)}
      style={
        {
          backgroundColor,
          color: '#ffffff',
          ['--topbar-hover' as string]: hoverColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto flex w-full flex-col gap-2 px-4 py-2 text-sm @container sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {resolvedMessage ? (
          <div className="hidden min-w-0 sm:block sm:max-w-[70%]">
            <p className="break-words leading-snug">{resolvedMessage}</p>
          </div>
        ) : null}

        <nav aria-label="Top bar actions">
          <ul className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
            <li>
              <Link
                className="inline-flex items-center gap-2 text-current transition-colors hover:text-[var(--topbar-hover)]"
                href={wishlistLink?.href ?? '/account/wishlists'}
              >
                <Heart aria-hidden="true" className="h-4 w-4" />
                <span>{wishlistLabel || DEFAULT_WISHLIST_LABEL}</span>
              </Link>
            </li>
            <li>
              <Link
                className="inline-flex items-center gap-2 text-current transition-colors hover:text-[var(--topbar-hover)]"
                href={loginLink?.href ?? '/login'}
              >
                <User aria-hidden="true" className="h-4 w-4" />
                <span>{loginLabel || DEFAULT_LOGIN_LABEL}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
