import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

import { useAppDispatch } from '../../hooks/redux-hook';
import { openModal } from '../../store/modal/modal.slice';

import { signupSchema } from '../../utils/validation';
import { registerWithEmailAndPassword } from '../../firebase';
import { IFormData, RouteLinks } from '../../utils/types';

import styles from './SignUp.module.scss';

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema), mode: 'all' });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (formData: IFormData) => {
    setIsLoading(true);
    try {
      const { email, password } = formData;
      const signupResult = await registerWithEmailAndPassword(email, password);
      if (signupResult) {
        navigate(RouteLinks.Main);
        dispatch(openModal());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
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
          <Button
            type="submit"
            className={clsx(styles.button, { [styles.loader]: isLoading })}
            variant="contained"
            disabled={isLoading}
          >
            <p>Sign up</p>
          </Button>
        </form>
        <Typography>Already have an account?</Typography>
        <Link to={RouteLinks.SignIn}>Log in</Link>
      </div>
    </main>
  );
};
