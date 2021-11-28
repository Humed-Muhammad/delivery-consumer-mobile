import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DrawerNavigation as Authenticated } from '@Navigation/DrawerNavigation'
import { NonAuthenticatedStackNavigation as NonAuthenticated } from '@Navigation/NonAuthenticatedStackNavigation'
import { Provider, useSelector } from 'react-redux';
import { store } from '@Redux/store';
import { getJsonData } from '@Utils/AccessStorage';
import { useAppDispatch } from '@Redux/Hooks';
import { loggeIn } from '@Redux/Slices/AccountSlice';
import { QueryClientProvider, QueryClient } from 'react-query';
import Toast from "react-native-toast-message"
import { NativeBaseProvider } from 'native-base';
import Summary from '@Screen/Summary';
import OrderDetail from '@Screen/OrderDetail';
import * as SplashScreen from "react-native-bootsplash";
import { requestGeolocationAccess } from '@Utils/PermissionRequestes';
import Geolocation from '@react-native-community/geolocation';
import { coordinateDelta } from '@Utils/Function';
import { getUserCurrentLocation } from '@Redux/Slices/PickUpSlice';

const queryClient = new QueryClient()

const RootStack = createNativeStackNavigator()
const App = () => {
  const dispatch = useAppDispatch()
  const { loggedIn } = useSelector((state: any) => state.account)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getJsonData("user_data");
        if (data) {
          dispatch(loggeIn(await data.status))
        }
      } catch (e) {
        console.log(e)
      }

    }
    fetchData().finally(() => SplashScreen.hide())
  }, [loggedIn])

  const Navigations = () => {

    return (
      loggedIn.status ? (
        <>
          <RootStack.Screen options={{ headerShown: false }} name="Auth" component={Authenticated} />
          <RootStack.Screen options={{ headerShown: true }} name="Summary" component={Summary} />
          <RootStack.Screen options={{ headerShown: true }} name="Order detail" component={OrderDetail} />
        </>
      ) : (
        <RootStack.Screen options={{ headerShown: false }} name="NonAuth" component={NonAuthenticated} />
      )
    )
  }

  useEffect(() => {
    if (requestGeolocationAccess()) {
      Geolocation.getCurrentPosition(({ coords }) => dispatch(getUserCurrentLocation(coordinateDelta(coords))));
    }
  }, [])


  return (

    <NavigationContainer>
      <RootStack.Navigator>
        {
          // !timePassed ? (
          //   <RootStack.Screen options={{ headerShown: false }} name="Splash_Screen" component={SplashScreenStack} />
          // ) : 
          Navigations()

        }
      </RootStack.Navigator>
    </NavigationContainer>

  )
}

export default () => {
  return (
    <QueryClientProvider client={queryClient} >
      <Provider store={store}>
        <NativeBaseProvider>
          <App />
          <Toast autoHide={false} />
        </NativeBaseProvider>
      </Provider>
    </QueryClientProvider>
  )
}





