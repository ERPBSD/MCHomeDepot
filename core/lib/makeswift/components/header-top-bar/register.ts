import { Color, Link, Style, TextInput } from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { MakeswiftHeaderTopBar } from './client';

export const COMPONENT_TYPE = 'catalyst-header-top-bar';

runtime.registerComponent(MakeswiftHeaderTopBar, {
  type: COMPONENT_TYPE,
  label: 'Header / Top Bar',
  props: {
    className: Style(),
    messageText: TextInput({
      label: 'Message text',
      defaultValue: 'Get a free 30 day money back guarantee',
    }),
    wishlistLabel: TextInput({ label: 'Wishlist label', defaultValue: 'My Wishlist' }),
    wishlistLink: Link({ label: 'Wishlist link' }),
    loginLabel: TextInput({ label: 'Login label', defaultValue: 'Login' }),
    loginLink: Link({ label: 'Login link' }),
    backgroundColor: Color({ label: 'Background color', defaultValue: '#043D70' }),
    hoverColor: Color({ label: 'Link hover color', defaultValue: '#ED1C2E' }),
  },
});
