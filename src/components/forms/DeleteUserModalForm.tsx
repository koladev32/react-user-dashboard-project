import * as React from "react";
import Button from "@mui/material/Button";
import { User } from "../../models";

import DeleteModal from "../DeleteModal";

function DeleteUserModalForm(props: { user: User }) {
  const [open, setOpen] = React.useState(false);
  const { user } = props;

  return (
    <div>
      <Button onClick={() => setOpen(true)} variant="contained" color="error">
        Delete
      </Button>
      <DeleteModal opened={open} user={user} />
    </div>
  );
}

export default DeleteUserModalForm;
