
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserDash from "./pages/UserDash";
import AddUserForm from "./pages/AddUser";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDash />} />
        <Route path="/add-user" element={<AddUserForm />} />
      </Routes>
    </Router>
  );
};

export default App;

