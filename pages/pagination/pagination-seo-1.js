import React, { useState, useEffect } from 'react';
import { Layout } from 'components';
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router';
import styles from 'styles/pagination-seo-1.module.scss';

const renderContent = (isLoading, items) => {
  if (isLoading) {
    return <div className={styles.list}>Loading...</div>;
  } else {
    return (
      <div className={styles.list}>
        {items.map((item, index) => {
          return (
            <div className={styles.listItem} key={`list-${index}`}>
              {item.name}
            </div>
          );
        })}
      </div>
    );
  }
};

const PaginationSEO1 = (props) => {
  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
    };
  }, []);

  const paginationHandler = (page) => {
    const currentPath = props.router.pathname;
    const currentQuery = props.router.query;
    currentQuery.page = page.selected + 1;

    props.router.push({
      pathname: currentPath,
      query: currentQuery
    });
  };

  return (
    <Layout>
      <div>
        <h1>Test pagination - SEO friendly</h1>
        {renderContent(isLoading, props.items || [])}

        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          initialPage={props.currentPage - 1}
          pageCount={props.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={paginationHandler}
          pageClassName={styles.breakMe}
          activeClassName={styles.active}
          previousClassName={styles.previous}
          nextClassName={styles.next}
          disabledClassName={styles.disabled}
          containerClassName={styles.pagination}
        />
      </div>
    </Layout>
  );
};

PaginationSEO1.getInitialProps = async ({ query }) => {
  try {
    const page = query.page || 1;
    const request = await fetch(`http://localhost:3000/api/items?page=${page}&perPage=6`).then(
      (res) => res.json()
    );

    if (request.error) {
      console.error(request.error);
      return {
        pageCount: 0,
        currentPage: 1,
        items: []
      };
    }

    return {
      pageCount: request.pageCount,
      currentPage: request.currentPage,
      items: request.items
    };
  } catch (err) {
    console.error(err);
    return {
      pageCount: 0,
      currentPage: 1,
      items: []
    };
  }
};

export default withRouter(PaginationSEO1);
