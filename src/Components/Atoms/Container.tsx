import styled from '@emotion/native'


interface Props {
    width: string,
    height: string,
    z: number,
    direction: string,
    justify: string,
    align: string,
    bg: string,
    position: string,
    bottom: string,
    right: string,
    left: string,
    top: string,
    padd: string
}



const Container = styled.View(({ width, height, z, direction, justify, align, bg, position, bottom, right, left, top, padd }: Partial<Props>) => `
    height: ${height || null};
    position: ${position || "relative"};
    bottom: ${bottom || null};
    top: ${top || null};
    right: ${right || null};
    left: ${left || null};
    padding: ${padd || "2px"};
    margin: 0px;
    z-index: ${z || 0};
    width: ${width || "100%"};
    display:flex;
    flex-direction: ${direction || "row"};
    justify-content: ${justify || "center"};
    align-items:${align || "center"};
    background-color: ${bg || "white"};
`)





export default Container;
