// middleware/getUserData.js
import { fetchUsers } from "../features/crud/userAPI";

const fetchUserMiddleware = (store) => (next) => async (action) => {
  const result = next(action);

  if (
    !action.type.startsWith("users/fetchUsers") &&
    action.type.endsWith("/fulfilled")
  ) {
    const state = store.getState();
    const { status } = state.user; // Assuming "user" is the slice name

    // Check if the current action completed an API request
    if (status == "succeeded") {
      // Dispatch an action to fetch user data if no API request is in progress
      setTimeout(() => {
        store.dispatch(fetchUsers());
      }, 500);
    }
  }

  return result;
};

export default fetchUserMiddleware;