import axios from "axios";
import { toast } from "react-toastify";
import { BaseUrl } from "../constants/constant";
import queryString from 'query-string';
import secureLocalStorage from "react-secure-storage";
import { getUserToken } from "./helper";

const axiosInstance = axios.create({
  baseURL: BaseUrl.API_URL,
  headers: {
    Accept: "application/json",
    // "Sec-Fetch-Site": "cross-site"
  },
});

//axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(function (config) {
  const token = getUserToken();
  config.headers.Authorization = token ? token : "";
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      secureLocalStorage.clear();
      window.location.reload();
      toast.warning("Session expired");
    }
    return Promise.reject(error.response.data);
  }
);

const axiosPost = (url, params = {}) => {
  return axiosInstance
    .post(url, params)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((err) => {
      throw err;
    });
};

const axiosPostFormData = (url, params = {}) => {
  return axiosInstance
    .post(url, params, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((err) => {
      throw err;
    });
};

const axiosPatch = (url, params = {}) => {
  return axiosInstance
    .patch(url, params)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((err) => {
      throw err;
    });
};

const axiosDelete = (url) => {
  return axiosInstance
    .delete(url)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((err) => {
      throw err;
    });
};

const axiosGet = (url, params) => {
  let query = queryString.stringify(params);
  // let newUrl = decodeURIComponent(query)
  return axiosInstance
    .get(url + '?' + query)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((err) => {
      throw err;
    });
};

export const ApiClient = {
  post: axiosPost,
  postFormData: axiosPostFormData,
  patch: axiosPatch,
  delete: axiosDelete,
  get: axiosGet
};
