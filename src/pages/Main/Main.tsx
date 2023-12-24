import { useState } from 'react';

import { Button } from '@mui/material';

import run from '../../assets/svg/run.svg';
import docs from '../../assets/svg/docs.svg';
import edit from '../../assets/svg/edit.svg';
import fold from '../../assets/svg/fold.svg';

import styles from './Main.module.scss';

export const Main = () => {
  const [isHeadersActive, setIsHeadersActive] = useState(false);
  const [isVariablesActive, setIsVariablesActive] = useState(false);

  const handleHeadersClick = () => {
    setIsHeadersActive(!isHeadersActive);
  };

  const handleVariablesClick = () => {
    setIsVariablesActive(!isVariablesActive);
  };

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

            <div className={styles.utilitiesWrapper}>
              <div className={styles.headersWrapper}>
                <div className={styles.endpointWrapper}>
                  <div className={styles.endpoint}>dasdsadasdasdasasdsad</div>
                  <Button variant="contained" className={styles.endpointChange}>
                    <img src={edit} alt="" />
                  </Button>
                </div>
                <div
                  className={`${styles.headers} ${
                    isHeadersActive ? styles.folded : ''
                  }`}
                >
                  <button onClick={handleHeadersClick} className={styles.fold}>
                    Headers&nbsp;
                    <img src={fold} alt="" />
                  </button>
                  <textarea
                    disabled={isHeadersActive}
                    name=""
                    id=""
                    cols={30}
                    rows={10}
                  />
                </div>
              </div>

              <div className={styles.variablesWrapper}>
                <div className={styles.otherUtilsWrapper}>
                  <Button disabled variant="contained" className={styles.docs}>
                    <img src={docs} alt="" />
                  </Button>
                  <Button variant="contained" className={styles.prettify}>
                    Prettify!
                  </Button>
                </div>
                <div
                  className={`${styles.variables} ${
                    isVariablesActive ? styles.folded : ''
                  }`}
                >
                  <button
                    onClick={handleVariablesClick}
                    className={styles.fold}
                  >
                    Variables&nbsp;
                    <img src={fold} alt="" />
                  </button>
                  <textarea
                    disabled={isVariablesActive}
                    name=""
                    id=""
                    cols={30}
                    rows={10}
                  />
                </div>
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
            />
          </div>
        </div>
      </div>
    </main>
  );
};
