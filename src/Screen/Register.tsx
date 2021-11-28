import React, { useEffect, useState } from 'react'
import Button from '@Components/Atoms/Button'
import Input from '@Components/Atoms/Inputs'
import Container from '@Components/Atoms/Container'
import { colors } from '@Utils/Color/colors'
import Text from '@Components/Atoms/Text'
import { Formik } from 'formik'
import * as yup from "yup"
import FormError from '@Components/Organisms/FormError'
import { postRequest } from '@Api/index'
import { showToast } from '@Utils/Toast'
import { successToast, errorToast } from '@Utils/Toast/toastConfig'
import Loader from '@Components/Organisms/Loader'
import Logo from '@Components/Organisms/Logo'

const Register = ({ navigation }: any) => {
    let [loader, setLoader] = useState(false)


    // yup validation schema
    const registerSchema = yup.object().shape({
        Full_name: yup.string().required(),
        Email: yup.string().email().min(3).max(40).required(),
        Password: yup.string().min(4).max(40).required(),
        Phone_number: yup.number().required(),
    })



    return (
        <Formik
            initialValues={{ Full_name: "", Phone_number: "", Email: '', Password: "" }}
            // validationSchema={registerSchema}
            onSubmit={async (values) => {
                let formData = new FormData();
                formData.append("email", values.Email)
                formData.append("phone_number", values.Phone_number)
                formData.append("full_name", values.Full_name)
                formData.append("password", values.Password)
                formData.append("type", "Consumer")
                const data: any = await postRequest("Account/sign_up", formData, "")
                if (data.status) {
                    showToast(successToast("Successfully registerd", data.message))
                    setLoader(true)
                    setTimeout(() => {
                        navigation.navigate("Login")
                        setLoader(false)
                    }, 1000)
                } else {
                    showToast(errorToast("Failed", data.message))
                }
                console.log("responseData " + JSON.stringify(data))
                console.log(values)
            }}
        >
            {({ handleSubmit, handleChange, errors, touched }) => (
                loader ? (
                    <Loader />
                ) : (
                    <Container direction="column" justify="center" bg={colors.white} height="100%">
                        <Logo />
                        <Text fontWeight="bold" fontSize="25px">Register</Text>
                        <Input radius="0px" borderWidth="0px" borderBottomWidth={0.5} onChangeText={handleChange("Full_name")} width="85%" placeholder="Full Name" />
                        <FormError error={errors.Full_name} touched={touched.Full_name} />
                        <Input radius="0px" borderWidth="0px" borderBottomWidth={0.5} onChangeText={handleChange("Email")} width="85%" placeholder="Email" />
                        <FormError error={errors.Email} touched={touched.Email} />
                        <Input keyboardType="numeric" radius="0px" borderWidth="0px" borderBottomWidth={0.5} onChangeText={handleChange("Phone_number")} width="85%" placeholder="Phone Number" />
                        <FormError error={errors.Phone_number} touched={touched.Phone_number} />
                        <Input secureTextEntry={true} radius="0px" borderWidth="0px" borderBottomWidth={0.5} onChangeText={handleChange("Password")} width="85%" placeholder="Password" />
                        <FormError error={errors.Password} touched={touched.Password} />
                        <Container padd="7px" width="85%" justify="flex-end">
                            <Text onPress={() => navigation.navigate("Login")} color={colors.blue} >I have account!</Text>
                        </Container>
                        <Button onPress={handleSubmit} width="85%" text="Register" />
                    </Container>
                )
            )}</Formik>)

}

export default Register
