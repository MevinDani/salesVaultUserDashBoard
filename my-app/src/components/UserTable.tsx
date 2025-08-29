
import React, { useEffect, useState } from "react";
import {
    Table, TableHead, TableBody, TableCell, TableRow,
    TableContainer, Paper, TablePagination, TextField,
    TableSortLabel
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/users/usersThunks";
import { type RootState, type AppDispatch } from "../app/store";
import { selectUser, setSearchQuery, setSort } from "../features/users/usersSlice";
import { selectFilteredSortedUsers } from "../features/users/usersSelectors";


const UserTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector(selectFilteredSortedUsers);
    const loading = useSelector((state: RootState) => state.users.loading);
    const error = useSelector((state: RootState) => state.users.error);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { sortField, sortOrder } = useSelector((state: RootState) => state.users);

    const handleSort = (field: "name" | "email") => {
        dispatch(setSort(field));
    };

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // Pagination handlers
    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    // console.log(users ? users : '')
    return (
        <Paper sx={{ padding: 2 }}>
            {/* Search + Sort controls */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
                <TextField
                    label="Search by name or email"
                    variant="outlined"
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                />
                {/* <Button variant="contained" onClick={() => dispatch(setSort("name"))}>
                    Sort by Name
                </Button>
                <Button variant="contained" onClick={() => dispatch(setSort("email"))}>
                    Sort by Email
                </Button> */}
            </div>

            {/* Table */}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell><b>Name</b></TableCell>
                            <TableCell><b>Email</b></TableCell> */}

                            <TableCell>
                                <TableSortLabel
                                    // active={sortField === "name"}
                                    active={true}
                                    direction={sortField === "name" ? sortOrder : "asc"}
                                    onClick={() => handleSort("name")}
                                // hideSortIcon={false}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    // active={sortField === "email"}
                                    active={true}
                                    direction={sortField === "email" ? sortOrder : "asc"}
                                    onClick={() => handleSort("email")}
                                // hideSortIcon={false}
                                >
                                    Email
                                </TableSortLabel>
                            </TableCell>
                            <TableCell><b>Phone</b></TableCell>
                            <TableCell><b>Company</b></TableCell>
                            <TableCell><b>City</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => (
                                <TableRow
                                    key={user.id}
                                    hover
                                    style={{ cursor: "pointer" }}
                                    onClick={() => dispatch(selectUser(user))}
                                >
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.company.name}</TableCell>
                                    <TableCell>{user.address.city}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                component="div"
                count={users.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default UserTable;
