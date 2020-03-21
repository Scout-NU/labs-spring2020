import styled from "../../theme/Theme";

const Card = styled.div`
    border-radius: 15px;
    box-shadow: 0 0 26px lightgray;
    background-color: white;
    padding: 1em;
    transition: all .5s;

    &::hover {
        transform: scale(1.2);
        box-shadow: 0 0 0 36px gray;
    }
`

export default Card;