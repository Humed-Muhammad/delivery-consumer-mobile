import React, { useState } from 'react'
import Button from '@Components/Atoms/Button'
import Input from '@Components/Atoms/Inputs'
import Container from '@Components/Atoms/Container'
import { colors } from '@Utils/Color/colors'
import Text from '@Components/Atoms/Text'
import { loggeIn } from '@Redux/Slices/AccountSlice'
import { Formik } from "formik"
import * as yup from "yup"
import FormError from '@Components/Organisms/FormError'
import Logo from '@Components/Organisms/Logo'
import { postRequest } from '@Api/index'
import { useAppDispatch, useAppSelector } from '@Redux/Hooks'
import { storeJsonData, storeStringData } from '@Utils/AccessStorage'
import { showToast } from '@Utils/Toast'
import { errorToast, successToast } from '@Utils/Toast/toastConfig'
import Loader from '@Components/Organisms/Loader'
import { languageData } from '@Redux/MemoizedSelectors'


const Login = ({ navigation }: any) => {
    let [loader, setLoader] = useState(false)
    const dispatch = useAppDispatch();
    const languageType = useAppSelector(state => state.user.languageType)
    const { Login } = useAppSelector(languageData)
    const defaultLanguage = Login[languageType]


    // yup validation schema
    const loginSchema = yup.object().shape({
        Email: yup.string().email().min(3).max(40).required(),
        Password: yup.string().min(4).max(40).required(),
    })

    const handleLoginSubmit = async (values) => {
        const formData = new FormData();
        formData.append("email", values.Email)
        formData.append("password", values.Password)
        const data: any = await postRequest("Account/login", formData, "")
        console.log(data)
        if (data.status) {
            storeJsonData(data, "user_data")
            storeStringData(data["message"]["full_name"], "user_name")
            showToast(successToast("logged In", "Successfully logged in"))
            setLoader(true)
            setTimeout(() => {
                dispatch(loggeIn(data.status))
                setLoader(false)
            }, 1000)
        } else {
            showToast(errorToast("Failed", data.message))
        }
    }

    return (
        <Formik
            initialValues={{ Email: '', Password: "" }}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
                handleLoginSubmit(values)
            }}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                loader ? (<Loader />) : (
                    <Container direction="column" justify="center" bg={colors.white} height="100%">
                        <Logo />
                        {/* <FormError text={} /> */}
                        <Text fontWeight="bold" fontSize="25px">Login</Text>
                        <Input radius="0px" borderWidth="0px" borderBottomWidth={1} onChangeText={handleChange('Email')} value={values.Email} width="90%" placeholder="Email / Phone Number" />
                        <FormError error={errors.Email} touched={touched.Email} />
                        <Input secureTextEntry={true} radius="0px" borderWidth="0px" borderBottomWidth={1} onChangeText={handleChange('Password')} value={values.Password} width="90%" placeholder="Password" />
                        <FormError error={errors.Password} touched={touched.Password} />
                        <Container padd="7px" width="90%" justify="space-between">
                            <Text onPress={() => navigation.navigate("ForgetPassword")} color={colors.blue} >Forget password?</Text>
                            <Text onPress={() => navigation.navigate("Register")} color={colors.blue} >I dont't have account!</Text>
                        </Container>
                        <Button onPress={handleSubmit} width="90%" text={defaultLanguage["Login_button"]} />
                    </Container>
                )
            )}
        </Formik>
    )
}

export default Login