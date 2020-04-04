import React from 'react';
import HeaderBlob from '../atoms/HeaderBlob';
import { lunchboxColors } from '../../theme/lunchbox';
import { H1, H4, H2 } from '../atoms/Typography';
import { Col, Row } from 'react-flexbox-grid';
import styled from '../../theme/Theme';
import devices from '../../styles/breakpoints';
import SearchBar from '../molecules/SearchBar';
import { IPerson } from '../../types/client/client';
import PersonPreview from '../molecules/PersonPreview';
import useProfileRepository from '../../state/ambassador/repository';
import { IAsset, isAsset } from '../../types/cms';
import { IAmbassador } from '../../types/cms/generated';

interface ISearchPageProps {
    results: IPerson[];
    suggestedSearches: string[];
}

const SearchContainer = styled.section`
    text-align: left;
    margin-top: 15vh;
`

const HeaderCaption = styled.div`
    position: relative;
    text-align: left;
    width: 60%;
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
    margin-bottom: 20vh;
`

const DisconnectedSearchPage: React.FC<ISearchPageProps> = props => {
    return (
        <>
        <SearchContainer>
            <HeaderBlob/>
            <Row center='xs'>
                <HeaderContainer xs={8}>
                    <SearchBar hintText='Search by topic or name' searchSuggestions={props.suggestedSearches} onSearch={(query) => window.alert(`This search ain\'t real, but when it is it can tell you about ${query}!`)}/>
                    <Row end='xs'>
                        <HeaderCaption>
                            <H2>Connect with City Hall</H2>
                            <H4>Different Boston City Hall departments help the City of Boston in different ways. Find the person in a department that can best answer your questions!</H4>
                        </HeaderCaption>
                    </Row>
                </HeaderContainer>
                <Col xs={11}>
                    <Row middle='xs' start='xs'>
                        { props.results.map((value, i) => {
                            return (
                                <PersonWrapper xs={12} md={6} lg={4}>
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
    const [searched, hasSearched] = React.useState(false);
    const [searchSuggestions, setSuggestions] = React.useState<string[]>(['Climate Change', 'Gun Control', 'Mental Health', 'Affordable Housing']);
    const [ambassadors, setAmbassadors] = React.useState<IPerson[]>([]);
    const profileRepository = useProfileRepository();

    React.useEffect(() => {
        profileRepository.getAllProfiles()
        .then(res => {setAmbassadors(mapAmbassadors(res))}).catch(error => console.log("yp"))
    }, []);

    const mapAmbassadors = (ambassadors: IAmbassador[]): IPerson[] => {
        // console.log(ambassadors)
        return ambassadors.map((item) => {
            let data = item.fields;
            let asset = item.fields.profilePicture!!;
            if (isAsset(asset)) {
                console.log(item)
                return {
                    id: item.sys.id,
                    profileImageUrl: asset.fields.file.url!!,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    positionTitle: data.positionTitle,
                    description: data.ambassadorDescription,
                    genderPronouns: data.preferredPronouns.join("/"),
                    tags: data.problemTags
                }
            }
            console.log(item)
            throw Error("FUCK")
        })
    }

    return(
        <DisconnectedSearchPage suggestedSearches={searchSuggestions} results={ambassadors}/>
    )
}


export default SearchPage;