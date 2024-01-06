import { createSlice } from '@reduxjs/toolkit';
import { defaultQuery } from '../../utils/utils';
import { fetchOutput } from './actions';

const baseEndpoint = 'https://rickandmortyapi.com/graphql';
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
  error?: string;
}

const initialState: UserState = {
  isHeaderActive: false,
  isVariablesActive: false,
  isLoading: false,
  isUpdated: false,
  isEndpointOpen: false,
  endpoint: baseEndpoint,
  graphQLParams: defaultQuery,
  output: defaultOutput,
  headers: '',
  error: undefined,
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
    setHeaders(state, action) {
      state.headers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOutput.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(fetchOutput.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.output = JSON.stringify(payload, null, 2).replace(/"/g, '');
    });
    builder.addCase(fetchOutput.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.message || 'Something went wrong :(';
      state.output = JSON.stringify({});
    });
  },
});

export const {
  setIsHeadersActive,
  setHeaders,
  setIsVariablesActive,
  setIsEndpointOpen,
  setEndpoint,
  setGraphQLParams,
} = editorSlice.actions;
export default editorSlice.reducer;
