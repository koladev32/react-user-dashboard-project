import React from "react";
import { useDispatch } from "react-redux";
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
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { userSlice } from "../../store/slices/user";
import IconButton from "@mui/material/IconButton";

enum SortingEnums {
  ASC = "asc",
  DESC = "desc",
}

enum SortingTypes {
  ASC = "A-Z",
  DESC = "Z-A",
}

const CustomTable = (props: { users: User[] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = React.useState<SortingEnums>(SortingEnums.ASC);
  const [sortType, setSortType] = React.useState<SortingTypes>(
    SortingTypes.ASC
  );

  React.useEffect(() => {
    if (sortBy === SortingEnums.ASC) {
      setSortType(SortingTypes.ASC);
    }
    if (sortBy === SortingEnums.DESC) {
      setSortType(SortingTypes.DESC);
    }
  }, [sortBy]);

  dispatch(userSlice.actions.sortUsersByName(sortBy));
  const { users } = props;

  return (
    <TableContainer data-testid="user-table" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="User Table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="center">
              <div className="flex flex-row justify-center items-center">
                <p>Name ({sortType})</p>
                {sortBy === SortingEnums.ASC && (
                  <IconButton onClick={() => setSortBy(SortingEnums.DESC)}>
                    <ArrowDownward style={{ width: 18, height: 18 }} />
                  </IconButton>
                )}
                {sortBy === SortingEnums.DESC && (
                  <IconButton onClick={() => setSortBy(SortingEnums.ASC)}>
                    <ArrowUpward style={{ width: 18, height: 18 }} />
                  </IconButton>
                )}
              </div>
            </TableCell>
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
