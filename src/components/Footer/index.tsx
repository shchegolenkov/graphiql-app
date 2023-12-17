import { Link } from 'react-router-dom';
import Logo from '../../assets/svg/rsLogo.svg?react';
import EgorAvatar from '../../assets/images/egorAvatar.jpg';
import DenisAvatar from '../../assets/images/denisAvatar.jpg';
import PavelAvatar from '../../assets/images/pavelAvatar.jpg';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.linksList}>
        <li>
          <h2>2023</h2>
        </li>
        <li>
          <div className={styles.imageBlock}>
            <Link
              to="https://github.com/ygrcore"
              target="_blank"
              className={styles.link}
            >
              <img
                src={EgorAvatar}
                alt="Egor's Github"
                className={styles.img}
              />
            </Link>
          </div>
        </li>
        <li>
          <div className={styles.imageBlock}>
            <Link
              to="https://github.com/shchegolenkov"
              target="_blank"
              className={styles.link}
            >
              <img
                src={DenisAvatar}
                alt="Denis' Github"
                className={styles.img}
              />
            </Link>
          </div>
        </li>
        <li>
          <div className={styles.imageBlock}>
            <Link
              to="https://github.com/Svygzhryr"
              target="_blank"
              className={styles.link}
            >
              <img
                src={PavelAvatar}
                alt="Pavel's Github"
                className={styles.img}
              />
            </Link>
          </div>
        </li>
        <li>
          <Link to="https://rs.school/react" target="_blank">
            <Logo className={styles.logo} />
          </Link>
        </li>
      </ul>
    </footer>
  );
};
