import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { closeModal } from '../../store/modal/modal.slice';
import { useAppDispatch } from '../../hooks/redux-hook';

import styles from './Modal.module.scss';

const Modal: FC = () => {
  const dispatch = useAppDispatch();

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  return (
    <div className={styles.modal__wrapper} onClick={closeModalHandler}>
      <div className={styles.welcome__container}>
        <h2 className={styles.welcome__title}>You`re logged in!</h2>
        <Link to="/main">
          <Button
            type="button"
            className={styles.welcome__button}
            variant="contained"
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
              Start GraphQL`ing!
            </Typography>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Modal;
