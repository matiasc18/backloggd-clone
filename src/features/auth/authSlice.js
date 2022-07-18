import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user's accessToken (JWT) from local storage (if it exists)
const user = JSON.parse(localStorage.getItem('user'));

// User auth state
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    // Return user accessToken in payload
    return await authService.register(user);
  } catch(err) {
      // Or return server error message in payload
      const message = err.response.data.error || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
  }
});

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    // Return user accessToken in payload
    return await authService.login(user);
  } catch(err) {
      // Or return server error message in payload
      const message = err.response.data.error || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
  }
});

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// Create the 'auth' redux state 
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reset auth state (other than user accessToken)
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      //* Register
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload       // action.payload == return await authService.register(user);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload    // action.payload == thunkAPI.rejectWithValue(message);
        state.user = null
      })
      //* Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload       // action.payload == return await authService.login(user);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload    // action.payload == thunkAPI.rejectWithValue(message);
        state.user = null
      })
      //* Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;