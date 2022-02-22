import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import { User } from "../../models";
import { TextField } from "@mui/material";
import { useAppDispatch } from "../../store";
import { deleteUser } from "../../store/slices/user";

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

function DeleteUserModalForm(props: {user:User}) {

  const appDispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {user} = props;

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleDelete = () => {
    appDispatch(deleteUser(user)).unwrap()
    .then(() => {
      setErrorMessage("");
      handleClose();
    }).catch(e => {
      console.log(e);
    });
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="error">
        Delete
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Do you want to delete the {user.name}?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Please, enter the id {user.id} of the user to confirm the deletion.
            </Typography>
            <input onChange={(e) => {
              setUserId(parseInt(e.target.value));
              if(e.target.value !== user.id?.toString()) {
                setErrorMessage("Wrong id");
              }
            }}/>
            {errorMessage && <Typography id="transition-modal-description" sx={{ mt: 2 }}>{errorMessage}</Typography>}
            <Stack direction="row" spacing={2}>
              <Button onClick={handleClose} variant="contained" color="warning">
                Cancel
              </Button>
              <Button disabled={!Boolean(userId) || userId !== user.id} onClick={handleDelete} variant="contained" color="error">
                Delete
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default DeleteUserModalForm;
