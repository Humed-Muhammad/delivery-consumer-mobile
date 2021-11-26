import React from 'react'
import styled from '@emotion/native'

interface Props {
    imageHeight: number | string,
    imageWidth: number | string,
    radius: number
}

const Image = styled.Image(({ imageHeight, imageWidth, radius }: Partial<Props>) => ({

    width: imageWidth || "50%",
    height: imageHeight || "90%",
    borderRadius: radius || 10,

}))

export default Image
