import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersThunks";

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: { name: string };
    address: { street: string; city: string; zipcode: string };
}

interface UsersState {
    data: User[];
    loading: boolean;
    error: string | null;
    selectedUser: User | null;
    searchQuery: string;
    sortField: "name" | "email" | null;
    sortOrder: "asc" | "desc";
}

const initialState: UsersState = {
    data: [],
    loading: false,
    error: null,
    selectedUser: null,
    searchQuery: "",
    sortField: null,
    sortOrder: "asc",
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        selectUser(state, action: PayloadAction<User | null>) {
            state.selectedUser = action.payload;
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        setSort(state, action: PayloadAction<"name" | "email">) {
            if (state.sortField === action.payload) {
                // toggle asc/desc
                state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
            } else {
                state.sortField = action.payload;
                state.sortOrder = "asc";
            }
        },
        addUser(state, action: PayloadAction<User>) {
            state.data.push(action.payload);
        },
        closeUser: (state) => {
            state.selectedUser = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                const existingIds = new Set(state.data.map(u => u.id));
                const newData = action.payload.filter(u => !existingIds.has(u.id));
                state.data = [...state.data, ...newData];
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch users";
            });
    },
});

export const { selectUser, setSearchQuery, setSort, addUser, closeUser } = usersSlice.actions;
export default usersSlice.reducer;
