import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

export const createTicket = createAsyncThunk(
  "tickets/create",
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.create(ticketData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserTickets = createAsyncThunk(
  "tickets/getTickets",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await ticketService.getTickets(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserTicket = createAsyncThunk(
  "tickets/get",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await ticketService.getTicket(ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  tickets: [],
  ticket: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTicket.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
      .addCase(getUserTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTickets.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = actions.payload;
      })
      .addCase(getUserTickets.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
      .addCase(getUserTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTicket.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = actions.payload;
      })
      .addCase(getUserTicket.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      });
  },
});

export const { reset } = ticketSlice.actions;

export default ticketSlice.reducer;
