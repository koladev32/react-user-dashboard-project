import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models";
import axios from "axios";
import API_URL from "../../config";

const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (): Promise<User[]> => {
    const response = await axios.get(`${API_URL}/users/`);
    return response.data;
  }
);

const addUser = createAsyncThunk("users/addUser", async (user: User) => {
  const res = await axios.post(`${API_URL}/users/`, user);
  return res.data;
});

const updateUser = createAsyncThunk("users/updateUser", async (user: User) => {
  const res = await axios.put(`${API_URL}/users/${user.id}`, user);
  return res.data;
});

const deleteUser = createAsyncThunk("users/deleteUser", async (user: User) => {
  await axios.delete(`${API_URL}/users/${user.id}`);
  return user;
});

const findUserById = createAsyncThunk(
  "users/findUserById",
  async (id: number) => {
    const res = await axios.get(`${API_URL}/users/?id=${id}`);
    return res.data;
  }
);

type State = {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
};

export const initialState: State = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  extraReducers: (builder) => {
    /*
     * addUser Cases
     */

    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = true;
      state.users.push(action.payload);
    });

    /*
     * updateUser Cases
     */

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = true;
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    });

    /*
     * deleteUser Cases
     */

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = true;
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    });

    /*
     * findUserById Cases
     */

    builder.addCase(findUserById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(findUserById.fulfilled, (state, action) => {
      state.selectedUser = action.payload.length ? action.payload[0] : null;
      state.loading = false;
    });

    /*
     * fetchUsers Cases
     */

    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
    });
  },
  reducers: {
    sortUsersByName: (state, action) => {
      if (action.payload === "asc") {
        state.users = state.users.sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === "desc") {
        state.users = state.users.sort((a, b) => b.name.localeCompare(a.name));
      }
    },
  },
});

export default userSlice.reducer;

export { findUserById, addUser, updateUser, deleteUser, fetchUsers };
