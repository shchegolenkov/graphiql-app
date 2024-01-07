import {
  ChangeEventHandler,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import clsx from 'clsx';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';

import {
  selectHeaders,
  selectInput,
  selectLoading,
  selectOutput,
  selectVariables,
  selectEndpoint,
  selectHeader,
  selectIsDocsActive,
  selectisDocsOpened,
  selectError,
} from '../../store/editor/selectors';

import {
  setGraphQLParams,
  setIsHeadersActive,
  setIsVariablesActive,
  setIsEndpointOpen,
  setHeaders,
  setIsDocsOpened,
} from '../../store/editor/editor.slice';
import {
  defaultHeaders,
  defaultQuery,
  getNumericArray,
  introspectionQuery,
  prettify,
} from '../../utils/utils';
import { EndpointEditor } from '../../components/EndpointEditor';
import run from '../../assets/svg/run.svg';
import docsIcon from '../../assets/svg/docs.svg';
import edit from '../../assets/svg/edit.svg';
import fold from '../../assets/svg/fold.svg';
const Docs = lazy(() => import('../../components/Docs'));
import ErrorToast from '../../components/CustomToast/ErrorToast';
import QueryEditor from '../../components/QueryEditor';

import styles from './Main.module.scss';
import { fetchOutput } from '../../store/editor/actions';

export const Main = () => {
  const editorRef = useRef(null);
  const dispatch = useAppDispatch();

  const [lineNumber, setLineNumber] = useState<number[]>(getNumericArray(10));
  const [isUpdated, setIsUpdated] = useState(false);
  const [editorValue, setEditorValue] = useState(defaultQuery);

  const output = useAppSelector(selectOutput);
  const isHeadersActive = useAppSelector(selectHeaders);
  const isVariablesActive = useAppSelector(selectVariables);
  const isLoading = useAppSelector(selectLoading);
  const graphQLParams = useAppSelector(selectInput);
  const endpoint = useAppSelector(selectEndpoint);
  const headers = useAppSelector(selectHeader);
  const isDocsActive = useAppSelector(selectIsDocsActive);
  const isDocsOpened = useAppSelector(selectisDocsOpened);
  const error = useAppSelector(selectError);

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

    setEditorValue(textarea.value);
    dispatch(setGraphQLParams(textarea.value));
    setLineNumber(getNumericArray(lines));
  };

  const graphQLFetch = (graphQLParams: string, isIntrospection = false) => {
    let parsedHeaders = null;
    if (headers && !isIntrospection) {
      try {
        parsedHeaders = JSON.parse(headers);
      } catch (err) {
        ErrorToast(`${err}`);
        return;
      }
    }

    dispatch(
      fetchOutput({
        endpoint,
        headers: parsedHeaders ?? defaultHeaders,
        body: JSON.stringify({
          query: graphQLParams,
          // variables: variables
        }),
        isIntrospection,
      })
    );
  };

  const handleRun = () => {
    graphQLFetch(introspectionQuery, true);
    graphQLFetch(graphQLParams);
  };

  const handleEndpointOpen = () => {
    dispatch(setIsEndpointOpen());
  };

  const handleHeadersChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    const textarea = event.target;
    dispatch(setHeaders(textarea.value));
  };

  const handleDocsClick = () => {
    dispatch(setIsDocsOpened());
  };

  const handlePrettify = () => {
    const { result, length } = prettify(graphQLParams);
    setLineNumber(getNumericArray(length));
    setEditorValue(result);
  };

  useEffect(() => {
    setIsUpdated(true);
    setTimeout(() => {
      setIsUpdated(false);
    }, 1000);
  }, [endpoint]);

  useEffect(() => {
    if (error) {
      ErrorToast(`${error}`);
      console.error(error);
    }
  }, [error]);

  return (
    <main
      className={clsx(styles.wrapper, { [styles.activeDocs]: isDocsOpened })}
    >
      {isDocsActive && (
        <Suspense fallback={<div />}>
          <Docs />
        </Suspense>
      )}
      <EndpointEditor />
      <div className={styles.editorWrapper}>
        <div className={styles.editor}>
          <div className={styles.inputWrapper}>
            <div className={styles.lines}>
              {lineNumber.map((item) => (
                <span key={item} />
              ))}
            </div>
            <QueryEditor
              refObject={editorRef}
              value={editorValue}
              onChange={handleEditorChange}
              className={styles.editorInput}
              name="editor"
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
                  <img src={edit} alt="Edit" />
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
                  defaultValue={JSON.stringify(defaultHeaders, null, 2)}
                  disabled={isHeadersActive}
                  name="headers"
                />
              </div>
            </div>

            <div className={styles.variablesWrapper}>
              <div className={styles.otherUtilsWrapper}>
                <Button
                  disabled={!isDocsActive}
                  variant="contained"
                  className={clsx(styles.docs, {
                    [styles.bookActive]: isDocsOpened,
                  })}
                  onClick={handleDocsClick}
                >
                  <img src={docsIcon} alt="" />
                </Button>
                <Button
                  onClick={handlePrettify}
                  variant="contained"
                  className={styles.prettify}
                >
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
                  name="variables"
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
          disabled={isLoading}
        >
          <img src={run} alt="Run" />
        </Button>

        <div className={styles.viewerWrapper}>
          <QueryEditor
            value={output}
            className={styles.inputViewer}
            name="viewer"
            disabled
          />
        </div>
      </div>
    </main>
  );
};
