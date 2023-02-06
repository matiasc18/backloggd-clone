import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
  userInfo: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

//? Get user's information
export const getUser = createAsyncThunk('user/info', async (_, thunkAPI) => {
  try {
    const accessToken = thunkAPI.getState().auth.user.accessToken;
    return await userService.getUser(accessToken);
  } catch (err) {
    // Or return server error message in payload
    const message = err.response.data.error || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => initialState
    // reset: (state) => {
    //   state.isSuccess = false
    //   state.isError = false
    //   state.isLoading = false
    //   state.message = ''
    // }
  },
  extraReducers: (builder) => {
    builder
      //* Get user
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userInfo = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;