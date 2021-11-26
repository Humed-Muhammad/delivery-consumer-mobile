import React, { useEffect, useState } from 'react'
import Button from '@Components/Atoms/Button'
import Input from '@Components/Atoms/Inputs'
import Container from '@Components/Atoms/Container'
import { colors } from '@Utils/Color/colors'
import Text from '@Components/Atoms/Text'
import { Formik } from "formik"
import * as yup from "yup"
import FormError from '@Components/Organisms/FormError'
import Logo from '@Components/Organisms/Logo'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { postRequest } from '@Api/index'
import { errorToast, successToast } from '@Utils/Toast/toastConfig'
import { showToast } from '@Utils/Toast'

const ForgetPassword = ({ navigation }: any) => {
    const [isEmailChecked, setIsEmailChecked] = useState(false)
    const [isPhoneChecked, setIsPhoneChecked] = useState(false)

    // yup validation schema
    const loginSchema = yup.object().shape({
        Phone: yup.number().min(10, "Phone number must be at least 10 character"),
        Email: yup.string().email("Must be a valid email").min(3).max(40)
    })

    const handleSubmit = async (values) => {
        const formData = new FormData()
        formData.append(isPhoneChecked ? "phone_number" : "email", isPhoneChecked ? values.Phone : values.Email)
        const data: any = await postRequest("Account/find", formData)

        console.log(data)
        if (data.status === "true") {
            showToast(successToast("Success", "Your Account Successfully Found..."))
            setTimeout(() => navigation.navigate("Choose", {
                email: data.message.email,
                phone_number: data.message.phone_number,
                full_name: data.message.full_name
            }), 1000)
        } else {
            showToast(errorToast("Failed", "Make sure you enterd the correct credentials"))
        }
    }

    return (
        <Formik
            initialValues={{ Phone: '', Email: '' }}
            validationSchema={loginSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Container direction="column" height="100%">
                    <Logo />
                    <Container direction="column" bg={colors.white} height="40%">
                        <Text fontWeight="bold" fontSize="25px">Forgot Password?</Text>
                        {
                            !isPhoneChecked && (
                                <Container justify="space-around" width="90%" height={isEmailChecked ? "50%" : "20%"} align="flex-start" direction="column">

                                    <BouncyCheckbox onPress={(checked) => {
                                        setIsEmailChecked(checked)
                                        setIsPhoneChecked(false)
                                    }} text={"User your email"} textStyle={{ textDecorationLine: "none" }} />
                                    {
                                        isEmailChecked && (
                                            <>
                                                <Input required radius="7px" onChangeText={handleChange('Email')} value={values.Email} width="100%" placeholder={"Email"} />
                                                <FormError error={errors.Email} touched={touched.Email} /></>
                                        )
                                    }
                                </Container>

                            )
                        }
                        {
                            !isEmailChecked && (
                                <Container justify="space-around" width="90%" height={isPhoneChecked ? "50%" : "20%"} align="flex-start" direction="column">
                                    <BouncyCheckbox onPress={(checked) => {
                                        setIsPhoneChecked(checked)
                                        setIsEmailChecked(false)
                                    }} text={"Use phone number"} textStyle={{ textDecorationLine: "none" }} />
                                    {
                                        isPhoneChecked && (
                                            <>
                                                <Input required keyboardType="numeric" radius="7px" onChangeText={handleChange('Phone')} value={values.Phone} width="100%" placeholder={"Phone Number"} />
                                                <FormError error={errors.Phone} touched={touched.Phone} />
                                            </>
                                        )
                                    }
                                </Container>
                            )
                        }
                        <Button onPress={handleSubmit} width="90%" text="Find" />
                    </Container>
                </Container>
            )}
        </Formik>
    )
}

export default ForgetPassword
