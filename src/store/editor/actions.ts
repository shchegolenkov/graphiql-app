import { createAsyncThunk } from '@reduxjs/toolkit';

interface RequestData {
  endpoint: string;
  headers: Record<string, string>;
  body: string;
  isIntrospection: boolean;
}

export const fetchOutput = createAsyncThunk<
  Record<string, boolean>,
  RequestData,
  {
    rejectValue: Error;
  }
>(
  'editor/OUTPUT/FETCH',
  async ({ endpoint, headers, body, isIntrospection }, thunkAPI) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body,
      });

      const result = await response.json();
      if (response.ok) {
        return { result, isIntrospection };
      }

      const { errors } = result;
      throw new Error(errors[0].message);
    } catch (error) {
      return thunkAPI.rejectWithValue(error as unknown as Error);
    }
  }
);
