import axios from "axios";
const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: undefined,
};

const baseUrl = {
    production: 'https://google.et/',
    development: 'http://192.168.0.111/DeliveryMobileApi/api_v_1.php/',
};
const baseApi = baseUrl.development;

/**
 * @Interception
 * Interception befor any requests happen, it sends the token to the backend
 * **/

axios.interceptors.request.use(
    function (config: any) {
        if ("i get the token(from storage, from global variable, from store)") {
            axios.defaults.headers.common['Authorization'] = "token";
        }
        return config;
    },
    function (error: any) {
        return Promise.reject(error);
    }
);


const getRequest = async (endPoint, key = "") => {
    return axios
        .get(baseApi + endPoint)
        .then(({ data }) => data)
        .catch((err) => "Make sure you have internet connection!")
}

const getRequestWithStatus = async (endPoint, key = "") => {
    return axios
        .get(baseApi + endPoint)
        .then(({ data }) => {
            return { status: true, data: data }
        })
        .catch((err) => {
            return { status: false, data: "Something went wrong pleae try again letter!" }
        })
}

const postRequest = async (endPoint, params, key = "") => {
    return axios
        .post(baseApi + endPoint, params)
        .then(({ data }) => data)
        .catch((error) => error)

}

export { getRequest, postRequest, getRequestWithStatus }
