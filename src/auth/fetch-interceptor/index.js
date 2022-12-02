import axios from "axios";
import { API_BASE_URL } from "../../configs/app-configs";
import loader from "../fetch-loader";

const service = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
});

// Configuration
const ENTRY_ROUTE = "/auth/login"; // history push to
const TOKEN_PAYLOAD_KEY = "authorization"; // jwt

service.interceptors.request.use(
    (config) => {
        // if(loader.spinner === undefined) {
        //     loader.start();
        // }
        console.log("request config:", config);
        return config;
    },
    (error) => {
        console.log("request error:", error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        // if (loader.spinner !== undefined) {
        //     loader.stop();
        // }
        console.log("response data:", response.data);
        return response.data;
    },
    (error) => {
        // if (loader.spinner !== undefined) {
        //     loader.stop();
        // }
        console.log("response error:", error);
        if (error.response.data.error.message) {
            alert(error.response.data.error.message);
        }

        return Promise.reject(error);
    }
);

export default service;
