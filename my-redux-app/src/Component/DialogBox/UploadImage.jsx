import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  editUser,
  fetchUsers,
  uploadProfileImage,
} from "../../features/crud/userAPI";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

function UploadImage(props) {
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    city: "",
    country: "",
    state: "",
    profileImage: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setUserFormData(props.selectedUser.length > 0 ? props.selectedUser[0] : {});
  }, [props.selectedUser]);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserFormData({ ...userFormData, profileImage: file });
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("image-upload");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <>
      <Dialog open={props.open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Upload profile image</DialogTitle>
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
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box>
                <Paper
                  sx={{
                    borderRadius: "20rem",
                    padding: `${userFormData.profileImage ? "0.1rem" : "3rem"}`,
                    border: "1px solid #8080801c",
                  }}
                  onClick={handleUploadClick}
                >
                  <ButtonBase sx={{ borderRadius: "20rem" }}>
                    {userFormData.profileImage ? (
                      <Avatar
                        sx={{ width: 150, height: 150 }}
                        alt="profile-img"
                        src={
                          userFormData.profileImage
                            ? URL.createObjectURL(userFormData.profileImage)
                            : "assets/Images/userProfile.png"
                        }
                      />
                    ) : (
                      <AddAPhotoIcon sx={{ fontSize: 50 }} />
                    )}
                  </ButtonBase>
                </Paper>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </DialogContent>
        <DialogActions justifyContent={"center"}>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(
                uploadProfileImage({
                  file: userFormData.profileImage,
                  id: userFormData._id,
                })
              );
              handleClose();
            }}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UploadImage;
