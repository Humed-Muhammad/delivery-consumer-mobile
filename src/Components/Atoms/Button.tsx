import React from 'react';
import styled, { css } from '@emotion/native'
import { colors } from "@Utils/Color/colors"
import { fonts } from "@Utils/Fonts"

interface Props {
    width: string,
    height: string,
    radius: string,
    z: string,
    b: string,
    position: string,
    text: string,
    onPress: Function,
    bg: string,
    color: string,
    margins: string,
    paddings: string,
    align: string
}

const Text = styled.Text({
    color: "white",
})

const Pressable = styled.Pressable`
    margin:5px;
    padding:2px;
    display:flex;
    justify-content: center;
    align-items:center;
    background-color: ${colors.gray};
`


const Button = ({ width, height, radius, z, b, position, text, onPress, bg, color, margins, paddings, align }: Partial<Props>) => {
    return (
        <Pressable style={
            css`width: ${width || "100px"}; 
            height:${height || "50px"}; border-radius: ${radius || "3px"}; position: ${position || "relative"}; bottom: ${b || "0px"};  background-color: ${bg}; margin:${margins || "5px"};padding:${paddings || "2px"}; align-items:${align || "center"}`
        }
            onPress={() => onPress() || null
            }>
            <Text style={css`
            color:${color || colors.white};font-size: ${fonts.medium};`} >{text}</Text>
        </Pressable>
    )
}

export default Button;
