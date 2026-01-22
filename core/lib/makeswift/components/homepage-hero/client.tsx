'use client';

import { clsx } from 'clsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ButtonLink } from '@/vibes/soul/primitives/button-link';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/vibes/soul/primitives/carousel';
import { Image } from '~/components/image';
import { Link } from '~/components/link';

type LinkValue = { href?: string; target?: string } | null | undefined;

type TextAlignment = 'left' | 'center' | 'right';
type ContentPosition = 'left' | 'center';
type HeightPreset = 'compact' | 'standard' | 'tall';

interface Slide {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  buttonLabel?: string;
  buttonLink?: LinkValue;
  buttonVariant?: 'primary' | 'secondary';
  backgroundImage?: string;
  backgroundImageAlt?: string;
  backgroundColor?: string;
  foregroundImage?: string;
  foregroundImageAlt?: string;
  textAlignment?: TextAlignment;
  contentPosition?: ContentPosition;
  textColor?: string;
  overlayEnabled?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

interface SideBanner {
  image?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  link?: LinkValue;
  overlayEnabled?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  textColor?: 'light' | 'dark';
}

interface MSHomepageHeroProps {
  className?: string;
  slides?: Slide[];
  autoplay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  heightPreset?: HeightPreset;
  sideBanners?: SideBanner[];
}

const SLIDE_LIMIT = 5;
const DEFAULT_HEADING = 'Upgrade your workspace';
const DEFAULT_SUBHEADING = 'Premium gear curated for performance and comfort.';
const DEFAULT_EYEBROW = 'LIMITED-TIME OFFER';
const DEFAULT_HERO_BG_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0f4c81" offset="0"/><stop stop-color="#1e7aa8" offset="1"/></linearGradient></defs><rect width="1600" height="900" fill="url(#g)"/><circle cx="1260" cy="220" r="260" fill="rgba(255,255,255,0.16)"/><circle cx="280" cy="700" r="320" fill="rgba(255,255,255,0.1)"/></svg>';
const DEFAULT_HERO_BG_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(DEFAULT_HERO_BG_SVG)}`;
const DEFAULT_HERO_FG_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffffff" offset="0"/><stop stop-color="#dbe7f3" offset="1"/></linearGradient></defs><rect x="120" y="80" width="560" height="360" rx="32" fill="url(#g)"/><rect x="210" y="120" width="380" height="220" rx="20" fill="#0f4c81"/><rect x="300" y="460" width="200" height="24" rx="12" fill="#1e7aa8"/></svg>';
const DEFAULT_HERO_FG_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(DEFAULT_HERO_FG_SVG)}`;
const DEFAULT_BANNER_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f47c36" offset="0"/><stop stop-color="#f8b54a" offset="1"/></linearGradient></defs><rect width="900" height="600" fill="url(#g)"/><circle cx="700" cy="200" r="170" fill="rgba(255,255,255,0.2)"/></svg>';
const DEFAULT_BANNER_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(DEFAULT_BANNER_SVG)}`;

const DEFAULT_SLIDES: Slide[] = [
  {
    eyebrow: DEFAULT_EYEBROW,
    heading: DEFAULT_HEADING,
    subheading: DEFAULT_SUBHEADING,
    buttonLabel: 'Shop now',
    buttonVariant: 'primary',
    backgroundImage: DEFAULT_HERO_BG_IMAGE,
    foregroundImage: DEFAULT_HERO_FG_IMAGE,
    textAlignment: 'left',
    contentPosition: 'left',
    textColor: '#ffffff',
    overlayEnabled: true,
    overlayColor: '#000000',
    overlayOpacity: 40,
  },
  {
    eyebrow: 'NEW ARRIVALS',
    heading: 'Smart essentials for every room',
    subheading: 'Refresh your home with the latest connected gear.',
    buttonLabel: 'Explore deals',
    buttonVariant: 'secondary',
    backgroundImage: DEFAULT_HERO_BG_IMAGE,
    foregroundImage: DEFAULT_HERO_FG_IMAGE,
    textAlignment: 'left',
    contentPosition: 'left',
    textColor: '#ffffff',
    overlayEnabled: true,
    overlayColor: '#000000',
    overlayOpacity: 45,
  },
];

const DEFAULT_BANNERS: SideBanner[] = [
  {
    image: DEFAULT_BANNER_IMAGE,
    title: 'Wireless accessories',
    subtitle: 'Bundle & save on best sellers',
    overlayEnabled: true,
    overlayColor: '#000000',
    overlayOpacity: 35,
    textColor: 'light',
  },
  {
    image: DEFAULT_BANNER_IMAGE,
    title: 'Home office refresh',
    subtitle: 'Desks, chairs, and more',
    overlayEnabled: true,
    overlayColor: '#000000',
    overlayOpacity: 35,
    textColor: 'light',
  },
];

const heightBaseClasses: Record<HeightPreset, string> = {
  compact: 'h-[280px] sm:h-[320px] md:h-[360px] lg:h-[420px]',
  standard: 'h-[320px] sm:h-[360px] md:h-[440px] lg:h-[520px]',
  tall: 'h-[380px] sm:h-[420px] md:h-[520px] lg:h-[620px]',
};

const heightDesktopClasses: Record<HeightPreset, string> = {
  compact: 'xl:h-[460px] 2xl:h-[520px]',
  standard: 'xl:h-[560px] 2xl:h-[620px]',
  tall: 'xl:h-[680px] 2xl:h-[740px]',
};

const gridMinHeightClasses: Record<HeightPreset, string> = {
  compact: 'xl:min-h-[460px] 2xl:min-h-[520px]',
  standard: 'xl:min-h-[560px] 2xl:min-h-[620px]',
  tall: 'xl:min-h-[680px] 2xl:min-h-[740px]',
};

const textAlignClasses: Record<TextAlignment, string> = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

const contentPositionClasses: Record<ContentPosition, string> = {
  left: 'justify-start',
  center: 'justify-center',
};

const bannerTextColorClasses: Record<'light' | 'dark', string> = {
  light: 'text-white',
  dark: 'text-slate-900',
};

const sliderBackgroundFallback = '#0f2d4a';

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

export function MSHomepageHero({
  className,
  slides = [],
  autoplay = false,
  interval = 6,
  showArrows = true,
  showDots = true,
  heightPreset = 'standard',
  sideBanners = [],
}: MSHomepageHeroProps) {
  const resolvedSlides = (slides.length ? slides : DEFAULT_SLIDES).slice(0, SLIDE_LIMIT);
  const resolvedBanners = (sideBanners.length ? sideBanners : DEFAULT_BANNERS).slice(0, 2);

  const hasSideBanners = resolvedBanners.length > 0;
  const gridClassName = clsx(
    'grid grid-cols-1 items-stretch gap-4',
    hasSideBanners && 'xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]',
    hasSideBanners && heightDesktopClasses[heightPreset],
    hasSideBanners && gridMinHeightClasses[heightPreset],
  );

  return (
    <section className={clsx('w-full @container', className)}>
      <div className={gridClassName}>
        <HeroSlider
          autoplay={autoplay}
          fillHeightOnDesktop={hasSideBanners}
          heightPreset={heightPreset}
          interval={interval}
          showArrows={showArrows}
          showDots={showDots}
          slides={resolvedSlides}
        />

        {resolvedBanners.length > 0 ? (
          <div className="grid h-full grid-cols-2 gap-4 xl:auto-rows-fr xl:grid-cols-1 xl:grid-rows-2">
            {resolvedBanners.map((banner, index) => (
              <SideBannerCard
                banner={banner}
                className={clsx(
                  resolvedBanners.length === 1 ? 'col-span-2 lg:row-span-2' : 'col-span-1',
                  'min-h-[140px] sm:min-h-[160px] md:min-h-[200px] lg:min-h-[240px] xl:min-h-0',
                )}
                key={index}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function HeroSlider({
  slides,
  autoplay,
  interval,
  showArrows,
  showDots,
  heightPreset,
  fillHeightOnDesktop,
}: {
  slides: Slide[];
  autoplay: boolean;
  interval: number;
  showArrows: boolean;
  showDots: boolean;
  heightPreset: HeightPreset;
  fillHeightOnDesktop: boolean;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const slideCount = slides.length;
  const resolvedSlides = slideCount > 0 ? slides : [{ heading: DEFAULT_HEADING }];

  const opts = useMemo(
    () => ({
      loop: resolvedSlides.length > 1,
      duration: prefersReducedMotion ? 0 : 20,
      align: 'start' as const,
    }),
    [prefersReducedMotion, resolvedSlides.length],
  );

  const handleSelect = useCallback((carouselApi?: CarouselApi) => {
    if (!carouselApi) return;

    setSelectedIndex(carouselApi.selectedScrollSnap());
    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) return;

    const onReInit = () => {
      setScrollSnaps(api.scrollSnapList());
      handleSelect(api);
    };
    const onSelect = () => handleSelect(api);

    setScrollSnaps(api.scrollSnapList());
    handleSelect(api);

    api.on('reInit', onReInit);
    api.on('select', onSelect);

    return () => {
      api.off('reInit', onReInit);
      api.off('select', onSelect);
    };
  }, [api, handleSelect]);

  useEffect(() => {
    if (!api || !autoplay || prefersReducedMotion || resolvedSlides.length < 2) return;

    const intervalMs = Math.max(1, interval) * 1000;
    const autoplayInterval = window.setInterval(() => {
      api.scrollNext();
    }, intervalMs);

    return () => window.clearInterval(autoplayInterval);
  }, [api, autoplay, interval, prefersReducedMotion, resolvedSlides.length]);

  const sliderHeightClass = clsx(
    heightBaseClasses[heightPreset],
    fillHeightOnDesktop ? 'xl:h-full 2xl:h-full' : heightDesktopClasses[heightPreset],
  );

  return (
    <div className={clsx('group relative w-full overflow-hidden', sliderHeightClass)}>
      <Carousel
        aria-label="Homepage hero slider"
        className={clsx('h-full', sliderHeightClass)}
        opts={opts}
        setApi={setApi}
        tabIndex={0}
      >
        <div className="h-full [&>div]:h-full">
          <CarouselContent className="!ml-0 h-full gap-0 @2xl:!ml-0">
            {resolvedSlides.map((slide, index) => (
              <CarouselItem className="h-full basis-full !pl-0 @2xl:!pl-0" key={index}>
                <SlideCard index={index} slide={slide} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

        {showArrows && resolvedSlides.length > 1 ? (
          <div className="pointer-events-none absolute inset-x-5 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100 lg:inset-x-6">
            <button
              aria-label="Previous slide"
              className="pointer-events-auto grid h-10 w-10 place-content-center rounded-full border border-white/60 bg-black/40 text-white backdrop-blur transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              disabled={!canScrollPrev}
              onClick={() => api?.scrollPrev()}
              type="button"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next slide"
              className="pointer-events-auto grid h-10 w-10 place-content-center rounded-full border border-white/60 bg-black/40 text-white backdrop-blur transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              disabled={!canScrollNext}
              onClick={() => api?.scrollNext()}
              type="button"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        ) : null}

        {showDots && resolvedSlides.length > 1 ? (
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                aria-label={`Go to slide ${index + 1}`}
                className={clsx(
                  'h-2.5 w-2.5 rounded-full border border-white/80 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                  index === selectedIndex ? 'bg-white' : 'bg-white/30',
                )}
                key={index}
                onClick={() => api?.scrollTo(index)}
                type="button"
              />
            ))}
          </div>
        ) : null}
      </Carousel>
    </div>
  );
}

function SlideCard({ slide, index }: { slide: Slide; index: number }) {
  const {
    eyebrow,
    heading,
    subheading,
    buttonLabel,
    buttonLink,
    buttonVariant = 'primary',
    backgroundImage,
    backgroundImageAlt,
    backgroundColor,
    foregroundImage,
    foregroundImageAlt,
    textAlignment = 'left',
    contentPosition = 'left',
    textColor = '#ffffff',
    overlayEnabled = true,
    overlayColor = '#000000',
    overlayOpacity = 40,
  } = slide;

  const resolvedHeading = (heading || '').trim() || DEFAULT_HEADING;
  const resolvedSubheading = (subheading || '').trim() || DEFAULT_SUBHEADING;
  const resolvedEyebrow = (eyebrow || '').trim() || DEFAULT_EYEBROW;
  const buttonHref = buttonLink?.href;
  const hasButton = !!buttonLabel && !!buttonHref;
  const resolvedOverlayOpacity = Math.min(100, Math.max(0, overlayOpacity));

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundColor: backgroundColor || sliderBackgroundFallback }}
    >
      {backgroundImage ? (
        <Image
          alt={backgroundImageAlt || ''}
          className="object-cover"
          fill
          priority={index === 0}
          sizes="(min-width: 1024px) 66vw, 100vw"
          src={backgroundImage}
        />
      ) : null}

      {overlayEnabled ? (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor, opacity: resolvedOverlayOpacity / 100 }}
        />
      ) : null}

      <div
        className={clsx(
          'relative z-10 grid h-full w-full grid-cols-1 gap-6 px-5 py-6 md:px-8 md:py-8 lg:grid-cols-12 lg:px-10',
        )}
        style={{ color: textColor }}
      >
        <div
          className={clsx(
            'flex flex-col justify-center gap-4 lg:gap-6',
            textAlignClasses[textAlignment],
            contentPositionClasses[contentPosition],
            contentPosition === 'center' ? 'lg:col-span-12' : 'lg:col-span-7',
          )}
        >
          <div className="space-y-3">
            {resolvedEyebrow ? (
              <span className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
                {resolvedEyebrow}
              </span>
            ) : null}
            <h2 className="text-balance text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
              {resolvedHeading}
            </h2>
            {resolvedSubheading ? (
              <p className="max-w-2xl text-base opacity-80 md:text-lg">{resolvedSubheading}</p>
            ) : null}
          </div>

          {hasButton ? (
            <ButtonLink href={buttonHref} variant={buttonVariant}>
              {buttonLabel}
            </ButtonLink>
          ) : null}
        </div>

        {foregroundImage ? (
          <div className="relative order-last h-44 w-full md:h-64 lg:order-none lg:col-span-5 lg:h-full">
            <Image
              alt={foregroundImageAlt || ''}
              className="object-contain"
              fill
              sizes="(min-width: 1024px) 30vw, 60vw"
              src={foregroundImage}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SideBannerCard({ banner, className }: { banner: SideBanner; className?: string }) {
  const {
    image,
    imageAlt,
    title,
    subtitle,
    link,
    overlayEnabled = true,
    overlayColor = '#000000',
    overlayOpacity = 35,
    textColor = 'light',
  } = banner;
  const resolvedOverlayOpacity = Math.min(100, Math.max(0, overlayOpacity));

  const content = (
    <div
      className={clsx('relative h-full w-full overflow-hidden', bannerTextColorClasses[textColor])}
    >
      {image ? (
        <Image
          alt={imageAlt || ''}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 30vw, 50vw"
          src={image}
        />
      ) : (
        <div className="absolute inset-0 bg-slate-200" />
      )}

      {overlayEnabled ? (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor, opacity: resolvedOverlayOpacity / 100 }}
        />
      ) : null}

      <div className="relative z-10 flex h-full flex-col justify-end gap-1 px-5 py-4">
        {title ? <h3 className="text-lg font-semibold leading-tight">{title}</h3> : null}
        {subtitle ? <p className="text-sm opacity-80">{subtitle}</p> : null}
      </div>
    </div>
  );

  if (link?.href) {
    return (
      <Link
        className={clsx(
          'block h-full transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2',
          className,
        )}
        href={link.href}
        target={link.target}
      >
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
