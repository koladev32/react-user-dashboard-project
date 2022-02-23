import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/slices/user";
import { RootState } from "../store";
import CustomTable from "./table/CustomTable";

const UserTable = () => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state: RootState) => state.users);

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (loading) return <div>Loading...</div>;
  return <CustomTable users={users} />;
};

export default UserTable;
