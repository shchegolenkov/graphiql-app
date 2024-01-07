import { Button, Drawer } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import clsx from 'clsx';

import close from '../../assets/svg/close.svg';

import { selectDocs, selectisDocsOpened } from '../../store/editor/selectors';
import { setIsDocsOpened } from '../../store/editor/editor.slice';

import styles from './Docs.module.scss';

const Docs = () => {
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
      <header>
        <h2>Docs</h2>
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
