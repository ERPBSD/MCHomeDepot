'use client';

import {
  type ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  type PropsWithChildren,
  type Ref,
  useContext,
} from 'react';

import { HeaderSection } from '@/vibes/soul/sections/header-section';

type HeaderSectionProps = ComponentPropsWithoutRef<typeof HeaderSection>;

type NavigationProps = HeaderSectionProps['navigation'];

interface ContextProps {
  navigation: Omit<NavigationProps, 'links'> & {
    links: Awaited<NavigationProps['links']>;
  };
}

const PropsContext = createContext<ContextProps>({
  navigation: {
    giftCertificatesHref: '',
    accountHref: '',
    cartHref: '',
    searchHref: '',
    links: [],
  },
});

export const PropsContextProvider = ({
  value,
  children,
}: PropsWithChildren<{ value: ContextProps }>) => (
  <PropsContext.Provider value={value}>{children}</PropsContext.Provider>
);

interface ImageProps {
  src?: string;
  alt: string;
  width: number;
  height: number;
}

interface Props {
  backgroundColor?: string;
  searchVariant?: 'icon' | 'inline';
  searchButtonHoverColor?: string;
  logo: {
    desktop: ImageProps;
    mobile: ImageProps;
    link?: { href: string };
  };
}

export const MakeswiftHeader = forwardRef(
  (
    { logo, backgroundColor, searchVariant, searchButtonHoverColor }: Props,
    ref: Ref<HTMLDivElement>,
  ) => {
    const { navigation: passedProps } = useContext(PropsContext);
    const resolvedSearchVariant = searchVariant ?? passedProps.searchVariant;
    const resolvedSearchButtonHoverColor =
      searchButtonHoverColor ?? passedProps.searchButtonHoverColor;

    return (
      <HeaderSection
        navigation={{
          ...passedProps,
          backgroundColor,
          searchVariant: resolvedSearchVariant,
          searchButtonHoverColor: resolvedSearchButtonHoverColor,
          logo: logo.desktop.src
            ? { src: logo.desktop.src, alt: logo.desktop.alt }
            : passedProps.logo,
          logoWidth: logo.desktop.width,
          logoHeight: logo.desktop.height,
          mobileLogo: logo.mobile.src
            ? { src: logo.mobile.src, alt: logo.mobile.alt }
            : passedProps.mobileLogo,
          mobileLogoWidth: logo.mobile.width,
          mobileLogoHeight: logo.mobile.height,
          logoHref: logo.link?.href ?? passedProps.logoHref,
        }}
        ref={ref}
      />
    );
  },
);
