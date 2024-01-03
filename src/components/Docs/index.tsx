import { Drawer } from '@mui/material';
import styles from './Docs.module.scss';

export const Docs = () => {
  return (
    <Drawer
      variant="persistent"
      open={true}
      // onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      className={styles.docs}
    >
      <div className={styles.wrapper}>
        something something something something something
      </div>
    </Drawer>
  );
};
