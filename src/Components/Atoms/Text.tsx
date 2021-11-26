import styled from '@emotion/native'
import { fonts } from '@Utils/Fonts'

const Text = styled.Text((props: any) => `
    padding:3px;
    color: ${props.color};
    font-size: ${props.fontSize || fonts.medium};
    fontWeight: ${props.fontWeight ? props.fontWeight : "normal"}
`)





export default Text;
