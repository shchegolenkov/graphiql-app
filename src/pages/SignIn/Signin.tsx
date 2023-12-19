import { Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { signinSchema } from '../../utils/validation';

import { IFormData, RouteLinks } from '../../utils/types';

import styles from './SignIn.module.scss';

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signinSchema), mode: 'all' });

  const onSubmitHandler = (formData: IFormData) => {
    console.log(formData);
  };

  return (
    <main>
      <div className={styles.wrapper}>
        <h2>Sign In</h2>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className={styles.formWrapper}
        >
          <TextField
            error={!!errors.email}
            {...register('email')}
            helperText={errors.email?.message || ' '}
            className={styles.input}
            label="Email"
            type="email"
            autoComplete="email"
          />
          <TextField
            error={!!errors.password}
            {...register('password')}
            helperText={errors.password?.message || ' '}
            className={styles.input}
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button type="submit" className={styles.button} variant="contained">
            <Typography>Sign in</Typography>
          </Button>
        </form>
        <Typography>Don&apos;t have an account?</Typography>
        <Link to={RouteLinks.SignUp}>Sign up</Link>
      </div>
    </main>
  );
};
