import { Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signupSchema } from '../../utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';

import { IFormData, RouteLinks } from '../../utils/types';

import styles from './SignUp.module.scss';

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema), mode: 'all' });

  const onSubmitHandler = (formData: IFormData) => {
    console.log(formData);
  };

  return (
    <div className={styles.wrapper}>
      <h2>Sign Up</h2>
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
          autoComplete="new-password"
        />
        <TextField
          error={!!errors.confirmPassword}
          {...register('confirmPassword')}
          helperText={errors.confirmPassword?.message || ' '}
          className={styles.input}
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
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