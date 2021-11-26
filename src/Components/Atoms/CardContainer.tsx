import styled from '@emotion/native'
import { colors } from '@Utils/Color/colors';

interface Props {
    flexWarp: string,
    radius: string,
    margins: string,
    borderColor: string,
    width: string,
    height: string,
    z: number,
    direction: string,
    justify: string,
    align: string,
    bg: string,
    position: string,
    bottom: string,
    top: string,
    left: string,
    right: string,
    padd: string,
    paddingLeft: string,
    borderTopWidth: string,
}


const shadow = {
    color: colors.gray,
    offSet: { width: "-2px", height: "4px" },
    opacity: 0.6,
    radius: "3px",
    elevation: "5"
}

const CardConatiner = styled.View(({ flexWarp, radius, margins, borderColor, width, height, z, direction, justify, align, bg, position, bottom, top, left, right, padd, paddingLeft, borderTopWidth }: Partial<Props>) => `
    height: ${height || null};
    position: ${position || "relative"};
    bottom: ${bottom || null};
    top: ${top || null};
    right: ${right || null};
    left: ${left || null};
    padding: ${padd || "2px"};
    paddingleft: ${paddingLeft || null}
    margin-top: ${margins || "5px"};
    margin-right: ${margins || "5px"};
    margin-bottom: ${margins || "5px"};
    margin-left: ${margins || "5px"};
    z-index: ${z || 0};
    width: ${width || "100%"};
    display:flex;
    flex-wrap: ${flexWarp || null};
    flex-direction: ${direction || "row"};
    justify-content: ${justify || "center"};
    align-items:${align || "center"};
    background-color: ${bg || "white"};
    shadowColor: ${shadow.color};
    shadoOffset: ${shadow.offSet};
    shadowOpacity: ${shadow.opacity};
    shadowRadius: ${shadow.radius};
    elevation: ${shadow.elevation};
    border-style: solid;
    border-color: ${borderColor || colors.light};
    border-top-width: ${borderTopWidth || null};
    border-radius: ${radius || "10px"};
`)




export default CardConatiner;
