import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import gameService from './gameService';

const initialState = {
  games: null,
  gameDetails: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

//? Get game information
export const getGameDetails = createAsyncThunk('game/details', async(id, thunkAPI) => {
  try {
    return await gameService.getGameDetails(id);
  } catch(err) {
      // Or return server error message in payload
      const message = err.response.data.error || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
  }
});

//? Get trending games
export const getTrendingGames = createAsyncThunk('games/trending', async(thunkAPI) => {
  try {
    return await gameService.getTrendingGames();
  } catch(err) {
      // Or return server error message in payload
      const message = err.response.data.error || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
  }
});

export const gameSlice = createSlice({
  name: 'game',
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
      //* Get game details
      .addCase(getGameDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGameDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.gameDetails.push(action.payload)
      })
      .addCase(getGameDetails.rejected, (state, action ) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //* Get trending games
      .addCase(getTrendingGames.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTrendingGames.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.games = action.payload
      })
      .addCase(getTrendingGames.rejected, (state, action ) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
});

export const { reset } = gameSlice.actions;
export default gameSlice.reducer;