import React from 'react';
import styled, { css } from '@emotion/native'
import { colors } from '@Utils/Color/colors';

const Input = styled.TextInput(({ width, height, radius, borderWidth, borderTopWidth, borderBottomWidth, borderLeftWidth, borderRightWidth }: any) => `
    margin:5px;
    width:${width || "90%"};
    height: ${height || "55px"};
    padding:2px;
    paddingLeft: 15px;
    border-bottom-width: ${borderBottomWidth || "2px"}
    border-top-width: ${borderTopWidth || "2px"}
    border-left-width: ${borderLeftWidth || "2px"}
    border-right-width: ${borderRightWidth || "2px"}
    border: ${borderWidth || "2px"} solid ${colors.secondary};
    border-radius: ${radius || "7px"};
    background-color: ${colors.white}
`)




export default Input;
