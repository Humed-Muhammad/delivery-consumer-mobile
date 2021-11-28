import { useQuery, useMutation } from "react-query";
import { getRequest, postRequest } from "@Api/index";



/** 
 * @GetQuery using get method ....
 * **/
export const useGetQuery = (endPoint, key, extention = "") => {
    return useQuery([key, extention], () => getRequest(endPoint, key))
}


/** 
 * @GetQuery using post method ....
 * **/
export const useGetPostQuery = (endPoint, params, key) => {
    return useQuery([key], () => postRequest(endPoint, params, key))
}

export const useMutationQuery = (endPoint, params, key, extention = "") => {
    const mutation = useMutation(values => {
        return postRequest(endPoint, values)
    })

    return mutation.mutate(params)
}