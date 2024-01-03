import { FC } from 'react';
import styles from './ErrorFallback.module.scss';
import { Button } from '@mui/material';

interface IErrorBoundaryState {
  error: Error | null;
}

export const ErrorFallback: FC<IErrorBoundaryState> = ({ error }) => {
  const handleOnClick = () => {
    window.location.replace('/');
  };
  return (
    <main className={styles.wrapper}>
      <h2>An error has occured!</h2>
      <div className={styles.message}>
        <h4>{error?.message}</h4>
      </div>
      <Button onClick={handleOnClick} variant="contained">
        Back to home page
      </Button>
    </main>
  );
};
