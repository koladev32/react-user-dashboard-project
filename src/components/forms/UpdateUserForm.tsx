import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { findUserById, updateUser } from "../../store/slices/user";
import { RootState, useAppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  React.useEffect(() => {
    dispatch(findUserById(id));
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;

  const handleAddUser = () => {
    const data = {
      id: selectedUser?.id,
      name: form.name || selectedUser?.name,
      username: form.username || selectedUser?.username,
      email: form.email || selectedUser?.email,
      city: form.city || selectedUser?.city,
    };

    appDispatch(updateUser(data))
      .unwrap()
      .then(() => {
        toast.success("User updated", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/");
      })
      .catch(() => {
        setErrorMessage("Error updating user");
      });
  };

  return (
    <div>
      <form className="flex flex-col space-y-4" data-testid="user-update-form">
        <div className="flex flex-row space-x-4">
          <div>
            <TextField
              {...register("name", {
                required: true,
              })}
              label="Name"
              value={form.name || selectedUser?.name}
              name="name"
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
              value={form.email || selectedUser?.email}
              name="email"
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
              value={form.username || selectedUser?.username}
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
              value={form.city || selectedUser?.city}
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
            data-testid="update-user-button"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserForm;
