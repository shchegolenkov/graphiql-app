import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import styles from './Welcome.module.scss';

export const Welcome = () => {
  const { isAuth } = useAuth();

  return (
    <main>
      <div className={styles.welcome}>
        <h1>Welcome</h1>
        {isAuth && (
          <div className={styles.welcome__container}>
            <h2 className={styles.welcome__title}>You`re logged in!</h2>
            <Link to="/main">
              <Button
                type="button"
                className={styles.welcome__button}
                variant="contained"
              >
                <Typography
                  sx={{ fontSize: 32 }}
                  className={styles.welcome__button_title}
                >
                  Start GraphQL`ing!
                </Typography>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};
