import { colors } from '@Utils/Color/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react'
import { Pressable, StyleSheet } from 'react-native';
import { css } from '@emotion/native';

interface Props {
    onPress: Function,
    name: string,
    style: object,
    size: number,
    color: string
}

export const Icons = ({ onPress, name, style, size, color }: Partial<Props>) => {
    return (
        <Pressable style={css`${style}`} onPress={() => onPress()}>
            <Icon name={name} size={size} color={color} />
        </Pressable>
    )
}
