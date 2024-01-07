import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { RouteLinks } from '../../utils/types';
import { useLanguage } from '../../hooks/useLanguage';

import styles from './404.module.scss';

export const NotFound = () => {
  const lang = useLanguage();

  return (
    <main>
      <div className={styles.wrapper}>
        <h1>404</h1>
        <h2>{lang.not_found_text}</h2>
        <Link to={RouteLinks.Welcome}>
          <Button variant="contained" className={styles.button}>
            {lang.not_found_button}
          </Button>
        </Link>
      </div>
    </main>
  );
};
