import Button from '@Components/Atoms/Button'
import Container from '@Components/Atoms/Container'
import Image from '@Components/Atoms/Image'
import Input from '@Components/Atoms/Inputs'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import FilePicker from "@Components/Organisms/FilePicker"
import CardConatiner from '@Components/Atoms/CardContainer'
import { useAppDispatch, useAppSelector } from "@Redux/Hooks"
import { languageData, userProfileData as data } from '@Redux/MemoizedSelectors'
import Address from '../Components/Organisms/Address'
import Loader from '@Components/Organisms/Loader'
import { postRequest, getRequestWithStatus } from '@Api/index'
import { showToast } from '@Utils/Toast'
import { errorToast, successToast } from '@Utils/Toast/toastConfig'
import { storeStringData } from '@Utils/AccessStorage'

const Profile = () => {
    const [loading, setLoading] = useState(false)
    const [updateLoader, setUpdateLoader] = useState(false)
    const [userProfileData, setUserProfileData] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        profile_image: ""
    })
    const userProfileFromRedux = useAppSelector(data)
    const dispatch = useAppDispatch()
    const { userId } = useAppSelector(state => state.account)
    const { Setting } = useAppSelector(languageData)
    const { languageType } = useAppSelector(state => state.user)

    const fetchData = useCallback(async () => {
        const { status, data }: any = await getRequestWithStatus(`Account/get_profile/${userId}`)
        if (status) {
            // dispatch(getUserProfileData(data))
            setUserProfileData(await data)
        } else {
            showToast(errorToast("Failed", data))
        }
    }, [userId])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleSubmit = async () => {
        setUpdateLoader(true)
        const profileData = {
            id: userId,
            full_name: userProfileData.full_name,
            email: userProfileData.email,
            phone_number: userProfileData.phone_number,
        }
        const { status, message }: any = await postRequest("Account/update_profile", profileData)
        if (status) {
            // setTimeout(()=>setUpdateLoader(false),200)
            storeStringData(userProfileData.full_name, "user_name")
            showToast(successToast("Successful", "Your profile updated successfully!"))
        } else {
            showToast(errorToast("Failed", message))
        }
        setTimeout(() => setUpdateLoader(false), 200)
    }

    return (
        <ScrollView>
            <Container justify="flex-start" direction="column" height="650px">
                <Container>
                    <FilePicker setLoading={setLoading} />
                    {loading ? (<Loader height="250px" width="90%" />) : (<Image radius={5} imageHeight={250} imageWidth="90%" source={{ uri: userProfileData.profile_image || userProfileFromRedux.profileImage }} />)}
                </Container>
                <CardConatiner radius="2px" bottom="20px" position="absolute" justify="space-evenly" width="90%" height="55%" direction="column">
                    <Input value={userProfileData.full_name} radius="0px" borderWidth="0px" borderBottomWidth={1} width="85%" placeholder="Full Name" onChangeText={(text) => setUserProfileData({ ...userProfileData, full_name: text })} />
                    <Input value={userProfileData.email} radius="0px" borderWidth="0px" borderBottomWidth={1} width="85%" placeholder="Email" onChangeText={(text) => setUserProfileData({ ...userProfileData, email: text })} />
                    <Input value={userProfileData.phone_number} radius="0px" borderWidth="0px" borderBottomWidth={1} width="85%" placeholder="Phone Number" onChangeText={(text) => setUserProfileData({ ...userProfileData, phone_number: text })} />
                    <Input radius="0px" borderWidth="0px" borderBottomWidth={1} width="85%" placeholder="Location" />
                    {updateLoader ? (<Loader height="55px" />) : (<Button onPress={handleSubmit} width="90%" text={Setting[languageType].Save_button} />)}
                </CardConatiner>
            </Container>
            <Address />
        </ScrollView>
    )
}

export default Profile
