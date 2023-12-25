import { ChangeEventHandler, useRef, useState } from 'react';

import { Button } from '@mui/material';

import run from '../../assets/svg/run.svg';
import docs from '../../assets/svg/docs.svg';
import edit from '../../assets/svg/edit.svg';
import fold from '../../assets/svg/fold.svg';

import styles from './Main.module.scss';

export const Main = () => {
  const [isHeadersActive, setIsHeadersActive] = useState(false);
  const [isVariablesActive, setIsVariablesActive] = useState(false);
  const [lineNumber, setLineNumber] = useState([<span key="first"></span>]);
  const [graphQLParams, setGraphQLParams] = useState('');
  const [output, setOutput] = useState(
    '{ \n  message: {  \n    Output goes here \n  } \n}'
  );

  const editor = useRef<HTMLTextAreaElement>(null);

  const handleHeadersClick = () => {
    setIsHeadersActive(!isHeadersActive);
  };

  const handleVariablesClick = () => {
    setIsVariablesActive(!isVariablesActive);
  };

  const handleEditorChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    event.preventDefault();
    const textarea = event.target as HTMLTextAreaElement;
    const lines = textarea.value.split('\n').length;

    setGraphQLParams(textarea.value);
    console.log(graphQLParams);
    setLineNumber(Array(lines).fill(<span></span>));
  };

  const graphQLFetch = (
    graphQLParams: string,
    endpoint = 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    headers = { 'Content-Type': 'application/json' }
  ) => {
    console.log(JSON.stringify(graphQLParams));
    return fetch(endpoint, {
      method: 'POST',
      credentials: 'omit',
      headers,
      body: JSON.stringify(graphQLParams || {}),
    }).then(async (res) => {
      setOutput(await res.json());
    });
  };

  const handleRun = () => {
    console.log(graphQLFetch(graphQLParams));
  };

  return (
    <main>
      <div className={styles.wrapper}>
        <div className={styles.editorWrapper}>
          <div className={styles.editor}>
            <div className={styles.inputWrapper}>
              <div className={styles.lines}>
                {lineNumber.map((item, index) => (
                  <span key={`${index}${item.type}`}></span>
                ))}
              </div>
              <textarea
                ref={editor}
                onChange={handleEditorChange}
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

          <Button onClick={handleRun} className={styles.run}>
            <img src={run} alt="Run" />
          </Button>

          <div className={styles.viewerWrapper}>
            <textarea
              value={output}
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
