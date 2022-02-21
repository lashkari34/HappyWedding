// MatchedUserFullProfile

import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar, ImageBackground, ScrollView, Text, Modal, NativeModules, FlatList, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import deviceDimesions from '../../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import RangeSlider from 'rn-range-slider';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import LinearGradient from 'react-native-linear-gradient';
import { goToAddPhotosOnRequestScreen, goToChatMessageScreen, goToDrawerViewAllMatchedUserScreen, goToMatchedUserProfileOverviewrScreen, goToPreviousScreen, goToTrustedBadgesScreen, goToUpgradeToPremiumScreen } from '../../../helper/NavigationFunctions/NavigationFunctions';
// import SlidingUpPanel from 'rn-sliding-up-panel';
import { Badge, H3 } from 'native-base';
import ImagesPathVariable from '../../../helper/ImagesPathVariable/ImagesPathVariable';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import StepIndicator from 'react-native-step-indicator';
import Carousel from 'react-native-snap-carousel';
import IconsPathVariable from '../../../helper/IconsPathVariable/IconsPathVariable';
import { BaseURL } from '../../../API_config/BaseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddToShortlist, checkShortlistInterestSent, EducationDetailsOfLoggedInUser, GetKnowMeBetter, GetMemberAllGalleryPics, GetMemberCareerDetails, GetMemberDetail, GetSimilarProfiles, GetUserHobbiesAndInterests, getYouAndHer, RemoveFromShortlist, SendInterest } from '../../../helper/API_Call/API_Call';
import { SafeAreaView } from 'react-native';
import { Linking } from 'react-native';
import { ToastAndroid } from 'react-native';
import { Card } from 'react-native-elements';
import { push } from '../../../helper/RootNavigator/RootNavigator';
import { SpeedDial } from 'react-native-elements';
import PulseLoader from 'react-native-pulse-loader';
import LoaderOnButtonPress from '../../../component/LoaderOnButtonPress/LoaderOnButtonPress';

export default class MatchedUserFullProfiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            access_token: "",
            MatchedUserData: "",
            isLoading: false,
            Membership_type: "",
            Membership_typedatashow: null,

            SimilarProfilesArr: [],
            CareerDataArr: [],
            MemberEducationDataArr: [],
            KnowMeBetterArr: [],
            YouAndHerArr: [],
            HobbiesAndInterests: null,
            userGalleryImages: null,
            isShortlisted: false,
            interestSent: false,
            Membership_type_contact: true,
            Membership_type_FamilyDetails: true,
            Membership_FamilyDetailsShowData: false,
            Membership_type_AstroDetails: true,
            Membership_AstroDetailsShowData: false

        }
    }

    async setAsyncState(name, value) {
        this.setState({ [name]: value })
    }

    async componentDidMount() {

        this.setState({ isLoading: true })
        const access_token = await AsyncStorage.getItem('access_token');
        this.setState({ access_token });

        await GetMemberDetail(this.props.data.member_id, this.state.access_token).then(res => {
            let response = res;
            console.log(response.data.data, "Notification_Dta")
            this.setState({ MatchedUserData: response.data.data })
        })

        // Get Self Data
        await GetMemberDetail("", this.state.access_token).then(res => {
            let response = res;
            // console.log(response.data.data)
            this.setState({ Membership_type: response.data.data.membership })
            this.setState({ Membership_type_showdata: true })
        })
            .catch(err => {
                let error = err
                console.log(error)
            })

        await GetMemberAllGalleryPics(this.state.access_token, this.props.data.member_id).then(res => {
            let response = res;

            if (response.data.status) {
                let Images = [];
                response.data.gallery_photos.map((el, i) => {
                    let newImgObj = {
                        url: BaseURL.DemoURL + el.gallery
                    }
                    // return({url : BaseURL.DemoURL + el.gallery})
                    // console.log(el.gallery)
                    Images.push(newImgObj)
                })
                console.log(Images)

                this.setState({ userGalleryImages: Images })
            }
        })



        await GetMemberCareerDetails(this.props.data.member_id, this.state.access_token).then(res => {
            let response = res;
            // console.log(response.data.data)
            response.data.data ? this.setState({ CareerDataArr: response.data.data }) : null
        })
            .catch(err => {
                let error = err
                console.log(error)
            })

        await EducationDetailsOfLoggedInUser(this.props.data.member_id, this.state.access_token).then(res => {
            let response = res;
            // console.log(response.data.data)
            response.data.data ? this.setState({ MemberEducationDataArr: response.data.data }) : null

        })
            .catch(err => {
                let error = err;
                console.log(JSON.stringify(error))
            })

        await GetKnowMeBetter(this.state.access_token, this.props.data.member_id).then(res => {
            let response = res;
            // console.log(response.data.data)
            this.setState({ KnowMeBetterArr: response.data.data })
        })
            .catch(err => {
                let error = err;
                console.log(JSON.stringify(error))
            })

        await getYouAndHer(this.state.access_token, this.props.data.member_id).then(res => {
            let response = res;
            console.log(response.data.data, "getYouAndHer====")
            this.setState({ YouAndHerArr: response.data.data })
        })
            .catch(err => {
                let error = err;
                console.log(JSON.stringify(error))
            })

        await GetUserHobbiesAndInterests(this.state.access_token, this.props.data.member_id).then(res => {
            let response = res;
            let ArrData = Object.entries(response.data.data)
            // console.log(ArrData)
            // console.log(ArrData.some((el,i)=>el[1].length > 0))
            ArrData.some((el, i) => el[1].length > 0) ? this.setState({ HobbiesAndInterests: response.data.data }) : this.setState({ HobbiesAndInterests: null })

        })
            .catch(err => {
                let error = err;
                console.log(JSON.stringify(error))
            })
        // console.log(userData)

        await GetSimilarProfiles(this.state.access_token).then(res => { let response = res; response.data.status ? this.setState({ SimilarProfilesArr: response.data.data }) : this.setState({ SimilarProfilesArr: null }) }).catch(err => { let error = err; console.log(error) })


        // const userData = await AsyncStorage.getItem('user_data')
        // console.log(this.state.isLoading)
        // await this.setAsyncState("isLoading", false)
        this.setState({ isLoading: false, isShortlisted: this.props.data.shortlisted, interestSent: this.props.data.interest_sent })
    }

    async onShortlistPress() {
        this.state.isShortlisted ?
            RemoveFromShortlist(this.props.data.member_id).then(res => {
                let response = res;
                console.log(response.data)
                // this.ToggleLoader("", false)
                this.setState({ isShortlisted: !this.state.isShortlisted })
            })
                .catch(err => {
                    console.log(err)
                    this.ToggleLoader("", false)
                })
            :
            AddToShortlist(this.props.data.member_id).then(res => {
                let response = res;
                console.log(response.data)
                this.setState({ isShortlisted: !this.state.isShortlisted })
            })
                .catch(err => {
                    console.log(err)
                    // this.ToggleLoader("", false)
                })
    }

    async onInterestSend() {
        !this.state.interestSent ?
            SendInterest(this.props.data.member_id).then(res => {
                let response = res;
                // console.log(response)
                this.setState({ interestSent: true })
            })
                .catch(err => {
                    console.log(err)
                })
            :
            ToastAndroid.showWithGravityAndOffset(
                "Already Sent Interest",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
    }
    async goToPremiumContactDetails() {
        this.setState({ Membership_typedatashow: true });
        this.setState({ Membership_type_contact: false });
    }

    async goToPremiumFamilDetails() {
        this.setState({ Membership_FamilyDetailsShowData: true });
        this.setState({ Membership_type_FamilyDetails: false });
    }

    async goToPremiumAstroDetails() {
        this.setState({ Membership_type_AstroDetails: false });
        this.setState({ Membership_AstroDetailsShowData: true });

    }

    async onCardShortlistPress(isShortlisted, memberID) {
        // this.ToggleLoader("Wait...", true)
        isShortlisted ?
            RemoveFromShortlist(memberID).then(res => {
                let response = res;
                // console.log(response.data)
                // this.ToggleLoader("", false)
                this.forceUpdate();
            })
                .catch(err => {
                    // console.log(err)
                    // this.ToggleLoader("", false)
                })
            :
            AddToShortlist(memberID).then(res => {
                let response = res;
                // console.log(response.data)
                // this.ToggleLoader("", false)
                this.forceUpdate();
            })
                .catch(err => {
                    console.log(err)
                    // this.ToggleLoader("", false)
                })
    }

    async oncardInterestSend(memberID) {
        // this.ToggleLoader("Wait...", true)
        SendInterest(memberID).then(res => {
            let response = res;
            // console.log(response)
            // this.ToggleLoader("", false)
            this.forceUpdate();
        })
            .catch(err => {
                console.log(err)
                // this.ToggleLoader("", false)
            })
    }

    OnViewAllButtonPress = async (name) => {
        let ViewAllData;
        // console.log("Similar Profiles")
        // this.ToggleLoader("Loading...", true)
        setTimeout(() => {
            goToDrawerViewAllMatchedUserScreen({ title: "Similar Profiles", data: null })
            // this.ToggleLoader("", false)
        }, 0);
    }

    render() {


        const renderItem = (ele, i, DataArr, title) => {
            // console.log(ele)
            return (
                <View style={{ marginVertical: deviceDimesions.Height * 0.01, marginHorizontal: -deviceDimesions.width * 0.03, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                    <Card containerStyle={{ backgroundColor: "#ffffff", elevation: 5, borderRadius: 10, paddingVertical: 0, width: deviceDimesions.width * 0.439, alignItems: 'center' }}>
                        <ImageBackground source={{ uri: BaseURL.DemoURL + ele.profile_image }} resizeMode={ele.profile_image == 'uploads/gallery_image/default.jpg' ? 'center' : 'cover'} style={styles.UsersCardContainer} imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                            {/* <View style={{width : deviceDimesions.width*0.44, flexDirection : "row", justifyContent : "space-evenly", marginVertical : deviceDimesions.Height*0.01, alignItems : 'flex-end', alignSelf : 'center'}}>
                                    <View style={{padding : 5,width : deviceDimesions.width*0.22}} />
                                    <View style={{width : deviceDimesions.width*0.22, alignItems : 'flex-end'}}>
                                        <View style={{padding : 4, backgroundColor : 'rgba(255,255,255,0.4)', borderRadius : 50}}>
                                            <TouchableOpacity 
                                                style={{elevation : 3,backgroundColor : '#ffffff', padding : 5, alignItems : 'center', alignSelf : 'flex-end', borderRadius : 40, justifyContent : 'center'}}
                                            >
                                                <Image source={IconsPathVariable.ShieldIcon} style={{height : deviceDimesions.Height*0.02, width : deviceDimesions.width*0.04 }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>     
                                </View>  */}
                            <TouchableOpacity
                                onPress={() => push("MatchedUserProfileOverview", { data: { dataArr: DataArr, activeIndex: i, DataTitle: title } })}
                                style={{ width: deviceDimesions.width * 0.45, height: deviceDimesions.Height * 0.1 }}
                            />
                            <View style={{ position: 'absolute', bottom: 2, flexDirection: 'row', justifyContent: 'space-evenly', width: deviceDimesions.width * 0.45 }}>
                                <TouchableOpacity
                                    onPress={() => push("MatchedUserProfileOverview", { data: { dataArr: DataArr, activeIndex: i, DataTitle: title } })}
                                    style={{ width: deviceDimesions.width * 0.22, flexDirection: "row", justifyContent: "space-around", marginVertical: deviceDimesions.Height * 0.01, alignItems: 'center' }}
                                />
                                <View style={{ width: deviceDimesions.width * 0.22, flexDirection: "row", justifyContent: "space-evenly", marginVertical: deviceDimesions.Height * 0.01, alignItems: 'center' }}>
                                    <View style={{ padding: 4, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 50 }}>
                                        <TouchableOpacity onPress={() => { this.onShortlistPress(ele.shortlisted, ele.member_id).then(res => ele.shortlisted = !ele.shortlisted) }} style={{ elevation: 3, backgroundColor: '#ffffff', height: deviceDimesions.Height * 0.035, width: deviceDimesions.width * 0.07, alignItems: 'center', borderRadius: 40, justifyContent: 'center' }}>
                                            <Icon size={16} name={ele.shortlisted ? 'bookmark' : 'bookmark-o'} color='red' />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ padding: 4, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 50 }}>
                                        <TouchableOpacity onPress={() => { !ele.interest_sent ? this.onInterestSend(ele.member_id).then(res => { ele.interest_sent = !ele.interest_sent }) : null }} style={{ elevation: 3, backgroundColor: '#ffffff', height: deviceDimesions.Height * 0.035, width: deviceDimesions.width * 0.07, alignItems: 'center', borderRadius: 40, justifyContent: 'center' }}>
                                            <Icon size={16} name={ele.interest_sent ? 'heart' : 'heart-o'} color='red' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                        </ImageBackground>
                        <TouchableOpacity
                            style={{ width: deviceDimesions.width * 0.45, alignSelf: 'center', height: deviceDimesions.Height * 0.11, alignItems: 'center' }}
                            onPress={() => {
                                // console.log(ele)
                                push("MatchedUserProfileOverview", { data: { dataArr: DataArr, activeIndex: i, DataTitle: title } })
                                // goToMatchedUserProfileOverviewrScreen(DataArr, i, title)
                            }}
                        >
                            <View style={{ width: deviceDimesions.width * 0.45, alignSelf: 'center', paddingHorizontal: 2 }}>
                                <Text numberOfLines={1} style={{ paddingHorizontal: 3, width: deviceDimesions.width * 0.35, fontSize: 14, fontWeight: '700', marginVertical: 5 }}>{ele.first_name} {ele.last_name}</Text>
                                {ele.age || ele.edu_course_name ?
                                    <Text numberOfLines={1} style={{ paddingHorizontal: 3, width: deviceDimesions.width * 0.35, fontSize: 13, fontWeight: "600", opacity: 0.7 }}>{ele.age ? ele.age + ", " : ""}{ele.edu_course_name ? ele.edu_course_name : ""}</Text> : <></>}
                                {ele.residence_place || ele.career_type ?
                                    <Text numberOfLines={1} style={{ paddingHorizontal: 3, width: deviceDimesions.width * 0.35, fontSize: 13, fontWeight: "600", opacity: 0.7 }}>{ele.career_type ? ele.career_type + ", " : ""} {ele.residence_place}</Text> : <></>}
                            </View>
                        </TouchableOpacity>
                    </Card>
                </View>

            )
        }


        return (



            <View style={styles.container}>
                {
                    this.state.isLoading ?
                        <View style={styles.LoaderContainer}>

                        </View>
                        :

                        <View>

                            <View style={styles.userIntroContainer}>
                                <View>

                                    {this.state.userGalleryImages != null && this.state.userGalleryImages.length > 1 ?
                                        <View style={{ width: deviceDimesions.width * 0.95, height: deviceDimesions.Height * 0.4, backgroundColor: '#000000', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                                            <Image source={this.state.userGalleryImages != null && this.state.userGalleryImages.length > 1 ? { uri: this.state.userGalleryImages[1].url } : ImagesPathVariable.LandingImage2} style={{
                                                flex: 1,
                                                width: deviceDimesions.width * 0.95,
                                                height: deviceDimesions.Height * 0.4,
                                                // borderRadius : 100,
                                                // borderTopRightRadius : 15,
                                                resizeMode: 'contain', alignSelf: 'center'
                                            }}
                                            />
                                        </View>

                                        : null
                                    }
                                    <View style={styles.userIntroTextContainer}>
                                        {this.state.MatchedUserData.marital_status ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="male" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData.marital_status}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.height ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="arrows-v" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData.height}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.profile_created_by ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="male" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>Profile Created By {this.state.MatchedUserData.profile_created_by}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.mother_tongue ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="language" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData.mother_tongue}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.place_grew_up ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40} color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="street-view" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData && this.state.MatchedUserData.place_grew_up ? this.state.MatchedUserData.place_grew_up : 'null'}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.body_type ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="child" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData && this.state.MatchedUserData.body_type ? this.state.MatchedUserData.body_type : 'null'}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.drink ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <F5Icon name="glass-cheers" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData && this.state.MatchedUserData.drink ? this.state.MatchedUserData.drink : 'null'}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.smoke ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <F5Icon name="smoking" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData && this.state.MatchedUserData.smoke ? this.state.MatchedUserData.smoke : 'null'}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.physical_disability ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <F5Icon name="female" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData && this.state.MatchedUserData.physical_disability ? this.state.MatchedUserData.physical_disability : 'null'}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.few_words_about_me ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <F5Icon name="user" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData && this.state.MatchedUserData.few_words_about_me ? this.state.MatchedUserData.few_words_about_me : 'null'}</Text>
                                            </View>
                                            : null
                                        }
                                    </View>
                                </View>
                            </View>




                            <View style={{ ...styles.userIntroContainer, marginTop: deviceDimesions.Height * 0.02, paddingTop: -deviceDimesions.Height * 0.02, }}>
                                {this.state.userGalleryImages != null && this.state.userGalleryImages.length > 2 ?
                                    <View style={{ width: deviceDimesions.width * 0.95, height: deviceDimesions.Height * 0.4, backgroundColor: '#000000', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                                        <Image source={this.state.userGalleryImages != null && this.state.userGalleryImages.length > 2 ? { uri: this.state.userGalleryImages[2].url } : ImagesPathVariable.LandingImage2} style={{
                                            flex: 1,
                                            width: deviceDimesions.width * 0.95,
                                            height: deviceDimesions.Height * 0.4,
                                            resizeMode: 'contain', alignSelf: 'center'
                                        }} />
                                    </View>
                                    : null
                                }
                                {this.state.MatchedUserData.working_details ?
                                    this.state.MatchedUserData.working_details.map((el, i) => {
                                        return (
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="briefcase" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{el}</Text>
                                            </View>
                                        )
                                    })
                                    : null
                                }
                                {this.state.MatchedUserData.education_details ?
                                    this.state.MatchedUserData.education_details.map((el, i) => {
                                        return (
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="graduation-cap" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{el}</Text>
                                            </View>
                                        )
                                    })
                                    : null
                                }
                                {this.state.MatchedUserData.residence_place ?
                                    <View style={styles.userPersonalDetailsRowContainer}>
                                        <NeuBorderView
                                            width={40}
                                            height={40}
                                            color={'#ffffff'}
                                            borderRadius={20}
                                            inset
                                        >
                                            <Icon name="map-marker" color="orange" size={18} />
                                        </NeuBorderView>
                                        <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData.residence_place}</Text>
                                    </View>
                                    : null
                                }
                                {this.state.MatchedUserData.residency_status ?
                                    <View style={styles.userPersonalDetailsRowContainer}>
                                        <NeuBorderView
                                            width={40}
                                            height={40}
                                            color={'#ffffff'}
                                            borderRadius={20}
                                            inset
                                        >
                                            <Icon name="map-marker" color="orange" size={18} />
                                        </NeuBorderView>
                                        <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData.residency_status}</Text>
                                    </View>
                                    : null
                                }
                                {this.state.MatchedUserData.annual_income ?
                                    <View style={styles.userPersonalDetailsRowContainer}>
                                        <NeuBorderView
                                            width={40}
                                            height={40}
                                            color={'#ffffff'}
                                            borderRadius={20}
                                            inset
                                        >
                                            <F5Icon name="rupee-sign" color="orange" size={18} />
                                        </NeuBorderView>
                                        <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData.annual_income}</Text>
                                    </View>
                                    : null
                                }
                                {this.state.MatchedUserData.country ?
                                    <View style={styles.userPersonalDetailsRowContainer}>
                                        <NeuBorderView
                                            width={40}
                                            height={40}
                                            color={'#ffffff'}
                                            borderRadius={20}
                                            inset
                                        >
                                            <F5Icon name="flag" color="orange" size={18} />
                                        </NeuBorderView>
                                        <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData.country}</Text>
                                    </View>
                                    : null
                                }
                            </View>
                            {/* Contact Details */}
                            {
                                this.state.Membership_type == 1 || !this.state.Membership_type ?

                                    <View style={{ height: deviceDimesions.Height * 0.27, width: deviceDimesions.width * 0.9, justifyContent: "center" }}>
                                        <TouchableOpacity
                                            style={{ elevation: 1, borderRadius: 1 }}
                                            onPress={() => goToUpgradeToPremiumScreen()}>
                                            <Image style={{
                                                height: deviceDimesions.Height * 0.27,
                                                width: deviceDimesions.width * 0.912
                                            }} source={ImagesPathVariable.MatchedUserProfileScreenSliderImage2} />
                                        </TouchableOpacity>
                                    </View>
                                    :

                                    this.state.Membership_type_contact ?


                                        <TouchableOpacity onPress={() => this.goToPremiumContactDetails()}
                                            style={{ height: deviceDimesions.Height * 0.1, alignContent: 'center', alignItems: 'center', alignSelf: "center", flexDirection: 'row', width: deviceDimesions.width * 0.89, backgroundColor: "#ffffff", elevation: 5, borderRadius: 15, padding: deviceDimesions.width * 0.02, bottom: 5, top: 1, marginBottom: 15 }}

                                        >

                                            <View style={{ flexDirection: 'row', height: deviceDimesions.Height * 0.1, alignContent: 'center', alignItems: 'center', alignSelf: "center", }}>
                                                <Image style={{ marginLeft: deviceDimesions.width * 0.08, height: deviceDimesions.Height * 0.06, width: deviceDimesions.width * 0.12 }} source={IconsPathVariable.UpgradeToPremiumBannerIcon} />

                                                <View style={{ marginRight: deviceDimesions.width * 0.099, flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 18, fontWeight: "700", marginRight: deviceDimesions.width * 0.08, marginLeft: 15 }}>View Contact Details</Text>

                                                </View>

                                            </View>

                                        </TouchableOpacity>


                                        :

                                        null


                            }

                            {

                                this.state.Membership_typedatashow ?

                                    <View style={{ alignSelf: "center", width: deviceDimesions.width * 0.88, backgroundColor: "#ffffff", elevation: 4, borderRadius: 15, padding: deviceDimesions.width * 0.02, marginVertical: 17 }}>

                                        <View style={{ marginTop: deviceDimesions.Height * 0.01, alignSelf: "center", width: deviceDimesions.width * 0.81, borderBottomWidth: 0.2, paddingBottom: deviceDimesions.Height * 0.03 }}>
                                            <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.01, width: deviceDimesions.width * 0.88 }}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="phone" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 15, opacity: 0.7 }}>Mobile : </Text>
                                                <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "700" }} selectable>{this.state.MatchedUserData.mobile}</Text>

                                                <View style={{ flexDirection: 'row', position: 'absolute', marginLeft: 280 }}>
                                                    <TouchableOpacity style={{}} onPress={() => Linking.openURL(`tel: + ${this.state.MatchedUserData.mobile}`)}>
                                                        <Icon name='phone' size={20} color='#0066cc' />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => Linking.openURL(`whatsapp://send?text=hello&phone=+${this.state.MatchedUserData.mobile}`)}>
                                                        <Icon name='whatsapp' size={21} color='#00cc00' />
                                                    </TouchableOpacity>
                                                </View>


                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="phone" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 15, opacity: 0.7 }}>Alternate Mobile Number : </Text>
                                                <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "700" }} selectable>{this.state.MatchedUserData.mobile}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="map-marker" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 15, opacity: 0.7 }}>Address / Location : </Text>
                                                <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "700" }}>{this.state.MatchedUserData.residence_place}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="envelope" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 15, opacity: 0.7 }}>Email ID : </Text>
                                                <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "700" }} selectable>{this.state.MatchedUserData.email}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: deviceDimesions.width * 0.8 }}>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 13, opacity: 0.7 }}>Pending Contacts : </Text>
                                                <Text style={{ fontSize: 14, fontWeight: "700" }}>{this.state.CountOfPendingContacts ? this.state.CountOfPendingContacts : 'null'}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 13, opacity: 0.7 }}>Pending Sms : </Text>
                                                <Text style={{ fontSize: 14, fontWeight: "700" }}>30</Text>
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    null
                            }

                            {/* Family Details */}
                            {
                                this.state.Membership_type == 1 || !this.state.Membership_type ?

                                    <View style={{ height: deviceDimesions.Height * 0.27, width: deviceDimesions.width * 0.9, justifyContent: "center", marginTop: 8 }}>
                                        <TouchableOpacity
                                            style={{ elevation: 1, borderRadius: 1 }}
                                            onPress={() => goToUpgradeToPremiumScreen()}>
                                            <Image style={{
                                                height: deviceDimesions.Height * 0.25,
                                                width: deviceDimesions.width * 0.912
                                            }} source={ImagesPathVariable.FamilyDeatilsImage} />
                                        </TouchableOpacity>
                                    </View>
                                    :

                                    this.state.Membership_type_FamilyDetails ?


                                        <TouchableOpacity onPress={() => this.goToPremiumFamilDetails()}
                                            style={{ height: deviceDimesions.Height * 0.1, alignContent: 'center', marginBottom: 10,alignItems: 'center', alignSelf: "center", flexDirection: 'row', width: deviceDimesions.width * 0.89, backgroundColor: "#ffffff", elevation: 5, borderRadius: 15, padding: deviceDimesions.width * 0.02, top: 1, 
                                        }}
                                        >

                                            <View style={{ flexDirection: 'row', height: deviceDimesions.Height * 0.1, alignContent: 'center', alignItems: 'center', alignSelf: "center", }}>
                                                <Image style={{ marginLeft: deviceDimesions.width * 0.08, height: deviceDimesions.Height * 0.06, width: deviceDimesions.width * 0.12 }} source={ImagesPathVariable.FamilyIcon} />

                                                <View style={{ marginRight: deviceDimesions.width * 0.099, flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 18, fontWeight: "700", marginRight: deviceDimesions.width * 0.08, marginLeft: 15 }}>View Family Details</Text>

                                                </View>

                                            </View>

                                        </TouchableOpacity>

                                        :

                                        null

                            }

                            {

                                this.state.Membership_FamilyDetailsShowData ?

                                    <View >
                                        {
                                            this.state.MatchedUserData.family_details.parent_data !== null ?

                                                <View style={{ alignSelf: "center", width: deviceDimesions.width * 0.88, backgroundColor: "#ffffff", elevation: 4, borderRadius: 15, padding: deviceDimesions.width * 0.02, marginBottom: 10 }}>
                                                    {
                                                        this.state.MatchedUserData.family_details.parent_data ? this.state.MatchedUserData.family_details.parent_data.map((el, i) => {
                                                            // console.log(el)
                                                            return (
                                                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02, width: deviceDimesions.width * 0.9 }} key={el.id}>
                                                                    <NeuBorderView
                                                                        color="#ffffff"
                                                                        width={deviceDimesions.width * 0.08}
                                                                        height={deviceDimesions.Height * 0.045}
                                                                        borderRadius={20}
                                                                    >
                                                                        <Icon name="briefcase" color="orange" size={16} />
                                                                    </NeuBorderView>
                                                                    <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600", width: deviceDimesions.width * 0.22 }}>{el.parent_type} -</Text>
                                                                    <Text style={{ color: "green", width: deviceDimesions.width * 0.45 }}>{el.parent_name} {el.designation ? " working as " + el.designation : ""} {el.working_in ? " in " + el.working_in : ''}</Text>
                                                                </View>
                                                            )
                                                        })
                                                            :
                                                            null
                                                    }

                                                </View>

                                                :
                                                

                                                <View style={{ alignSelf: "center", width: deviceDimesions.width * 0.88, backgroundColor: "#ffffff", elevation: 4, borderRadius: 15, padding: deviceDimesions.width * 0.02,height:50,marginBottom: 15}}>

                                             <Text style={{ alignContent: 'center', alignItems: 'center', alignSelf: "center",justifyContent:'center',fontWeight:'700',color:'orange',fontSize:18}}>No Family Details</Text>


                                                </View>





                                        }





                                    </View>


                                    :
                                    null
                            }


                            {/* Astro Details */}
                            {
                                this.state.Membership_type == 1 || !this.state.Membership_type ?

                                    <View style={{ height: deviceDimesions.Height * 0.27, width: deviceDimesions.width * 0.9, justifyContent: "center" , marginTop:1 }}>
                                        <TouchableOpacity
                                            style={{ elevation: 1, borderRadius: 1 }}
                                            onPress={() => goToUpgradeToPremiumScreen()}>
                                            <Image style={{
                                                height: deviceDimesions.Height * 0.25,
                                                width: deviceDimesions.width * 0.912
                                            }} source={ImagesPathVariable.AstroDetailsImage} />
                                        </TouchableOpacity>
                                    </View>
                                    :

                                    this.state.Membership_type_AstroDetails ?


                                        <TouchableOpacity onPress={() => this.goToPremiumAstroDetails()}
                                            style={{ height: deviceDimesions.Height * 0.1, alignContent: 'center', alignItems: 'center', alignSelf: "center", flexDirection: 'row', width: deviceDimesions.width * 0.89, backgroundColor: "#ffffff", elevation: 5, borderRadius: 15, padding: deviceDimesions.width * 0.02, bottom: 25, top: 1, marginBottom: 25 }}

                                        >

                                            <View style={{ flexDirection: 'row', height: deviceDimesions.Height * 0.1, alignContent: 'center', alignItems: 'center', alignSelf: "center", }}>
                                                <Image style={{ marginLeft: deviceDimesions.width * 0.08, height: deviceDimesions.Height * 0.06, width: deviceDimesions.width * 0.12 }} source={ImagesPathVariable.AstroIcon} />

                                                <View style={{ marginRight: deviceDimesions.width * 0.099, flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 18, fontWeight: "700", marginRight: deviceDimesions.width * 0.08, marginLeft: 15 }}>View Astro Details</Text>

                                                </View>

                                            </View>

                                        </TouchableOpacity>


                                        :

                                        null


                            }



                            {

                                this.state.Membership_AstroDetailsShowData ?

                                    <View style={{ alignSelf: "center", width: deviceDimesions.width * 0.88, backgroundColor: "#ffffff", elevation: 4, borderRadius: 15, marginVertical: 15 }}>

                                        <View style={{ marginTop: deviceDimesions.Height * 0.01, alignSelf: "center", width: deviceDimesions.width * 0.81, paddingBottom: deviceDimesions.Height * 0.03 }}>
                                            <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.01, width: deviceDimesions.width * 0.88 }}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="star" color="orange" size={16} />
                                                </NeuBorderView>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 15, opacity: 0.7 }}>Birth Star : </Text>
                                                <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "700" }} selectable>{this.state.MatchedUserData.astro_details.birth_star}</Text>


                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="briefcase" color="orange" size={16} />
                                                </NeuBorderView>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 15, opacity: 0.7 }}>Chovva Dosham : </Text>
                                                <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "700" }} selectable>{this.state.MatchedUserData.astro_details.chovva_dosham}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="briefcase" color="orange" size={16} />
                                                </NeuBorderView>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 15, opacity: 0.7 }}>Shudha Jthakam </Text>
                                                <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "700" }}>{this.state.MatchedUserData.astro_details.shudha_jathakam}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Ionicons name="md-time-outline" color="orange" size={16} />
                                                </NeuBorderView>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 15, opacity: 0.7 }}>Time Of Birth : </Text>
                                                <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "700" }} selectable>{this.state.MatchedUserData.astro_details.time_of_birth}</Text>
                                            </View>

                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Fontisto name="sun" color="orange" size={16} />
                                                </NeuBorderView>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 15, opacity: 0.7 }}>Sun Sign : </Text>
                                                <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "700" }} selectable>{this.state.MatchedUserData.astro_details.sun_sign}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <MaterialCommunityIcons name="city-variant" color="orange" size={16} />

                                                </NeuBorderView>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 15, opacity: 0.7 }}>City Of Birth : </Text>
                                                <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "700" }} selectable>{this.state.MatchedUserData.astro_details.city_of_birth}</Text>
                                            </View>

                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="briefcase" color="orange" size={16} />
                                                </NeuBorderView>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 15, opacity: 0.7 }}>Matching Stars : </Text>
                                                <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "700" }} selectable>{this.state.MatchedUserData.astro_details.matching_stars}</Text>
                                            </View>
                                        </View>

                                    </View>
                                    :
                                    null
                            }





                            {this.state.KnowMeBetterArr.some(el => el.answer) ?
                                <View style={{ ...styles.userIntroContainer, marginTop: deviceDimesions.Height * 0.02, paddingTop: -deviceDimesions.Height * 0.02, }}>
                                    {this.state.userGalleryImages != null && this.state.userGalleryImages.length > 3 ?
                                        <Image source={this.state.userGalleryImages != null && this.state.userGalleryImages.length > 3 ? { uri: this.state.userGalleryImages[2].url } : ImagesPathVariable.LandingImage2} style={{ height: deviceDimesions.Height * 0.42, width: deviceDimesions.width * 0.95, resizeMode: 'stretch' }} />
                                        : null
                                    }
                                    {this.state.KnowMeBetterArr.some(el => el.answer) ?
                                        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: deviceDimesions.width * 0.02, marginTop: 10 }}>
                                            <Image source={IconsPathVariable.KnowMeBetter} />
                                            <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: deviceDimesions.width * 0.05 }}>Know Me Better</Text>
                                        </View>
                                        : null
                                    }
                                    {/* Content Goes Here */}
                                    {
                                        this.state.KnowMeBetterArr ?
                                            this.state.KnowMeBetterArr.map((el, i) => {
                                                return (
                                                    <>
                                                        {el.answer ?
                                                            <View style={{ marginTop: deviceDimesions.Height * 0.02, alignSelf: "center" }} key={i}>
                                                                <View
                                                                    style={{ width: deviceDimesions.width * 0.85, borderRadius: 15, elevation: 4, padding: deviceDimesions.width * 0.03, backgroundColor: "#f2f2f2" }}
                                                                >
                                                                    <View style={{ marginTop: deviceDimesions.width * 0.01 }}>
                                                                        <Text style={{ fontSize: 15, fontWeight: "700" }}>{el.question}</Text>
                                                                        <Text style={{ fontSize: 14, opacity: 0.7 }}>{el.answer}</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            : null
                                                        }
                                                    </>
                                                )
                                            })
                                            :
                                            null
                                    }
                                </View>
                                : null
                            }


                            <View style={{ marginTop: deviceDimesions.Height * 0.02 }}>
                                {
                                    this.state.SimilarProfilesArr != null ?
                                        <>
                                            <View style={styles.skipButtonContainer}>
                                                <Text style={{ fontSize: 16, fontWeight: '700', }}>Similar Profiles</Text>
                                                <TouchableOpacity
                                                    style={styles.skipButton}
                                                    onPress={() => { this.OnViewAllButtonPress('Similar Profiles') }}
                                                >
                                                    <Text>View all</Text>
                                                    <NeuBorderView
                                                        color="#f5f5f5"
                                                        height={30}
                                                        width={30}
                                                        borderRadius={20}
                                                        inset
                                                    >
                                                        <Icon name="chevron-right" size={14} color="#FC7C4C" />
                                                    </NeuBorderView>

                                                </TouchableOpacity>
                                            </View>
                                            <SafeAreaView >

                                                <FlatList
                                                    data={this.state.SimilarProfilesArr}
                                                    style={{ flex: 1, paddingVertical: deviceDimesions.Height * 0.015, width: deviceDimesions.width * 0.89 }}
                                                    contentContainerStyle={{ alignItems: 'center' }}
                                                    numColumns={2}
                                                    // horizontal={true}
                                                    // showsHorizontalScrollIndicator={false}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    renderItem={({ item, index }) => renderItem(item, index, this.state.SimilarProfilesArr, 'Similar Profiles')}
                                                // keyExtractor={item => item.id}
                                                />
                                            </SafeAreaView>
                                        </>
                                        :
                                        this.state.cardsLoading && <ContentLoader active avatar pRows={4} pWidth={["100%", 200, "25%", 45]} />
                                }
                            </View>
                        </View>
                }
            </View>



        )
    }
}


// Component---
// export default class MatchedUserFullProfile extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             showBottomOptions : false,
//             welcomeModelOpen: true,
//             isScrollable: false,
//             access_token: "",
//             CareerDataArr: null,
//             MemberEducationDataArr: null,
//             Membership_type: "",
//             carouselItems: [
//                 {
//                     type: 'img',
//                     image: ImagesPathVariable.MatchedUserProfileScreenSliderImage1
//                 },
//                 {
//                     type: 'img',
//                     image: ImagesPathVariable.MatchedUserProfileScreenSliderImage2
//                 },
//                 {
//                     type: 'img',
//                     image: ImagesPathVariable.MatchedUserProfileScreenSliderImage3
//                 },
//             ],
//             shortlisted: false,
//             interested: false,
//             user_data: [],
//             KnowMeBetterArr: [],
//             YouAndHerArr: [],
//             ViewMoreYouAndHerData: false,
//             HobbiesAndInterests: null,
//             SimilarProfilesArr: null,
//         }
//     }

//     async componentDidMount() {
//         const access_token = await AsyncStorage.getItem('access_token');
//         this.setState({ access_token });

//         this.setState({shortlisted : this.props.data.shortlisted, interested : this.props.data.interest_sent})

//         const userData = await AsyncStorage.getItem('user_data')
//         // console.log(userData.userdata)
//         // this.setState({Membership_type: userData.userdata.membership}, ()=>console.log(this.state.Membership_type))

//         await GetMemberDetail(this.props.data.member_id, this.state.access_token).then(res => {
//             let response = res;
//             // console.log(response.data.data)
//             this.setState({ user_data: response.data.data })
//         })
//         .catch(err => {
//             let error = err
//             console.log(error)
//         })

//         // Get Self Data
//         await GetMemberDetail("", this.state.access_token).then(res => {
//             let response = res;
//             // console.log(response.data.data)
//             this.setState({ Membership_type: response.data.data.membership })
//         })
//             .catch(err => {
//                 let error = err
//                 console.log(error)
//             })


//         await GetSimilarProfiles(this.state.access_token).then(res => { let response = res; response.data.status ? this.setState({ SimilarProfilesArr: response.data.data }) : this.setState({ SimilarProfilesArr: null }) }).catch(err => { let error = err; console.log(error) })

//         await GetMemberCareerDetails(this.props.data.member_id, this.state.access_token).then(res => {
//             let response = res;
//             // console.log(response.data.data)
//             response.data.data ? this.setState({ CareerDataArr: response.data.data }) : null
//         })
//             .catch(err => {
//                 let error = err
//                 console.log(error)
//             })

//         await EducationDetailsOfLoggedInUser(this.props.data.member_id, this.state.access_token).then(res => {
//             let response = res;
//             // console.log(response.data.data)
//             response.data.data ? this.setState({ MemberEducationDataArr: response.data.data }) : null

//         })
//             .catch(err => {
//                 let error = err;
//                 console.log(JSON.stringify(error))
//             })

//         await GetKnowMeBetter(this.state.access_token, this.props.data.member_id).then(res => {
//             let response = res;
//             // console.log(response.data.data)
//             this.setState({ KnowMeBetterArr: response.data.data })
//         })
//             .catch(err => {
//                 let error = err;
//                 console.log(JSON.stringify(error))
//             })

//         await getYouAndHer(this.state.access_token, this.props.data.member_id).then(res => {
//             let response = res;
//             // console.log(response.data.data)
//             this.setState({ YouAndHerArr: response.data.data })
//         })
//             .catch(err => {
//                 let error = err;
//                 console.log(JSON.stringify(error))
//             })

//         await GetUserHobbiesAndInterests(this.state.access_token, this.props.data.member_id).then(res => {
//             let response = res;
//             let ArrData = Object.entries(response.data.data)
//             // console.log(ArrData)
//             // console.log(ArrData.some((el,i)=>el[1].length > 0))
//             ArrData.some((el, i) => el[1].length > 0) ? this.setState({ HobbiesAndInterests: response.data.data }) : this.setState({ HobbiesAndInterests: null })

//         })
//             .catch(err => {
//                 let error = err;
//                 console.log(JSON.stringify(error))
//             })
//         // console.log(userData)

//     }

//     _renderSliderItem({ item, index }) {
//         return <View style={{
//             // height : deviceDimesions.Height*0.4, 
//             // width : deviceDimesions.width*0.9,
//             alignItems: 'center'
//         }}>
//             <Image style={{ height: deviceDimesions.Height * 0.4, width: deviceDimesions.width * 0.9, resizeMode: 'cover' }} source={item.image} />
//         </View>
//     }

//     async onShortlistPress(isShortlisted, memberID) {
//         // this.ToggleLoader("Wait...", true)
//         isShortlisted ?
//             RemoveFromShortlist(memberID).then(res => {
//                 let response = res;
//                 if(memberID == this.props.data.member_id){
//                     this.setState({shortlisted : false})
//                 }
//                 // console.log(response.data)
//                 // this.ToggleLoader("", false)
//                 this.forceUpdate();
//             })
//             .catch(err => {
//                 // console.log(err)
//                 // this.ToggleLoader("", false)
//             })
//             :
//             AddToShortlist(memberID).then(res => {
//                 let response = res;
//                 if(memberID == this.props.data.member_id){
//                     this.setState({shortlisted : true})
//                 }
//                 // console.log(response.data)
//                 // this.ToggleLoader("", false)
//                 this.forceUpdate();
//             })
//             .catch(err => {
//                 console.log(err)
//                 // this.ToggleLoader("", false)
//             });
//     }

//     async onInterestSend(memberID) {
//         // this.ToggleLoader("Wait...", true)
//         SendInterest(memberID).then(res => {
//             let response = res;
//             // console.log(response)
//             // this.ToggleLoader("", false)
//             this.forceUpdate();
//         })
//             .catch(err => {
//                 console.log(err)
//                 // this.ToggleLoader("", false)
//             })
//     }

//     OnViewAllButtonPress = async (name) => {
//         let ViewAllData;
//         // console.log("Similar Profiles")
//         // this.ToggleLoader("Loading...", true)
//         setTimeout(() => {
//             goToDrawerViewAllMatchedUserScreen({ title: "Similar Profiles", data: null })
//             // this.ToggleLoader("", false)
//         }, 0);
//     }

//     render() {
//         let userData = this.props.data
//         // console.log("----------------------------------------------")
//         // console.log(this.props.data)
//         // const dummyDataForFlatlist = [
//         //     {
//         //     id: 'bd7acbea-c1b1-46c2-aed5-sadsad3ad53abb28ba',
//         //     title: 'Venki',
//         //     },
//         //     {
//         //     id: '3ac68afc-c605-48d3-a4f8-asdsadfbd91aa97f63',
//         //     title: 'Venki',
//         //     },
//         //     {
//         //     id: '58694a0f-3da1-471f-bd96-14asdsadsa5571e29d72',
//         //     title: 'Venki',
//         //     },
//         //     {
//         //     id: 'bd7acbea-c1b1-46c2-aed5-3aasdasdd53abb28ba',
//         //     title: 'Venki',
//         //     },
//         // ];



//         const customStyles = {
//             stepIndicatorSize: deviceDimesions.width * 0.1,
//             currentStepIndicatorSize: deviceDimesions.width * 0.1,
//             separatorStrokeWidth: 2,
//             currentStepStrokeWidth: 2,
//             stepStrokeCurrentColor: 'orange',
//             stepStrokeWidth: 2,
//             stepStrokeFinishedColor: 'orange',
//             stepStrokeUnFinishedColor: 'orange',
//             separatorFinishedColor: '#e6e6e6',
//             separatorUnFinishedColor: '#e6e6e6',
//             stepIndicatorFinishedColor: '#ffffff',
//             stepIndicatorUnFinishedColor: '#ffffff',
//             stepIndicatorCurrentColor: '#ffffff',
//             stepIndicatorLabelFontSize: 14,
//             currentStepIndicatorLabelFontSize: 14,
//             stepIndicatorLabelCurrentColor: 'orange',
//             stepIndicatorLabelFinishedColor: 'orange',
//             stepIndicatorLabelUnFinishedColor: 'orange',
//             labelColor: 'orange',
//             labelSize: 14,
//             currentStepLabelColor: 'orange'
//         }

//         // Education Step Indicator
//         const renderStepIndicator = (el, i) => {
//             // console.log(el);
//             return <Text style={{ color: 'orange', fontSize: 8 }}>{this.state.MemberEducationDataArr ? this.state.MemberEducationDataArr[el.position].till_year : "null"}</Text>
//         };

//         // Education step Lable
//         const renderStepLabel = (el, i) => {
//             // console.log(el)
//             return <View style={{ width: deviceDimesions.width * 0.7, marginLeft: deviceDimesions.width * 0.05, flexDirection: "row", justifyContent: "space-around" }}>
//                 <Text style={{ width: deviceDimesions.width * 0.67, fontSize: 14 }}>{el.label.course_name} from {el.label.college}</Text>
//                 {/* <TouchableOpacity style={{ width: deviceDimesions.width * 0.08, height: deviceDimesions.Height * 0.04, backgroundColor: "#ffffff", elevation: 2, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
//                 <Icon name="pencil" />
//             </TouchableOpacity> */}
//             </View>
//         }


//         // Career Step Indicator
//         // 
//         // const renderCareerStepIndicator = (el, i) => {
//         //     // console.log(el);
//         //     return <Text style={{ color: 'orange', fontSize: 8 }}>{this.state.CareerDataArr ? this.state.CareerDataArr[el.position].till_year.slice(0,4) : "null"}</Text>
//         // };

//         // Career Step LAbel
//         //
//         // const renderCareerStepLabel = (el, i) => {
//         //     // console.log(el)
//         //     return <View style={{ width: deviceDimesions.width * 0.7, marginLeft: deviceDimesions.width * 0.05, flexDirection: "row", justifyContent: "space-around" }}>
//         //         <Text style={{ width: deviceDimesions.width * 0.55 }}>working as {el.label.working_as} in {el.label.working_in}</Text>
//         //         {/* <TouchableOpacity style={{ width: deviceDimesions.width * 0.08, height: deviceDimesions.Height * 0.04, backgroundColor: "#ffffff", elevation: 2, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
//         //             <Icon name="pencil" />
//         //         </TouchableOpacity> */}
//         //     </View>
//         // }

//         // Career Step Indicator
//         const renderCareerStepIndicator = (el, i) => {
//             // console.log(el);
//             return <Icon name="user" color="orange" />
//         };

//         // Career Step LAbel
//         const renderCareerStepLabel = (el, i) => {
//             // console.log(el)
//             return <View style={{ width: deviceDimesions.width * 0.7, marginLeft: deviceDimesions.width * 0.05, flexDirection: "row", justifyContent: "space-around" }}>
//                 <Text style={{ width: deviceDimesions.width * 0.67, fontSize: 14 }}>Working as {el.label.working_as} in {el.label.working_in}</Text>
//                 {/* <TouchableOpacity style={{ width: deviceDimesions.width * 0.08, height: deviceDimesions.Height * 0.04, backgroundColor: "#ffffff", elevation: 2, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
//                 <Icon name="pencil-alt" />
//             </TouchableOpacity> */}
//             </View>
//         }

//         const renderItem = (ele, i, DataArr, title) => {
//             // console.log(ele)
//             return (
//                 <View style={{ marginVertical: deviceDimesions.Height * 0.02, marginHorizontal: deviceDimesions.width * 0.0 }}>
//                     <Card containerStyle={{ backgroundColor: "#ffffff", elevation: 5, borderRadius: 10, paddingVertical: 0, width: deviceDimesions.width * 0.5 }}>
//                         <TouchableOpacity
//                             style={{ width: deviceDimesions.width * 0.5, alignSelf: 'center', height: deviceDimesions.Height * 0.33 }}
//                             onPress={() => {
//                                 // console.log(ele)
//                                 push("MatchedUserProfileOverview", { data: { dataArr: DataArr, activeIndex: i, DataTitle: title } })
//                             }}
//                         >
//                             <Card.Image source={{ uri: BaseURL.DemoURL + ele.profile_image }} resizeMode={ele.profile_image == 'uploads/gallery_image/default.jpg' ? 'center' : 'cover'} style={styles.UsersCardContainer} />
//                             {/* <Text style={{fontSize : 14, fontWeight : '700'}}>{ele.first_name}</Text> */}
//                             <View style={{ width: deviceDimesions.width * 0.46, alignSelf: 'center' }}>
//                                 <Text style={{ paddingHorizontal: 3, width: deviceDimesions.width * 0.35, fontSize: 14, fontWeight: '700', marginVertical: 5 }}>{ele.first_name} {ele.last_name}</Text>
//                                 {/* {ele.age ? <Text style={{ paddingHorizontal : 3, width : deviceDimesions.width*0.35, fontSize : 12, fontWeight : "600", opacity : 0.7}}>{ele.age}</Text> : <></>} */}
//                                 {ele.age || ele.edu_course_name ? <Text style={{ paddingHorizontal: 3, width: deviceDimesions.width * 0.35, fontSize: 12, fontWeight: "600", opacity: 0.7 }}>{ele.age ? ele.age + ", " : ""}{ele.edu_course_name ? ele.edu_course_name : ""}</Text> : <></>}
//                                 {ele.residence_place || ele.career_type ? <Text style={{ paddingHorizontal: 3, width: deviceDimesions.width * 0.35, fontSize: 12, fontWeight: "600", opacity: 0.7 }}>{ele.career_type ? ele.career_type + ", " : ""} {ele.residence_place}</Text> : <></>}
//                                 {/* {ele.mother_tongue ? <Text style={{ paddingHorizontal : 3, width : deviceDimesions.width*0.35, fontSize : 12, fontWeight : "600", opacity : 0.7}}>{ele.religion}, {ele.caste}</Text> : <></>} */}
//                             </View>
//                         </TouchableOpacity>
//                         <View style={{ flexDirection: "row", justifyContent: "space-around", width: deviceDimesions.width * 0.47, marginVertical: deviceDimesions.Height * 0.01, alignSelf: 'center' }}>
//                             <TouchableOpacity onPress={() => { this.onShortlistPress(ele.shortlisted, ele.member_id).then(res => ele.shortlisted = !ele.shortlisted) }} style={{ elevation: 3, backgroundColor: '#f2f2f2', alignItems: 'center', borderRadius: 10, width: deviceDimesions.width * 0.18, height: deviceDimesions.Height * 0.04, flexDirection: 'row', justifyContent: 'space-evenly' }}>
//                                 <Text style={{ fontWeight: '600', color: '#ff6f00', fontSize: 14, marginRight: 5 }}>{!ele.shortlisted ? 'SAVE' : 'SAVED'}</Text>
//                                 <Icon name='download' color='#ff6f00' />
//                             </TouchableOpacity>
//                             <TouchableOpacity onPress={() => { !ele.interest_sent ? this.onInterestSend(ele.member_id).then(res => { ele.interest_sent = !ele.interest_sent }) : null }} style={{ elevation: 3, backgroundColor: '#ff6f00', alignItems: 'center', borderRadius: 10, width: deviceDimesions.width * 0.18, height: deviceDimesions.Height * 0.04, flexDirection: 'row', justifyContent: 'space-evenly', eleevation: 3 }}>
//                                 <Text style={{ fontWeight: '600', marginRight: 5, fontSize: 14, color: "#f5f5f5" }}>{!ele.interest_sent ? "LIKE" : "LIKED"}</Text>
//                                 <Icon name='paper-plane' color='white' />
//                             </TouchableOpacity>
//                         </View>
//                     </Card>
//                 </View>
//             )
//         }


//         return (
//             <SafeAreaView style={styles.container}>
//                 <StatusBar
//                     backgroundColor="#ffffff"
//                     barStyle="dark-content"
//                 />
//                 {/* content Container */}
//                 <View style={{ paddingBottom: deviceDimesions.Height * 0.01 }}>
//                     <ScrollView
//                         contentContainerStyle={{ paddingBottom: deviceDimesions.Height * 0.02 }}
//                         showsVerticalScrollIndicator={false}
//                     >
//                         <ImageBackground
//                             imageStyle={{ resizeMode: "stretch", height: deviceDimesions.Height * 0.4, width: deviceDimesions.width }}
//                             style={{ width: deviceDimesions.width, height: deviceDimesions.Height * 0.4 }}
//                             source={userData.profile_image && userData.profile_image !== "/uploads/gallery_image/default.jpg" ? { uri: BaseURL.DemoURL + userData.profile_image } : ImagesPathVariable.LoginLogo}
//                         >
//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: deviceDimesions.width * 0.95, marginTop: deviceDimesions.Height * 0.02, alignItems: 'center' }}>
//                                 <TouchableOpacity
//                                     style={{ padding: deviceDimesions.width * 0.05 }}
//                                     onPress={() => goToPreviousScreen(this)}
//                                 >
//                                     <Icon name="chevron-left" size={18} />
//                                 </TouchableOpacity>
//                                 {/* <TouchableOpacity>
//                                     <NeuButton
//                                         color = "#ffffff"
//                                         borderRadius = {20}
//                                         width = {deviceDimesions.width*0.12}
//                                         height = {deviceDimesions.Height*0.06}
//                                         noShadow
//                                     >
//                                         <Icon name="picture-o" size={18} />
//                                     </NeuButton>
//                                     <View style={{marginTop : -deviceDimesions.Height*0.07, marginLeft : deviceDimesions.width*0.07}}>
//                                         <Badge warning>
//                                             <Text style={{color : "white"}}> 5 </Text>
//                                         </Badge>
//                                     </View>
//                                 </TouchableOpacity> */}
//                             </View>
//                             {/* <View style={{alignItems : "flex-end", width : deviceDimesions.width*0.9, marginTop : deviceDimesions.Height*0.05, alignSelf : "center"}}>

//                             </View> */}
//                         </ImageBackground>
//                         <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 15 }}>
//                             <View
//                                 // style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center" }}
//                                 style={{ width: deviceDimesions.width * 0.9, alignSelf: 'center' }}
//                             >
//                                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                     <Text style={{ fontSize: 22, fontWeight: "bold", letterSpacing: 2 }}>{userData.first_name} | </Text>
//                                     <Text style={{ fontSize: 13, opacity: 0.7 }} selectable>{userData.member_profile_id}</Text>
//                                 </View>

//                                 {/* <View>
//                                     <NeuView
//                                         color="#ffffff"
//                                         width={deviceDimesions.width * 0.09}
//                                         height={deviceDimesions.Height * 0.045}
//                                         borderRadius={20}
//                                     >
//                                         <Icon name="shield" color="orange" size={18} />
//                                     </NeuView>
//                                 </View> */}

//                                 {/* <View>
//                                     <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
//                                         <Text>Match Score </Text>
//                                         <Text style={{ color: "green", fontWeight: "500" }}>0%</Text>
//                                     </View>
//                                     <ProgressBar
//                                         styleAttr="Horizontal"
//                                         indeterminate={false}
//                                         progress={0.0}
//                                         color="orange"
//                                     />
//                                 </View> */}
//                                 {/* <View>
//                                     <NeuView
//                                         color="#ffffff"
//                                         width={deviceDimesions.width * 0.09}
//                                         height={deviceDimesions.Height * 0.045}
//                                         borderRadius={20}
//                                     >
//                                         <Icon name="star-half-o" color="orange" size={18} />
//                                     </NeuView>
//                                 </View>
//                                 <View>
//                                     <Text style={{ color: "green", fontWeight: "500" }}>0%</Text>
//                                     <Text style={{ fontSize: 12, opacity: 0.7 }}>Good</Text>
//                                 </View> */}
//                                 {/* <View>
//                                     <NeuView
//                                         color="#ffffff"
//                                         width={deviceDimesions.width * 0.09}
//                                         height={deviceDimesions.Height * 0.045}
//                                         borderRadius={20}
//                                     >
//                                         <Icon name="share-alt" color="orange" size={18} />
//                                     </NeuView>
//                                 </View> */}
//                             </View>
//                             {/* <Text style={{ fontSize: 13, opacity: 0.7, margin: 5 }}>Last seen at 10:22 AM</Text>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: deviceDimesions.width * 0.9, alignSelf: "center" }}>
//                                 <TouchableOpacity><Text style={{ color: "orange", fontSize: 16, marginVertical : deviceDimesions.Height*0.01 }}>Check Horoscope Match</Text></TouchableOpacity> 
//                                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                                 </View>
//                             </View> */}
//                             {/* <View style={{ flexDirection: "row", justifyContent: "space-around", margin: 5, width : deviceDimesions.width*0.9 }}>
//                                 <TouchableOpacity style={{ padding: 5 }}>
//                                     <NeuView
//                                         color="#ffffff"
//                                         borderRadius={20}
//                                         width={deviceDimesions.width * 0.27}
//                                         height={deviceDimesions.Height * 0.055}
//                                     >
//                                         <Text style={{ color: "orange" }}>About</Text>
//                                     </NeuView>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={{ padding: 5 }}>
//                                     <NeuView
//                                         color="#ffffff"
//                                         borderRadius={20}
//                                         width={deviceDimesions.width * 0.27}
//                                         height={deviceDimesions.Height * 0.055}
//                                         containerStyle={{
//                                             flexDirection: "row",
//                                             justifyContent: "space-evenly",
//                                             alignItems: "center"
//                                         }}
//                                     >
//                                         <Text>Astro</Text>
//                                         <Icon name="lock" color="orange" />
//                                     </NeuView>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={{ padding: 5 }}>
//                                     <NeuView
//                                         color="#ffffff"
//                                         borderRadius={20}
//                                         width={deviceDimesions.width * 0.27}
//                                         height={deviceDimesions.Height * 0.055}
//                                     >
//                                         <Text>Interests</Text>
//                                     </NeuView>
//                                 </TouchableOpacity>
//                             </View> */}
//                             {/* <View style={{marginTop : 10}}>
//                                 <Text>He has requested you to add photo. Would you like to add it now?</Text>
//                             </View>
//                             <View style={{marginTop : 10, flexDirection : 'row'}}>
//                                 <TouchableOpacity style={{width : 120, height : 40, borderRadius : 20, borderColor : 'orange', borderWidth : 0.7, backgroundColor : '#ffffff', elevation : 5,justifyContent : 'center',alignItems : 'center'}}>
//                                     <Text>No</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={{width : 120, height : 40, borderRadius : 20, backgroundColor : 'orange', borderColor : '#ffffff', borderWidth : 0.7, elevation : 5,justifyContent : 'center',alignItems : 'center', marginLeft : 20}}
//                                     onPress={()=>goToAddPhotosOnRequestScreen()}
//                                 >
//                                     <Text style={{color : '#ffffff'}}>Add</Text>
//                                 </TouchableOpacity>
//                             </View> */}
//                         </View>

//                         {/* Career */}
//                         {
//                             this.state.CareerDataArr !== null ?
//                                 <View style={{ marginTop: deviceDimesions.Height * 0.03, width: deviceDimesions.width * 0.9, alignSelf: "center" }}>
//                                     <View style={{ flexDirection: "row", alignItems: "center", marginBottom: -deviceDimesions.Height * 0.01 }}>
//                                         <Image source={IconsPathVariable.CareerTitleIcon} />
//                                         <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: deviceDimesions.width * 0.03 }}>Career</Text>
//                                     </View>
//                                     {/* Content here */}
//                                     <View style={{ width: deviceDimesions.width * 0.8, alignSelf: "center", alignItems: "flex-start" }}>

//                                         <View style={{ alignItems: "center", height: this.state.CareerDataArr ? deviceDimesions.Height * (this.state.CareerDataArr.length / 14) : 20 }}>
//                                             {
//                                                 this.state.CareerDataArr !== [] ?
//                                                     <StepIndicator
//                                                         customStyles={customStyles}
//                                                         currentPosition={0}
//                                                         stepCount={this.state.CareerDataArr.length}
//                                                         labels={this.state.CareerDataArr}
//                                                         direction="vertical"
//                                                         renderStepIndicator={renderCareerStepIndicator}
//                                                         renderLabel={renderCareerStepLabel}
//                                                     />
//                                                     : null
//                                             }
//                                         </View>
//                                     </View>
//                                 </View>
//                                 : null
//                         }

//                         {/* Education */}
//                         {
//                             this.state.MemberEducationDataArr !== null ?
//                                 <View style={{ marginTop: deviceDimesions.Height * 0.02, width: deviceDimesions.width * 0.9, alignSelf: "center" }}>
//                                     <View style={{ flexDirection: "row", alignItems: "center", marginBottom: -deviceDimesions.Height * 0.01 }}>
//                                         <Image source={IconsPathVariable.EducationTitleIcon} />
//                                         <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: deviceDimesions.width * 0.03 }}>Education</Text>
//                                     </View>
//                                     {/* Content Here */}
//                                     <View style={{ width: deviceDimesions.width * 0.8, alignSelf: "center", alignItems: "flex-start" }}>

//                                         <View style={{ alignItems: "center", height: this.state.MemberEducationDataArr ? deviceDimesions.Height * (this.state.MemberEducationDataArr.length / 14) : 20 }}>
//                                             {
//                                                 this.state.MemberEducationDataArr !== [] ?
//                                                     <StepIndicator
//                                                         customStyles={customStyles}
//                                                         currentPosition={0}
//                                                         stepCount={this.state.MemberEducationDataArr.length}
//                                                         labels={this.state.MemberEducationDataArr}
//                                                         // labels={["Best Actor Award state youth festival", "Best Actor Award state youth festival", "Best Actor Award state youth festival"]}
//                                                         direction="vertical"
//                                                         renderStepIndicator={renderStepIndicator}
//                                                         renderLabel={renderStepLabel}
//                                                     />
//                                                     :
//                                                     null
//                                             }
//                                         </View>
//                                     </View>
//                                 </View>
//                                 : null
//                         }

//                         {/* Basic Details */}
//                         <View style={{ marginTop: deviceDimesions.Height * 0.03, width: deviceDimesions.width * 0.9, alignSelf: "center" }}>
//                             <View style={{ flexDirection: "row", alignItems: "center" }}>
//                                 <Image source={IconsPathVariable.BasicDetailsTitleIcon} />
//                                 <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: deviceDimesions.width * 0.03 }}>Basic Details</Text>
//                             </View>
//                             {/* Content Here */}
//                             <View style={{ marginTop: deviceDimesions.Height * 0.005, width: deviceDimesions.width * 0.85, alignSelf: "center", alignItems: "flex-start" }}>
//                                 <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.85, marginTop: deviceDimesions.Height * 0.01, justifyContent: "space-around" }}>
//                                     <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.4, alignItems: "flex-start" }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="user" color="orange" />
//                                         </NeuBorderView>
//                                         <View>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7 }}>{userData.religion}, {userData.caste}</Text>
//                                         </View>
//                                     </View>
//                                     <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.4, alignItems: "flex-start" }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="globe" color="orange" />
//                                         </NeuBorderView>
//                                         <View>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7 }}> Nationality : </Text>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7, fontWeight: "700" }}> {this.state.user_data && this.state.user_data.country ? this.state.user_data.country : ""} </Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                                 <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.85, marginTop: deviceDimesions.Height * 0.01, justifyContent: "space-around" }}>
//                                     <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.4, alignItems: "flex-start" }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="map-marker" color="orange" />
//                                         </NeuBorderView>
//                                         <View>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7 }}>Currently residing in :</Text>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7, fontWeight: "700" }}> {this.state.user_data && this.state.user_data.residence_place ? this.state.user_data.residence_place : ""} </Text>
//                                         </View>
//                                     </View>
//                                     <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.4, alignItems: "flex-start" }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="cutlery" color="orange" />
//                                         </NeuBorderView>
//                                         <View>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7 }}> Diet : </Text>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7, fontWeight: "700" }}> {this.state.user_data && this.state.user_data.diet ? this.state.user_data.diet : "Veg"} </Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                                 <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.85, marginTop: deviceDimesions.Height * 0.01, justifyContent: "space-around" }}>
//                                     <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.4, alignItems: "flex-start" }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="user" color="orange" />
//                                         </NeuBorderView>
//                                         <View>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7 }}>Profile Created By : </Text>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7, fontWeight: "700" }}> {this.state.user_data && this.state.user_data.profile_created_by ? this.state.user_data.profile_created_by : ""} </Text>
//                                         </View>
//                                     </View>
//                                     <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.4, alignItems: "flex-start" }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="balance-scale" color="orange" />
//                                         </NeuBorderView>
//                                         <View>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7 }}> Weight : </Text>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7, fontWeight: "700" }}> {this.state.user_data && this.state.user_data.weight ? this.state.user_data.weight : ""}  </Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                                 <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.85, marginTop: deviceDimesions.Height * 0.01, justifyContent: "space-around" }}>
//                                     <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.4, alignItems: "flex-start" }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="arrows-v" color="orange" />
//                                         </NeuBorderView>
//                                         <View>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7 }}>Height : </Text>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7, fontWeight: "700" }}>{this.state.user_data && this.state.user_data.height ? this.state.user_data.height : ""}  </Text>
//                                         </View>
//                                     </View>
//                                     <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.4, alignItems: "flex-start" }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="user" color="orange" />
//                                         </NeuBorderView>
//                                         <View>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7 }}> Age : </Text>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7, fontWeight: "700" }}> {this.state.user_data && this.state.user_data.age ? this.state.user_data.age : ""}  </Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                                 <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.85, marginTop: deviceDimesions.Height * 0.01, justifyContent: "space-around" }}>
//                                     <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.4, alignItems: "flex-start" }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="user" color="orange" />
//                                         </NeuBorderView>
//                                         <View>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7 }}>Mother Tongue : </Text>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.03, fontSize: 12, opacity: 0.7, fontWeight: "700" }}>{this.state.user_data && this.state.user_data.mother_tongue ? this.state.user_data.mother_tongue : ""}  </Text>
//                                         </View>
//                                     </View>
//                                     <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.4, alignItems: "flex-start" }}>
//                                          {/*  */}
//                                     </View> 
//                                 </View>
//                             </View>
//                         </View>

//                         {/* Family Details */}
//                         <View style={{ marginTop: deviceDimesions.Height * 0.03, width: deviceDimesions.width * 0.9, alignSelf: "center" }}>
//                             {
//                                 this.state.Membership_type == 1 || !this.state.Membership_type ?
//                                     null
//                                     :
//                                     <View style={{ flexDirection: "row", alignItems: "center" }}>
//                                         <Image source={IconsPathVariable.FamilyDetailsTitleIcon} />
//                                         <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: deviceDimesions.width * 0.03, marginRight: deviceDimesions.width * 0.03 }}>Family Details</Text>
//                                         <Icon name="lock" color="orange" size={18} />
//                                     </View>
//                             }
//                             {/* Content Here */}
//                             {
//                                 this.state.Membership_type == 1 || !this.state.Membership_type ?
//                                     <View style={{ alignSelf: "center", alignItems: "center", width: deviceDimesions.width * 0.9, height: deviceDimesions.Height * 0.27, justifyContent: "center" }}>
//                                         <TouchableOpacity onPress={() => goToUpgradeToPremiumScreen()}>
//                                             <Image style={{ width: deviceDimesions.width * 0.9, height: deviceDimesions.Height * 0.25, resizeMode: "cover" }} source={ImagesPathVariable.MatchedUserProfileScreenSliderImage1} />
//                                         </TouchableOpacity>
//                                     </View>
//                                     :
//                                     <View style={{ marginTop: deviceDimesions.Height * 0.005, width: deviceDimesions.width * 0.85, alignSelf: "center", alignItems: "flex-start" }}>
//                                         <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
//                                             <NeuBorderView
//                                                 color="#ffffff"
//                                                 width={deviceDimesions.width * 0.08}
//                                                 height={deviceDimesions.Height * 0.045}
//                                                 borderRadius={20}
//                                             >
//                                                 <Icon name="users" color="orange" />
//                                             </NeuBorderView>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 12, opacity: 0.7 }}>Family Status : </Text>
//                                             <Text style={{ fontSize: 12, opacity: 0.7, fontWeight: "700" }}>Upper Middle Class Family</Text>
//                                         </View>
//                                         <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
//                                             <NeuBorderView
//                                                 color="#ffffff"
//                                                 width={deviceDimesions.width * 0.08}
//                                                 height={deviceDimesions.Height * 0.045}
//                                                 borderRadius={20}
//                                             >
//                                                 <Icon name="ils" color="orange" />
//                                             </NeuBorderView>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 12, opacity: 0.7 }}>Family Values : </Text>
//                                             <Text style={{ fontSize: 12, opacity: 0.7, fontWeight: "700" }}>Traditional Family Values</Text>
//                                         </View>
//                                         <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
//                                             <NeuBorderView
//                                                 color="#ffffff"
//                                                 width={deviceDimesions.width * 0.08}
//                                                 height={deviceDimesions.Height * 0.045}
//                                                 borderRadius={20}
//                                             >
//                                                 <Icon name="male" color="orange" />
//                                             </NeuBorderView>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 12, opacity: 0.7 }}>Father : </Text>
//                                             <Text style={{ fontSize: 12, opacity: 0.7, fontWeight: "700", width: deviceDimesions.width * 0.6 }}>Sanjeev employed in kerela feeds as HR Manager</Text>
//                                         </View>
//                                         <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
//                                             <NeuBorderView
//                                                 color="#ffffff"
//                                                 width={deviceDimesions.width * 0.08}
//                                                 height={deviceDimesions.Height * 0.045}
//                                                 borderRadius={20}
//                                             >
//                                                 <Icon name="female" color="orange" />
//                                             </NeuBorderView>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 12, opacity: 0.7 }}>Father's family is from : </Text>
//                                             <Text style={{ fontSize: 12, opacity: 0.7, fontWeight: "700" }}>Thrissur</Text>
//                                         </View>
//                                         <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
//                                             <NeuBorderView
//                                                 color="#ffffff"
//                                                 width={deviceDimesions.width * 0.08}
//                                                 height={deviceDimesions.Height * 0.045}
//                                                 borderRadius={20}
//                                             >
//                                                 <Icon name="female" color="orange" />
//                                             </NeuBorderView>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 12, opacity: 0.7 }}>Mother : </Text>
//                                             <Text style={{ fontSize: 12, opacity: 0.7, fontWeight: "700" }}>Anjali employed in ISRO as HR Manager</Text>
//                                         </View>
//                                         <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
//                                             <NeuBorderView
//                                                 color="#ffffff"
//                                                 width={deviceDimesions.width * 0.08}
//                                                 height={deviceDimesions.Height * 0.045}
//                                                 borderRadius={20}
//                                             >
//                                                 <Icon name="map-marker" color="orange" />
//                                             </NeuBorderView>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 12, opacity: 0.7 }}>Mother's family is from : </Text>
//                                             <Text style={{ fontSize: 12, opacity: 0.7, fontWeight: "700" }}>Chennai</Text>
//                                         </View>
//                                     </View>
//                             }
//                             {/* Contact Details */}
//                             {
//                                 this.state.Membership_type == 1 || !this.state.Membership_type ?

//                                     <View style={{ alignSelf: "center", alignItems: "center", width: deviceDimesions.width * 0.9, height: deviceDimesions.Height * 0.27, justifyContent: "center" }}>
//                                         <TouchableOpacity onPress={() => goToUpgradeToPremiumScreen()}>
//                                             <Image style={{ width: deviceDimesions.width * 0.9, height: deviceDimesions.Height * 0.25, resizeMode: "cover" }} source={ImagesPathVariable.MatchedUserProfileScreenSliderImage2} />
//                                         </TouchableOpacity>
//                                     </View>
//                                     :
//                                     <View style={{ marginTop: deviceDimesions.Height * 0.03, alignSelf: "center", width: deviceDimesions.width * 0.9, backgroundColor: "#ffffff", elevation: 4, borderRadius: 15, padding: deviceDimesions.width * 0.02 }}>
//                                         <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: deviceDimesions.width * 0.8 }}>
//                                             <Image source={IconsPathVariable.ContactDetailsTitleIcon} />
//                                             <Text style={{ fontSize: 16, fontWeight: "700" }}>Contact Details</Text>
//                                             <Icon name='lock' size={20} color='#f618' />
//                                             <Icon name='phone' size={25} color='#0066cc' />
//                                             <Icon name='whatsapp' size={25} color='#00cc00' />
//                                         </View>
//                                         <View style={{ marginTop: deviceDimesions.Height * 0.03, alignSelf: "center", width: deviceDimesions.width * 0.85, borderBottomWidth: 0.2, paddingBottom: deviceDimesions.Height * 0.03 }}>
//                                             <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
//                                                 <NeuBorderView
//                                                     color="#ffffff"
//                                                     width={deviceDimesions.width * 0.08}
//                                                     height={deviceDimesions.Height * 0.045}
//                                                     borderRadius={20}
//                                                 >
//                                                     <Icon name="phone" color="orange" />
//                                                 </NeuBorderView>
//                                                 <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 12, opacity: 0.7 }}>Mobile : </Text>
//                                                 <Text style={{ fontSize: 12, opacity: 0.7, fontWeight: "700" }}>{this.state.user_data.mobile_code ? "+" + this.state.user_data.mobile_code : ""} {userData.mobile}</Text>
//                                             </View>
//                                             <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
//                                                 <NeuBorderView
//                                                     color="#ffffff"
//                                                     width={deviceDimesions.width * 0.08}
//                                                     height={deviceDimesions.Height * 0.045}
//                                                     borderRadius={20}
//                                                 >
//                                                     <Icon name="phone" color="orange" />
//                                                 </NeuBorderView>
//                                                 <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 12, opacity: 0.7 }}>Alternate Mobile Number : </Text>
//                                                 <Text style={{ fontSize: 12, opacity: 0.7, fontWeight: "700" }}>{this.state.user_data.mobile_code ? "+" + this.state.user_data.mobile_code : ""} {userData.mobile}</Text>
//                                             </View>
//                                             <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
//                                                 <NeuBorderView
//                                                     color="#ffffff"
//                                                     width={deviceDimesions.width * 0.08}
//                                                     height={deviceDimesions.Height * 0.045}
//                                                     borderRadius={20}
//                                                 >
//                                                     <Icon name="map-marker" color="orange" />
//                                                 </NeuBorderView>
//                                                 <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 12, opacity: 0.7 }}>Address / Location : </Text>
//                                                 <Text style={{ fontSize: 12, opacity: 0.7, fontWeight: "700" }}>{userData.residence_place}</Text>
//                                             </View>
//                                             <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
//                                                 <NeuBorderView
//                                                     color="#ffffff"
//                                                     width={deviceDimesions.width * 0.08}
//                                                     height={deviceDimesions.Height * 0.045}
//                                                     borderRadius={20}
//                                                 >
//                                                     <Icon name="envelope" color="orange" />
//                                                 </NeuBorderView>
//                                                 <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 12, opacity: 0.7 }}>Email ID : </Text>
//                                                 <Text style={{ fontSize: 12, opacity: 0.7, fontWeight: "700" }}>{userData.email}</Text>
//                                             </View>
//                                         </View>
//                                         <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: deviceDimesions.width * 0.8 }}>
//                                             <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
//                                                 <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 12, opacity: 0.7 }}>Pending Contacts : </Text>
//                                                 <Text style={{ fontSize: 12, fontWeight: "700" }}>39</Text>
//                                             </View>
//                                             <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
//                                                 <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 12, opacity: 0.7 }}>Pending Sms : </Text>
//                                                 <Text style={{ fontSize: 12, fontWeight: "700" }}>30</Text>
//                                             </View>
//                                         </View>
//                                     </View>
//                             }

//                             {/* Astro Details */}
//                             {
//                                 this.state.Membership_type == 1 || !this.state.Membership_type ?
//                                     <View style={{ alignSelf: "center", alignItems: "center", width: deviceDimesions.width * 0.9, height: deviceDimesions.Height * 0.27, justifyContent: "center" }}>
//                                         <TouchableOpacity onPress={() => goToUpgradeToPremiumScreen()}>
//                                             <Image style={{ width: deviceDimesions.width * 0.9, height: deviceDimesions.Height * 0.25, resizeMode: "cover" }} source={ImagesPathVariable.MatchedUserProfileScreenSliderImage3} />
//                                         </TouchableOpacity>
//                                     </View>
//                                     :
//                                     <View style={{ marginTop: deviceDimesions.Height * 0.03, alignSelf: "center", width: deviceDimesions.width * 0.9, backgroundColor: "#ffffff", elevation: 4, borderRadius: 15, padding: deviceDimesions.width * 0.02 }}>
//                                         <View style={{ flexDirection: "row", alignItems: "center" }}>
//                                             <Image source={IconsPathVariable.ContactDetailsTitleIcon} />
//                                             <Text style={{ fontSize: 16, fontWeight: "700", marginLeft: deviceDimesions.width * 0.05, marginRight: deviceDimesions.width * 0.05 }}>Astro Details</Text>
//                                             <Icon name='lock' size={20} color='#f618' />
//                                         </View>
//                                         <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.9, marginTop: deviceDimesions.Height * 0.03 }}>
//                                             <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.4, alignItems: "center", justifyContent: "flex-start" }}>
//                                                 <NeuBorderView
//                                                     color="#ffffff"
//                                                     width={deviceDimesions.width * 0.08}
//                                                     height={deviceDimesions.Height * 0.045}
//                                                     borderRadius={20}
//                                                 >
//                                                     <Icon name="star" color="orange" />
//                                                 </NeuBorderView>
//                                                 <Text style={{ marginLeft: deviceDimesions.width * 0.02, fontSize: 12, opacity: 0.7 }}>Star is : </Text>
//                                                 <Text style={{ fontSize: 12, opacity: 0.7, fontWeight: "700" }}>Revathi</Text>
//                                             </View>
//                                             <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.4, alignItems: "center", justifyContent: "flex-start" }}>
//                                                 <NeuBorderView
//                                                     color="#ffffff"
//                                                     width={deviceDimesions.width * 0.08}
//                                                     height={deviceDimesions.Height * 0.045}
//                                                     borderRadius={20}
//                                                 >
//                                                     <Icon name="globe" color="orange" />
//                                                 </NeuBorderView>
//                                                 <Text style={{ marginLeft: deviceDimesions.width * 0.02, fontSize: 12, opacity: 0.7, fontWeight: "700" }}>Chovva Dosham</Text>
//                                             </View>
//                                         </View>
//                                         <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.9, marginTop: deviceDimesions.Height * 0.03 }}>
//                                             <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.4, alignItems: "center", justifyContent: "flex-start" }}>
//                                                 <NeuBorderView
//                                                     color="#ffffff"
//                                                     width={deviceDimesions.width * 0.08}
//                                                     height={deviceDimesions.Height * 0.045}
//                                                     borderRadius={20}
//                                                 >
//                                                     <Icon name="clock-o" color="orange" />
//                                                 </NeuBorderView>
//                                                 <Text style={{ width: deviceDimesions.width * 0.15, marginLeft: deviceDimesions.width * 0.02, fontSize: 12, opacity: 0.7 }}>Time Of Birth : </Text>
//                                                 <Text style={{ fontSize: 12, opacity: 0.7, fontWeight: "700", width: deviceDimesions.width * 0.1 }}>11:22 AM</Text>
//                                             </View>
//                                             <View style={{ flexDirection: "row", width: deviceDimesions.width * 0.4, alignItems: "center", justifyContent: "flex-start" }}>
//                                                 <NeuBorderView
//                                                     color="#ffffff"
//                                                     width={deviceDimesions.width * 0.08}
//                                                     height={deviceDimesions.Height * 0.045}
//                                                     borderRadius={20}
//                                                 >
//                                                     <Icon name="sun-o" color="orange" />
//                                                 </NeuBorderView>
//                                                 <Text style={{ marginLeft: deviceDimesions.width * 0.02, fontSize: 12, opacity: 0.7 }}>Sun Sign : </Text>
//                                                 <Text style={{ fontSize: 12, opacity: 0.7, fontWeight: "700" }}>Leo</Text>
//                                             </View>
//                                         </View>
//                                         <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
//                                             <NeuBorderView
//                                                 color="#ffffff"
//                                                 width={deviceDimesions.width * 0.08}
//                                                 height={deviceDimesions.Height * 0.045}
//                                                 borderRadius={20}
//                                             >
//                                                 <Icon name="map-marker" color="orange" />
//                                             </NeuBorderView>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.02, fontSize: 12, opacity: 0.7 }}>City Of Birth : </Text>
//                                             <Text style={{ fontSize: 12, opacity: 0.7, fontWeight: "700" }}>Thrissur</Text>
//                                         </View>
//                                         <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
//                                             <NeuBorderView
//                                                 color="#ffffff"
//                                                 width={deviceDimesions.width * 0.08}
//                                                 height={deviceDimesions.Height * 0.045}
//                                                 borderRadius={20}
//                                             >
//                                                 <Icon name="star" color="orange" />
//                                             </NeuBorderView>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.02, fontSize: 12, opacity: 0.7 }}>Matching Stars : </Text>
//                                             <Text style={{ fontSize: 12, opacity: 0.7, fontWeight: "700" }}>Awasthi, Barani, Karthika</Text>
//                                         </View>
//                                         <View style={{ marginTop: deviceDimesions.Height * 0.02 }}>
//                                             <TouchableOpacity
//                                                 style={{ borderRadius: 15, borderColor: "orange", borderWidth: 0.5, backgroundColor: "#ffffff", padding: deviceDimesions.width * 0.02, elevation: 3, alignItems: "center", width: deviceDimesions.width * 0.4 }}
//                                             >
//                                                 <Text style={{ color: "orange", }}>Check Astro Match</Text>
//                                             </TouchableOpacity>
//                                         </View>
//                                     </View>
//                             }


//                         </View>

//                         {/* Hobbies & Interests */}
//                         {this.state.HobbiesAndInterests !== null ?
//                             <View style={{ marginTop: deviceDimesions.Height * 0.03, width: deviceDimesions.width * 0.9, alignSelf: "center" }}>
//                                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                                     <Image source={IconsPathVariable.HobbiesAndInterestsTitleIcon} />
//                                     <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: deviceDimesions.width * 0.03 }}>Hobbies & Interests</Text>
//                                 </View>
//                                 {/* Content Here */}
//                                 <View style={{ marginTop: deviceDimesions.Height * 0.005, width: deviceDimesions.width * 0.85, alignSelf: "center", alignItems: "flex-start" }}>
//                                     <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.025 }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="houzz" color="orange" />
//                                         </NeuBorderView>
//                                         <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 14, fontWeight: '700', width: deviceDimesions.width * 0.22, opacity: 0.7 }}>Hobbies</Text>
//                                         {/* Progress Bar */}
//                                         <View style={{}}>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 14, width: deviceDimesions.width * 0.5, opacity: 0.7 }}>{this.state.HobbiesAndInterests && this.state.HobbiesAndInterests.hobby ? this.state.HobbiesAndInterests.hobby.toString() : null}</Text>
//                                         </View>
//                                     </View>
//                                     <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.025 }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="gratipay" color="orange" />
//                                         </NeuBorderView>
//                                         <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 14, fontWeight: '700', width: deviceDimesions.width * 0.22, opacity: 0.7 }}>Interests</Text>
//                                         {/* Progress Bar */}
//                                         <View style={{}}>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 14, width: deviceDimesions.width * 0.5, opacity: 0.7 }}>{this.state.HobbiesAndInterests && this.state.HobbiesAndInterests.interest ? this.state.HobbiesAndInterests.interest.toString() : null}</Text>
//                                         </View>
//                                     </View>
//                                     <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.025 }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="male" color="orange" />
//                                         </NeuBorderView>
//                                         <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 14, fontWeight: '700', width: deviceDimesions.width * 0.22, opacity: 0.7 }}>Dress</Text>
//                                         {/* Progress Bar */}
//                                         <View style={{}}>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 14, width: deviceDimesions.width * 0.5, opacity: 0.7 }}>{this.state.HobbiesAndInterests && this.state.HobbiesAndInterests.dress ? this.state.HobbiesAndInterests.dress.toString() : null}</Text>
//                                         </View>
//                                     </View>
//                                     <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.025 }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="music" color="orange" />
//                                         </NeuBorderView>
//                                         <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 14, fontWeight: '700', width: deviceDimesions.width * 0.22, opacity: 0.7 }}>Music</Text>
//                                         {/* Progress Bar */}
//                                         <View style={{}}>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 14, width: deviceDimesions.width * 0.5, opacity: 0.7 }}>{this.state.HobbiesAndInterests && this.state.HobbiesAndInterests.music ? this.state.HobbiesAndInterests.music.toString() : null}</Text>
//                                         </View>
//                                     </View>
//                                     <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.025 }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="book" color="orange" />
//                                         </NeuBorderView>
//                                         <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 14, fontWeight: '700', width: deviceDimesions.width * 0.22, opacity: 0.7 }}>Books</Text>
//                                         {/* Progress Bar */}
//                                         <View style={{}}>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 14, width: deviceDimesions.width * 0.5, opacity: 0.7 }}>{this.state.HobbiesAndInterests && this.state.HobbiesAndInterests.books ? this.state.HobbiesAndInterests.books.toString() : null}</Text>
//                                         </View>
//                                     </View>
//                                     <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.025 }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="film" color="orange" />
//                                         </NeuBorderView>
//                                         <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 14, fontWeight: '700', width: deviceDimesions.width * 0.22, opacity: 0.7 }}>Movies</Text>
//                                         {/* Progress Bar */}
//                                         <View style={{}}>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 14, width: deviceDimesions.width * 0.5, opacity: 0.7 }}>{this.state.HobbiesAndInterests && this.state.HobbiesAndInterests.movie ? this.state.HobbiesAndInterests.movie.toString() : null}</Text>
//                                         </View>
//                                     </View>
//                                     <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.025 }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="futbol-o" color="orange" />
//                                         </NeuBorderView>
//                                         <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 14, fontWeight: '700', width: deviceDimesions.width * 0.22, opacity: 0.7 }}>Sports</Text>
//                                         {/* Progress Bar */}
//                                         <View style={{}}>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 14, width: deviceDimesions.width * 0.5, opacity: 0.7 }}>{this.state.HobbiesAndInterests && this.state.HobbiesAndInterests.sports ? this.state.HobbiesAndInterests.sports.toString() : null}</Text>
//                                         </View>
//                                     </View>
//                                     <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.025 }}>
//                                         <NeuBorderView
//                                             color="#ffffff"
//                                             width={deviceDimesions.width * 0.08}
//                                             height={deviceDimesions.Height * 0.045}
//                                             borderRadius={20}
//                                         >
//                                             <Icon name="apple" color="orange" />
//                                         </NeuBorderView>
//                                         <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 14, fontWeight: '700', width: deviceDimesions.width * 0.22, opacity: 0.7 }}>Cuisine</Text>
//                                         {/* Progress Bar */}
//                                         <View style={{}}>
//                                             <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 14, width: deviceDimesions.width * 0.5, opacity: 0.7 }}>{this.state.HobbiesAndInterests && this.state.HobbiesAndInterests.cuisine ? this.state.HobbiesAndInterests.cuisine.toString() : null}</Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                             </View> : null}

//                         {/* Know me better */}
//                         <View style={{ marginTop: deviceDimesions.Height * 0.03, width: deviceDimesions.width * 0.9, alignSelf: "center" }}>
//                             {
//                                 this.state.KnowMeBetterArr.some(el => el.answer) ?
//                                     <View style={{ flexDirection: "row", alignItems: "center", marginLeft: deviceDimesions.width * 0.02 }}>
//                                         <Image source={IconsPathVariable.KnowMeBetter} />
//                                         <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: deviceDimesions.width * 0.05 }}>Know Me Better</Text>
//                                     </View>
//                                     : null
//                             }
//                             {/* Content Goes Here */}
//                             {
//                                 this.state.KnowMeBetterArr ?
//                                     this.state.KnowMeBetterArr.map((el, i) => {
//                                         return (
//                                             <>
//                                                 {el.answer ?
//                                                     <View style={{ marginTop: deviceDimesions.Height * 0.02, alignSelf: "center" }} key={i}>
//                                                         <View
//                                                             style={{ width: deviceDimesions.width * 0.9, borderRadius: 15, elevation: 4, padding: deviceDimesions.width * 0.03, backgroundColor: "#f2f2f2" }}
//                                                         >
//                                                             <View style={{ marginTop: deviceDimesions.width * 0.01 }}>
//                                                                 <Text style={{ fontSize: 15, fontWeight: "700" }}>{el.question}</Text>
//                                                                 <Text style={{ fontSize: 14, opacity: 0.7 }}>{el.answer}</Text>
//                                                             </View>
//                                                         </View>
//                                                     </View>
//                                                     : null
//                                                 }
//                                             </>
//                                         )
//                                     })
//                                     :
//                                     null

//                             }
//                             <View style={{ marginTop: deviceDimesions.Height * 0.02, alignSelf: "center" }}>
//                                 <View
//                                     style={{ width: deviceDimesions.width * 0.9, borderRadius: 15, elevation: 4, padding: deviceDimesions.width * 0.02, backgroundColor: "#ffffff" }}
//                                 >
//                                     <View style={{ marginTop: deviceDimesions.width * 0.01, flexDirection: "row", alignItems: "center" }}>
//                                         <Image source={IconsPathVariable.BasicDetailsTitleIcon} />
//                                         <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 16, fontWeight: "700" }}>You & Her</Text>
//                                     </View>
//                                     <View style={{ paddingLeft: deviceDimesions.width * 0.025, marginTop: deviceDimesions.width * 0.01, flexDirection: "row", alignItems: "center" }}>
//                                         <Icon name='male' size={30} color='#f618' />
//                                         <View style={{ marginLeft: deviceDimesions.width * 0.05, marginRight: deviceDimesions.width * 0.05, flexDirection: "row", alignItems: "center" }}>
//                                             <Image source={IconsPathVariable.HeartsIcon} />
//                                             <Text style={{ fontSize: 16, fontWeight: "700" }}>{this.state.user_data && this.state.user_data.match_score ? this.state.user_data.match_score : ""}</Text>
//                                         </View>
//                                         <Icon name='female' size={30} color='#f618' />
//                                     </View>
//                                     {
//                                         this.state.YouAndHerArr && this.state.YouAndHerArr.religion == "same" ?
//                                             <View style={{ paddingLeft: deviceDimesions.width * 0.025, marginTop: deviceDimesions.width * 0.02, flexDirection: "row", alignItems: "center" }}>
//                                                 <View style={{ flexDirection: 'row', alignItems: "center" }}>
//                                                     <Icon name='check' size={20} color='#f618' />
//                                                     <Text style={{ marginLeft: 5, fontSize: 12, width: deviceDimesions.width * 0.45 }}>You both Belongs to the same religion.</Text>
//                                                 </View>
//                                             </View>
//                                             :
//                                             null
//                                     }
//                                     {
//                                         this.state.YouAndHerArr && this.state.YouAndHerArr.caste == "same" ?
//                                             <View style={{ paddingLeft: deviceDimesions.width * 0.025, marginTop: deviceDimesions.width * 0.02, flexDirection: "row", alignItems: "center" }}>
//                                                 <View style={{ flexDirection: 'row', alignItems: "center" }}>
//                                                     <Icon name='check' size={20} color='#f618' />
//                                                     <Text style={{ marginLeft: 5, fontSize: 12, width: deviceDimesions.width * 0.45 }}>Your caste status is same.</Text>
//                                                 </View>
//                                             </View>
//                                             :
//                                             null
//                                     }

//                                     {this.state.ViewMoreYouAndHerData ?
//                                         <>
//                                             {
//                                                 this.state.YouAndHerArr && this.state.YouAndHerArr.marital_status == "same" ?
//                                                     <View style={{ paddingLeft: deviceDimesions.width * 0.025, marginTop: deviceDimesions.width * 0.02, flexDirection: "row", alignItems: "center" }}>
//                                                         <View style={{ flexDirection: 'row', alignItems: "center" }}>
//                                                             <Icon name='check' size={20} color='#f618' />
//                                                             <Text style={{ marginLeft: 5, fontSize: 12, width: deviceDimesions.width * 0.45 }}>Your marital status is same.</Text>
//                                                         </View>
//                                                     </View>
//                                                     :
//                                                     null
//                                             }
//                                             {
//                                                 this.state.YouAndHerArr && this.state.YouAndHerArr.complexion == "same" ?
//                                                     <View style={{ paddingLeft: deviceDimesions.width * 0.025, marginTop: deviceDimesions.width * 0.02, flexDirection: "row", alignItems: "center" }}>
//                                                         <View style={{ flexDirection: 'row', alignItems: "center" }}>
//                                                             <Icon name='check' size={20} color='#f618' />
//                                                             <Text style={{ marginLeft: 5, fontSize: 12, width: deviceDimesions.width * 0.45 }}>Your complexion is same.</Text>
//                                                         </View>
//                                                     </View>
//                                                     :
//                                                     null
//                                             }
//                                             {
//                                                 this.state.YouAndHerArr && this.state.YouAndHerArr.mother_tongue == "same" ?
//                                                     <View style={{ paddingLeft: deviceDimesions.width * 0.025, marginTop: deviceDimesions.width * 0.02, flexDirection: "row", alignItems: "center" }}>
//                                                         <View style={{ flexDirection: 'row', alignItems: "center" }}>
//                                                             <Icon name='check' size={20} color='#f618' />
//                                                             <Text style={{ marginLeft: 5, fontSize: 12, width: deviceDimesions.width * 0.45 }}>Your mother tongue is same.</Text>
//                                                         </View>
//                                                     </View>
//                                                     :
//                                                     null
//                                             }
//                                             {
//                                                 this.state.YouAndHerArr && this.state.YouAndHerArr.residency_country == "same" ?
//                                                     <View style={{ paddingLeft: deviceDimesions.width * 0.025, marginTop: deviceDimesions.width * 0.02, flexDirection: "row", alignItems: "center" }}>
//                                                         <View style={{ flexDirection: 'row', alignItems: "center" }}>
//                                                             <Icon name='check' size={20} color='#f618' />
//                                                             <Text style={{ marginLeft: 5, fontSize: 12, width: deviceDimesions.width * 0.45 }}>You are from same country.</Text>
//                                                         </View>
//                                                     </View>
//                                                     :
//                                                     null
//                                             }
//                                             {
//                                                 this.state.YouAndHerArr && this.state.YouAndHerArr.manglik == "same" ?
//                                                     <View style={{ paddingLeft: deviceDimesions.width * 0.025, marginTop: deviceDimesions.width * 0.02, flexDirection: "row", alignItems: "center" }}>
//                                                         <View style={{ flexDirection: 'row', alignItems: "center" }}>
//                                                             <Icon name='check' size={20} color='#f618' />
//                                                             <Text style={{ marginLeft: 5, fontSize: 12, width: deviceDimesions.width * 0.45 }}>Both of you are manglik.</Text>
//                                                         </View>
//                                                     </View>
//                                                     :
//                                                     null
//                                             }
//                                             {
//                                                 this.state.YouAndHerArr && this.state.YouAndHerArr.city_of_birth == "same" ?
//                                                     <View style={{ paddingLeft: deviceDimesions.width * 0.025, marginTop: deviceDimesions.width * 0.02, flexDirection: "row", alignItems: "center" }}>
//                                                         <View style={{ flexDirection: 'row', alignItems: "center" }}>
//                                                             <Icon name='check' size={20} color='#f618' />
//                                                             <Text style={{ marginLeft: 5, fontSize: 12, width: deviceDimesions.width * 0.45 }}>Your city of birth is same.</Text>
//                                                         </View>
//                                                     </View>
//                                                     :
//                                                     null
//                                             }
//                                             {
//                                                 this.state.YouAndHerArr && this.state.YouAndHerArr.family_status == "same" ?
//                                                     <View style={{ paddingLeft: deviceDimesions.width * 0.025, marginTop: deviceDimesions.width * 0.02, flexDirection: "row", alignItems: "center" }}>
//                                                         <View style={{ flexDirection: 'row', alignItems: "center" }}>
//                                                             <Icon name='check' size={20} color='#f618' />
//                                                             <Text style={{ marginLeft: 5, fontSize: 12, width: deviceDimesions.width * 0.45 }}>Your family status is same.</Text>
//                                                         </View>
//                                                     </View>
//                                                     :
//                                                     null
//                                             }
//                                         </>
//                                         :
//                                         null
//                                     }
//                                     <TouchableOpacity
//                                         onPress={() => { this.setState({ ViewMoreYouAndHerData: !this.state.ViewMoreYouAndHerData }) }}
//                                         style={{ borderRadius: 15, backgroundColor: "orange", elevation: 3, alignItems: "center", padding: 10, width: deviceDimesions.width * 0.3, alignSelf: 'flex-end' }}
//                                     >
//                                         <Text style={{ color: "#ffffff", fontSize: 12 }}>View {this.state.ViewMoreYouAndHerData ? "Less" : "More"}</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>

//                         </View>
//                         <View>
//                             {
//                                 this.state.SimilarProfilesArr != null ?
//                                     <>
//                                         <View style={styles.skipButtonContainer}>
//                                             <Text style={{ fontSize: 18, fontWeight: '700' }}>More members like this</Text>
//                                             <TouchableOpacity
//                                                 style={styles.skipButton}
//                                                 onPress={() => { this.OnViewAllButtonPress('Similar Profiles') }}
//                                             >
//                                                 <Text>View all</Text>
//                                                 <NeuBorderView
//                                                     color="#f5f5f5"
//                                                     height={30}
//                                                     width={30}
//                                                     borderRadius={20}
//                                                     inset
//                                                 >
//                                                     <Icon name="chevron-right" size={14} color="orange" />
//                                                 </NeuBorderView>

//                                             </TouchableOpacity>
//                                         </View>
//                                         <FlatList
//                                             data={this.state.SimilarProfilesArr}
//                                             horizontal={true}
//                                             showsHorizontalScrollIndicator={false}
//                                             renderItem={({ item, index }) => renderItem(item, index, this.state.SimilarProfilesArr, 'Similar Profiles')}
//                                         // keyExtractor={item => item.id}
//                                         />
//                                     </>
//                                     :
//                                     null
//                             }

//                         </View>

//                         {/* <View style={{marginTop : deviceDimesions.Height*0.03, width : deviceDimesions.width*0.95, alignSelf : "center"}}>
//                             <View style={{width : deviceDimesions.width*0.9, alignSelf : "center", flexDirection : "row", justifyContent : "space-between", alignItems : "center"}}>
//                                 <Text style={{fontSize : 16, fontWeight : '500'}}>Similar Profile</Text>
//                                 <TouchableOpacity 
//                                     style={{backgroundColor : "orange", borderRadius : 10, padding : 10, elevation : 3, alignItems : "center"}}
//                                    onPress={()=>{goToDrawerViewAllMatchedUserScreen({title : 'Similar Profile'})}}
//                                 >
//                                     <Text style={{fontSize : 10, color:"#ffffff"}}>See All</Text>
//                                 </TouchableOpacity>
//                             </View>
//                             <FlatList 
//                                 data={dummyDataForFlatlist}
//                                 horizontal={true}
//                                 showsHorizontalScrollIndicator={false}
//                                 renderItem={({item})=>renderItem(item)}
//                                 // keyExtractor={item => item.id}
//                             />
//                         </View> */}
//                         {/* <View style={{marginTop : deviceDimesions.Height*0.03, width : deviceDimesions.width*0.95, alignSelf : "center"}}>
//                             <View style={{width : deviceDimesions.width*0.9, alignSelf : "center", flexDirection : "row", justifyContent : "space-between", alignItems : "center"}}>
//                                 <Text style={{fontSize : 16, fontWeight : '500'}}>Profile Near Me</Text>
//                                 <TouchableOpacity 
//                                     style={{backgroundColor : "orange", borderRadius : 10, padding : 10, elevation : 3, alignItems : "center"}}
//                                    onPress={()=>{goToDrawerViewAllMatchedUserScreen({title : 'Profile Near Me'})}}
//                                 >
//                                     <Text style={{fontSize : 10, color:"#ffffff"}}>See All</Text>
//                                 </TouchableOpacity>
//                             </View>
//                             <FlatList 
//                                 data={dummyDataForFlatlist}
//                                 horizontal={true}
//                                 showsHorizontalScrollIndicator={false}
//                                 renderItem={({item})=>renderItem(item)}
//                                 // keyExtractor={item => item.id}
//                             />
//                         </View> */}
//                         {/* <View style={{marginTop : deviceDimesions.Height*0.03, width : deviceDimesions.width*0.95, alignSelf : "center"}}>
//                             <View style={{width : deviceDimesions.width*0.9, alignSelf : "center", flexDirection : "row", justifyContent : "space-between", alignItems : "center"}}>
//                                 <Text style={{fontSize : 16, fontWeight : '500'}}>Looking For Me</Text>
//                                 <TouchableOpacity 
//                                     style={{backgroundColor : "orange", borderRadius : 10, padding : 10, elevation : 3, alignItems : "center"}}
//                                    onPress={()=>{goToDrawerViewAllMatchedUserScreen({title : 'Looking For Me'})}}
//                                 >
//                                     <Text style={{fontSize : 10, color:"#ffffff"}}>See All</Text>
//                                 </TouchableOpacity>
//                             </View>
//                             <FlatList 
//                                 data={dummyDataForFlatlist}
//                                 horizontal={true}
//                                 showsHorizontalScrollIndicator={false}
//                                 renderItem={({item})=>renderItem(item)}
//                                 // keyExtractor={item => item.id}
//                             />
//                         </View> */}
//                     </ScrollView>
//                 </View>

//                 <SpeedDial
//                     isOpen={this.state.showBottomOptions}
//                     icon={<Icon name="bars" color="#ffffff" size = {20} />}
//                     color = "#ff751a"
//                     overlayColor = "rgba(0,0,0,0.4)"
//                     openIcon={{ name: 'close', color: '#fff' }}
//                     onOpen={() => this.setState({showBottomOptions : !this.state.showBottomOptions})}
//                     onClose={() => this.setState({showBottomOptions : !this.state.showBottomOptions})}
//                 >
//                     <SpeedDial.Action
//                         icon={<Icon name="phone" color="#660066" size = {20} />}
//                         title="Call"
//                         onPress={() => this.state.Membership_type == 1 || !this.state.Membership_type ? ToastAndroid.showWithGravityAndOffset('Upgrade your package first.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) : Linking.openURL(`tel: + ${this.state.user_data.mobile}`)}
//                         color = "#ffffff"
//                     />
//                     <SpeedDial.Action
//                         icon={<Icon name={this.state.shortlisted ? "heart" : "heart-o"} color="#ff0066" size = {20} />}
//                         title={this.state.shortlisted ? "SAVED" : "SAVE"}
//                         onPress={() => this.onShortlistPress(this.state.shortlisted, this.props.data.member_id)}
//                         color = "#ffffff"
//                     />
//                     <SpeedDial.Action
//                         icon={<Icon name="comment" color="#e6b800" size = {20} />}
//                         title="Chat"
//                         onPress={() => this.state.Membership_type == 1 || !this.state.Membership_type ? ToastAndroid.showWithGravityAndOffset('Upgrade your package first.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) : goToChatMessageScreen()}
//                         color = "#ffffff"
//                     />
//                     <SpeedDial.Action
//                         icon={<Icon name="whatsapp" color="#009933" size = {20} />}
//                         title="Whatsapp"
//                         onPress={() => this.state.Membership_type == 1 || !this.state.Membership_type ? ToastAndroid.showWithGravityAndOffset('Upgrade your package first.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) : Linking.openURL(`whatsapp://send?text=hello&phone=+${this.state.user_data.mobile}`)} 
//                         color = "#ffffff"
//                     />
//                     <SpeedDial.Action
//                         icon={<Icon name={this.state.interested ? "bookmark" : "bookmark-o"} color="#000000" size = {20} />}
//                         title={this.state.interested ? "LIKED" : "LIKE"}
//                         onPress={() => this.setState({ interested: !this.state.interested })}
//                         color = "#ffffff"
//                     />
//                 </SpeedDial>

//                 {/* <View style={{ flexDirection: 'row', justifyContent: "space-evenly", position: 'absolute', bottom: 2, borderRadius: 20, width: deviceDimesions.width, alignSelf: "center", alignItems: "center", backgroundColor: "#ffffff" }}> */}

//                     {/* <TouchableOpacity
//                         onPress={() => this.state.Membership_type == 1 || !this.state.Membership_type ? ToastAndroid.showWithGravityAndOffset('Upgrade your package first.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) : Linking.openURL(`tel: ${this.state.user_data.mobile_code} ${this.state.user_data.mobile}`)}
//                         style={{ padding: deviceDimesions.Height * 0.01, alignItems: 'center', }}
//                     >
//                         <NeuBorderView
//                             color='#ffffff'
//                             height={30}
//                             width={30}
//                             borderRadius={20}
//                         >
//                             <Icon name='phone' color='rgb(0, 204, 102)' />
//                         </NeuBorderView>
//                         <Text style={{ fontSize: 12, marginTop: deviceDimesions.Height * 0.01 }}>Call</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={{ padding: deviceDimesions.Height * 0.01, alignItems: 'center', }}
//                         onPress={() => this.setState({ shortlisted: !this.state.shortlisted })}
//                     >
//                         <NeuBorderView
//                             color='#ffffff'
//                             height={30}
//                             width={30}
//                             borderRadius={20}
//                         >
//                             <Icon name='floppy-o' color='rgb(255, 194, 102)' />
//                         </NeuBorderView>
//                         <Text style={{ fontSize: 12, marginTop: deviceDimesions.Height * 0.01 }}>{this.state.shortlisted ? "Shortlisted" : "Shortlist"}</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress={() => this.state.Membership_type == 1 || !this.state.Membership_type ? ToastAndroid.showWithGravityAndOffset('Upgrade your package first.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) : goToChatMessageScreen()} style={{ padding: deviceDimesions.Height * 0.01, alignItems: 'center', }}>
//                         <NeuBorderView
//                             color='#ffffff'
//                             height={30}
//                             width={30}
//                             borderRadius={20}
//                         >
//                             <Icon name='envelope' color='rgb(255, 173, 51)' />
//                         </NeuBorderView>
//                         <Text style={{ fontSize: 12, marginTop: deviceDimesions.Height * 0.01 }}>Chat</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress={() => this.state.Membership_type == 1 || !this.state.Membership_type ? ToastAndroid.showWithGravityAndOffset('Upgrade your package first.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50) : Linking.openURL(`whatsapp://send?text=hello&phone=+${this.state.user_data.mobile_code} ${this.state.user_data.mobile}`)} style={{ padding: deviceDimesions.Height * 0.01, alignItems: 'center', }}>
//                         <NeuBorderView
//                             color='#ffffff'
//                             height={30}
//                             width={30}
//                             borderRadius={20}
//                         >
//                             <Icon name='whatsapp' color='rgb(0, 204, 0)' />
//                         </NeuBorderView>
//                         <Text style={{ fontSize: 12, marginTop: deviceDimesions.Height * 0.01 }}>Whatsapp</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={{ padding: deviceDimesions.Height * 0.01, alignItems: 'center', }}
//                         onPress={() => this.setState({ interested: !this.state.interested })}
//                     >
//                         <NeuBorderView
//                             color='#ffffff'
//                             height={30}
//                             width={30}
//                             borderRadius={20}
//                         >
//                             <Icon name='send' color='rgb(51, 102, 204)' />
//                         </NeuBorderView>
//                         <Text style={{ fontSize: 12, marginTop: deviceDimesions.Height * 0.01 }}>{this.state.interested ? "Interest Sent" : "Send Interest"}</Text>
//                     </TouchableOpacity> */}

//                     {/* <TouchableOpacity style={{ padding: deviceDimesions.Height * 0.01, alignItems: 'center', }} onPress={() => goToPreviousScreen(this)}>
//                         <Icon name='times' color='red' size={25} />
//                     </TouchableOpacity> */}

//                 {/* </View> */}

//                 {/* Model on screen load */}
//                 {/* <Modal  animationType="slide"
//                         transparent={true}
//                         visible={this.state.welcomeModelOpen}
//                         onBackdropPress = { () => this.setState({welcomeModelOpen:false})}
//                         onRequestClose={() => {
//                             this.setState({welcomeModelOpen:false})
//                         }}
//                 >
//                     <View style={styles.centeredView}>
//                         <View style={styles.modalView}>
//                             <View style={{flexDirection : 'row', justifyContent : 'space-around'}}>
//                                 <Icon name='male' size={30} color='#f618' />
//                                 <H3 style={{marginLeft : 20, marginRight : 20}}> You & Her </H3>
//                                 <Icon name='female' size={30} color='#f618' />
//                             </View>
//                             <View style={{marginTop : 30}}>
//                                 <View style={{flexDirection : 'row', marginTop : 5}}>
//                                     <Icon name='check' size={20} color='#f618' />
//                                     <Text style={{marginLeft : 5}}>You both enjoy non-vegetarian food</Text>
//                                 </View>
//                                 <View style={{flexDirection : 'row', marginTop : 5}}>
//                                     <Icon name='check' size={20} color='#f618' />
//                                     <Text style={{marginLeft : 5}}>He is from malayalam community too</Text>
//                                 </View>
//                                 <View style={{flexDirection : 'row', marginTop : 5}}>
//                                     <Icon name='check' size={20} color='#f618' />
//                                     <Text style={{marginLeft : 5}}>Never smokes</Text>
//                                 </View>
//                                 <View style={{flexDirection : 'row', marginTop : 5}}>
//                                     <Icon name='check' size={20} color='#f618' />
//                                     <Text style={{marginLeft : 5}}>Nair</Text>
//                                 </View>
//                                 <View style={{flexDirection : 'row', marginTop : 5}}>
//                                     <Icon name='check' size={20} color='#f618' />
//                                     <Text style={{marginLeft : 5}}>Hindu</Text>
//                                 </View>
//                                 <View style={{flexDirection : 'row', marginTop : 5}}>
//                                     <NeuButton
//                                         color="#ffffff"
//                                         borderRadius = {15}
//                                         width = {deviceDimesions.width*0.3}
//                                         height = {deviceDimesions.Height*0.055}
//                                         onPress={() => {
//                                             this.setState({welcomeModelOpen:false})
//                                         }}
//                                     >
//                                         <Text style = {{color : "orange"}}>See More</Text>
//                                     </NeuButton>
//                                 </View>
//                             </View>
//                         </View>        
//                     </View>
//                 </Modal> 
//          */}
//             </SafeAreaView>
//         )
//     }
// }
const styles = StyleSheet.create({
    container: {

        backgroundColor: '#ffffff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        // marginTop : deviceDimesions.Height*0.03
    },
    scrollViewStyle: {
        alignSelf: 'center',
        width: deviceDimesions.width,
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    LoaderContainer: {
        justifyContent: 'center',
    },
    HeaderBackgroundImageStyle: {
        height: deviceDimesions.Height * 0.5,
        width: deviceDimesions.width,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    HeaderBackgroundStyle: {
        width: deviceDimesions.width,
        height: deviceDimesions.Height * 0.5,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    HeaderTopOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: deviceDimesions.width * 0.6
    },
    HeaderButtonTouchable: {
        padding: 5
    },
    HeaderBottomButtonTouchable: {
        padding: 15,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userIntroContainer: {
        // marginTop : deviceDimesions.Height*0.03,
        backgroundColor: "#ffffff",
        // paddingTop : 2,
        paddingBottom: deviceDimesions.Height * 0.02,
        width: deviceDimesions.width * 0.882,
        alignSelf: 'center',
        // borderTopRightRadius : 100,
        // borderTopLeftRadius : 100,
        borderRadius: 20,
        elevation: 10,
        marginBottom: 20
    },
    userIntroTextContainer: {
        width: deviceDimesions.width * 0.85,
        alignSelf: 'center',
        marginTop: deviceDimesions.Height * 0.01
    },
    userPersonalDetailsRowContainer: {
        marginVertical: deviceDimesions.Height * 0.008,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    userPersonalDetailsText: {
        width: deviceDimesions.width * 0.7,
        marginLeft: deviceDimesions.width * 0.025,
        color: 'rgba(0,0,0,0.7)',
        fontSize: 16
    },



    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor: 'rgba(255,255,255,0.7)'
    },
    modalView: {
        // margin: 20,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalInput: {
        marginTop: 20,
    },
    panel: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // borderWidth : 0.2,
        borderColor: 'rgba(0,0,0,0.5)'
    },
    panelHeader: {
        height: deviceDimesions.Height * 0.08,
        //   backgroundColor: '#b197fc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    favoriteIcon: {
        position: 'absolute',
        top: -24,
        right: 24,
        backgroundColor: '#2b8a3e',
        width: 48,
        height: 48,
        padding: 8,
        borderRadius: 24,
        zIndex: 1
    },
    SlideUpContainer: {
        // alignSelf: 'stretch',
        flex: 1,
        zIndex: 1,
        padding: 5
        // height: 64,
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#ccc'
    },
    linearGradient: {
        flex: 1,
        // paddingLeft: 15,
        // paddingRight: 15,
        borderRadius: 5
    },
    skipButtonContainer: {
        // position : "absolute",
        // bottom : 20,
        marginTop: 5,
        // marginRight : 5,
        alignItems: "center",
        alignSelf: "center",
        width: deviceDimesions.width * 0.9,
        flexDirection: "row",
        justifyContent: "space-between"

    },
    skipButton: {
        width: deviceDimesions.width * 0.3,
        borderRadius: 10,
        alignItems: "center",
        // borderWidth : 0.1,
        elevation: 4,
        paddingRight: 20,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#ffffff"
    },
    UsersCardContainer: {
        width: deviceDimesions.width * 0.43,
        resizeMode: 'stretch',
        // margin : deviceDimesions.width*0.02,
        height: deviceDimesions.Height * 0.22,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    }
})
