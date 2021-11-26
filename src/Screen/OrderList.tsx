import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import OrderCard from "@Components/Molecules/OrderCard"
import Container from '@Components/Atoms/Container'
import Loader from '@Components/Organisms/Loader'
import { getJsonData } from '@Utils/AccessStorage'
import { getUserId } from '@Redux/Slices/AccountSlice'
import { useAppDispatch, useAppSelector } from '@Redux/Hooks'
import Button from '@Components/Atoms/Button'
import { getRequest } from '@Api/index'
import Text from '@Components/Atoms/Text'
import Image from '@Components/Atoms/Image'
import { getOrders } from '@Redux/Slices/OrderSlice'
import NetInfo from "@react-native-community/netinfo"
import { ordersData, networkStatus } from '@Redux/MemoizedSelectors'
import { getNetworkStatus } from '@Redux/Slices/UserSlice'
import { showToast } from '@Utils/Toast'
import { errorToast } from '@Utils/Toast/toastConfig'

const OrderList = ({ navigation }) => {

    let [loading, setLoading] = useState(true)
    let [notDisplayOrders, setNotDisplayOrders] = useState(false)
    const dispatch = useAppDispatch()
    const { userId } = useAppSelector((state) => state.account)
    const networkState = useAppSelector(networkStatus)

    const unsubscribe = NetInfo.addEventListener(state => {
        dispatch(getNetworkStatus(state.isInternetReachable))
    });

    useEffect(() => {
        const fetchAsyncStorageData = async () => {
            const data = await getJsonData("user_data")
            dispatch(getUserId(data["message"]["id"]))

        }

        fetchAsyncStorageData()
    }, [])

    const fetchData = useCallback(
        async () => {
            unsubscribe()
            if (networkState) {
                setLoading(true)
                setNotDisplayOrders(false)
                setTimeout(() => {
                    setLoading(false)
                    setNotDisplayOrders(true)
                }, 2000)
                const data: any = await getRequest(`Order/order_list/${userId}`)
                if (data) {
                    dispatch(getOrders(await data))
                } else {
                    setNotDisplayOrders(false)
                }
            } else {
                setTimeout(() => {
                    setLoading(false)
                    setNotDisplayOrders(false)
                }, 1000)
            }

        }, [networkState])

    useEffect(() => {
        if (networkState) {
            setNotDisplayOrders(true)
        }
        setTimeout(() => {
            setLoading(false)
        }, 500)
        return () => null
    }, [])

    /**@Handler_Funciton for sending params to order detail screen */
    const handleClick = (order_id, index) => {
        if (networkState) {
            navigation.navigate("Order detail", {
                consumer_id: userId,
                order_id: order_id,
                index: index
            })
        } else {
            showToast(errorToast("Network error", "Please open your internet for better experiance"))
        }

    }
    const orders = useAppSelector(ordersData)

    const Orders = () => {
        if (orders.length < 1) {
            return (
                <Container height="100%" direction="column" >
                    <Image imageWidth={50} imageHeight={50} source={require("@Assets/Images/box.png")} />
                    <Text>You don't have any orders yet!</Text>
                    <Button height="35px" text="Create one" onPress={async () => navigation.navigate("Pickup")} />
                </Container>
            )
        } else {
            return (
                orders && orders.map((item, index) => (
                    <OrderCard index={index} key={index} handleClick={handleClick} item={item} />
                ))
            )
        }
    }

    const errorAndOrdersShower = (!notDisplayOrders) ? (
        <Container height="100%" direction="column" >
            <Image imageWidth={50} imageHeight={50} source={require("@Assets/Images/network-error.png")} />
            <Text>Oppss You are out of connection</Text>
            <Button height="35px" text="Refresh" onPress={async () => {
                setLoading(true)
                fetchData()
                // setNetworError({ ...networkError, status: false })
            }} />
        </Container>
    ) : orders && Orders()


    return (
        <Container height="100%" direction="column" justify="space-around">
            <ScrollView contentContainerStyle={(loading || !networkState || !notDisplayOrders || orders.length == 0) ? { height: "100%" } : null} >
                {loading ? (
                    <Loader />
                ) :
                    errorAndOrdersShower
                }
            </ScrollView>
        </Container>
    )
}


export default OrderList
