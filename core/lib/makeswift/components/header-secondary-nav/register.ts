import { Color, Group, Link, List, Select, Style, TextInput } from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { MakeswiftHeaderSecondaryNav } from './client';

export const COMPONENT_TYPE = 'catalyst-header-secondary-nav';

const linkItem = Group({
  label: 'Link',
  props: {
    label: TextInput({ label: 'Text', defaultValue: 'Link' }),
    link: Link({ label: 'URL' }),
  },
});

const groupLinks = List({
  label: 'Links',
  type: linkItem,
  getItemLabel: (item) => item?.label ?? 'Link',
});

const groups = List({
  label: 'Groups',
  type: Group({
    label: 'Group',
    props: {
      label: TextInput({ label: 'Text', defaultValue: 'Group' }),
      link: Link({ label: 'URL' }),
      links: groupLinks,
    },
  }),
  getItemLabel: (item) => item?.label ?? 'Group',
});

runtime.registerComponent(MakeswiftHeaderSecondaryNav, {
  type: COMPONENT_TYPE,
  label: 'Header / Secondary Nav',
  props: {
    className: Style(),
    backgroundColor: Color({ label: 'Background color', defaultValue: '#004896' }),
    categoryButtonLabel: TextInput({
      label: 'Categories button label',
      defaultValue: 'All Categories',
    }),
    links: List({
      label: 'Category links',
      type: Group({
        label: 'Category',
        props: {
          label: TextInput({ label: 'Text', defaultValue: 'Category' }),
          link: Link({ label: 'URL' }),
          groups,
        },
      }),
      getItemLabel: (item) => item?.label ?? 'Category',
    }),
    primaryLinks: List({
      label: 'Center links',
      type: linkItem,
      getItemLabel: (item) => item?.label ?? 'Link',
    }),
    utilityLinks: List({
      label: 'Right links',
      type: Group({
        label: 'Link',
        props: {
          label: TextInput({ label: 'Text', defaultValue: 'Link' }),
          link: Link({ label: 'URL' }),
          icon: Select({
            label: 'Icon',
            options: [
              { value: 'none', label: 'None' },
              { value: 'flame', label: 'Flame' },
              { value: 'help', label: 'Help' },
            ],
            defaultValue: 'none',
          }),
        },
      }),
      getItemLabel: (item) => item?.label ?? 'Link',
    }),
  },
});
