import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  deleteUser,
  editUser,
  fetchDeletedUsers,
  fetchUsers,
  login,
  logout,
  restoreUser,
  uploadProfileImage,
  verifyEmail,
} from "./userAPI";

const initialState = {
  users: [],
  deletedUsers: [],
  error: { location: "", message: "", isError: false },
  redirect: "",
  access_token: "",
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    /* ADD NEW USER */
    /* newUser: (state, action) => {
      let newValue = []
      let redirect = ''
      let id = (state?.value && state?.value?.length > 0) ? state.value[state.value.length - 1].id + 1 : 1

      if (state?.value && state?.value?.length > 0) {
        let checkEmailExistence = state?.value.findIndex((item) => item.email == action.payload?.email)

        if (checkEmailExistence == -1) {
          redirect = '/login'
          newValue = [...state?.value, { ...action.payload, id: id, status: "unAuthenticated" }]
        } else {
          return { ...state, error: { location: "register", message: "Your email address is already exist!", isError: true } }
        }

      } else {
        newValue = [{ ...action.payload, id: id, status: "unAuthenticated" }]
      }

      return { ...state, value: newValue, redirect };
    }, */

    /*  login: (state, action) => {
       let email = action.payload.email
       let password = action.payload.password
 
       if (state.error.isError && state.error.location == 'login') {
         state = { ...state, error: { location: "", message: "", isError: false } }
       }
 
       if (state.value && state.value.some((item) => email == item.email && password == item.password)) {
         const updatedList = state.value.map((item) => {
           if (email == item.email && password == item.password) {
             return { ...item, status: "authenticated" }
           } else {
             return item
           }
         })
         return { ...state, value: updatedList };
       } else {
 
         return { ...state, error: { location: "login", message: "Your credential is wrong!", isError: true } }
       }
     }, */

    // logout: (state, action) => {
    //   let email = action.payload.email

    //   const updatedList = state.value.map((item) => {
    //     if (email == item.email) {
    //       return { ...item, status: "unAuthenticated" }
    //     } else {
    //       return item
    //     }

    //   })

    //   return { ...state, value: updatedList };
    // },

    /* REMOVE USER */
    // removeUser: (state, action) => {
    //   let ids = action.payload

    //   const updatedList = state.value.filter((item) => !ids.includes(item.id))

    //   return { ...state, value: updatedList };
    // },

    // /* EDIT USER */
    // editUser: (state, action) => {
    //   let id = action.payload.id[0]
    //   let data = action.payload.data

    //   const updatedList = state.value.map((item, index) => {
    //     if (id == item.id) {
    //       return { ...data, id: id, status: state.value[index].status }
    //     } else {
    //       return item
    //     }

    //   })

    //   return { ...state, value: updatedList };
    // },

    /* Hide alert */
    clearError: (state, action) => {
      return { ...state, error: { location: "", message: "", isError: false } };
    },
  },

  extraReducers: (builder) => {
    // Add case for fetchUsers.fulfilled
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
        state.error = { location: "", message: "", isError: false };
      })
      // Add case for fetchUsers.rejected
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          location: "userList",
          message: action.error.message,
          isError: true,
        };
      })
      // Add case for addUser.fulfilled
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = {
          location: "register",
          message: action.payload.message,
          isError: false,
        };
      })
      // Add case for addUser.rejected
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          location: "register",
          message: action.error.message,
          isError: true,
        };
      })
      // Add case for editUser.fulfilled
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = {
          location: "update",
          message: action.payload.message,
          isError: false,
        };
      })
      // Add case for editUser.rejected
      .addCase(editUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          location: "update",
          message: action.error.message,
          isError: true,
        };
      })
      // Add case for uploadProfileImage.fulfilled
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = {
          location: "uploadImage",
          message: action.payload.message,
          isError: false,
        };
      })
      // Add case for uploadProfileImage.rejected
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          location: "uploadImage",
          message: action.error.message,
          isError: true,
        };
      })
      // Add case for deleteUser.fulfilled
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = {
          location: "delete",
          message: action.payload.message,
          isError: false,
        };
      })
      // Add case for deleteUser.rejected
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          location: "delete",
          message: action.error.message,
          isError: true,
        };
      })
      // Add case for fetchDeletedUsers.fulfilled
      .addCase(fetchDeletedUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deletedUsers = action.payload;
        state.error = { location: "", message: "", isError: false };
      })
      // Add case for fetchDeletedUsers.rejected
      .addCase(fetchDeletedUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          location: "deletedUserList",
          message: action.error.message,
          isError: true,
        };
      })
      // Add case for restoreUser.fulfilled
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = {
          location: "restoreUser",
          message: action.payload.message,
          isError: false,
        };
      })
      // Add case for restoreUser.rejected
      .addCase(restoreUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          location: "restoreUser",
          message: action.error.message,
          isError: true,
        };
      })
      // Add case for login.fulfilled
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.access_token = action.payload.access_token;
        state.error = { location: "login", message: "", isError: false };
      })
      // Add case for login.rejected
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          location: "login",
          message: action.error.message,
          isError: true,
        };
      })
      // Add case for logout.fulfilled
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.access_token = "";
        state.error = {
          location: "logout",
          message: action.payload.message,
          isError: false,
        };
      })
      // Add case for logout.rejected
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          location: "logout",
          message: action.error.message,
          isError: true,
        };
      })
      // Add case for verifyEmail.fulfilled
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.access_token = "";
        state.error = {
          location: "verifyEmail",
          message: action.payload.message,
          isError: false,
        };
      })
      // Add case for verifyEmail.rejected
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          location: "verifyEmail",
          message: action.error.message,
          isError: true,
        };
      })
      // Match all pending actions for fetchUsers and addUser
      .addMatcher(
        (action) => action.type.endsWith("/pending"), // Match all actions with type ending with '/pending'
        (state) => {
          state.error = { location: "", message: "", isError: false };
          state.status = "loading";
        }
      );
  },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;
