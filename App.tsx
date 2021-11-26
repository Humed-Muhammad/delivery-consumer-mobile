import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DrawerNavigation as Authenticated } from '@Navigation/DrawerNavigation'
import { NonAuthenticatedStackNavigation as NonAuthenticated } from '@Navigation/NonAuthenticatedStackNavigation'
import { Provider, useSelector } from 'react-redux';
import { store } from '@Redux/store';
import { getJsonData } from '@Utils/AccessStorage';
import { useAppDispatch } from '@Redux/Hooks';
import { loggeIn } from '@Redux/Slices/AccountSlice';
import { SplashScreenStack } from '@Navigation/SplashScreenStack';
import { QueryClientProvider, QueryClient } from 'react-query';
import Toast from "react-native-toast-message"
import { NativeBaseProvider } from 'native-base';
import Summary from '@Screen/Summary';
import OrderDetail from '@Screen/OrderDetail';



const queryClient = new QueryClient()

const RootStack = createNativeStackNavigator()
const App = () => {
  let [timePassed, setTimePassed] = useState(false)
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
    fetchData()
    setTimeout(() => {
      setTimePassed(true)
    }, 1000)

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


  return (

    <NavigationContainer>
      <RootStack.Navigator>
        {
          !timePassed ? (
            <RootStack.Screen options={{ headerShown: false }} name="Splash_Screen" component={SplashScreenStack} />
          ) : Navigations()

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





