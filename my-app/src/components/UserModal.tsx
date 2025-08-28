import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../app/store";
import { closeUser } from "../features/users/usersSlice";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";

const UserModal: React.FC = () => {
    const dispatch = useDispatch();
    const selectedUser = useSelector(
        (state: RootState) => state.users.selectedUser
    );

    const handleClose = () => {
        dispatch(closeUser());
    };

    return (
        <Dialog open={!!selectedUser} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>User Details</DialogTitle>
            <DialogContent dividers>
                {selectedUser && (
                    <>
                        <Typography variant="h6">{selectedUser.name}</Typography>
                        <Typography>Email: {selectedUser.email}</Typography>
                        <Typography>Phone: {selectedUser.phone}</Typography>
                        <Typography>Website: {selectedUser.website}</Typography>
                        <Typography>
                            Address: {selectedUser.address.street},{" "}
                            {selectedUser.address.city},{" "}
                            {selectedUser.address.zipcode}
                        </Typography>
                        <Typography>Company: {selectedUser.company.name}</Typography>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserModal;
