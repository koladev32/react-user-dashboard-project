import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/slices/user";
import { RootState } from "../store";
import UserTable from "./table/UserTable";

const UserTableList = () => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state: RootState) => state.users);

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  return <UserTable users={users} />;
};

export default UserTableList;
