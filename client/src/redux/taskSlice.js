import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchTaskAsync = createAsyncThunk("task/fetchTask", async () => {
  const response = await axios.get(`${API_URL}/api/task`);
  return response.data;
});

export const createTaskAsync = createAsyncThunk(
  "task/createTask",
  async (body) => {
    try {
      const res = await axios.post(`${API_URL}/api/task`, body);
      return res.data;
    } catch (error) {
      console.error("Error during axios.post:", error);
      throw error;
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "task/deleteTask",
  async (taskId) => {
    try {
      await axios.delete(`${API_URL}/api/task/${taskId}`);
      return taskId;
    } catch (error) {
      console.error("Error during axios.delete:", error);
      throw error;
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  "task/updateTask",
  async ({ taskId, body }) => {
    try {
      const res = await axios.put(`${API_URL}/api/task/${taskId}`, body);
      return res.data;
    } catch (error) {
      console.error("Error during axios.post:", error);
      throw error;
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTaskAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTaskAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(createTaskAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default taskSlice.reducer;
