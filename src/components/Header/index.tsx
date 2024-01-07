import { useEffect, useState, useContext } from 'react';

import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import clsx from 'clsx';

import { useAppDispatch } from '../../hooks/redux-hook';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { logout } from '../../firebase';
import { closeModal } from '../../store/modal/modal.slice';
import { LangContext } from '../../context/langContext';
import { RouteLinks } from '../../utils/types';

import TranslateIcon from '../../assets/svg/translateIcon.svg?react';
import WelcomeIcon from '../../assets/svg/welcomeIcon.svg?react';
import SignUpIcon from '../../assets/svg/signUpIcon.svg?react';
import SignInIcon from '../../assets/svg/signInIcon.svg?react';
import LogoutIcon from '../../assets/svg/logout.svg?react';
import GraphQLIcon from '../../assets/svg/graphql_svg.svg?react';

import styles from './Header.module.scss';

export const Header = () => {
  const lang = useLanguage();
  const { switchLanguage } = useContext(LangContext);

  const dispatch = useAppDispatch();
  const { isAuth, email } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  const handleLogout = async () => {
    await logout();
    dispatch(closeModal());
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={clsx(styles.header, {
        [styles.headerScrolled]: isScrolled,
      })}
    >
      <nav className={styles.nav}>
        <div className={styles.navBlock}>
          <button
            className={styles.iconBlock}
            onClick={switchLanguage}
            aria-label="Translate"
          >
            <TranslateIcon className={styles.icon} />
            <p>{lang.header_translate_button}</p>
          </button>
          <Link to="/" className={styles.iconBlock} aria-label="Welcome">
            <WelcomeIcon className={styles.icon} />
            <p>{lang.header_welcome_page_button}</p>
          </Link>
          {isAuth && (
            <Link
              to={RouteLinks.Main}
              className={styles.iconBlock}
              aria-label="Main"
            >
              <GraphQLIcon className={styles.icon} />
              <p>{lang.header_main_page_button}</p>
            </Link>
          )}
        </div>
        <div className={styles.navBlock}>
          {!isAuth && (
            <Link
              to={RouteLinks.SignUp}
              className={styles.iconBlock}
              aria-label="Sign Up"
            >
              <SignUpIcon className={styles.authIcon} />
              <p>{lang.header_sign_up_button}</p>
            </Link>
          )}
          {isAuth ? (
            <Tooltip title={`Logout from ${email}`}>
              <button
                className={styles.iconBlock}
                onClick={handleLogout}
                aria-label="Logout"
              >
                <LogoutIcon className={styles.authIcon} />
                <p>{lang.header_logout_button}</p>
              </button>
            </Tooltip>
          ) : (
            <Link
              to="/signin"
              className={styles.iconBlock}
              aria-label="Sign In"
            >
              <SignInIcon className={styles.authIcon} />
              <p>{lang.header_sign_in_button}</p>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
