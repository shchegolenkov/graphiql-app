import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useState,
} from 'react';
import { Button, Dialog, DialogContent, TextField } from '@mui/material';
import close from '../../assets/svg/close.svg';

import styles from './EndpointEditor.module.scss';

interface IEndpointProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEndpoint: React.Dispatch<React.SetStateAction<string>>;
}

export const EndpointEditor: FC<IEndpointProps> = ({
  open,
  setOpen,
  setEndpoint,
}) => {
  const [inputValue, setInputvalue] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    const target = event.target as HTMLInputElement;
    setInputvalue(target.value);
  };

  const handleEndpointSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (inputValue) {
      setEndpoint(inputValue);
    }
    handleClose();
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
        onSubmit={handleEndpointSubmit}
        className={styles.gradient}
        autoComplete="off"
      >
        <DialogContent className={styles.wrapper}>
          <TextField
            autoFocus
            onChange={handleInputChange}
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
