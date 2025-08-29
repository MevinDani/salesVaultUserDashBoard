// src/redux/usersSelectors.ts
import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "../../app/store";

export const selectUsers = (state: RootState) => state.users.data;
export const selectSearchQuery = (state: RootState) => state.users.searchQuery;
export const selectSortField = (state: RootState) => state.users.sortField;
export const selectSortOrder = (state: RootState) => state.users.sortOrder;

export const selectFilteredSortedUsers = createSelector(
    [selectUsers, selectSearchQuery, selectSortField, selectSortOrder],
    (users, searchQuery, sortField, sortOrder) => {
        let filtered = users;

       
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
            );
        }

       
        if (sortField) {
            filtered = [...filtered].sort((a, b) => {
                const compare = a[sortField].localeCompare(b[sortField]);
                return sortOrder === "asc" ? compare : -compare;
            });
        }

        return filtered;
    }
);
