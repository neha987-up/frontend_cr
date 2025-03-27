import { ApiClient } from "../../utilities/api";
import ApiPath from "../../constants/apiPath";

export function loginApi(data) {
    const url = ApiPath.AuthApiPath.LOGIN;
    return ApiClient.post(url, data);
}