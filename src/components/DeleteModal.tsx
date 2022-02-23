import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../store";
import { deleteUser } from "../store/slices/user";
import { User } from "../models";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function DeleteModal(props: {
  user: User;
  open: boolean;
  closeModal: () => void;
}) {
  const { user, open, closeModal } = props;
  const appDispatch = useAppDispatch();
  const [userId, setUserId] = React.useState(0);

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleDelete = () => {
    appDispatch(deleteUser(user))
      .unwrap()
      .then(() => {
        toast.success("User deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        closeModal();
      })
      .catch(() => {
        setErrorMessage("Error occured");
      });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      data-testid="delete-user-modal"
      disablePortal
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Do you want to delete {user.name}?
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Please, enter the id {user.id} of the user to confirm the deletion.
          </Typography>
          <input
            onChange={(e) => {
              setUserId(parseInt(e.target.value));
              if (e.target.value !== user.id?.toString()) {
                setErrorMessage("Wrong id");
              }
            }}
            data-testid="delete-user-modal-input"
            className="my-2 border p-2"
            placeholder="Enter id"
          />
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <Stack direction="row" spacing={2}>
            <Button
              onClick={closeModal}
              variant="contained"
              color="warning"
              data-testid="user-cancel-button"
            >
              Cancel
            </Button>
            <Button
              disabled={!Boolean(userId) || userId !== user.id}
              onClick={handleDelete}
              variant="contained"
              color="error"
              data-testid="user-delete-button"
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}

export default DeleteModal;
