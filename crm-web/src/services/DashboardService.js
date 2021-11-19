import axios from "axios";

const apiPath = "http://localhost:5000";
export default {
    getOfferStartup() {
        return axios.get(apiPath + "/api/Dashboard/Startup");
    },
};
