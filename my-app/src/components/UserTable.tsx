import React, { useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { type AppDispatch, type RootState } from "../app/store";
import { selectUser } from "../features/users/usersSlice";
import { fetchUsers } from "../features/users/usersThunks";


const UserTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.users
    );


    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell><strong>Email</strong></TableCell>
                        <TableCell><strong>Phone</strong></TableCell>
                        <TableCell><strong>Company</strong></TableCell>
                        <TableCell><strong>City</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((user) => (
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
    );
};

export default UserTable;
