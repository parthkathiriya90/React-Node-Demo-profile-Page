const baseURL = process.env.REACT_APP_BASE_URL;

const getWithoutToken = async (url) => {
  try {
    let response = await fetch(`${baseURL}${url}`);

    let res = await response.json();
    if (!response.ok) {
      throw new Error(res.message);
    }
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getWithToken = async (url, token) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    let response = await fetch(`${baseURL}${url}`, requestOptions);

    let res = await response.json();
    if (!response.ok) {
      throw new Error(res.message);
    }
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

const postWithoutToken = async (url, userData) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(userData);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };
  try {
    const response = await fetch(`${baseURL}${url}`, requestOptions);
    let res = await response.json();
    if (!response.ok) {
      throw new Error(res.message);
    }
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

const patchWithFormData = async (url, formData, token) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: formData, // Use the FormData object directly as the body
  };

  try {
    const response = await fetch(`${baseURL}${url}`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const patch = async (url, userData, token) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify(userData);

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
  };
  try {
    const response = await fetch(`${baseURL}${url}`, requestOptions);
    let res = await response.json();
    if (!response.ok) {
      throw new Error(res.message);
    }
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (url, ids, token) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  // const raw = JSON.stringify(ids);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    // body: raw
  };

  try {
    const response = await fetch(`${baseURL}${url}/${ids}`, requestOptions);
    let res = await response.json();
    if (!response.ok) {
      throw new Error(res.message);
    }
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchUsersAPI = async (token) => {
  const response = await getWithToken("/user", token);
  return response.data;
};

const fetchProfileAPI = async (token) => {
  const response = await getWithToken("/profile", token);
  return response.data;
};

const getSkillsByIdAPI = async (token) => {
  const response = await getWithToken("/profile/skills", token);
  return response.data;
};

const fetchDeletedUsersAPI = async (token) => {
  const response = await getWithToken("/user/deleted", token);
  return response.data;
};

const addUserAPI = async (userData) => {
  try {
    const response = await postWithoutToken("/auth/register", userData);

    return response;
  } catch (error) {
    throw error;
  }
};

const loginAPI = async (userData) => {
  try {
    const response = await postWithoutToken("/auth/login", userData);

    return response;
  } catch (error) {
    throw error;
  }
};

const verifyEmailAPI = async (code) => {
  try {
    const response = await getWithoutToken(`/auth/verify-email/${code}`);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const logoutAPI = async (token) => {
  try {
    const response = await getWithToken("/auth/logout", token);

    return response;
  } catch (error) {
    throw error;
  }
};

const updateUserAPI = async (userData, id, token) => {
  try {
    const response = await patch(
      `/user/updateProfile/${id}`,
      userData.data,
      token
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const uploadProfileImageAPI = async (file, id, token) => {
  try {
    // Create a new FormData object
    const formData = new FormData();
    // Append key-value pairs to the FormData object
    formData.append("image", file);
    formData.append("id", id);

    const response = await patchWithFormData(
      `/profile/profileImage`,
      formData,
      token
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const restoreUserAPI = async (id, token) => {
  try {
    const response = await patch(`/user/restore/${id}`, {}, token);

    return response;
  } catch (error) {
    throw error;
  }
};

const deleteUserAPI = async (ids, token) => {
  try {
    // const idsString = ids.join(",");
    const response = await deleteUser("/user", ids, token);

    return response;
  } catch (error) {
    throw error;
  }
};

export {
  fetchUsersAPI,
  addUserAPI,
  loginAPI,
  verifyEmailAPI,
  logoutAPI,
  updateUserAPI,
  deleteUserAPI,
  fetchDeletedUsersAPI,
  restoreUserAPI,
  uploadProfileImageAPI,
  fetchProfileAPI,
  getSkillsByIdAPI,
};
