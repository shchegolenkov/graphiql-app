import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './404.module.scss';
import { RouteLinks } from '../../utils/types';

export const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h1>404</h1>
      <h2>Page not found...</h2>
      <Link to={RouteLinks.Welcome}>
        <Button variant="contained" className={styles.button}>
          Go back
        </Button>
      </Link>
    </div>
  );
};
