import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeJsonData = async (value, keyName) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(keyName, jsonValue)
    } catch (e) {
        console.log(e)
    }

}

export const storeStringData = async (value, keyName) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(keyName, jsonValue)
    } catch (e) {
        console.log(e)
    }

}



export const getJsonData = async (keyName) => {
    try {
        const jsonValue = await AsyncStorage.getItem(keyName)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        return e
    }
}


export const getStringData = async (keyName) => {
    try {
        const value = await AsyncStorage.getItem(keyName)
        if (value !== null) {
            return value
        }
    } catch (e) {
        return e
    }
}


export const removeData = async (keyName) => {
    try {
        await AsyncStorage.removeItem(keyName)
    } catch (e) {
        return e
    }
}
