import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styles from './Layout.module.scss';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

export const siteTitle = 'Next.js Sample Website';

const Layout = ({ children, home }) => {
  const [session] = useSession();

  if (!session) {
    return (
      <button className={styles.largeButton} onClick={() => signIn('github')}>
        GitHub Connect
      </button>
    );
  }

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to build a personal website using Next.js" />
      </Head>
      <div>
        <nav className={styles.header}>
          <div>{session.user.name}</div>
          {session.user.image && (
            <div>
              <img
                src={session.user.image}
                alt={session.user.name}
                style={{ width: '50px', borderRadius: '50%' }}
              />
            </div>
          )}
          <div>
            {session ? (
              <button className={styles.button} onClick={signOut}>
                Log Out
              </button>
            ) : (
              <button className={styles.button} onClick={signIn}>
                Log In
              </button>
            )}
          </div>
        </nav>
      </div>
      <div className={styles.container}>
        <main>
          {children}
          {!home && (
            <div className={styles.backToHome}>
              <Link href="/">
                <a>← Back to home</a>
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  home: PropTypes.bool
};

Layout.defaultProps = {
  children: undefined,
  home: false
};

export default Layout;
