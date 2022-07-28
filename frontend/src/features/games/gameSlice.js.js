import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import gameService from './gameService';

const initialState = {
  games: [],
  favorites: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

//? Add game to user backlog
export const addGames = createAsyncThunk('games/add', async (gameData, thunkAPI) => {
  try {
    const accessToken = thunkAPI.getState().auth.user.accessToken;
    return await gameService.addGames(gameData, accessToken);
  } catch(err) {
      // Or return server error message in payload
      const message = err.response.data.error || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
  }
});

//? Get all of the user's games
export const getUserGames = createAsyncThunk('games/all', async(_, thunkAPI) => {
  try {
    const accessToken = thunkAPI.getState().auth.user.accessToken;
    return await gameService.getUserGames(accessToken);
  } catch(err) {
      // Or return server error message in payload
      const message = err.response.data.error || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
  }
});

//? Get all of the user's favorite games
export const getFavorites = createAsyncThunk('games/favorites', async(_, thunkAPI) => {
  try {
    const accessToken = thunkAPI.getState().auth.user.accessToken;
    return await gameService.getFavorites(accessToken);
  } catch(err) {
      // Or return server error message in payload
      const message = err.response.data.error || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
  }
});

export const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      //* Add game
      .addCase(addGames.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addGames.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.games.push(action.payload)
      })
      .addCase(addGames.rejected, (state, action ) => {
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
      .addCase(getUserGames.rejected, (state, action ) => {
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
      .addCase(getFavorites.rejected, (state, action ) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
});

export const { reset } = gameSlice.actions;
export default gameSlice.reducer;