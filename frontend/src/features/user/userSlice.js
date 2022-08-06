import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
  userInfo: null,
  games: null,
  favorites: null,
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

//? Add game to user backlog
export const addGames = createAsyncThunk('user/addGames', async (gameData, thunkAPI) => {
  try {
    const accessToken = thunkAPI.getState().auth.user.accessToken;
    return await userService.addGames(gameData, accessToken);
  } catch (err) {
    // Or return server error message in payload
    const message = err.response.data.error || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//? Get all of the user's games
export const getUserGames = createAsyncThunk('user/allGames', async (_, thunkAPI) => {
  try {
    const accessToken = thunkAPI.getState().auth.user.accessToken;
    return await userService.getUserGames(accessToken);
  } catch (err) {
    // Or return server error message in payload
    const message = err.response.data.error || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//? Get all of the user's favorite games
export const getFavorites = createAsyncThunk('user/favorites', async (_, thunkAPI) => {
  try {
    const accessToken = thunkAPI.getState().auth.user.accessToken;
    return await userService.getFavorites(accessToken);
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
    reset: (state) => {
      state.isSuccess = false
      state.isError = false
      state.isLoading = false
      state.message = ''
    }
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
      //* Add game
      .addCase(addGames.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addGames.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.games = action.payload.games
        state.message = action.payload.message
      })
      .addCase(addGames.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //* Get all user games
      .addCase(getUserGames.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserGames.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.games = action.payload
      })
      .addCase(getUserGames.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //* Get all user favorite games
      .addCase(getFavorites.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.favorites = action.payload
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;