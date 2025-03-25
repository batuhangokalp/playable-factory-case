import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getToken = () => {
  return localStorage.getItem("storedToken");
};

const doneTasksFromLocalStorage = () => {
  const storedDoneTasks = localStorage.getItem("storedDoneTasks");
  return storedDoneTasks ? JSON.parse(storedDoneTasks) : [];
};

export const fetchTaskAsync = createAsyncThunk("task/fetchTask", async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/api/task`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const createTaskAsync = createAsyncThunk(
  "task/createTask",
  async (body) => {
    const token = getToken();
    try {
      const res = await axios.post(`${API_URL}/api/task`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    const token = getToken();
    try {
      await axios.delete(`${API_URL}/api/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    const token = getToken();
    try {
      const res = await axios.put(`${API_URL}/api/task/${taskId}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    doneTasks: doneTasksFromLocalStorage(),
    status: "idle",
    error: null,
  },
  reducers: {
    markTaskAsDone: (state, action) => {
      const taskIndex = state.items.findIndex(
        (task) => task._id === action.payload
      );
      if (taskIndex !== -1) {
        const doneTask = state.items[taskIndex];
        state.doneTasks.push(doneTask);
        state.items.splice(taskIndex, 1);

        localStorage.setItem(
          "storedDoneTasks",
          JSON.stringify(state.doneTasks)
        );
      }
    },
    clearDoneTasks: (state) => {
      state.doneTasks = [];
      localStorage.removeItem("doneTasks");
    },
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

export const { markTaskAsDone, clearDoneTasks } = taskSlice.actions;
export default taskSlice.reducer;
