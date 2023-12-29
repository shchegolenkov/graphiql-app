import { RootState } from '../store';

export const isFoldedHeadersState = (state: RootState) =>
  state.editor.isHeaderActive;
export const isFoldedVariablesState = (state: RootState) =>
  state.editor.isVariablesActive;
export const loadingState = (state: RootState) => state.editor.isLoading;
export const inputState = (state: RootState) => state.editor.graphQLParams;
export const outputState = (state: RootState) => state.editor.output;

export const endpointState = (state: RootState) => state.editor.endpoint;
export const modalState = (state: RootState) => state.editor.isEndpointOpen;

export const headersState = (state: RootState) => state.editor.headers;
