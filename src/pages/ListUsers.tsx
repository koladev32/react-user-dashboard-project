import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, UserTableList } from "../components";

const ListUsers = () => {
  const navigate = useNavigate();
  return (
    <Layout title="List of users">
      <Button
        variant="contained"
        color="primary"
        className="self-end"
        onClick={() => navigate("/users/add/")}
      >
        Create User
      </Button>
      <UserTableList />
    </Layout>
  );
};

export default ListUsers;
