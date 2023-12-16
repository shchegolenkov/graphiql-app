import { Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { RouteLinks } from '../../utils/types';

import styles from './SignUp.module.scss';

export const SignUp = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Sign Up</h2>
      <form className={styles.formWrapper}>
        <TextField
          // error
          helperText=" "
          className={styles.input}
          label="Email"
          type="email"
          autoComplete="current-password"
        />
        <TextField
          // error
          helperText=" "
          className={styles.input}
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          // error
          helperText=" "
          className={styles.input}
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
        />
        <Button type="submit" className={styles.button} variant="contained">
          <Typography>Sign up</Typography>
        </Button>
      </form>
      <Typography>Already have an account?</Typography>
      <Link to={RouteLinks.SignIn}>Log in</Link>
    </div>
  );
};
