import { createSlice } from '@reduxjs/toolkit';
import { defaultQuery } from '../../utils/utils';

interface UserState {
  isHeaderActive: boolean;
  isVariablesActive: boolean;
  graphQLParams: string;
  output: string;
  isLoading: boolean;
}

const initialState: UserState = {
  isHeaderActive: false,
  isVariablesActive: false,
  graphQLParams: defaultQuery,
  output: '{ \n  message: {  \n    Output goes here \n  } \n}',
  isLoading: false,
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
    setGraphQLParams(state, action) {
      state.graphQLParams = action.payload;
    },
    setOutput(state, action) {
      state.output = action.payload;
    },
    setIsLoading(state) {
      state.isLoading = !state.isLoading;
    },
  },
});

export const {
  setIsHeadersActive,
  setIsVariablesActive,
  setIsLoading,
  setOutput,
  setGraphQLParams,
} = editorSlice.actions;
export default editorSlice.reducer;
