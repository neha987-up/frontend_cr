import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../redux";
import { restAllData } from "../redux/slices/commonActions";
const axiosInstance = axios.create({
  baseURL: "",
  headers: {
    Accept: "application/json",
  },
});

// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
// Set the AUTH token for any request
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("authToken");
  config.headers.Authorization = token ? JSON.parse(token) : "";
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("authToken");
      store.dispatch(restAllData());
      // toast.success("Successfully logged out!");
      location.push("/home");
    } else if (error?.response?.data?.msg == "No token") {
    } else if (error?.response?.data?.msg == "No draws") {
    } else if (error?.response?.data?.msg) {
      toast.error(error?.response?.data?.msg);
    }

    return Promise.reject(error);
  }
);

const axiosGet = async (url, params = {}) => {
  try {
    const response = await axiosInstance.get(url, { params: params });
    return { status: true, data: response.data, statusCode: response.status };
  } catch (err) {
    return { status: false, error: err };
  }
};

const axiosPost = async (url, params = {}) => {
  try {
    const response = await axiosInstance.post(url, params);
    return { status: true, data: response.data, statusCode: response.status };
  } catch (err) {
    return { status: false, error: err };
  }
};

const axiosPut = async (url, params = {}) => {
  try {
    const response = await axiosInstance.put(url, params);
    return {
      status: response.status,
      data: response.data,
      statusCode: response.status,
    };
  } catch (err) {
    return { status: err.status, error: err };
  }
};

const axiosPatch = async (url, params = {}) => {
  try {
    const response = await axiosInstance.patch(url, params);
    return {
      status: response.status,
      data: response.data,
      statusCode: response.status,
    };
  } catch (err) {
    return { status: err.status, error: err };
  }
};

const postDelete = async (url, params = {}) => {
  try {
    const response = await axiosInstance.delete(url, params);
    return {
      status: response.status,
      data: response.data,
      statusCode: response.status,
    };
  } catch (err) {
    return { status: err.status, error: err };
  }
};

const postDeleteParams = async (url, params = {}) => {
  try {
    const response = await axiosInstance.delete(url, { data: { ...params } });
    return {
      status: response.status,
      data: response.data,
      statusCode: response.status,
    };
  } catch (err) {
    return { status: err.status, error: err };
  }
};

const axiosPostFormData = async (url, params) => {
  const formData = new FormData();
  formData.append("file", params?.file);
  try {
    const response = await axiosInstance.post(url, formData);
    return { status: true, data: response.data, statusCode: response.status };
  } catch (err) {
    return { status: false, error: err };
  }
};

const axiosPostFormDataMulti = async (url, params) => {
  const formData = new FormData();
  params.file.forEach((ele) => {
    formData.append("file", ele);
  });

  try {
    const response = await axiosInstance.post(url, formData);
    return { status: true, data: response.data, statusCode: response.status };
  } catch (err) {
    return { status: false, error: err };
  }
};

const axiosPostFormDataCommon = async (url, params) => {
  try {
    const response = await axiosInstance.post(url, params);
    return { status: true, data: response.data, statusCode: response.status };
  } catch (err) {
    return { status: false, error: err };
  }
};

export const ApiClient = {
  get: axiosGet,
  put: axiosPut,
  post: axiosPost,
  patch: axiosPatch,
  delete: postDelete,
  deleteparams: postDeleteParams,
  postFormData: axiosPostFormData,
  postFormDataMulti: axiosPostFormDataMulti,
  postFormDataCommon: axiosPostFormDataCommon,
};
