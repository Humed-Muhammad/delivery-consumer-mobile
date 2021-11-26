import * as yup from "yup"


export const AddressFormValidation = () => {
    return yup.object().shape({
        region: yup.string().required(),
        city: yup.string().required(),
        subcity: yup.string().required(),
        woreda: yup.string().required(),
        location: yup.string().required()
    })

}


export const namePhoneValidation = () => {
    return yup.object().shape({
        name: yup.string().required("Name is required"),
        phone_number: yup.string().min(10).required("Phone number is required"),
    })
}



export const weightAndLabor = () => {
    return yup.object().shape({
        labor_force: yup.number().max(10).required("Labor force is required"),
        weight: yup.number().required("Weight is required")
    })
}