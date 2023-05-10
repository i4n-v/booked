import api from "../../configs/api";

export default function useApi(url: string = "") {
    api.defaults.baseURL = process.env.REACT_APP_API_URL + url
    return api
}