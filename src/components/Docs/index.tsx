import { useCallback } from 'react';
import { Button, Drawer } from '@mui/material';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import { useLanguage } from '../../hooks/useLanguage';
import { selectDocs, selectisDocsOpened } from '../../store/editor/selectors';
import { setIsDocsOpened } from '../../store/editor/editor.slice';

import close from '../../assets/svg/close.svg';

import styles from './Docs.module.scss';

const Docs = () => {
  const lang = useLanguage();
  const docs = useAppSelector(selectDocs);
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector(selectisDocsOpened);

  const handleClose = useCallback(() => {
    dispatch(setIsDocsOpened());
  }, [dispatch]);

  return (
    <Drawer
      variant="persistent"
      open={isOpened}
      ModalProps={{
        keepMounted: true,
      }}
      className={clsx(styles.docs, { [styles.docsOpened]: isOpened })}
    >
      <header>
        <h2>{lang.docs_heading}</h2>
        <Button
          onClick={handleClose}
          className={styles.close}
          variant="contained"
        >
          <img src={close} alt="" />
        </Button>
      </header>

      <div className={styles.wrapper}>
        <ul className={styles.fieldList}>
          {docs?.map((item, index) => (
            <div className={styles.fields} key={`${item.name}-${index}`}>
              <li>
                <p className={styles.fieldName}>{item.name}</p>
                <p className={styles.fieldDesc}>
                  {item.description || 'No description..'}
                </p>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </Drawer>
  );
};

export default Docs;
