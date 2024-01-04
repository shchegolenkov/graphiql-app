import { Button, Drawer } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import clsx from 'clsx';

import close from '../../assets/svg/close.svg';

import { selectDocs, selectisDocsOpened } from '../../store/editor/selectors';
import { setIsDocsOpened } from '../../store/editor/editor.slice';

import styles from './Docs.module.scss';

export const Docs = () => {
  const docs = useAppSelector(selectDocs);
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector(selectisDocsOpened);

  const handleClose = () => {
    dispatch(setIsDocsOpened());
  };

  return (
    <Drawer
      variant="persistent"
      open={isOpened}
      ModalProps={{
        keepMounted: true,
      }}
      className={clsx(styles.docs, { [styles.docsOpened]: isOpened })}
    >
      <Button
        onClick={handleClose}
        className={styles.close}
        variant="contained"
      >
        <img src={close} alt="" />
      </Button>
      <div className={styles.wrapper}>{docs}</div>
    </Drawer>
  );
};
