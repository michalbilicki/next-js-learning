import React, { useState, useEffect } from 'react';
import { Layout } from 'components';
import styles from 'styles/pagination-seo-2.module.scss';

const PER_PAGE = 6;

const PaginationSEO2 = ({ items = [] }) => {
  const [page, setPage] = useState(1);
  const isInteger = Number.isInteger(items.length / PER_PAGE);
  const MAX_PAGE = isInteger ? items.length / PER_PAGE : Math.floor(items.length / PER_PAGE) + 1;
  const [currentItems, setCurrentItems] = useState([]);

  const getPage = () => {};

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < MAX_PAGE) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    setCurrentItems(items.slice((page - 1) * PER_PAGE, (page - 1) * PER_PAGE + PER_PAGE));
  }, [page]);

  return (
    <Layout>
      <div>
        <h1>Test pagination - SEO friendly</h1>

        <div className={styles.list}>
          {currentItems.length === 0 ? (
            <div>loading...</div>
          ) : (
            currentItems.map((item, index) => (
              <div className={styles.listItem} key={`list-${index}`}>
                {item.name}
              </div>
            ))
          )}
        </div>

        <div className={styles.buttonsWrapper}>
          <div className="pagination">
            <button className={styles.button} onClick={handlePrev} disabled={page === 1}>
              PREV
            </button>
            <button className={styles.button} onClick={handleNext} disabled={page === MAX_PAGE}>
              NEXT
            </button>
          </div>
        </div>

        <div style={{ display: 'none' }}>
          {items.map((item, index) => {
            return <div key={`list-not-displayed-${index}`}>{item.name}</div>;
          })}
        </div>
      </div>
    </Layout>
  );
};

PaginationSEO2.getInitialProps = async () => {
  try {
    const request = await fetch(`http://localhost:3000/api/items`).then((res) => res.json());

    if (request.error) {
      console.error(err);
      return {
        items: []
      };
    }

    return {
      items: request.items
    };
  } catch (err) {
    console.error(err);
    return {
      items: []
    };
  }
};

export default PaginationSEO2;
