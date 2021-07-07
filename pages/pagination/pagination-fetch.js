import React from 'react';
import { Layout } from 'components';
import { getSortedPostsData } from '/lib/posts';
import ListWithPagination from 'components/ListWithPagination/ListWithPagination';
import styles from 'styles/pagination-fetch.module.scss';

export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
};

const PaginationFetch = () => {
  return (
    <Layout>
      <div className={styles.title}>Test pagination - FETCH</div>
      <ListWithPagination url="http://localhost:3000/api/items" />
    </Layout>
  );
};

export default PaginationFetch;
