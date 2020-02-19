import React from 'react';
import styled from '../../theme/Theme';
import { P, NavigationLink } from '../atoms/Typography';
import { Row, Col } from 'react-flexbox-grid';
import devices, { device } from '../../styles/breakpoints';
import burger from '../../images/global/burger.svg'
import { lunchboxColors } from '../../theme/lunchbox';

interface IHeaderProps {

}

const HeaderContainer = styled.nav`
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
`

const HeaderLink = styled(NavigationLink)`
    text-transform: uppercase;
    margin: 2em 3em 2em 1em;


    @media ${device.tablet} {
        margin: 2em 0;
    }
`

const Burger = styled.img`
    display: none;
    position: absolute;
    right: 2em;
    top: 2em;
    height: 2em;

    @media ${device.tablet} {
        display: flex;
    }
`

const HeaderMenu = styled.div`

    @media ${device.desktop} {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    @media ${device.tablet} {
        position: absolute;
        text-align: right;
        width: auto;
        top: 2em;
        right: 2em;
        display: none;
        flex-direction: column;
        padding: 1em 2em;
        background-color: ${lunchboxColors.gusher};
        color: white;
        z-index: 999;
        box-shadow: 0 0 10px ${lunchboxColors.gusher};
    }
`

export class Header extends React.Component<IHeaderProps> {
    private menu = React.createRef<HTMLDivElement>();

    constructor(props: IHeaderProps) {
        super(props);
        this.toggleMenu.bind(this);   
    }

    toggleMenu() {
        const node = this.menu.current;
        if (node) {
            const display = node?.style.display;

            if (display == 'none' || !display) {
                node.style.display = 'flex';
            } else {
                node.style.display = 'none';
            }
        }
    }

    render() {
        return (
            <HeaderContainer>
                <HeaderMenu ref={this.menu}> 
                    <HeaderLink>Home</HeaderLink>
                    <HeaderLink>Connect With City Hall</HeaderLink>
                    <HeaderLink>Help</HeaderLink>
                </HeaderMenu>
                <Burger onClick={() => this.toggleMenu()} src={burger}/>
            </HeaderContainer>
        )
    }
}