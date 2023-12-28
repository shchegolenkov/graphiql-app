import React, { FC } from 'react';

import { useForm } from 'react-hook-form';
import { Button, Dialog, DialogContent, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { endpointSchema } from '../../utils/validation';
import close from '../../assets/svg/close.svg';

import styles from './EndpointEditor.module.scss';

interface IEndpointProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEndpoint: React.Dispatch<React.SetStateAction<string>>;
}

interface IEndpointData {
  endpoint?: string;
}

export const EndpointEditor: FC<IEndpointProps> = ({
  open,
  setOpen,
  setEndpoint,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(endpointSchema), mode: 'all' });

  const onSubmitHandler = (formData: IEndpointData) => {
    const { endpoint } = formData;
    if (endpoint) {
      setEndpoint(endpoint);
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      disableRestoreFocus
      className={styles.dialog}
      onClose={handleClose}
      open={open}
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
            placeholder="Your endpoint here.."
            type="text"
          ></TextField>
        </DialogContent>

        <Button type="submit" variant="contained">
          Change endpoint
        </Button>
      </form>
    </Dialog>
  );
};
