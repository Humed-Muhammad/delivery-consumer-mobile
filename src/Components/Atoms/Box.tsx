import styled from "@emotion/native";
import { colors } from "@Utils/Color/colors";

type Props = {
    height: number,
    marginTop: number,
    width: number,
    spacing: number,
    topSpacing: number,
    bottomSpacing: number,
    leftSpacing: number,
    rightSpacing: number,
}


export const Box = styled.View(({ height, width, spacing, rightSpacing, leftSpacing, topSpacing, bottomSpacing }: Partial<Props>) => ({
    height: height || 30,
    width: width || "100%",
    margin: spacing || 10,
    marginTop: topSpacing,
    marginBottom: bottomSpacing,
    marginLeft: leftSpacing,
    marginRight: rightSpacing,
}))