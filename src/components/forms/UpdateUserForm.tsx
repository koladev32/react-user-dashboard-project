import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { findUserById, updateUser } from "../../store/slices/user";
import { RootState, useAppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const addUserSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    username: yup.string(),
    city: yup.string(),
  })
  .required();

interface IAddUserFormProps {
  name: string;
  username: string;
  email: string;
  city: string;
}

const UpdateUserForm = () => {
  const { id } = useParams() as unknown as { id: number };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const [form, setForm] = React.useState<any>({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddUserFormProps>({
    resolver: yupResolver(addUserSchema),
  });
  const { selectedUser, loading } = useSelector(
    (state: RootState) => state.users
  );

  React.useEffect(() => {
    dispatch(findUserById(id));
  }, []);

  if (loading) return <div>Loading...</div>;

  const handleAddUser = () => {
    const data = {
      id: selectedUser?.id,
      name: form.name,
      username: form.username,
      email: form.email,
      city: form.city,
    };

    appDispatch(updateUser(data))
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
      <form className="m-4 mx-6">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="w-1/2">
            <TextField
              {...register("name", {
                required: true,
              })}
              label="Name"
              value={form.name || selectedUser?.name}
              name="name"
              required
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
              value={form.email || selectedUser?.email}
              name="email"
              required
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
              value={form.username || selectedUser?.username}
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
              value={form.city || selectedUser?.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-6 text-center">
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit(handleAddUser)}
          >
            Update User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserForm;
