import {
  Checkbox,
  Color,
  Group,
  Image,
  Link,
  List,
  Number,
  Select,
  Style,
  TextInput,
} from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { MSHomepageHero } from './client';

runtime.registerComponent(MSHomepageHero, {
  type: 'section-homepage-hero',
  label: 'Homepage / Hero (Slider + Side Banners)',
  icon: 'carousel',
  props: {
    className: Style(),
    slides: List({
      label: 'Slides (max 5)',
      type: Group({
        label: 'Slide',
        props: {
          eyebrow: TextInput({ label: 'Eyebrow', defaultValue: 'LIMITED-TIME OFFER' }),
          heading: TextInput({ label: 'Heading', defaultValue: 'Upgrade your workspace' }),
          subheading: TextInput({
            label: 'Subheading',
            defaultValue: 'Premium gear curated for performance and comfort.',
          }),
          buttonLabel: TextInput({ label: 'Button label', defaultValue: 'Shop now' }),
          buttonLink: Link({ label: 'Button link' }),
          buttonVariant: Select({
            label: 'Button style',
            options: [
              { value: 'primary', label: 'Primary' },
              { value: 'secondary', label: 'Secondary' },
            ],
            defaultValue: 'primary',
          }),
          backgroundImage: Image({ label: 'Background image' }),
          backgroundImageAlt: TextInput({ label: 'Background image alt', defaultValue: '' }),
          backgroundColor: Color({ label: 'Background color', defaultValue: '#0f2d4a' }),
          foregroundImage: Image({ label: 'Foreground image' }),
          foregroundImageAlt: TextInput({ label: 'Foreground image alt', defaultValue: '' }),
          textAlignment: Select({
            label: 'Text alignment',
            options: [
              { value: 'left', label: 'Left' },
              { value: 'center', label: 'Center' },
              { value: 'right', label: 'Right' },
            ],
            defaultValue: 'left',
          }),
          contentPosition: Select({
            label: 'Content position',
            options: [
              { value: 'left', label: 'Left' },
              { value: 'center', label: 'Center' },
            ],
            defaultValue: 'left',
          }),
          textColor: Color({ label: 'Text color', defaultValue: '#ffffff' }),
          overlayEnabled: Checkbox({ label: 'Overlay enabled', defaultValue: true }),
          overlayColor: Color({ label: 'Overlay color', defaultValue: '#000000' }),
          overlayOpacity: Number({ label: 'Overlay opacity', defaultValue: 40, suffix: '%' }),
        },
      }),
      getItemLabel(slide) {
        return slide?.heading || 'Slide';
      },
    }),
    autoplay: Checkbox({ label: 'Autoplay', defaultValue: false }),
    interval: Number({ label: 'Autoplay interval', defaultValue: 6, suffix: 's' }),
    showArrows: Checkbox({ label: 'Show arrows', defaultValue: true }),
    showDots: Checkbox({ label: 'Show dots', defaultValue: true }),
    heightPreset: Select({
      label: 'Height preset',
      options: [
        { value: 'compact', label: 'Compact' },
        { value: 'standard', label: 'Standard' },
        { value: 'tall', label: 'Tall' },
      ],
      defaultValue: 'standard',
    }),
    sideBanners: List({
      label: 'Side banners (max 2)',
      type: Group({
        label: 'Banner',
        props: {
          image: Image({ label: 'Banner image' }),
          imageAlt: TextInput({ label: 'Banner image alt', defaultValue: '' }),
          title: TextInput({ label: 'Title', defaultValue: 'Featured collection' }),
          subtitle: TextInput({ label: 'Subtitle', defaultValue: 'Up to 40% off' }),
          link: Link({ label: 'Link' }),
          overlayEnabled: Checkbox({ label: 'Overlay enabled', defaultValue: true }),
          overlayColor: Color({ label: 'Overlay color', defaultValue: '#000000' }),
          overlayOpacity: Number({ label: 'Overlay opacity', defaultValue: 35, suffix: '%' }),
          textColor: Select({
            label: 'Text color',
            options: [
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
            ],
            defaultValue: 'light',
          }),
        },
      }),
      getItemLabel(banner) {
        return banner?.title || 'Banner';
      },
    }),
  },
});
