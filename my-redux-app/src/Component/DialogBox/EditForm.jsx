import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { editUser, fetchUsers } from "../../features/crud/userAPI";

function EditForm(props) {
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    city: "",
    country: "",
    state: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setUserFormData(props.selectedUser.length > 0 ? props.selectedUser[0] : {});
  }, [props.selectedUser]);

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            dispatch(editUser({ id: userFormData._id, data: formJson }));

            setTimeout(() => {
                dispatch(fetchUsers());
            }, 1000);
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit User Data</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="firstName"
                  margin="dense"
                  required
                  fullWidth
                  label="First Name"
                  variant="standard"
                  name="firstName"
                  value={userFormData.firstName}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="LastName"
                  margin="dense"
                  required
                  fullWidth
                  label="Last Name"
                  variant="standard"
                  name="lastName"
                  value={userFormData.lastName}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="email"
                  margin="dense"
                  required
                  fullWidth
                  label="email"
                  variant="standard"
                  name="email"
                  value={userFormData.email}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      [e.target.name]: e.target.value.trim().toLowerCase(),
                    })
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="mobile"
                  margin="dense"
                  required
                  fullWidth
                  label="mobile"
                  variant="standard"
                  name="mobile"
                  value={userFormData.mobile}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="city"
                  margin="dense"
                  required
                  fullWidth
                  label="city"
                  variant="standard"
                  name="city"
                  value={userFormData.city}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="state"
                  margin="dense"
                  required
                  fullWidth
                  label="state"
                  variant="standard"
                  name="state"
                  value={userFormData.state}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="country"
                  margin="dense"
                  required
                  fullWidth
                  label="country"
                  variant="standard"
                  name="country"
                  value={userFormData.country}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditForm;
