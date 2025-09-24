import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

// API functions
export const fetchUsers = () => axios.get(BASE_URL);
export const createUser = (payload) => axios.post(BASE_URL, payload);
export const modifyUser = (id, payload) => axios.put(`${BASE_URL}/${id}`, payload);
export const removeUser = (id) => axios.delete(`${BASE_URL}/${id}`);
