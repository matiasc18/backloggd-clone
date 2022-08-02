import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import gameService from './gameService';

const initialState = {
  game: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

//? Get game information
export const getGame = createAsyncThunk('game/details', async(id, thunkAPI) => {
  try {
    return await gameService.getGame(id);
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
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      //* Get game details
      .addCase(getGame.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGame.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.game = action.payload
      })
      .addCase(getGame.rejected, (state, action ) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
});

export const { reset } = gameSlice.actions;
export default gameSlice.reducer;