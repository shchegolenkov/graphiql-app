import { ChangeEventHandler, useCallback, useState } from 'react';

import clsx from 'clsx';
import { Button } from '@mui/material';

import { EndpointEditor } from '../../components/EndpointEditor';
import { defaultQuery } from '../../utils/utils';
import run from '../../assets/svg/run.svg';
import docs from '../../assets/svg/docs.svg';
import edit from '../../assets/svg/edit.svg';
import fold from '../../assets/svg/fold.svg';

import styles from './Main.module.scss';

export const Main = () => {
  const [isHeadersActive, setIsHeadersActive] = useState(false);
  const [isVariablesActive, setIsVariablesActive] = useState(false);
  const [lineNumber, setLineNumber] = useState(Array(11).fill(<span></span>));
  const [graphQLParams, setGraphQLParams] = useState(defaultQuery);
  const [output, setOutput] = useState(
    '{ \n  message: {  \n    Output goes here \n  } \n}'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isEndpointOpen, setIsEndpointOpen] = useState(false);
  const [endpointState, setEndpointState] = useState(
    'https://rickandmortyapi.com/graphql'
  );

  const handleHeadersClick = useCallback(() => {
    setIsHeadersActive(!isHeadersActive);
  }, [isHeadersActive]);

  const handleVariablesClick = useCallback(() => {
    setIsVariablesActive(!isVariablesActive);
  }, [isVariablesActive]);

  const handleEditorChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    event.preventDefault();
    const textarea = event.target as HTMLTextAreaElement;
    const lines = textarea.value.split('\n').length;

    setGraphQLParams(textarea.value);
    setLineNumber(Array(lines).fill(<span></span>));
  };

  const graphQLFetch = (
    graphQLParams: string,
    endpoint = endpointState,
    headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  ) => {
    setIsLoading(true);
    fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: graphQLParams,
        // variables: variables
      }),
    })
      .then(async (res) => {
        const response = (await res.json()) as Response;
        setOutput(JSON.stringify(response, null, 2).replace(/"/g, ''));
      })
      .catch((err) => {
        // error toast goes here,
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRun = () => {
    graphQLFetch(graphQLParams);
  };

  const handleEndpointOpen = () => {
    setIsEndpointOpen(true);
  };

  return (
    <main className={styles.wrapper}>
      <EndpointEditor
        open={isEndpointOpen}
        setOpen={setIsEndpointOpen}
        setEndpoint={setEndpointState}
      />
      <div className={styles.editorWrapper}>
        <div className={styles.editor}>
          <div className={styles.inputWrapper}>
            <div className={styles.lines}>
              {lineNumber.map((item, index) => (
                <span key={`${index}${item.type}`}></span>
              ))}
            </div>
            <textarea
              defaultValue={defaultQuery}
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
                <div className={styles.endpoint}>{endpointState}</div>
                <Button
                  onClick={handleEndpointOpen}
                  variant="contained"
                  className={styles.endpointChange}
                >
                  <img src={edit} alt="" />
                </Button>
              </div>
              <div
                className={clsx(styles.headers, {
                  [styles.folded]: isHeadersActive,
                })}
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
                className={clsx(styles.variables, {
                  [styles.folded]: isVariablesActive,
                })}
              >
                <button onClick={handleVariablesClick} className={styles.fold}>
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

        <Button
          onClick={handleRun}
          className={clsx(styles.run, { [styles.loader]: isLoading })}
        >
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
    </main>
  );
};
