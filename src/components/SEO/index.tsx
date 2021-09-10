import React from 'react';
import Head from 'next/head';

interface Props {
  headTitle: string;
}

const SEO = ({ headTitle }: Props) => {
  const hasTitle = Boolean(headTitle);
  const baseTitle = 'OG Image Generator';
  const title = hasTitle ? (`${headTitle} | ${baseTitle}`) : baseTitle;
  const image = 'https://og-image-generator-pi.vercel.app/api/image-generator/?title=OG Image Generator&tfs=&tc=ffffff&p=&pfs=&pc=ffffff&bg=https://image.freepik.com/free-photo/3d-abstract-wave-pattern-background_53876-104422.jpg&bgc=44475a';
  const urlBase = 'https://og-image-generator-pi.vercel.app';
  const description = 'A simple Open Graph image generator for your meta tags.';

  return (
    <Head>
      <title>{title}</title>
      {/* <!-- Primary Meta Tags --> */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={urlBase} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={urlBase} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};

export default SEO;
