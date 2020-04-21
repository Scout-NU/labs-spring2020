import styled from "../../styles/theme/Theme";

interface ICircleImageProps {
    imageUrl: string;
    size: string;
}

const CircleImage = styled.img<ICircleImageProps>`
    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
    background-image: url(${props => props.imageUrl});
    background-size: cover;
    border-radius: 50%;
`

export default CircleImage;