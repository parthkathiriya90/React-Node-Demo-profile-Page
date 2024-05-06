import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Button, Container, Grid } from "@mui/material";
import EditForm from "./DialogBox/EditForm";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import { deleteUser, fetchUsers } from "../features/crud/userAPI";
import RestoreDeletedUser from "./DialogBox/RestoreDeletedUser";
import Confirmation from "./DialogBox/Confirmation";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import UploadImage from "./DialogBox/UploadImage";

export default function UserList() {
  const columns = [
    {
      field: "_id",
      headerName: "id",
      width: 50,
    },
    {
      field: "Avatar",
      headerName: "Avatar",
      width: 150,
      align: "left",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            <Box sx={{ px: 4.5}}>
              <Avatar
                sx={{ width: 50, height: 50 }}
                alt="profile-img"
                src={
                  params.row?.image?.path
                    ? params.row.image.path
                    : `https://source.unsplash.com/featured/50x50/?developer,${params.row.id}`
                }
              />
            </Box>
          </>
        );
      },
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 150,
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
    },
    {
      field: "state",
      headerName: "State",
      width: 100,
    },
    {
      field: "country",
      headerName: "Country",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 80,
      align: "center",
      headerAlign: "center",
      valueGetter: (value, row) =>
        `${row.status == "authenticated" ? "🟢" : "🔴"}`,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            <Button
              aria-label="delete"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                setConfirmationModal(true);
                setSelectedIds(params.row._id);
              }}
            >
              <DeleteIcon />
            </Button>
            <Button
              color="secondary"
              onClick={(e) => {
                e.stopPropagation();
                handleEditUser(params.row.id);
              }}
            >
              <EditNoteIcon />
            </Button>
            <Button
              color="secondary"
              onClick={(e) => {
                e.stopPropagation();
                handleUploadImage(params.row.id);
              }}
            >
              <AddAPhotoIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const status = useSelector((state) => state.user.status);
  const [selectedIds, setSelectedIds] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [isUploadImage, setIsUploadImageOpen] = useState(false);
  const [restoreModal, setRestoreModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  useEffect(() => {
    getUserList();
  }, [dispatch, restoreModal]);

  const getUserList = () => {
    dispatch(fetchUsers());
  };

  const rowsWithIds = users?.map((row, index) => ({
    ...row,
    id: (index + 1).toString(),
  }));

  const handleRemoveUser = (id) => {
    setSelectedUser(users.filter((items, index) => id == index + 1));

    dispatch(deleteUser(selectedIds));

    setTimeout(() => {
      getUserList();
    }, 200);

    setConfirmationModal(false);
  };

  const handleEditUser = (id) => {
    setSelectedUser(users.filter((items, index) => id == index + 1));
    setOpen(true);
  };

  const handleUploadImage = (id) => {
    setSelectedUser(users.filter((items, index) => id == index + 1));
    setIsUploadImageOpen(true);
  };

  const handleRestoreDeletedUser = () => {
    setRestoreModal(!restoreModal);
  };

  return (
    <>
      <EditForm
        open={open}
        setOpen={setOpen}
        selectedIds={selectedIds}
        selectedUser={selectedUser}
      />
      <UploadImage
        open={isUploadImage}
        setOpen={setIsUploadImageOpen}
        selectedIds={selectedIds}
        selectedUser={selectedUser}
      />
      <RestoreDeletedUser
        open={restoreModal}
        setOpen={setRestoreModal}
        selectedIds={selectedIds}
        selectedUser={selectedUser}
      />
      <Confirmation
        open={confirmationModal}
        handleConfirm={handleRemoveUser}
        selectedUser={selectedUser}
        content={"Are you sure you want to remove your users!"}
        handleClose={() => setConfirmationModal(false)}
      />

      <section>
        <Container maxWidth="xl" sx={{ mt: 4 }} textAlign="center">
          <Box style={{ height: 400, width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <h2>User Listing</h2>
              </Grid>
              <Grid item xs={6}>
                <Box textAlign="right">
                  {/* <Button
                    disabled={selectedIds.length == 0}
                    aria-label="delete"
                    variant="outlined"
                    color="error"
                    sx={{ mt: 2, mx: 1 }}
                    onClick={setConfirmationModal}
                  >
                    <DeleteIcon />
                  </Button> */}

                  <Button
                    disabled={false}
                    variant="outlined"
                    color="info"
                    sx={{ mt: 2, mx: 1 }}
                    onClick={handleRestoreDeletedUser}
                  >
                    <RestoreIcon />
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <DataGrid
              loading={status == "loading"}
              rows={rowsWithIds}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              //   checkboxSelection
              columnVisibilityModel={{
                _id: false,
              }}
              //   onRowSelectionModelChange={(ids, select) => {
              //     let row = select.api.getSelectedRows();
              //     let data = [...row].map(([key, value]) => value);

              //     setSelectedUser(data);
              //     setSelectedIds(ids);
              //   }}
            />
          </Box>
        </Container>
      </section>
    </>
  );
}
