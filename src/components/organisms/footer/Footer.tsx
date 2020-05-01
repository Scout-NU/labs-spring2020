import React from 'react';
import footerPeople from '../../../images/global/footer-people.svg';
import monumlogo from '../../../images/global/monumlogo.svg';
import { monumRoute } from '../../../var/routes';
import { ILink } from '../../../types/client/model/link';
import { StyledFooter, FooterImage, LinkGroup, FooterLink, FooterGroup, MonumLogo, FooterContent } from './styled';
import { A } from '../../atoms/typography/Typography';

interface IFooterProps {
    footerLinks: ILink[];
    departmentLink: ILink;
}


/**
 * Footer at the bottom of the page.
 * TODO/REFACTOR: Should expect links from the CMS. That data is all set up in there, just needs to be hoooked up.
 * REFACTOR: The way this is styled, it doesn't let things touch it directly. The home page needs to do this. See ./styled for info.
 */
const DisconnectedFooter: React.FC<IFooterProps> = props => {
    return (
        <StyledFooter>
            <FooterImage src={footerPeople}/>
            <FooterContent>
                <LinkGroup>
                    {props.footerLinks.map((link, key) => {
                        return (
                            <FooterLink key={key} to={link.linkURL}>
                                {link.linkTitle}
                            </FooterLink>
                        )
                    })}
                </LinkGroup>
                <FooterGroup>
                    <MonumLogo src={monumlogo}/>
                    <A href={props.departmentLink.linkURL} target='_blank'>
                        {props.departmentLink.linkTitle}
                    </A>
                </FooterGroup>  
            </FooterContent>
        </StyledFooter>
    )
}

export const Footer: React.FC = props => {
    const links: ILink[] = [
        { linkTitle: 'FAQ', linkURL: '' },
        { linkTitle: 'Conversation Guide', linkURL: '' },
        { linkTitle: 'Email Us', linkURL: ''},
     ]

     const deplink = {
         linkTitle: `MAYOR'S OFFICE OF NEW URBAN MECHANICS`,
         linkURL: monumRoute
     }

    return (
        <DisconnectedFooter footerLinks={links} departmentLink={deplink}/>
    )
}

export default Footer;