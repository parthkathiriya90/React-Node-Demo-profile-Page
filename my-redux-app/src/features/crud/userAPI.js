import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addUserAPI,
  deleteUserAPI,
  fetchDeletedUsersAPI,
  fetchUsersAPI,
  loginAPI,
  logoutAPI,
  restoreUserAPI,
  updateUserAPI,
  uploadProfileImageAPI,
  verifyEmailAPI,
} from "../../Services/auth";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { getState }) => {
    const state = getState();
    const token = state.user.access_token;

    const response = await fetchUsersAPI(token);
    return response;
  }
);

export const fetchDeletedUsers = createAsyncThunk(
  "users/fetchDeletedUsers",
  async (_, { getState }) => {
    const state = getState();
    const token = state.user.access_token;

    const response = await fetchDeletedUsersAPI(token);
    return response;
  }
);

export const addUser = createAsyncThunk("users/addUser", async (userData) => {
  return addUserAPI(userData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
});

export const login = createAsyncThunk("users/login", async (userData) => {
  return loginAPI(userData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
});

export const verifyEmail = createAsyncThunk(
  "users/verifyEmail",
  async (code) => {
    return verifyEmailAPI(code)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
);

export const logout = createAsyncThunk(
  "users/logout",
  async (_, { getState }) => {
    const state = getState();
    const token = state.user.access_token;

    try {
      const response = await logoutAPI(token);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (userData, { getState }) => {
    const state = getState();
    const token = state.user.access_token;

    try {
      const response = await updateUserAPI(userData, userData.id, token);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  "users/uploadProfileImage",
  async (file, { getState }) => {
    const state = getState();
    const token = state.user.access_token;

    try {
      const response = await uploadProfileImageAPI(file.file, file.id, token);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const restoreUser = createAsyncThunk(
  "users/restoreUser",
  async (id, { getState }) => {
    const state = getState();
    const token = state.user.access_token;

    try {
      const response = await restoreUserAPI(id, token);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (ids, { getState }) => {
    const state = getState();
    const token = state.user.access_token;

    try {
      const response = await deleteUserAPI(ids, token);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
