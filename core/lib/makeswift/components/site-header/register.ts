import { Color, Group, Image, Link, Number, TextInput } from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { MakeswiftHeader } from './client';

export const COMPONENT_TYPE = 'catalyst-makeswift-header';

const logoGroup = (
  label: string,
  defaults: {
    width: number;
    height: number;
  },
) =>
  Group({
    label,
    props: {
      src: Image({ label: 'Logo' }),
      alt: TextInput({ label: 'Alt text', defaultValue: 'Logo alt' }),
      width: Number({ label: 'Max width', suffix: 'px', defaultValue: defaults.width }),
      height: Number({ label: 'Max height', suffix: 'px', defaultValue: defaults.height }),
    },
  });

const logo = Group({
  label: 'Logo',
  preferredLayout: Group.Layout.Popover,
  props: {
    desktop: logoGroup('Desktop', { width: 200, height: 40 }),
    mobile: logoGroup('Mobile', { width: 100, height: 40 }),
    link: Link({ label: 'Logo link' }),
  },
});

runtime.registerComponent(MakeswiftHeader, {
  type: COMPONENT_TYPE,
  label: 'Site Header',
  hidden: true,
  props: {
    backgroundColor: Color({ label: 'Background color', defaultValue: '#004896' }),
    searchButtonHoverColor: Color({
      label: 'Search button hover color',
      defaultValue: '#ED1C2E',
    }),
    logo,
  },
});
