import { Link } from 'react-router-dom';
import s from './Footer.module.scss';
import Logo from '../../assets/svg/rsLogo.svg?react';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <ul className={s.linksList}>
        <li>
          <h2>2023</h2>
        </li>
        <li>
          <div className={s.imageBlock}>
            <Link
              to="https://github.com/ygrcore"
              target="_blank"
              className={s.link}
            >
              <img
                src="src/assets/images/egorAvatar.jpg"
                alt="Egor's Github"
                className={s.img}
              />
            </Link>
          </div>
        </li>
        <li>
          <div className={s.imageBlock}>
            <Link
              to="https://github.com/shchegolenkov"
              target="_blank"
              className={s.link}
            >
              <img
                src="src/assets/images/denisAvatar.jpg"
                alt="Denis' Github"
                className={s.img}
              />
            </Link>
          </div>
        </li>
        <li>
          <div className={s.imageBlock}>
            <Link
              to="https://github.com/Svygzhryr"
              target="_blank"
              className={s.link}
            >
              <img
                src="src/assets/images/pavelAvatar.jpg"
                alt="Pavel's Github"
                className={s.img}
              />
            </Link>
          </div>
        </li>
        <li>
          <Link to="https://rs.school/react" target="_blank">
            <Logo className={s.logo} />
          </Link>
        </li>
      </ul>
    </footer>
  );
};
