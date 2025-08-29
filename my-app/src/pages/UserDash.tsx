import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal";

const UserDash: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ color: "black" }}>User Management Dashboard</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/add-user")}
                >
                    Add User
                </Button>
            </div>

            <UserTable />
            <UserModal />
        </div>
    );
};

export default UserDash;
