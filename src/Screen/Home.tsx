import React, { useCallback, useEffect } from 'react'
import Container from '@Components/Atoms/Container'
import Button from '@Components/Atoms/Button';
import Map from "@Components/Organisms/Map"
import { colors } from '@Utils/Color/colors';
import { getJsonData } from '@Utils/AccessStorage';
import { getUserId } from '@Redux/Slices/AccountSlice';
import { useAppDispatch, useAppSelector } from '@Redux/Hooks';
import { getRequest } from '@Api/index';
import { getOrders } from '@Redux/Slices/OrderSlice';
import NetInfo from "@react-native-community/netinfo"
import { getNetworkStatus } from '@Redux/Slices/UserSlice';
import { languageData } from '@Redux/MemoizedSelectors'

const Home = ({ navigation }: any) => {
    const dispatch = useAppDispatch()
    const { userId } = useAppSelector((state) => state.account)
    const { languageType } = useAppSelector(state => state.user)
    const { Home } = useAppSelector(languageData)
    const unsubscribe = NetInfo.addEventListener(state => {
        dispatch(getNetworkStatus(state.isInternetReachable))
    });
    const language = Home[languageType]

    useEffect(() => {
        const fetchAsyncStorageData = async () => {
            const data = await getJsonData("user_data")
            dispatch(getUserId(data["message"]["id"]))

        }

        fetchAsyncStorageData()
    }, [])

    const fetchData = useCallback(async () => {
        unsubscribe()
        const data: any = await getRequest(`Order/order_list/${userId}`, "")
        dispatch(getOrders(await data))
    }, [userId])
    useEffect(() => {
        fetchData()
        return () => null
    }, [fetchData])
    console.log(global.language)
    return (
        <>
            <Map />
            <Container direction="column" >
                <Button b="30px" bg={colors.gray} onPress={() => navigation.navigate("Pickup")} text={language.Book_button} width="90%" height="40px" position="absolute" z="100" />
            </Container >
        </>
    )
}
export default Home
