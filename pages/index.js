import React from 'react';
import Head from 'next/head';
import { Layout } from 'components';
import { siteTitle } from 'components/Layout';
import Link from 'next/link';

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p>Home Page</p>
        <Link href="/create-item">
          <a>Create item</a>
        </Link>
        <Link href="/pagination/pagination-fetch">
          <a>Pagination with fetch</a>
        </Link>
        <Link href="/pagination/pagination-seo-1">
          <a>Pagination SEO friendly (link changes)</a>
        </Link>
        <Link href="/pagination/pagination-seo-2">
          <a>Pagination SEO friendly (full list)</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
