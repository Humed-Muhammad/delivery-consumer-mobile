import styled from "@emotion/native";
import { colors } from "@Utils/Color/colors";

interface Props {
    marginTop: number,
    width: number | string,
    borderWidth: number,
    color: string,
    thikness: number,
    spacing: number,
    direction: string,
    height: number
}


export const Divider = styled.View(({ spacing, width, height, thikness, color, direction = "horizontal" }: Partial<Props>) => ({
    width: direction == "horizontal" ? width || "100%" : width,
    height: direction == "vertical" ? height || 40 : null,
    margin: spacing || 0,
    borderBottomWidth: direction == "horizontal" ? thikness || 1 : null,
    borderColor: color || colors.primary,
    borderRightWidth: direction == "vertical" ? thikness || 1 : null,
    padding: 0
}))