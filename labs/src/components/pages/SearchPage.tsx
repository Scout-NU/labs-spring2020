import React from 'react';
import HeaderBlob from '../atoms/HeaderBlob';
import { H4, H2 } from '../atoms/Typography';
import { Col, Row } from 'react-flexbox-grid';
import styled from '../../theme/Theme';
import devices from '../../styles/breakpoints';
import { IPerson } from '../../types/client/client';
import PersonPreview from '../molecules/PersonPreview';
import useProfileRepository from '../../state/ambassador/service';
import { isAsset, isEntry, ILink } from '../../types/cms';
import { IAmbassador, IProblemTag } from '../../types/cms/generated';
import SearchGroup from '../organisms/SearchGroup';
import { URLQueryParser } from '../../state/util/filters';

interface ISearchPageProps {
    results: IPerson[];
}

const SearchContainer = styled.section`
    text-align: left;
    margin-top: 15vh;
`

const HeaderCaption = styled.div`
    position: relative;
    text-align: left;
    margin-top: 4em;

    @media ${devices.tablet} {
        left: auto;
        top: 0vh;
        width: 100%;
    }
`

const PersonWrapper = styled(Col)`
    margin-bottom: 3em;
    padding: 3em;
`

const HeaderContainer = styled(Col)`
    margin-bottom: 5vh;
`

const DisconnectedSearchPage: React.FC<ISearchPageProps> = props => {
    return (
        <>
        <SearchContainer>
            <HeaderBlob/>
            <Row center='xs' middle='xs'>
                <HeaderContainer xs={10}>
                    <Row end='xs'>
                        <HeaderCaption>
                            <H2>Connect with City Hall</H2>
                            <H4>Different Boston City Hall departments help the City of Boston in different ways. Find the person in a department that can best answer your questions!</H4>
                        </HeaderCaption>
                    </Row>
                    <SearchGroup />
                </HeaderContainer>
                <Col xs={11}>
                    <Row top='xs' center='xs' start='md'>
                        { props.results.map((value, i) => {
                            return (
                                <PersonWrapper key={i} xs={11} md={6} lg={4}>
                                    <PersonPreview onSelected={() => console.log(`Someone wants to meet ${value.firstName}`)} profile={value} key={i}/>
                                </PersonWrapper>
                            )
                        })}
                    </Row>
                </Col>
            </Row>
        </SearchContainer>
        </>
    )
}

const SearchPage: React.FC = () => {
    const [ambassadors, setAmbassadors] = React.useState<IPerson[]>([]);
    const profileRepository = useProfileRepository();

    const searchAmbassadors = () => {
        if (window.location.search === "") {
            profileRepository.getAllProfiles()
            .then(res => {setAmbassadors(mapAmbassadors(res))}).catch(error => console.log(error));
        } else {
            // TODO: pull into router?
            let params = new URLQueryParser(new URLSearchParams(window.location.search));
            profileRepository.searchProfiles(params.getQuery(), params.getFilters())
            .then(res => {setAmbassadors(mapAmbassadors(res))}).catch(error => console.log(error));
        }
    }

    // TODO: Parse current URL Params and do some kind of query based on that
    React.useEffect(() => {
        async function search() {
            searchAmbassadors();
        }

        search();
    }, []);

    // TODO: Move this into some kind of connector method
    const mapAmbassadors = (ambassadors: IAmbassador[]): IPerson[] => {
        return ambassadors.map((item) => {
            let data = item.fields;
            let asset = item.fields.profilePicture!!;
            let tags = item.fields.tags;

            if (isAsset(asset)) {
                return {
                    id: item.sys.id,
                    profileImageUrl: asset.fields.file.url!!,
                    firstName: data.firstName ? data.firstName : '',
                    lastName: data.lastName ? data.lastName : '',
                    positionTitle: data.positionTitle? data.positionTitle : '',
                    description: data.ambassadorDescription? data.ambassadorDescription : '',
                    genderPronouns: data.preferredPronouns ? data.preferredPronouns.join("/") : '',
                    tags: tags? resolveTags(tags) : []
                }
            }
            console.log(item)
            throw Error("SHOOT YOU SHOULD HAVE FIXED THIS BY NOW")
        })
    }

    const resolveTags = (tags: (ILink<"Entry"> | IProblemTag)[]): string[] => {
        let resolvedTags: string[] = [];

        tags.forEach((tag) => {
            if (isEntry(tag) && tag.fields.tagName) resolvedTags.push(tag.fields.tagName);
        })

        return resolvedTags;
    }

    return(
        <DisconnectedSearchPage results={ambassadors} />
    )
}


export default SearchPage;