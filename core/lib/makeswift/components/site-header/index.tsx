import { MakeswiftComponent } from '@makeswift/runtime/next';
import { type ComponentPropsWithoutRef } from 'react';

import { HeaderSection } from '@/vibes/soul/sections/header-section';
import { getComponentSnapshot } from '~/lib/makeswift/client';

import { PropsContextProvider } from './client';
import { COMPONENT_TYPE } from './register';

interface Props {
  navigation: ComponentPropsWithoutRef<typeof HeaderSection>['navigation'];
  snapshotId?: string;
  label?: string;
}

export const SiteHeader = async ({
  snapshotId = 'site-header',
  label = 'Site Header',
  navigation,
}: Props) => {
  const snapshot = await getComponentSnapshot(snapshotId);
  const links = await navigation.links;

  return (
    <PropsContextProvider value={{ navigation: { ...navigation, links } }}>
      <MakeswiftComponent label={label} snapshot={snapshot} type={COMPONENT_TYPE} />
    </PropsContextProvider>
  );
};
