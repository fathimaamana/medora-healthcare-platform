export const getUserRole = () => {

  return localStorage.getItem("role");
};

export const isAdmin = () => {

  return getUserRole() === "admin";
};

export const isPharmacist = () => {

  return getUserRole() === "pharmacist";
};

export const isViewer = () => {

  return getUserRole() === "viewer";
};