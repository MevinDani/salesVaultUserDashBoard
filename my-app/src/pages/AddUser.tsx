import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, type User } from "../features/users/usersSlice";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddUserForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    if (!form.company) newErrors.company = "Company is required";
    if (!form.city) newErrors.city = "City is required";

    // If there are errors, set them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if everything is valid
    setErrors({
      name: "",
      email: "",
      phone: "",
      company: "",
      city: "",
    });

    const newUser: User = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      website: "N/A",
      company: { name: form.company },
      address: { street: "", city: form.city, zipcode: "" },
    };

    dispatch(addUser(newUser));
    navigate("/"); // redirect back to user list
  };


  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: 400, mx: "auto", mt: 4, padding: '24px', backgroundColor: "white" }}
    >

      <Typography variant="h5" mb={2} color="black">
        Add New User
      </Typography>
      <TextField
        label="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        error={Boolean(errors.name)}
        helperText={errors.name}
      />

      <TextField
        label="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        error={Boolean(errors.email)}
        helperText={errors.email}
      />

      <TextField
        label="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        required
        error={Boolean(errors.phone)}
        helperText={errors.phone}
      />

      <TextField
        label="Company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        required
        error={Boolean(errors.company)}
        helperText={errors.company}
      />

      <TextField
        label="City"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
        required
        error={Boolean(errors.city)}
        helperText={errors.city}
      />

      <Button type="submit" variant="contained" color="primary">
        Add User
      </Button>
    </Box>
  );
}
