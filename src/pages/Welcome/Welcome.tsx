import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { selectModalActive } from '../../store/modal/selectors';
import { useAppSelector } from '../../hooks/redux-hook';
import { useLanguage } from '../../hooks/useLanguage';

import EgorImage from '../../assets/images/egorImage.jpg';
import DenisImage from '../../assets/images/denisImage.jpg';
import PavelImage from '../../assets/images/pavelImage.jpg';

import Modal from '../../components/Modal/Modal';

import styles from './Welcome.module.scss';

export const Welcome = () => {
  const lang = useLanguage();

  const { isModalActive } = useAppSelector(selectModalActive);

  const team = [
    {
      name: lang.welcome_team_member_1_name,
      github: 'https://github.com/ygrcore',
      image: EgorImage,
      description: lang.welcome_team_member_1_about,
    },
    {
      name: lang.welcome_team_member_2_name,
      github: 'https://github.com/shchegolenkov',
      image: DenisImage,
      description: lang.welcome_team_member_2_about,
    },
    {
      name: lang.welcome_team_member_3_name,
      github: 'https://github.com/Svygzhryr',
      image: PavelImage,
      description: lang.welcome_team_member_3_about,
    },
  ];

  return (
    <main>
      <div className={styles.wrapper}>
        <div className={clsx(styles.block, styles.headingBlock)}>
          <h1>{lang.welcome_header_text}</h1>
          <h3>
            {lang.welcome_subheader_text}
            <br />
            {lang.welcome_action_text}
          </h3>
          <h3>{lang.welcome_made_text}</h3>
        </div>
        <div className={styles.block}>
          <h2>{lang.welcome_team_header}</h2>
        </div>
        <div className={styles.teamBlock}>
          {team.map((member) => (
            <div
              key={member.github}
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
