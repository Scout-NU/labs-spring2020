import React from 'react';
import burger from '../../../images/global/burger.svg';
import closebutton from '../../../images/global/closebutton.svg';
import { searchPageRoute, homePageRoute, faqPageRoute, conversationGuideRoute } from '../../../var/routes';
import { HeaderContainer, HeaderMenu, HeaderLink, Burger, CloseButton } from './styled';

interface IHeaderProps {

}

export class Header extends React.Component<IHeaderProps> {
    private menu = React.createRef<HTMLDivElement>();

    constructor(props: IHeaderProps) {
        super(props);
        this.toggleMenu.bind(this);   
    }

    // TODO: This is hacky I think but idk how to do it otherwise
    toggleMenu() {
        const node = this.menu.current;
        if (node) {
            const display = node?.style.display;

            if (display === 'none' || !display) {
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
                    <CloseButton onClick={() => this.toggleMenu()} src={closebutton}/>
                    <HeaderLink to={homePageRoute}>Home</HeaderLink>
                    <HeaderLink to={searchPageRoute}>Explore Profiles</HeaderLink>
                    <HeaderLink to={conversationGuideRoute}>Conversation Guide</HeaderLink>
                    <HeaderLink to={faqPageRoute}>FAQ</HeaderLink>
                </HeaderMenu>
                <Burger onClick={() => this.toggleMenu()} src={burger}/>
            </HeaderContainer>
        )
    }
}