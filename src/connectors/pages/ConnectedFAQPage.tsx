import React from 'react';
import DisconnectedFAQPage from '../../components/pages/FAQPage';
import { IFaq } from '../../types/client/page/faq';

const FAQPage: React.FC = props => {
    const faqs: IFaq[] = [
        {
            title: 'How can I research my topic?',
            suggestions: [
                'Teachers and local/school librarians',
                'Research databases accessed through your school library',
                'Reputable articles and newsites through Google',
            ],
            description: 'Boston/ Massachusetts specific sites:',
            links: [
                {
                    url: {
                        linkURL: 'no',
                        linkTitle: 'Research by Focus Issue'
                    },
                    description: 'Generation Citizen provides Massachusetts-specific articles, resources, and past projects organized by focus issue.'
                },
                {
                    url: {
                        linkURL: 'no',
                        linkTitle: 'Massachusetts Legislature'
                    },
                    description: 'This website displays Massachusetts laws, bills, and budget.'
                },
                {
                    url: {
                        linkURL: 'no',
                        linkTitle: 'Boston’s Open Data Hub'
                    },
                    description: 'Data in Boston is organized by topic and some data is already analyzed for you.'
                },
                {
                    url: {
                        linkURL: 'no',
                        linkTitle: 'Boston Housing Projects'
                    },
                    description: 'Housing projects in Boston can be searched by project stage, neighborhoods, and keywords.'
                }
            ]
        }
    ]
    return (
        <DisconnectedFAQPage faqs={faqs}/>
    )
}

export default FAQPage;