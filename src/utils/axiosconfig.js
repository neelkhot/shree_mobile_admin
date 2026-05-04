export const getStoredUser = () => {
  try {
    return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  } catch (error) {
    localStorage.removeItem("user");
    return null;
  }
};

const getUserFromLocalStorage = () => getStoredUser();

export const getAuthConfig = () => {
  const user = getUserFromLocalStorage();

  return {
    headers: {
      Authorization: `Bearer ${user?.token || ""}`,
      Accept: "application/json",
    },
  };
};

export const config = {
  headers: {
    get Authorization() {
      return `Bearer ${getUserFromLocalStorage()?.token || ""}`;
    },
    Accept: "application/json",
  },
};
