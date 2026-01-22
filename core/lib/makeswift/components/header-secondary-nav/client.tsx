'use client';

import * as Popover from '@radix-ui/react-popover';
import { clsx } from 'clsx';
import { Flame, HelpCircle } from 'lucide-react';
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Stream, type Streamable } from '@/vibes/soul/lib/streamable';
import { Link } from '~/components/link';

const HIDE_THRESHOLD = 4;

type LinkValue = { href: string } | null | undefined;

interface CategoryLink {
  label: string;
  link: LinkValue;
  groups?: Array<{
    label?: string;
    link?: LinkValue;
    links: Array<{ label: string; link: LinkValue }>;
  }>;
}

interface NavLinkItem {
  label: string;
  link: LinkValue;
}

interface UtilityLink extends NavLinkItem {
  icon?: 'flame' | 'help' | 'none';
}

export interface MakeswiftHeaderSecondaryNavProps {
  className?: string;
  backgroundColor?: string;
  categoryButtonLabel?: string;
  links?: Streamable<CategoryLink[]>;
  primaryLinks?: NavLinkItem[];
  utilityLinks?: UtilityLink[];
}

type ContextProps = Pick<MakeswiftHeaderSecondaryNavProps, 'links'>;

const PropsContext = createContext<ContextProps>({});

export const PropsContextProvider = ({
  value,
  children,
}: PropsWithChildren<{ value: ContextProps }>) => (
  <PropsContext.Provider value={value}>{children}</PropsContext.Provider>
);

const resolveHref = (link: LinkValue, fallback = '#') => link?.href ?? fallback;

const DEFAULT_PRIMARY_LINKS: NavLinkItem[] = [
  { label: 'Home', link: { href: '/' } },
  { label: 'Blog', link: { href: '/blog' } },
  { label: 'FAQ', link: { href: '/pages' } },
  { label: 'About Us', link: { href: '/about-us' } },
  { label: 'Contact Us', link: { href: '/contact-us' } },
];

const DEFAULT_UTILITY_LINKS: UtilityLink[] = [
  { label: 'Promotions', link: { href: '/big-sale' }, icon: 'flame' },
  { label: 'Help Me', link: { href: '/help' }, icon: 'help' },
];

const renderIcon = (icon?: UtilityLink['icon']) => {
  switch (icon) {
    case 'flame':
      return <Flame className="h-4 w-4" />;
    case 'help':
      return <HelpCircle className="h-4 w-4" />;
    default:
      return null;
  }
};

export function MakeswiftHeaderSecondaryNav({
  className,
  backgroundColor = '#004896',
  categoryButtonLabel = 'All Categories',
  links,
  primaryLinks,
  utilityLinks,
}: MakeswiftHeaderSecondaryNavProps) {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { links: contextLinks } = useContext(PropsContext);

  useEffect(() => {
    const onScroll = () => {
      const shouldHide = window.scrollY > HIDE_THRESHOLD;

      setHidden(shouldHide);

      if (shouldHide) {
        setOpen(false);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fallbackMenu = useMemo(
    () => (
      <div className="grid gap-6 @2xl:grid-cols-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div className="space-y-2" key={idx}>
            <span className="block h-4 w-32 animate-pulse rounded bg-slate-200" />
            <div className="space-y-1">
              <span className="block h-3 w-24 animate-pulse rounded bg-slate-100" />
              <span className="block h-3 w-28 animate-pulse rounded bg-slate-100" />
              <span className="block h-3 w-20 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    ),
    [],
  );

  const resolvedLinks = links ?? contextLinks ?? [];
  const resolvedPrimaryLinks =
    primaryLinks && primaryLinks.length > 0 ? primaryLinks : DEFAULT_PRIMARY_LINKS;
  const resolvedUtilityLinks =
    utilityLinks && utilityLinks.length > 0 ? utilityLinks : DEFAULT_UTILITY_LINKS;

  return (
    <div
      className={clsx(
        'hidden overflow-hidden transition-[opacity,max-height] duration-200 ease-out will-change-[opacity,max-height] lg:block',
        hidden ? 'lg:pointer-events-none lg:max-h-0 lg:opacity-0' : 'lg:max-h-16 lg:opacity-100',
        className,
      )}
      style={{ backgroundColor }}
    >
      <div style={{ backgroundColor }}>
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-6 px-4 py-2 text-sm text-white">
          <Popover.Root onOpenChange={setOpen} open={open}>
            <Popover.Trigger asChild>
              <button
                className={clsx(
                  'flex min-w-[192px] items-center justify-center gap-3 rounded-md px-4 py-2 font-semibold uppercase tracking-wide transition-colors',
                  open ? 'bg-[#043D70]' : 'hover:bg-[#043D70]',
                )}
                type="button"
              >
                <span className="relative flex h-4 w-5 items-center justify-center">
                  <span
                    className={clsx(
                      'absolute h-[2px] w-full bg-white transition-transform duration-200',
                      open ? 'translate-y-0 rotate-45' : '-translate-y-2.5 rotate-0',
                    )}
                  />
                  <span
                    className={clsx(
                      'absolute h-[2px] w-full bg-white transition-opacity duration-200',
                      open ? 'opacity-0' : 'opacity-100',
                    )}
                  />
                  <span
                    className={clsx(
                      'absolute h-[2px] w-full bg-white transition-transform duration-200',
                      open ? 'translate-y-0 -rotate-45' : 'translate-y-2.5 rotate-0',
                    )}
                  />
                </span>
                <span>{categoryButtonLabel}</span>
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                align="start"
                className="relative z-50 w-screen overflow-visible border-b border-t-2 border-slate-200 border-t-[#ED1C2E] bg-white shadow-xl"
                sideOffset={0}
              >
                <Popover.Arrow className="fill-[#ED1C2E]" height={8} width={16} />
                <div className="mx-auto w-full max-w-screen-2xl px-6 py-6">
                  <Stream fallback={fallbackMenu} value={resolvedLinks}>
                    {(items) =>
                      items.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {items.map((item, itemIdx) => (
                            <div
                              className="space-y-3"
                              key={`${itemIdx}-${item.label}`}
                            >
                              <Link
                                className="text-sm font-semibold uppercase tracking-wide text-slate-900 transition-colors hover:text-[#ED1C2E]"
                                href={resolveHref(item.link)}
                              >
                                {item.label}
                              </Link>
                              {item.groups?.length ? (
                                <div className="space-y-4 text-sm text-slate-600">
                                      {item.groups.map((group, groupIdx) => (
                                        <div
                                          className="space-y-1"
                                          key={`${item.label}-${groupIdx}-${group.label ?? 'group'}`}
                                        >
                                      {(() => {
                                        if (!group.label) {
                                          return null;
                                        }

                                        if (group.link?.href) {
                                          return (
                                            <Link
                                              className="block font-medium text-slate-800 transition-colors hover:text-[#ED1C2E]"
                                              href={resolveHref(group.link)}
                                            >
                                              {group.label}
                                            </Link>
                                          );
                                        }

                                        return (
                                          <span className="block font-medium text-slate-800">
                                            {group.label}
                                          </span>
                                        );
                                      })()}
                                      {group.links.length ? (
                                        <ul className="space-y-1">
                                          {group.links.map((link, linkIdx) => (
                                            <li key={`${groupIdx}-${linkIdx}-${link.label}`}>
                                              <Link
                                                className="block text-slate-600 transition-colors hover:text-[#ED1C2E]"
                                                href={resolveHref(link.link)}
                                              >
                                                {link.label}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      ) : null}
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-lg border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
                          Add category links to populate this menu.
                        </div>
                      )
                    }
                  </Stream>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <nav className="flex flex-1 items-center justify-center gap-6 font-semibold uppercase tracking-wide">
            {resolvedPrimaryLinks.map((item, idx) => (
              <Link
                className="hover:text-[#ED1C2E]"
                href={resolveHref(item.link)}
                key={`${idx}-${item.label}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <nav className="flex items-center gap-6 font-semibold uppercase tracking-wide">
            {resolvedUtilityLinks.map((item, idx) => (
              <Link
                className="inline-flex items-center gap-2 hover:text-[#ED1C2E]"
                href={resolveHref(item.link)}
                key={`${idx}-${item.label}`}
              >
                {renderIcon(item.icon)}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
