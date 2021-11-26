import React from 'react'
import Button from '@Components/Atoms/Button'
import Input from '@Components/Atoms/Inputs'
import Container from '@Components/Atoms/Container'
import { colors } from '@Utils/Color/colors'
import Text from '@Components/Atoms/Text'
import { Formik } from "formik"
import * as yup from "yup"
import FormError from '@Components/Organisms/FormError'
import Logo from '@Components/Organisms/Logo'

const ForgetPassword = ({ navigation }: any) => {

    // yup validation schema
    const loginSchema = yup.object().shape({
        Code: yup.number().required(),
    })

    return (
        <Formik
            initialValues={{ Code: '' }}
            validationSchema={loginSchema}
            onSubmit={values => navigation.navigate("Reset")}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Container direction="column" height="100%">
                    <Logo />
                    <Container direction="column" justify="space-evenly" bg={colors.white} height="50%">
                        <Text fontWeight="bold" fontSize="25px">Check your email</Text>
                        <Text>We have sent to you a code for verification</Text>
                        <Container direction="column">
                            <Input radius="7px" onChangeText={handleChange('Code')} value={values.Code} width="90%" placeholder="Pin Code" />
                            <FormError error={errors.Code} touched={touched.Code} />
                        </Container>
                        <Button onPress={handleSubmit} width="90%" text="Verify" />
                    </Container>
                </Container>
            )}
        </Formik>
    )
}

export default ForgetPassword
