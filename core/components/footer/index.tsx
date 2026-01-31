import { cache } from 'react';

import { LayoutQuery } from '~/app/[locale]/(default)/page-data';
import { client } from '~/client';
import { readFragment } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { logoTransformer } from '~/data-transformers/logo-transformer';
import { GlobalFooter } from '~/lib/makeswift/components/global-footer';

import { FooterFragment } from './fragment';

const getFooterData = cache(async () => {
  const { data: response } = await client.fetch({
    document: LayoutQuery,
    fetchOptions: { next: { revalidate } },
  });

  return readFragment(FooterFragment, response).site;
});

export const Footer = async () => {
  const data = await getFooterData();
  const logo = data.settings ? logoTransformer(data.settings) : null;

  return <GlobalFooter logo={logo} logoHref="/" logoLabel="Home" />;
};
