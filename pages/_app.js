import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.scss';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
};

App.defaultProps = {
  Component: () => {},
  pageProps: {}
};

export default App;
