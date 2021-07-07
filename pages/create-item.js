import React, { useState, useEffect } from 'react';
import { Layout } from 'components';
import styles from 'styles/create-item.module.scss';

const CreateItem = () => {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    try {
      if (!name) {
        return null;
      }

      const response = await fetch('http://localhost:3000/api/items', {
        method: 'POST',
        body: JSON.stringify({ name: name })
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Create new item</h1>
        <input
          className={styles.input}
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <button className={styles.button} onClick={handleSubmit}>
          SUBMIT
        </button>
      </div>
    </Layout>
  );
};

export default CreateItem;
