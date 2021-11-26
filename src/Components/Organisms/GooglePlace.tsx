import React, { useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Input } from 'react-native-elements';
import { colors } from '@Utils/Color/colors';

interface Props {
    from: string,
    setFrom: Function,
    placeholder: string,
    top: number
}

const GooglePlace = ({ from, setFrom, placeholder, top = -200 }: Partial<Props>) => {
    let [focused, setFocused] = useState(false)
    let [value, setValue] = useState("")

    return (

        <GooglePlacesAutocomplete

            placeholder={placeholder}
            fetchDetails
            GooglePlacesDetailsQuery={{
                fields: "geometry"
            }}
            query={{
                key: "AIzaSyB5vdGUoozI7wAQvuEb4bwoTp4EStiemEs",
                language: 'en', // language of the results,
                components: "country:et"
            }}
            styles={{
                powered: {
                    display: "none",

                },
                textInputContainer: {
                    width: "90%",
                    position: focused ? "absolute" : "relative",
                    top: focused ? top : 0,
                    zIndex: 100,
                    backgroundColor: colors.white
                },
                listView: {
                    width: "90%",
                    backgroundColor: colors.white,
                    zIndex: 100,
                    position: "absolute",
                    top: top + 60

                },
                container: {
                    display: "flex",
                    justifyContent: "center",
                },


            }}
            onPress={(data, { geometry }) => {

                if (data && geometry) {
                    setFrom({
                        latitude: geometry.location.lat,
                        longitude: geometry.location.lng,
                        location: data.description,
                    })
                    setValue(data.description)
                }
                console.log("geom " + JSON.stringify(geometry.location))
            }}
            textInputProps={{
                InputComp: Input,
                onChangeText: (text) => setValue(text),
                value: value,
                leftIcon: { type: 'material-icon', name: 'search' },
                rightIcon: { type: 'material-icon', name: 'close', onPress: () => setValue("") },
                errorStyle: { color: 'red' },
                onFocus: () => setFocused(true),
                onBlur: () => setFocused(false),
                clearButtonMode: "while-editing",
            }}

        />

    );
};

export default GooglePlace;