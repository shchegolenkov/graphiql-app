import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { closeModal } from '../../store/modal/modal.slice';
import { useAppDispatch } from '../../hooks/redux-hook';
import { useLanguage } from '../../hooks/useLanguage';

import styles from './Modal.module.scss';
import { RouteLinks } from '../../utils/types';

const Modal: FC = () => {
  const dispatch = useAppDispatch();

  const lang = useLanguage();

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  return (
    <div className={styles.modal__wrapper} onClick={closeModalHandler}>
      <div className={styles.welcome__container}>
        <h2 className={styles.welcome__title}>{lang.modal_start_header}</h2>
        <Link to={RouteLinks.Main}>
          <Button
            type="button"
            className={styles.welcome__button}
            variant="contained"
            aria-label="Start GraphQL`ing!"
            onChange={closeModalHandler}
          >
            <Typography
              className={styles.welcome__button_title}
              sx={{
                fontSize: {
                  xs: '18px',
                  sm: '32px',
                },
              }}
            >
              {lang.modal_start_button}
            </Typography>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Modal;
