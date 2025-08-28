import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "./usersSlice";

export const fetchUsers = createAsyncThunk<User[]>(
    "users/fetchUsers",
    async () => {
        const response = await axios.get<User[]>(
            "https://jsonplaceholder.typicode.com/users"
        );
        return response.data;
    }
);
