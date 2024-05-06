import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile, getSkillsByID } from "./profileAPI";

const initialState = {
  data: {},
  error: { location: "", message: "", isError: false },
  status: "idle",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {
    /* Hide alert */
    clearError: (state, action) => {
      return { ...state, error: { location: "", message: "", isError: false } };
    },
  },

  extraReducers: (builder) => {
    builder
      // Add case for fetchProfile.fulfilled
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = { location: "", message: "", isError: false };
      })
      // Add case for fetchProfile.rejected
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          location: "profile",
          message: action.error.message,
          isError: true,
        };
      })
      // Add case for getSkillsByID.fulfilled
      .addCase(getSkillsByID.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.skills = action.payload;
        state.error = { location: "", message: "", isError: false };
      })
      // Add case for getSkillsByID.rejected
      .addCase(getSkillsByID.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          location: "skills",
          message: action.error.message,
          isError: true,
        };
      })
      // Match all pending actions
      .addMatcher(
        (action) => action.type.endsWith("/pending"), // Match all actions with type ending with '/pending'
        (state) => {
          state.error = { location: "", message: "", isError: false };
          state.status = "loading";
        }
      );
  },
});

export const { clearError } = profileSlice.actions;

export default profileSlice.reducer;
