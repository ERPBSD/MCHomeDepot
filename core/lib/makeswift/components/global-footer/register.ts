import {
  Checkbox,
  Group,
  Image,
  Link,
  List,
  Number,
  Select,
  TextInput,
} from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { MakeswiftGlobalFooter } from './client';

export const COMPONENT_TYPE = 'catalyst-global-footer';

const logo = Group({
  label: 'Logo',
  preferredLayout: Group.Layout.Popover,
  props: {
    show: Checkbox({ label: 'Show logo', defaultValue: true }),
    src: Image({ label: 'Logo' }),
    alt: TextInput({ label: 'Alt text', defaultValue: 'Logo' }),
    width: Number({ label: 'Max width', suffix: 'px', defaultValue: 400 }),
    height: Number({ label: 'Max height', suffix: 'px', defaultValue: 80 }),
    link: Link({ label: 'Logo link' }),
  },
});

const links = List({
  label: 'Links',
  type: Group({
    label: 'Link',
    props: {
      label: TextInput({ label: 'Text', defaultValue: 'Link' }),
      link: Link({ label: 'URL' }),
    },
  }),
  getItemLabel: (item) => item?.label ?? 'Link',
});

const sections = List({
  label: 'Sections',
  type: Group({
    label: 'Section',
    props: {
      title: TextInput({ label: 'Title', defaultValue: 'Section' }),
      links,
    },
  }),
  getItemLabel: (item) => item?.title ?? 'Section',
});

const socialLinks = List({
  label: 'Social links',
  type: Group({
    label: 'Social link',
    props: {
      icon: Select({
        label: 'Icon',
        options: [
          { value: 'facebook', label: 'Facebook' },
          { value: 'instagram', label: 'Instagram' },
          { value: 'pinterest', label: 'Pinterest' },
          { value: 'x', label: 'X' },
          { value: 'youtube', label: 'YouTube' },
        ],
        defaultValue: 'facebook',
      }),
      link: Link({ label: 'URL' }),
    },
  }),
  getItemLabel: (item) => item?.icon ?? 'Social link',
});

const paymentIcons = List({
  label: 'Payment icons',
  type: Group({
    label: 'Payment icon',
    props: {
      type: Select({
        label: 'Type',
        options: [
          { value: 'visa', label: 'Visa' },
          { value: 'mastercard', label: 'Mastercard' },
          { value: 'amex', label: 'American Express' },
          { value: 'paypal', label: 'PayPal' },
          { value: 'applepay', label: 'Apple Pay' },
          { value: 'amazon', label: 'Amazon Pay' },
        ],
        defaultValue: 'visa',
      }),
    },
  }),
  getItemLabel: (item) => item?.type ?? 'Payment icon',
});

runtime.registerComponent(MakeswiftGlobalFooter, {
  type: COMPONENT_TYPE,
  label: 'Global Footer',
  hidden: true,
  props: {
    logo,
    sections,
    contactTitle: TextInput({ label: 'Contact title', defaultValue: 'Contact Us' }),
    contactAddress: TextInput({ label: 'Contact address' }),
    contactPhone: TextInput({ label: 'Contact phone' }),
    socialLinks,
    paymentIcons,
    copyright: TextInput({ label: 'Copyright text' }),
  },
});
