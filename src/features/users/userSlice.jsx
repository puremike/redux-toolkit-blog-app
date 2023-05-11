import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

// const initialState = [
//   { id: "0", name: "Dude Lebowski" },
//   { id: "1", name: "Neil Young" },
//   { id: "2", name: "Dave Gray" },
// ];

const initialState = [];
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(USERS_URL);
    return [...response.data];
    // const data = response.json();
    // return data;
  } catch (error) {
    return error.message;
  }
});

export const selectAllUsers = (state) => state.users;
export default userSlice.reducer;
