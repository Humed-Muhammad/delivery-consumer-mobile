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
        Password: yup.string().min(8).max(40).required(),
    })

    return (
        <Formik
            initialValues={{ Password: '' }}
            validationSchema={loginSchema}
            onSubmit={values => navigation.navigate("Login")}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Container direction="column" height="100%">
                    <Logo />
                    <Container direction="column" justify="space-evenly" bg={colors.white} height="50%">
                        <Container width="90%" direction="column">
                            <Text fontWeight="bold" fontSize="25px">Rest your password</Text>
                            <Text>Strong password includes number, letter, and special character</Text>
                        </Container>
                        <Container direction="column">
                            <Input radius="7px" onChangeText={handleChange('Password')} value={values.Password} width="90%" placeholder="Password" />
                            <FormError error={errors.Password} touched={touched.Password} />
                        </Container>
                        <Button onPress={handleSubmit} width="90%" text="Rest Password" />
                    </Container>
                </Container>
            )}
        </Formik>
    )
}

export default ForgetPassword
