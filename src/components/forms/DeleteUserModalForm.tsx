import * as React from "react";
import Button from "@mui/material/Button";
import { User } from "../../models";

import DeleteModal from "../DeleteModal";

function DeleteUserModalForm(props: { user: User }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const { user } = props;

  React.useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <div>
      <Button onClick={() => setOpen(true)} variant="contained" color="error">
        Delete
      </Button>
      <DeleteModal open={open} user={user} closeModal={handleClose} />
    </div>
  );
}

export default DeleteUserModalForm;
