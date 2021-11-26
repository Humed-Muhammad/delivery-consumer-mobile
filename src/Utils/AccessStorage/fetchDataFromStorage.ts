export const fetchDataFromAsyncStorage = async (getterFunction, keyName) => {
    return await getterFunction(keyName);
}
