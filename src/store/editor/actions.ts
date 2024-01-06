import { createAsyncThunk } from '@reduxjs/toolkit';

interface RequestData {
  endpoint: string;
  headers: Record<string, string>;
  body: string;
}

export const fetchOutput = createAsyncThunk<
  Record<string, string>,
  RequestData,
  {
    rejectValue: Error;
  }
>('editor/OUTPUT/FETCH', async ({ endpoint, headers, body }, thunkAPI) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body,
    });

    const result = await response.json();
    console.log('>>> result', result);
    if (response.ok) {
      return result;
    }

    const { errors } = result;
    throw new Error(errors[0].message);
  } catch (error) {
    return thunkAPI.rejectWithValue(error as unknown as Error);
  }
});
