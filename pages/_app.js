import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import '/styles/global.scss';
import { Provider } from 'next-auth/client';

const App = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Provider>
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
