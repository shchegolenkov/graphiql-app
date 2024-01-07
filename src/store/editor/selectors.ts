import { RootState } from '../store';

export const selectHeaders = (state: RootState) => state.editor.isHeaderActive;
export const selectVariables = (state: RootState) =>
  state.editor.isVariablesActive;
export const selectLoading = (state: RootState) => state.editor.isLoading;
export const selectInput = (state: RootState) => state.editor.graphQLParams;
export const selectOutput = (state: RootState) => state.editor.output;
export const selectEndpoint = (state: RootState) => state.editor.endpoint;
export const selectModal = (state: RootState) => state.editor.isEndpointOpen;
export const selectHeader = (state: RootState) => state.editor.headers;
export const selectDocs = (state: RootState) => state.editor.docs;
export const selectIsDocsActive = (state: RootState) =>
  state.editor.isDocsActive;
export const selectisDocsOpened = (state: RootState) =>
  state.editor.isDocsOpened;
export const selectError = (state: RootState) => state.editor.error;
