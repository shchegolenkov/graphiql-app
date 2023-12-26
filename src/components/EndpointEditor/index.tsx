import React, { FC } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import close from '../../assets/svg/close.svg';

import styles from './EndpointEditor.module.scss';

interface IEndpointProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EndpointEditor: FC<IEndpointProps> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog className={styles.dialog} onClose={handleClose} open={open}>
      <IconButton className={styles.close} onClick={handleClose}>
        <img src={close} alt="Close" />
      </IconButton>
      <DialogTitle>Change endpoint</DialogTitle>
      <DialogContent>
        <form autoComplete="off">
          <TextField type="text"></TextField>
          <Button variant="contained">Change endpoint</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
