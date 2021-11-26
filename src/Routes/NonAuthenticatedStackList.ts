import Login from '@Screen/Login';
import Register from '@Screen/Register';
import ForgetPassword from "@Screen/ForgetPassword"
import ChooseMethod from "@Screen/ChooseCodeGettingMethod"
import Verify from "@Screen/Verify"
import ResetPassword from "@Screen/ResetPassword"

export const screenList: Array<Object> = [
    {
        name: "Login",
        component: Login,
        title: "Login"
    },
    {
        name: "Register",
        component: Register,
        title: "Create Account"
    },
    {
        name: "ForgetPassword",
        component: ForgetPassword,
        title: "Recover Account"
    },
    {
        name: "Choose",
        component: ChooseMethod,
        title: "Recover Account"
    },
    {
        name: "Verify",
        component: Verify,
        title: "Recover Account"
    },
    {
        name: "Reset",
        component: ResetPassword,
        title: "Recover Account"
    },
]


