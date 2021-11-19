//import client from "@/apiClient";

import axios from "axios";

const apiPath = "http://localhost:5000";

export default {
  getUserList() {
    return axios.get(apiPath + "/api/user/list");
  },

  getUser(id) {
    return axios.get(apiPath + "/api/user/infobyid/" + id);
  },

  addUser(user) {
    return axios.post(apiPath + "/api/user/create", user);
  },
  updateUser(user) {
    return axios.put(apiPath + "/api/user/update", user);
  },
  deleteUser(id) {
    return axios.delete(apiPath + "/api/user/delete/" + id);
  },
};
