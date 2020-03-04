import styled from "../../theme/Theme";

interface ICircleImageProps {
    imageUrl: string;
    size: string;
}

const CircleImage = styled.img<ICircleImageProps>`
    width: ${props=> props.size};
    height: ${props=> props.size};
    background-image: url(${props => props.imageUrl});
    background-size: cover;
    background-position: center;
    border-radius: 50%;
`

export default CircleImage;