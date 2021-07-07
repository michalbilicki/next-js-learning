import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ListWithPagination.module.scss';

const ListWithPagination = ({ url }) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < pageCount) {
      setPage(page + 1);
    }
  };

  useEffect(async () => {
    const response = await fetch(`${url}?page=${page}&perPage=6`).then((res) => res.json());
    setItems(response.items);
    setPageCount(response.pageCount);
  }, [page]);

  if (items.length === 0 || pageCount === 0) return <div>loading...</div>;

  return (
    <div>
      <div className={styles.list}>
        {items.map((item, index) => (
          <div className={styles.listItem} key={`list-${index}`}>
            {item.name}
          </div>
        ))}
      </div>
      <div className={styles.buttonsWrapper}>
        <div className={'pagination'}>
          <button className={styles.button} onClick={handlePrev} disabled={page === 1}>
            PREV
          </button>
          <button className={styles.button} onClick={handleNext} disabled={page === pageCount}>
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

ListWithPagination.propTypes = {
  url: PropTypes.string
};

ListWithPagination.defaultProps = {
  url: 'http://localhost:3000/api/items'
};

export default ListWithPagination;
