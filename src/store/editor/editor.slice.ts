import { createSlice } from '@reduxjs/toolkit';
import { defaultQuery } from '../../utils/utils';
import { IQueryField, IQueryResponse } from '../../utils/types';
import { fetchOutput } from './actions';

const defaultEndpoint = 'https://rickandmortyapi.com/graphql';
const defaultOutput = '{ \n  message: {  \n    Output goes here \n  } \n}';

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
  docs: IQueryField[] | null;
  isDocsActive: boolean;
  isDocsOpened: boolean;
  error?: string;
  variables: string;
}

const initialState: UserState = {
  isHeaderActive: false,
  isVariablesActive: false,
  isLoading: false,
  isUpdated: false,
  isEndpointOpen: false,
  endpoint: defaultEndpoint,
  graphQLParams: defaultQuery,
  output: defaultOutput,
  headers: '',
  docs: null,
  isDocsActive: false,
  isDocsOpened: false,
  variables: '',
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
    setVariables(state, action) {
      state.variables = action.payload;
    },
    setDocs(state, action) {
      state.docs = action.payload;
    },
    setIsDocsActive(state, action) {
      state.isDocsActive = action.payload;
    },
    setIsDocsOpened(state) {
      state.isDocsOpened = !state.isDocsOpened;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOutput.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(fetchOutput.fulfilled, (state, { payload }) => {
      const { result, isIntrospection } = payload as unknown as {
        result: IQueryResponse;
        isIntrospection: boolean;
      };
      state.isLoading = false;
      if (isIntrospection) {
        state.isDocsActive = true;
        state.docs = result?.data?.__schema?.queryType?.fields;
      } else {
        state.output = JSON.stringify(result, null, 2).replace(/"/g, '');
      }
    });
    builder.addCase(fetchOutput.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.message || 'Something went wrong :(';
      state.output = `${payload?.message}`;
    });
  },
});

export const {
  setIsHeadersActive,
  setHeaders,
  setIsVariablesActive,
  setVariables,
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
