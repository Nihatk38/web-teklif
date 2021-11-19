//import client from "@/apiClient";

import axios from "axios";

const apiPath = "http://localhost:5000";

export default {
    getCompanyList() {
        return axios.get(apiPath + "/api/company/list");
    },

    getCompany(id) {
        return axios.get(apiPath + "/api/company/getbyid/" + id);
    },

    addCompany(company) {
        return axios.post(apiPath + "/api/company/create", company);
    },
    updateCompany(company) {
        return axios.put(apiPath + "/api/company/update", company);
    },
    deleteCompany(id) {
        return axios.delete(apiPath + "/api/company/delete/" + id);
    },
    getContactList(id) {
        return axios.get(apiPath + "/api//api/companycontact/list/"+id);
    },

    getContact(id) {
        return axios.get(apiPath + "/api/companycontact/getbyid/" + id);
    },

    addContact(user) {
        return axios.post(apiPath + "/api/companycontact/create", user);
    },
    updateContact(user) {
        return axios.put(apiPath + "/api/companycontact/update", user);
    },
    deleteContact(id) {
        return axios.delete(apiPath + "/api/companycontact/delete/" + id);
    },
};
