import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { User } from "../../models";
import { DeleteUserModalForm } from "..";

const CustomTable = (props: { users: User[] }) => {
  const navigate = useNavigate();

  const { users } = props;

  return (
    <TableContainer data-testid="user-table" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="User Table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: User) => (
            <TableRow
              key={user.id}
              data-testid={`user-row-${user.id}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="center">{user.name}</TableCell>
              <TableCell align="center">{user.username}</TableCell>
              <TableCell align="center">{user.city}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => navigate(`/users/update/${user.id}/`)}
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell align="center">
                <DeleteUserModalForm user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
