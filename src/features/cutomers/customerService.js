import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { getAuthConfig } from "../../utils/axiosconfig";

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all-users`, getAuthConfig());

  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;
