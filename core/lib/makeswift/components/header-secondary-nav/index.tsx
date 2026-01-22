import { MakeswiftComponent } from '@makeswift/runtime/next';
import { type ComponentPropsWithoutRef } from 'react';

import { getComponentSnapshot } from '~/lib/makeswift/client';

import { MakeswiftHeaderSecondaryNav, PropsContextProvider } from './client';
import { COMPONENT_TYPE } from './register';

type Props = ComponentPropsWithoutRef<typeof MakeswiftHeaderSecondaryNav> & {
  snapshotId?: string;
  label?: string;
};

export const HeaderSecondaryNav = async ({
  snapshotId = 'header-secondary-nav',
  label = 'Header / Secondary Nav',
  ...props
}: Props) => {
  const snapshot = await getComponentSnapshot(snapshotId);

  return (
    <PropsContextProvider value={{ links: props.links }}>
      <MakeswiftComponent label={label} snapshot={snapshot} type={COMPONENT_TYPE} />
    </PropsContextProvider>
  );
};
