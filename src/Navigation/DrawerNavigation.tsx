import React, { useEffect, useState } from "react";
import { createDrawerNavigator, DrawerItem, DrawerItemList } from "@react-navigation/drawer"
import Container from "@Components/Atoms/Container";
import Image from "@Components/Atoms/Image";
import Text from "@Components/Atoms/Text";
import { colors } from "@Utils/Color/colors";
import { ScrollView } from "react-native-gesture-handler";
import { Icons } from "@Components/Atoms/Icons";
import { getJsonData, getStringData, removeData } from "@Utils/AccessStorage";
import { loggeIn } from "@Redux/Slices/AccountSlice";
import { useAppDispatch, useAppSelector } from "@Redux/Hooks";
import { View } from "react-native";
import { resetPickup } from "@Redux/Slices/PickUpSlice";

//Screen list
import { AuthenticatedStackNavigation as HomeList } from '@Navigation/AuthenticatedSatckNavigation';
import { OrderStackNavigation as Order } from "@Navigation/OrderStackNavigation"
import Setting from '@Screen/Setting';
import Language from '@Screen/Language';
import { languageData } from "@Redux/MemoizedSelectors";



const style = {
    backgroundColor: colors.white,
    height: 45,
    width: 45,
    borderRadius: 50,
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    offSet: { width: -2, height: 4 },
    elevation: 5
}



const Drawer = createDrawerNavigator();

const drawerIcon = (navigation) => {
    return (
        <View >
            <Icons style={style} onPress={() => navigation.openDrawer()} color={colors.gray} name="menu" size={25} />
        </View>
    )
}

const CustomDrawerContent = (props) => {
    const [userName, setUserName] = useState<any>(null)
    const dispatch = useAppDispatch()
    const { Drawer_navigation } = useAppSelector(languageData)
    const { languageType } = useAppSelector(state => state.user)

    useEffect(() => {
        const fetchData = async () => {
            const name = await getStringData("user_name")
            setUserName(name)
        }
        fetchData()

    }, [userName])
    console.log(userName)
    return (
        <ScrollView {...props}>
            <Container bg={colors.border} direction="column" justify="space-evenly" height="200px">
                <Image imageHeight={100} imageWidth={100} radius={50} source={{ uri: "https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg" }} />
                <Text color={colors.gray} fontSize="15px" fontWeight="bold">Hi {`${userName}`.toLocaleUpperCase()}</Text>
            </Container>
            <DrawerItemList {...props} />
            <DrawerItem
                onPress={async () => {
                    await removeData("user_data")
                    dispatch(loggeIn(false))
                    dispatch(resetPickup())
                    dispatch(resetPickup())
                }}
                icon={() =>
                    <Icons style={null} size={30} name="power-settings-new" />
                }
                label={Drawer_navigation[languageType].Logout}
            />
        </ScrollView>
    );
}



export const DrawerNavigation = () => {
    const { Drawer_navigation } = useAppSelector(languageData)
    const { languageType } = useAppSelector(state => state.user)

    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen options={{
                drawerIcon: () => <Icons size={30} name="home" />,
                header: ({ navigation }) => drawerIcon(navigation),
                headerTransparent: true,
            }} name={Drawer_navigation[languageType].Home} component={HomeList} />
            <Drawer.Screen options={{
                drawerIcon: () => <Icons size={30} name="pending" />
            }} name={Drawer_navigation[languageType].Order_history} component={Order} />
            <Drawer.Screen options={{
                drawerIcon: () => <Icons size={30} name="settings" />
            }} name={Drawer_navigation[languageType].Setting} component={Setting} />
            <Drawer.Screen options={{
                drawerIcon: () => <Icons size={30} name="language" />,
                headerShown: false
            }} name={Drawer_navigation[languageType].Language} component={Language} />
        </Drawer.Navigator>
    )
}