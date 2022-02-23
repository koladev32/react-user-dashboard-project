import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addUser } from "../../store/slices/user";
import { useAppDispatch } from "../../store";

const addUserSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    username: yup.string(),
    city: yup.string(),
  })
interface IAddUserFormProps {
  name: string;
  username: string;
  email: string;
  city: string;
}

const AddUserForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form, setForm] = React.useState<any>({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddUserFormProps>({
    resolver: yupResolver(addUserSchema),
  });
  const [loading, setLoading] = React.useState(false);

  const handleAddUser = () => {
    const data = {
      name: form.name,
      username: form.username,
      email: form.email,
      city: form.city,
    };

    dispatch(addUser(data))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <div>
      <form className="m-4 mx-6" data-testid="user-add-form">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="w-1/2">
            <TextField
              {...register("name", {
                required: true,
              })}
              label="Name"
              value={form.name || ""}
              name="name"
              required
              data-testid="name-input"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && (
              <div className="text-danger">{errors.name.message}</div>
            )}
          </div>
          <div className="w-1/2">
            <TextField
              {...register("email", {
                required: true,
              })}
              label="Email"
              value={form.email || ""}
              name="email"
              required
              data-testid="email-input"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && (
              <div className="text-danger">{errors.email.message}</div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="m-1">
            <TextField
              label="Username"
              {...register("username", {
                required: true,
              })}
              name="username"
              data-testid="username-input"
              value={form.username || ""}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div className="m-1">
            <TextField
              label="City"
              {...register("city", {
                required: true,
              })}
              name="city"
              data-testid="city-input"
              value={form.city || ""}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-6 text-center">
          <Button
            variant="contained"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setLoading(true);
              handleSubmit(handleAddUser);
            }}
            data-testid="add-user-button"
            disabled={
              form.name === "" || form.email === "" || loading
            }
          >
            Create User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
