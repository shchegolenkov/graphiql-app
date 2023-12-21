import { Button } from '@mui/material';

import run from '../../assets/svg/run.svg';
import docs from '../../assets/svg/docs.svg';
import edit from '../../assets/svg/edit.svg';

import styles from './Main.module.scss';

export const Main = () => {
  return (
    <main>
      <div className={styles.wrapper}>
        <div className={styles.editorWrapper}>
          <div className={styles.editor}>
            <div className={styles.inputWrapper}>
              <div className={styles.lines}>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
              </div>
              <textarea
                className={styles.editorInput}
                name="editor"
                cols={30}
                rows={10}
              />
            </div>

            <div className={styles.editorControls}>
              <div className={styles.endpoint}>someendpoint.here</div>
              <Button variant="contained" className={styles.endpointChange}>
                <img src={edit} alt="" />
              </Button>
              <Button disabled variant="contained" className={styles.docs}>
                <img src={docs} alt="" />
              </Button>
              <Button variant="contained" className={styles.prettify}>
                Prettify!
              </Button>
            </div>

            <div className={styles.editorUtils}>
              <div className={styles.headers}>
                <textarea name="" id="" cols={30} rows={10}></textarea>
              </div>
              <div className={styles.variables}>
                <textarea name="" id="" cols={30} rows={10}></textarea>
              </div>
            </div>
          </div>

          <Button className={styles.run}>
            <img src={run} alt="Run" />
          </Button>

          <div className={styles.viewerWrapper}>
            <textarea
              className={styles.inputViewer}
              name="viewer"
              id=""
              cols={30}
              rows={10}
              disabled
            ></textarea>
          </div>
        </div>
      </div>
    </main>
  );
};
