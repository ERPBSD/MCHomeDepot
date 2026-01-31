import { MakeswiftComponent } from '@makeswift/runtime/next';

import { getComponentSnapshot } from '~/lib/makeswift/client';

import { PropsContextProvider } from './client';
import { COMPONENT_TYPE } from './register';

interface Props {
  snapshotId?: string;
  label?: string;
  logo: string | { src: string; alt: string } | null;
  logoHref?: string;
  logoLabel?: string;
  logoWidth?: number;
  logoHeight?: number;
}

export const GlobalFooter = async ({
  snapshotId = 'global-footer',
  label = 'Global Footer',
  logo,
  logoHref = '/',
  logoLabel = 'Home',
  logoWidth = 200,
  logoHeight = 40,
}: Props) => {
  const snapshot = await getComponentSnapshot(snapshotId);

  return (
    <PropsContextProvider
      value={{
        logo,
        logoHref,
        logoLabel,
        logoWidth,
        logoHeight,
      }}
    >
      <MakeswiftComponent label={label} snapshot={snapshot} type={COMPONENT_TYPE} />
    </PropsContextProvider>
  );
};
