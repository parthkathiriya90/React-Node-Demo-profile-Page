import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { fetchDeletedUsers, restoreUser } from "../../features/crud/userAPI";

function RestoreDeletedUser(props) {
  const columns = [
    { field: "firstName", headerName: "First name", flex: true, width: 120 },
    { field: "lastName", headerName: "Last name", flex: true, width: 120 },
    { field: "email", headerName: "Email", flex: true, width: 200 },
    { field: "mobile", headerName: "Mobile", flex: true, width: 150 },
    { field: "city", headerName: "City", flex: true, width: 100 },
    { field: "state", headerName: "State", flex: true, width: 100 },
    { field: "country", headerName: "Country", flex: true, width: 100 },
    {
      field: "action",
      headerName: "Restore",
      flex: true,
      width: 80,
      renderCell: (params) => {
        return (
          <Button
            color="secondary"
            onClick={(e) => {
              e.stopPropagation();
              handleRestoreUser(params.row._id);
            }}
          >
            <RestoreFromTrashIcon />
          </Button>
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const deletedUsers = useSelector((state) => state.user.deletedUsers);
  const status = useSelector((state) => state.user.status);

  useEffect(() => {
    if (props.open == true) {
      getUserList();
    }
  }, [props.open, dispatch]);

  const getUserList = () => {
    dispatch(fetchDeletedUsers());
  };

  const rowsWithIds = deletedUsers?.map((row, index) => ({
    ...row,
    id: (index + 1).toString(),
  }));

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleRestoreUser = (id) => {
    dispatch(restoreUser(id));

    setTimeout(() => {
      getUserList();
    }, 200);
  };

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={props.open} onClose={handleClose}>
        <DialogTitle>Restore deleted users</DialogTitle>
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
        <DialogContent sx={{ height: "24rem" }}>
          <>
            <DataGrid
              sx={{ maxHeight: 435 }}
              loading={status == "loading"}
              rows={rowsWithIds}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RestoreDeletedUser;
