import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfileAPI, getSkillsByIdAPI } from "../../Services/auth";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { getState }) => {
    const state = getState();
    const token = state.user.access_token;

    const response = await fetchProfileAPI(token);
    return response;
  }
);

export const getSkillsByID = createAsyncThunk(
  "profile/getSkillsByID",
  async (_, { getState }) => {
    const state = getState();
    const token = state.user.access_token;

    const response = await getSkillsByIdAPI(token);
    return response;
  }
);
