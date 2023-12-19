import { Link } from 'react-router-dom';
import Logo from '../../assets/svg/rsLogo.svg?react';
import EgorAvatar from '../../assets/images/egorAvatar.jpg';
import DenisAvatar from '../../assets/images/denisAvatar.jpg';
import PavelAvatar from '../../assets/images/pavelAvatar.jpg';
import styles from './Footer.module.scss';

export const Footer = () => {
  const team = [
    { name: 'Egor', github: 'https://github.com/ygrcore', image: EgorAvatar },
    {
      name: 'Denis',
      github: 'https://github.com/shchegolenkov',
      image: DenisAvatar,
    },
    {
      name: 'Pavel',
      github: 'https://github.com/Svygzhryr',
      image: PavelAvatar,
    },
  ];

  return (
    <footer className={styles.footer}>
      <ul className={styles.linksList}>
        <li>
          <h2>2023</h2>
        </li>
        {team.map((member) => (
          <li key={member.name} className={styles.imageBlock}>
            <Link to={member.github} target="_blank" className={styles.link}>
              <img
                src={member.image}
                alt={member.name}
                className={styles.img}
              />
            </Link>
          </li>
        ))}
        <li>
          <Link to="https://rs.school/react" target="_blank">
            <Logo className={styles.logo} />
          </Link>
        </li>
      </ul>
    </footer>
  );
};
