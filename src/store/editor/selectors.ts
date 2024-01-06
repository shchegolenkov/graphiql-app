import { RootState } from '../store';

export const selectHeaders = (state: RootState) => state.editor.isHeaderActive;
export const selectVariablesActive = (state: RootState) =>
  state.editor.isVariablesActive;
export const selectLoading = (state: RootState) => state.editor.isLoading;
export const selectInput = (state: RootState) => state.editor.graphQLParams;
export const selectOutput = (state: RootState) => state.editor.output;
export const selectEndpoint = (state: RootState) => state.editor.endpoint;
export const selectModal = (state: RootState) => state.editor.isEndpointOpen;
export const selectHeader = (state: RootState) => state.editor.headers;
export const selectVariables = (state: RootState) => state.editor.variables;
