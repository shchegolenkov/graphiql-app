import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../firebase';

import TranslateIcon from '../../assets/svg/translateIcon.svg?react';
import WelcomeIcon from '../../assets/svg/welcomeIcon.svg?react';
import SignUpIcon from '../../assets/svg/signUpIcon.svg?react';
import SignInIcon from '../../assets/svg/signInIcon.svg?react';
import LogoutIcon from '../../assets/svg/logout.svg?react';
import GraphQLIcon from '../../assets/svg/graphql_svg.svg?react';
import styles from './Header.module.scss';
import { RouteLinks } from '../../utils/types';

export const Header = () => {
  const { isAuth, email } = useAuth();
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navBlock}>
          <button className={styles.iconBlock}>
            <TranslateIcon className={styles.icon} />
            <p>Translate</p>
          </button>
          <Link to="/" className={styles.iconBlock}>
            <WelcomeIcon className={styles.icon} />
            <p>Welcome</p>
          </Link>
          {isAuth && (
            <Link to={RouteLinks.Main} className={styles.iconBlock}>
              <GraphQLIcon className={styles.icon} />
              <p>Main page</p>
            </Link>
          )}
        </div>
        <div className={styles.navBlock}>
          {!isAuth && (
            <Link to={RouteLinks.SignUp} className={styles.iconBlock}>
              <SignUpIcon className={styles.authIcon} />
              <p>Sign Up</p>
            </Link>
          )}
          {isAuth ? (
            <Tooltip title={`Logout from ${email}`}>
              <button className={styles.iconBlock} onClick={logout}>
                <LogoutIcon className={styles.authIcon} />
                <p>Logout</p>
              </button>
            </Tooltip>
          ) : (
            <Link to="/signin" className={styles.iconBlock}>
              <SignInIcon className={styles.authIcon} />
              <p>Sign In</p>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
