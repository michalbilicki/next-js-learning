import React from 'react';
import PropTypes from 'prop-types';
import '../styles/global.css';

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

App.propTypes = {
  Component: PropTypes.object,
  pageProps: PropTypes.object
};

App.defaultProps = {
  Component: {},
  pageProps: {}
};

export default App;
