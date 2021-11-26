import Button from '@Components/Atoms/Button'
import CardConatiner from '@Components/Atoms/CardContainer'
import Container from '@Components/Atoms/Container'
import Text from '@Components/Atoms/Text'
import React, { useState } from 'react'
import { fonts } from '@Utils/Fonts'
import axios from 'axios'
import { useQuery } from 'react-query'
import RNPickerSelect from 'react-native-picker-select';
import Input from '@Components/Atoms/Inputs'
import { useAppSelector } from '@Redux/Hooks'
import { languageData } from '@Redux/MemoizedSelectors'


const Address = () => {
    const [city, setCity] = useState([])
    const [sub_city, setSub_City] = useState([])
    const { Setting } = useAppSelector(languageData)
    const { languageType } = useAppSelector(state => state.user)

    const baseUrl = "http://192.168.0.111/Delivery/consumer.php/"

    const request = async (endPoint, params) => {
        return axios
            .post(baseUrl + endPoint, params)
            .then(({ data }) => data)
            .catch((err) => console.log(err))
    }

    const useGetQuery = (endPoint, params, key) => {
        return useQuery([key], () => request(endPoint, params))
    }

    const regionFormData = new FormData();
    regionFormData.append("lookup_type", "region")
    const regions: any = useGetQuery("Account/lookup", regionFormData, "region")
    const regionList = []
    regions.data && regions.data.map((item) => {
        regionList.push({ value: item.id, label: item.value })
    })

    const handleCity = async (id) => {
        const cityFormData = new FormData();
        cityFormData.append("parent_id", `${id}`)
        cityFormData.append("lookup_type", "city")
        const data: any = await request("Account/lookup", cityFormData)
        const cityList = []
        data && data.map((item) => {
            cityList.push({ value: item.id, label: item.value })
        })
        setCity(cityList)
    }

    const handleSubCity = async (id) => {
        const subCityFormData = new FormData();
        subCityFormData.append("parent_id", `${id}`)
        subCityFormData.append("lookup_type", "sub_city")
        const data: any = await request("Account/lookup", subCityFormData)
        const subCityList = []
        data && data.map((item) => {
            subCityList.push({ value: item.id, label: item.value })
        })
        setSub_City(subCityList)
    }

    return (
        <Container direction="column" justify="space-evenly" >
            <Text fontSize={fonts.large} fontWeight="bold" >{Setting[languageType].Address_title}</Text>
            <CardConatiner padd="10px" radius="2px" justify="space-evenly" width="90%" direction="column">
                <Container align="flex-start" direction="column">
                    <Text>Region</Text>
                    <RNPickerSelect
                        onValueChange={handleCity}
                        items={regionList}

                    />
                </Container>
                <Container align="flex-start" direction="column">
                    <Text>City</Text>
                    <RNPickerSelect
                        onValueChange={handleSubCity}
                        items={city}
                    />
                </Container>
                <Container align="flex-start" direction="column">
                    <Text>Sub-City</Text>
                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        items={sub_city}
                    />
                </Container>
                <Container align="flex-start" direction="column">
                    <Text>Woreda</Text>
                    <Input placeholder="Woreda" value="02" radius="0px" borderWidth="0px" borderBottomWidth={1} />
                </Container>
                <Button onPress={() => console.log("Id")} width="90%" text="Save" />
            </CardConatiner>

        </Container>
    )
}

export default Address
