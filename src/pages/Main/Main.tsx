import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

import clsx from 'clsx';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';

import {
  endpointState,
  isFoldedHeadersState,
  inputState,
  loadingState,
  outputState,
  isFoldedVariablesState,
  headersState,
} from '../../store/editor/selectors';

import {
  setGraphQLParams,
  setIsHeadersActive,
  setIsLoading,
  setIsVariablesActive,
  setIsEndpointOpen,
  setOutput,
  setHeaders,
} from '../../store/editor/editor.slice';

import { EndpointEditor } from '../../components/EndpointEditor';
import { defaultQuery } from '../../utils/utils';
import run from '../../assets/svg/run.svg';
import docs from '../../assets/svg/docs.svg';
import edit from '../../assets/svg/edit.svg';
import fold from '../../assets/svg/fold.svg';

import styles from './Main.module.scss';

export const Main = () => {
  const dispatch = useAppDispatch();

  const [lineNumber, setLineNumber] = useState(Array(11).fill(<span></span>));
  const [isUpdated, setIsUpdated] = useState(false);
  const output = useAppSelector(outputState);
  const isHeadersActive = useAppSelector(isFoldedHeadersState);
  const isVariablesActive = useAppSelector(isFoldedVariablesState);
  const isLoading = useAppSelector(loadingState);
  const graphQLParams = useAppSelector(inputState);
  const endpoint = useAppSelector(endpointState);
  const header = useAppSelector(headersState);

  const handleHeadersClick = useCallback(() => {
    dispatch(setIsHeadersActive());
  }, [dispatch]);

  const handleVariablesClick = useCallback(() => {
    dispatch(setIsVariablesActive());
  }, [dispatch]);

  const handleEditorChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    event.preventDefault();
    const textarea = event.target as HTMLTextAreaElement;
    const lines = textarea.value.split('\n').length;

    dispatch(setGraphQLParams(textarea.value));
    setLineNumber(Array(lines).fill(<span></span>));
  };

  const graphQLFetch = (graphQLParams: string) => {
    dispatch(setIsLoading());
    fetch(endpoint, {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        query: graphQLParams,
        // variables: variables
      }),
    })
      .then(async (res) => {
        const response = (await res.json()) as Response;

        dispatch(
          setOutput(JSON.stringify(response, null, 2).replace(/"/g, ''))
        );
      })
      .catch((err) => {
        // error toast goes here
        console.error(err);
      })
      .finally(() => {
        dispatch(setIsLoading());
      });
  };

  const handleRun = () => {
    graphQLFetch(graphQLParams);
  };

  const handleEndpointOpen = () => {
    dispatch(setIsEndpointOpen());
  };

  const handleHeadersChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    const textarea = event.target as HTMLTextAreaElement;
    try {
      dispatch(setHeaders(JSON.parse(textarea.value)));
    } catch {
      return;
    }
  };

  useEffect(() => {
    setIsUpdated(true);
    setTimeout(() => {
      setIsUpdated(false);
    }, 1000);
  }, [endpoint]);

  return (
    <main className={styles.wrapper}>
      <EndpointEditor />
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
                <div
                  className={clsx(styles.endpoint, {
                    [styles.updated]: isUpdated,
                  })}
                >
                  {endpoint}
                </div>
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
                  onChange={handleHeadersChange}
                  defaultValue={JSON.stringify(header, null, 2)}
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
