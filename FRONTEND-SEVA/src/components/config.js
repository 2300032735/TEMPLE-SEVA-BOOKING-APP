const config = {
  url: "http://localhost:1947"
};

export default config;
// Centralized API route definitions for Seva backend
export const API_ROUTES = {
	// List all sevas and create a new seva
	GET_ALL_SEVAS: "/api/sevas",
	ADD_SEVA: "/api/sevas",

	// Update and delete expect an id argument
	UPDATE_SEVA: (id) => `/api/sevas/${id}`,
	DELETE_SEVA: (id) => `/api/sevas/${id}`,
};
