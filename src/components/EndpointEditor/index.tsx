import { useForm } from 'react-hook-form';
import { Button, Dialog, DialogContent, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import { useLanguage } from '../../hooks/useLanguage';
import {
  setEndpoint,
  setIsEndpointOpen,
} from '../../store/editor/editor.slice';
import { selectModal } from '../../store/editor/selectors';
import { endpointSchema } from '../../utils/validation';
import close from '../../assets/svg/close.svg';

import styles from './EndpointEditor.module.scss';

interface IEndpointData {
  endpoint?: string;
}

export const EndpointEditor = () => {
  const lang = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(endpointSchema), mode: 'all' });

  const endpointModal = useAppSelector(selectModal);
  const dispatch = useAppDispatch();

  const onSubmitHandler = (formData: IEndpointData) => {
    const { endpoint } = formData;
    if (endpoint) {
      dispatch(setEndpoint(endpoint));
    }
    handleClose();
  };

  const handleClose = () => {
    dispatch(setIsEndpointOpen());
  };

  return (
    <Dialog
      disableRestoreFocus
      className={styles.dialog}
      onClose={handleClose}
      open={endpointModal}
    >
      <button className={styles.close} onClick={handleClose}>
        <img src={close} alt="Close" />
      </button>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={styles.gradient}
        autoComplete="off"
      >
        <DialogContent className={styles.wrapper}>
          <TextField
            error={!!errors.endpoint}
            helperText={errors.endpoint?.message || ' '}
            {...register('endpoint')}
            autoFocus
            className={styles.input}
            placeholder={lang.endpoint_input}
            type="text"
          />
        </DialogContent>

        <Button type="submit" variant="contained" aria-label="Change endpoint">
          {lang.endpoint_button}
        </Button>
      </form>
    </Dialog>
  );
};
