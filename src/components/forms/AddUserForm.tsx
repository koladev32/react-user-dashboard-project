import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addUser } from "../../store/slices/user";
import { useAppDispatch } from "../../store";
import { toast } from "react-toastify";

const addUserSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  username: yup.string(),
  city: yup.string(),
});
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
  const [errorMessage, setErrorMessage] = React.useState<string>("");

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
        toast.success("New user added", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/");
      })
      .catch(() => {
        setErrorMessage("Error adding user");
      });
  };

  return (
    <div>
      <form className="flex flex-col space-y-4" data-testid="user-add-form">
        <div className="flex flex-row space-x-4">
          <div>
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
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>
          <div>
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
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div>
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
          <div>
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
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div className="mt-6 space-x-4">
          <Button
            variant="contained"
            color="warning"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit(handleAddUser)}
            data-testid="add-user-button"
            disabled={form.name === "" || form.email === ""}
          >
            Create User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
