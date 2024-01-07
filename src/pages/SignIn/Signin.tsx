import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

import { useAppDispatch } from '../../hooks/redux-hook';
import { useLanguage } from '../../hooks/useLanguage';
import { openModal } from '../../store/modal/modal.slice';

import { signinSchema } from '../../utils/validation';
import { IFormData, RouteLinks } from '../../utils/types';
import { logInWithEmailAndPassword } from '../../firebase';
import ErrorToast from '../../components/CustomToast/ErrorToast';

import styles from './SignIn.module.scss';

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const lang = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signinSchema), mode: 'all' });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (formData: IFormData) => {
    const { email, password } = formData;
    setIsLoading(true);
    try {
      const loginResult = await logInWithEmailAndPassword(email, password);
      if (loginResult) {
        navigate(RouteLinks.Main);
        dispatch(openModal());
      }
    } catch (error) {
      ErrorToast(`${error}`);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className={styles.wrapper}>
        <h2>{lang.sign_in_header}</h2>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className={styles.formWrapper}
        >
          <TextField
            error={!!errors.email}
            {...register('email')}
            helperText={errors.email?.message || ' '}
            className={styles.input}
            label={lang.form_input_email}
            aria-label="Email"
            type="email"
            autoComplete="email"
          />
          <TextField
            error={!!errors.password}
            {...register('password')}
            helperText={errors.password?.message || ' '}
            className={styles.input}
            label={lang.form_input_password}
            aria-label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            className={clsx(styles.button, { [styles.loader]: isLoading })}
            variant="contained"
            aria-label="Sign in"
            disabled={isLoading}
          >
            <Typography>{lang.sign_in_button}</Typography>
          </Button>
        </form>
        <Typography>{lang.sign_in_question}</Typography>
        <Link to={RouteLinks.SignUp}>{lang.sign_in_register_link}</Link>
      </div>
    </main>
  );
};
