import { MakeswiftComponent } from '@makeswift/runtime/next';

import { getComponentSnapshot } from '~/lib/makeswift/client';

import { COMPONENT_TYPE } from './register';

export const HeaderTopBar = async ({
  snapshotId = 'header-top-bar',
  label = 'Header / Top Bar',
}: {
  snapshotId?: string;
  label?: string;
}) => {
  const snapshot = await getComponentSnapshot(snapshotId);

  return <MakeswiftComponent label={label} snapshot={snapshot} type={COMPONENT_TYPE} />;
};
