import { createSlice } from '@reduxjs/toolkit';
import { defaultQuery } from '../../utils/utils';

interface UserState {
  isHeaderActive: boolean;
  isVariablesActive: boolean;
  graphQLParams: string;
  output: string;
  isLoading: boolean;
  isUpdated: boolean;
  isEndpointOpen: boolean;
  endpoint: string;
  headers: string;
  docs: string;
  isDocsActive: boolean;
  isDocsOpened: boolean;
}

const initialState: UserState = {
  isHeaderActive: false,
  isVariablesActive: false,
  isLoading: false,
  isUpdated: false,
  isEndpointOpen: false,
  endpoint: 'https://rickandmortyapi.com/graphql',
  graphQLParams: defaultQuery,
  output: '{ \n  message: {  \n    Output goes here \n  } \n}',
  headers: '',
  docs: 'Nothing here at the moment..',
  isDocsActive: false,
  isDocsOpened: false,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setIsHeadersActive(state) {
      state.isHeaderActive = !state.isHeaderActive;
    },
    setIsVariablesActive(state) {
      state.isVariablesActive = !state.isVariablesActive;
    },
    setIsEndpointOpen(state) {
      state.isEndpointOpen = !state.isEndpointOpen;
    },
    setEndpoint(state, action) {
      state.endpoint = action.payload;
    },
    setGraphQLParams(state, action) {
      state.graphQLParams = action.payload;
    },
    setOutput(state, action) {
      state.output = action.payload;
    },
    setIsLoading(state) {
      state.isLoading = !state.isLoading;
    },
    setHeaders(state, action) {
      state.headers = action.payload;
    },
    setDocs(state, action) {
      state.docs = action.payload;
    },
    setIsDocsActive(state) {
      state.isDocsActive = !state.isDocsActive;
    },
    setIsDocsOpened(state) {
      state.isDocsOpened = !state.isDocsOpened;
    },
  },
});

export const {
  setIsHeadersActive,
  setHeaders,
  setIsVariablesActive,
  setIsLoading,
  setIsEndpointOpen,
  setEndpoint,
  setOutput,
  setGraphQLParams,
  setDocs,
  setIsDocsActive,
  setIsDocsOpened,
} = editorSlice.actions;
export default editorSlice.reducer;
