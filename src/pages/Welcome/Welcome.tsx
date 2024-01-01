import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { selectModalActive } from '../../store/modal/selectors';
import { useAppSelector } from '../../hooks/redux-hook';

import EgorImage from '../../assets/images/egorImage.jpg';
import DenisImage from '../../assets/images/denisImage.jpg';
import PavelImage from '../../assets/images/pavelImage.jpg';

import Modal from '../../components/Modal/Modal';

import styles from './Welcome.module.scss';

export const Welcome = () => {
  const { isModalActive } = useAppSelector(selectModalActive);

  const team = [
    {
      name: 'Egor',
      github: 'https://github.com/ygrcore',
      image: EgorImage,
      description:
        'I participated in various coding online courses to further enhance my skills. I have a  passion for frontend and strive to stay updated with the latest industry trends and best practices.',
    },
    {
      name: 'Denis',
      github: 'https://github.com/shchegolenkov',
      image: DenisImage,
      description:
        'Learning Frontend from 2022. Passionate about building web apps from scratch and enhancing existing ones. Always looking for opportunities to sharpen my skills.',
    },
    {
      name: 'Pavel',
      github: 'https://github.com/Svygzhryr',
      image: PavelImage,
      description:
        'I love solving problems and keeping up with the latest tech trends. When I am not coding, I explore the tech community for inspiration and to fuel my creative solutions.',
    },
  ];

  return (
    <main>
      <div className={styles.wrapper}>
        <div className={clsx(styles.block, styles.headingBlock)}>
          <h1>Welcome to GraphQL online IDE</h1>
          <h3>
            A perfect tool for writing, validating and testing GraphQL queries.
            <br /> Please sign in or create an account and start using it!
          </h3>
          <h3>The app was made on the RS School React 2023Q4 course.</h3>
        </div>
        <div className={styles.block}>
          <h2>Our team</h2>
        </div>
        <div className={styles.teamBlock}>
          {team.map((member) => (
            <div
              key={member.name}
              className={clsx(styles.block, styles.memberBlock)}
            >
              <Link to={member.github} target="_blank" className={styles.link}>
                <img
                  src={member.image}
                  alt={member.name}
                  className={styles.img}
                />
                <h3>{member.name}</h3>
              </Link>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </div>
      {isModalActive && <Modal />}
    </main>
  );
};
