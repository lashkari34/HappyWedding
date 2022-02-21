// MatchedUserProfileOverview

/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar, ImageBackground, Text } from 'react-native';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import deviceDimesions from '../../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FAIcon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/FontAwesome';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import RangeSlider from 'rn-range-slider';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import LinearGradient from 'react-native-linear-gradient';
import { goToMatchedUserFullProfileScreen, goToPreviousScreen, goToChatMessageScreen, goToUpgradeToPremiumScreen, goToDrawerHomeScreen, goToDrawerViewAllMatchedUserScreen } from '../../../helper/NavigationFunctions/NavigationFunctions';
import { Badge } from 'native-base';
import IconsPathVariable from '../../../helper/IconsPathVariable/IconsPathVariable';
import { BaseURL } from '../../../API_config/BaseURL';
import { AddToShortlist, Checkphotorequest, checkShortlistInterestSent, EducationDetailsOfLoggedInUser, GetCountOfPendingContacts, GetIntrestedRequestCheckBanner, GetKnowMeBetter, GetMemberAllGalleryPics, GetMemberCareerDetails, GetMemberDetail, GetPhotoRequestCheckBanner, GetShortlistedOthersMembers, GetShortListedRequestCheckBanner, GetSimilarProfiles, GetUserHobbiesAndInterests, getYouAndHer, IgnoreMember, RemoveFromShortlist, SendInterest, SendPhotoRequest } from '../../../helper/API_Call/API_Call';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal } from 'react-native';
import { Pressable } from 'react-native';
import { navigate, push } from '../../../helper/RootNavigator/RootNavigator';
import { FlatList } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Animated } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { Flow } from 'react-native-animated-spinkit';
import { Easing } from 'react-native';
import { Share } from 'react-native';
import Popover from 'react-native-popover-view/dist/Popover';
import { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
import ImageViewer from 'react-native-image-zoom-viewer';
import Video from 'react-native-video';
import ImagesPathVariable from '../../../helper/ImagesPathVariable/ImagesPathVariable';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import MatchedUserFullProfiles from '../MatchedUserFullProfile/MatchedUserFullProfile';
import Swiper from 'react-native-deck-swiper';
import { Button } from 'react-native-elements/dist/buttons/Button';
import Carousel from 'react-native-snap-carousel';

// demo purposes only
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i
    }
}
export default class MatchedUserProfileOverview extends Component {

    constructor(props) {
        super(props);
        this.SwipeCards = React.createRef(null)

        // console.log("Active Index " + props.route.params.data.activeIndex)
        this.state = {
            activeItemIndex: props.route.params.data.activeIndex,
            UsersArr: props.route.params.data.dataArr,
            panelProps: {
                fullWidth: true,
                openLarge: true,
                closeOnTouchOutside: true,
                // showCloseButton: true,
                onClose: () => this.setState({ isPanelActive: false }),
                onPressCloseButton: () => this.setState({ isPanelActive: false }),
                // ...or any prop you want
            },
            isPanelActive: false,
            selectedUserData: '',
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
            CountOfPendingContacts: null,

            //////Cerd
            cards: [],
            swipedAllCards: false,
            swipeDirection: '',
            cardIndex: 0
        }
    }

    renderCard = (card, index) => {
        return (
            //   <View style={styles.card}>
            //     <Text style={styles.text}>{card} - {index}</Text>
            //   </View>
            <View style={{height:deviceDimesions.Height,bottom:65}}>

                <ShowProfileCard
                    data={card}
                // key={index}
                />
            </View>

        )
    };

    onSwiped = (type) => {
        console.log(`on swiped ${type}`)
    }

    onSwipedAllCards = () => {
        this.setState({
            swipedAllCards: true
        })
    };

    swipeLeft = () => {
        this.swiper.swipeLeft()
    };

    UNSAFE_componentWillMount() {
        // let routeData = this.props.route.params.data;
        // console.log(routeData, "routeData_Notification")


        // this.setState({ activeItemIndex: routeData.activeIndex, UsersArr: routeData.dataArr })
        // console.log(routeData.dataArr, "===UsersArr===")
        // console.log(routeData.activeIndex, "==activeItemIndex===")

        // setTimeout(() => this.setInitialItem(), 1000)  
    }
    async setAsyncState(name, value) {
        this.setState({ [name]: value })
    }

    componentDidMount() {
        let routeData = this.props.route.params.data;
        console.log(routeData, "routeData_Notification")

        this.setState({ activeItemIndex: routeData.activeIndex, UsersArr: routeData.dataArr })
        console.log(routeData.dataArr, "===UsersArr===")
        console.log(routeData.activeIndex, "====activeItemIndex===")

    }

    // setInitialItem() {
    //     // this._carouselRef.snapToItem( activeItemIndex );
    //     this.SwipeCards.current.snapToItem(this.props.route.params.data.activeIndex, true)
    // }

    // onCardSwipeUp = (data) => {
    //     console.log(data)
    //     this.setState({ selectedUserData: data }, () => this.setState({ isPanelActive: true }))
    // }

    _renderSwipableItem = ({ item, index }) => {

        console.log(item, "======================================item===============================", index)
        // this.setState({isPanelActive : true})
        return (
            <ShowProfileCard
                data={item}
            // key={index}
            />

        )
    }

    render() {

        return (




            <View style={{ width: deviceDimesions.width, height: deviceDimesions.Height }}>



                {/* <Carousel
                        data={this.state.UsersArr}
                        // ref={refCarousel}
                        sliderWidth={deviceDimesions.width}
                        itemWidth={deviceDimesions.width}
                        firstItem={this.state.activeItemIndex}
                        // onBeforeSnapToItem={this.state.activeItemIndex}
                        keyboardShouldPersistTaps="always"
                        renderItem={this._renderSwipableItem}
                        // renderItem={(item) => this._renderSwipableItem(item)}

                    /> */}


                {/* <TouchableHighlight onPress={() => { navigate("Home") }} style={{ width: 55, height: 55 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center', marginTop: 10 }}>
                                        <Icon name="chevron-left" size={26} color="orange" />

                                    </View>
                                </TouchableHighlight> */}


                <Swiper

                    // renderCard={this.renderCard}
                    // stackSize={this.state.UsersArr.length}
                    // cards={this.state.UsersArr}
                    // backgroundColor={'#ffffff'}
                    // cardIndex={this.state.activeItemIndex}
                    // cardVerticalMargin={80}
                    // disableBottomSwipe={false}
                    // disableTopSwipe={false}
                    // disableLeftSwipe={false}
                    // disableRightSwipe={false}
                    // stackSize={3}
                    // stackSeparation={15}






                backgroundColor={'#ffffff'}
                // onTapCard={this.swipeLeft}
                cards={this.state.UsersArr}
                cardIndex={this.state.activeItemIndex}
                cardVerticalMargin={80}
                renderCard={this.renderCard}
                onSwipedAll={this.onSwipedAllCards}
                disableBottomSwipe={false}
                disableTopSwipe={false}
                disableLeftSwipe={false}
                disableRightSwipe={false}
                SwipeCards={false}
                swipeAnimationDuration={0}
                goBackToPreviousCardOnSwipeLeft={true}
                goBackToPreviousCardOnSwipeRight={true}
                animateCardOpacity
                animateOverlayLabelsOpacity
                infinite={false}
                verticalSwipe={false}
                // stackSize={3}
                // stackSeparation={15}
                // overlayLabels={{
                // }}
                                // stackSize={this.state.UsersArr.length}
                >
                    {/* <Button onPress={() => this.swiper.swipeBack()} title='Swipe Back' /> */}
                </Swiper>








                {/* <Carousel
                        // ref={this.SwipeCards}
                        data={this.state.UsersArr}
                        // initialScrollIndex={this.state.activeItemIndex}
                        renderItem={this._renderSwipableItem}
                        firstItem={this.state.activeItemIndex}
                        sliderWidth={deviceDimesions.width}
                        itemWidth={deviceDimesions.width}

                    // onSnapToItem={(index) => this.setState({ activeItemIndex: index })}

                    /> */}

                {/* <Carousel
                        ref={this.SwipeCards}
                        data={this.state.UsersArr}
                        initialScrollIndex={this.state.activeItemIndex,"{{{{{{{{{{this.state.activeItemIndex}}}}}}}}}}}}}}"}
                        renderItem={this._renderSwipableItem,"((((((((((((((this._renderSwipableItem)))))))))))))"}
                        firstItem={this.state.activeItemIndex,console.log(this.state.activeItemIndex,"**************this.state.activeItemIndex************")}
                        onSnapToItem={(index) => this.setState({ activeItemIndex: index }),console.log((index) => this.setState({ activeItemIndex: index }),"?????????index????????")}
                        sliderWidth={deviceDimesions.width}
                        itemWidth={deviceDimesions.width}
                    /> */}
            </View>






        )
    }
}

class ShowProfileCard extends Component {
    constructor(props) {
        super(props)
        // this.springValue = new Animated.Value(0.3)
        this.state = {
            userData: "",
            userDetails: [],
            access_token: "",
            showImageSliderModal: false,
            userGalleryImages: null,
            userRequestPhotoOption: null,
            userRequestPhotorequested: "",
            activeSlideImageIndex: 0,
            animatedValue: new Animated.Value(0),
            membership: '1',
            showPopover: false,
            showProfilePictureZoomModal: false,
            showVideoPlayerModal: false,
            spinValue: new Animated.Value(0),
            MatchedUserData: "",
            isLoading: false,
            Membership_type: "",
            Membership_typedatashow: null,
            Membership_type_contact: true,
            SimilarProfilesArr: [],
            CareerDataArr: [],
            MemberEducationDataArr: [],
            KnowMeBetterArr: [],
            YouAndHerArr: [],
            HobbiesAndInterests: null,
            userGalleryImages: null,
            isShortlisted: false,
            interestSent: false,
            PhotoRequestCheckBanner: false,
            IntrestedRequestCheckBanner: false,
            ShortListedRequestCheckBanner: false,
            UserNameBanner: false

            // showDetailsPanel : false,
        }
    }
    async componentDidMount() {
        // console.log(this.props)
        this.setState({ isLoading: true })

        this.setState({ userData: [this.props.data] })

        let access_token = await AsyncStorage.getItem('access_token');
        this.setState({ access_token });


        let userData = JSON.parse(await AsyncStorage.getItem('user_data'))
        console.log(userData, "---------------------------*********************************-----------------------------", userData[0])
        this.setState({ membership: userData.userdata.membership })






        // this.spring()

        await GetMemberDetail(this.state.userData[0].member_id, this.state.access_token).then(res => {
            let response = res;
            this.setState({ userDetails: response.data.data })
            // console.log(response.data.data)
        })

        console.log("***********************---------------", this.props.data.member_id)
        console.log("***********************---------------", this.state.access_token)



        await GetPhotoRequestCheckBanner(this.props.data.member_id, this.state.access_token).then(res => {
            let response = res;
            console.log(response.data, "++++++++++++++++++GetPhotoRequestCheckBanner")
            this.setState({ PhotoRequestCheckBanner: response.data.data })
            if (response.data.status === true) {
                this.setState({ PhotoRequestCheckBanner: true })

                this.setState({ UserNameBanner: true })

            } else {
                this.setState({ PhotoRequestCheckBanner: false })

                this.setState({ UserNameBanner: false })
            }

        })

        await GetIntrestedRequestCheckBanner(this.props.data.member_id, this.state.access_token).then(res => {
            let response = res;
            console.log(response.data, "++++++++++++++++++GetIntrestedRequestCheckBanner")
            this.setState({ IntrestedRequestCheckBanner: response.data.data })

            if (response.data.status === true) {
                this.setState({ IntrestedRequestCheckBanner: true })

                this.setState({ UserNameBanner: true })

            } else {
                this.setState({ IntrestedRequestCheckBanner: false })

                this.setState({ UserNameBanner: false })
            }
        })

        await GetShortListedRequestCheckBanner(this.props.data.member_id, this.state.access_token).then(res => {
            let response = res;
            console.log(response.data, "++++++++++++++++++GetShortListedRequestCheckBanner")
            this.setState({ ShortListedRequestCheckBanner: response.data.data })
            this.setState({ UserNameBanner: this.props.data.first_name })


            if (response.data.status === true) {
                this.setState({ ShortListedRequestCheckBanner: true })

                this.setState({ UserNameBanner: true })

            }
            else {
                this.setState({ ShortListedRequestCheckBanner: false })

                this.setState({ UserNameBanner: false })
            }

        })

        Checkphotorequest(this.state.access_token, this.state.userData[0].member_id).then(res => {
            let response = res;
            console.log(response.data)
            if (response.data.status) {
                this.setState({ userRequestPhotorequested: true })
                console.log(response.data, "Line---231(response.data)")


            } else {

                this.setState({ userRequestPhotorequested: "" })

            }


        })
            .catch(err => {
                console.log(err)
            })

        await GetMemberDetail(this.props.data.member_id, this.state.access_token).then(res => {
            let response = res;
            console.log(response.data.data)
            this.setState({ MatchedUserData: response.data.data })
        })

        await GetSimilarProfiles(this.state.access_token).then(res => { let response = res; response.data.status ? this.setState({ SimilarProfilesArr: response.data.data }) : this.setState({ SimilarProfilesArr: null }) }).catch(err => { let error = err; console.log(error) })
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

        await GetCountOfPendingContacts(this.state.access_token).then(res => {
            let response = res;
            // console.log(response.data.data)
            this.setState({ CountOfPendingContacts: response.data.data })

        })
            .catch(err => {
                let error = err
                console.log(error)
            })


        await GetMemberAllGalleryPics(this.state.access_token, this.state.userData[0].member_id).then(res => {
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
                // console.log(Images)

                this.setState({ userGalleryImages: Images })

            }
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
        // await GetKnowMeBetter(this.state.access_token, this.props.data.member_id).then(res => {
        //     let response = res;
        //     // console.log(response.data.data)
        //     this.setState({ KnowMeBetterArr: response.data.data })
        // })
        //     .catch(err => {
        //         let error = err;
        //         console.log(JSON.stringify(error))
        //     })


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

        await getYouAndHer(this.state.access_token, this.props.data.member_id).then(res => {
            let response = res;
            // console.log(response.data.data)
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



        setInterval(async () => {
            this.state.animatedValue.setValue(0)
            Animated.timing(this.state.animatedValue, {
                toValue: 1,
                // delay: 300,
                duration: 500,
                useNativeDriver: true,
                // easing : Easing.bounce
            }).start()


        }, 1500);

        this.setState({ isLoading: false, isShortlisted: this.props.data.shortlisted, interestSent: this.props.data.interest_sent })



    }

    async onSharePress() {
        try {
            const result = await Share.share(
                {
                    title: `Share ${(this.props.data.first_name.toUpperCase())}'s Profile`,
                    message: `https://demo.happyweddings.com/home/member_profile/${this.state.userData[0].member_id}`,
                    url: `https://demo.happyweddings.com/home/member_profile/${this.state.userData[0].member_id}`
                }
            );

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async onInterestSend() {
        let userDataClone = [...this.state.userData]
        !userDataClone[0].interest_sent ?
            SendInterest(userDataClone[0].member_id, this.state.access_token).then(res => {
                let response = res;
                console.log(response.data)
                userDataClone[0].interest_sent = true
                this.setState({ userData: userDataClone, showPopover: this.state.membership == 1 ? true : false })
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

    async onShowGalleryImagesPress() {
        console.log(this.state.userGalleryImages)
        this.state.userGalleryImages == null ?
            ToastAndroid.showWithGravityAndOffset(
                "There is no gallery images for this user.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            )
            :
            this.setState({ showImageSliderModal: true })
    }

    async onIgnorePress() {
        await IgnoreMember(this.state.userData[0].member_id, this.state.access_token).then(res => {
            let response = res;
            console.log(response.data)
            goToPreviousScreen(this);
        })
    }

    async OnPhotoRequestSend() {
        await SendPhotoRequest(this.state.access_token, this.state.userData[0].member_id).then(res => {
            let response = res;
            // console.log(response.data)
            if (response.data.status) {
                console.log(response.data, "response.data")

                Checkphotorequest(this.state.access_token, this.state.userData[0].member_id).then(res => {
                    let response = res;
                    console.log(response.data)
                    if (response.data.status) {

                        this.setState({ userRequestPhotorequested: true })
                        console.log(response.data, "Line---231(response.data)")
                        ToastAndroid.showWithGravityAndOffset(
                            response.data.message,
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                        );

                    } else {

                        this.setState({ userRequestPhotorequested: "" })

                    }


                })
                    .catch(err => {
                        console.log(err)
                    })

                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }

        })
            .catch(err => {
                console.log(err)
            })
    }

    async onShortlistPress() {
        let userDataClone = [...this.state.userData]

        userDataClone[0].shortlisted ?
            RemoveFromShortlist(userDataClone[0].member_id, this.state.access_token).then(res => {
                let response = res;
                console.log(response.data)
                // this.ToggleLoader("", false)
                userDataClone[0].shortlisted = !userDataClone[0].shortlisted
                this.setState({ userData: userDataClone, showPopover: this.state.membership == 1 ? true : false })
                ToastAndroid.showWithGravityAndOffset(
                    "Removed From Shortlist ",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                // this.forceUpdate();
            })
                .catch(err => {
                    console.log(err)
                    this.ToggleLoader("", false)
                })
            :
            AddToShortlist(userDataClone[0].member_id, this.state.access_token).then(res => {
                let response = res;
                console.log(response.data)
                // this.ToggleLoader("", false)
                userDataClone[0].shortlisted = !userDataClone[0].shortlisted
                this.setState({ userData: userDataClone, showPopover: this.state.membership == 1 ? true : false })
                ToastAndroid.showWithGravityAndOffset(
                    "Shortlisted",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                // this.forceUpdate();
            })
                .catch(err => {
                    console.log(err)
                    // this.ToggleLoader("", false)
                })
    }

    _renderGalleryImages = ({ item, index }) => {
        // console.log(item)
        return (
            <View style={{ alignItems: 'center', alignSelf: 'center', justifyContent: 'center', height: deviceDimesions.Height * 0.8, width: deviceDimesions.width }}>
                <ImageBackground source={{ uri: BaseURL.DemoURL + item.gallery }} style={{ height: deviceDimesions.Height * 0.8, width: deviceDimesions.width, alignItems: 'center', alignSelf: 'center', resizeMode: 'contain' }} />
            </View>
        )

    }



    onSwipeUpHandle(data) {
        this.props.onSwipeUpFun(data)
    }


    async goToPremiumContactDetails() {

        this.setState({ Membership_typedatashow: true });

        this.setState({ Membership_type_contact: false });



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
        let rotateX = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
        })



        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.spinValue, {
                    toValue: 1,
                    duration: 500,
                    delay: 1000,
                    useNativeDriver: true
                }),
                Animated.timing(this.state.spinValue, {
                    toValue: 0.5,
                    duration: 500,
                    useNativeDriver: true
                })
            ])
        ).start()

        let userInfoLine1 = (this.state.userDetails.age ? this.state.userDetails.age + ' year old, ' : "") + (this.state.userDetails ? this.state.userDetails.edu_course_name && this.state.userDetails.edu_college ? this.state.userDetails.edu_course_name + " From " + this.state.userDetails.edu_college + ", " : "" : "")
        let userInfoLine2 = (this.state.userDetails.career_type ? this.state.userDetails.career_type + ', ' : "") + (this.state.userDetails.place_grew_up ? this.state.userDetails.place_grew_up : "")
        let userInfoLine3 = (this.state.userDetails.religion ? this.state.userDetails.religion + ", " : "") + (this.state.userDetails.caste ? this.state.userDetails.caste + ", " : "") + (this.state.userDetails.mother_tongue ? this.state.userDetails.mother_tongue : "")


        let userData = this.props.data


        // console.log(userData)
        return (


            <ScrollView>

  <View>


                <View>
                    <View style={{ margin: 10 }}>


                        {/* <View style={{ height: 55, width: 55 }}>
                            <TouchableOpacity onPress={() => goToDrawerHomeScreen()} style={{ elevation: 5, padding: 1, backgroundColor: "#ffffff", borderRadius: 10 }}>
                                <Icon name="chevron-left" size={26} color="orange" />
                            </TouchableOpacity>
                        </View> */}

                        {/* <View style={{height : deviceDimesions.Height*0.9, width : deviceDimesions.width*0.95, alignSelf : 'center', borderRadius : 15}}> */}
                        <ImageBackground imageStyle={{ borderRadius: 20 }} style={styles.container}
                            source={{ uri: BaseURL.DemoURL + this.state.userDetails.profile_image }}
                        >


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: deviceDimesions.width * 0.85, alignSelf: 'center', paddingHorizontal: 10 }}>

                                <TouchableOpacity onPress={() => { navigate("HomeTab") }} style={{ width: 55, height: 55 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center', marginTop: 10 }}>
                                        <Icon name="chevron-left" size={26} color="orange" />

                                    </View>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', }}>
                                    {
                                        !this.state.userDetails.profile_video || this.state.userDetails.profile_video == "uploads/profile_video/"
                                            ?
                                            null
                                            :
                                            <TouchableOpacity onPress={() => this.setState({ showVideoPlayerModal: true })} style={{ marginRight: deviceDimesions.width * 0.02, padding: 2, backgroundColor: "#ffffff", width: deviceDimesions.width * 0.09, height: deviceDimesions.Height * 0.045, borderRadius: 50, alignItems: 'center', justifyContent: 'center', elevation: 5 }}>
                                                <Icon name="video" color="orange" size={18} />
                                            </TouchableOpacity>
                                    }
                                    {
                                        !this.state.userDetails.badge_count || this.state.userDetails.profile_video == 0
                                            ?
                                            null
                                            :
                                            <View style={{ marginRight: deviceDimesions.width * 0.02, padding: 2, backgroundColor: "#ffffff", width: deviceDimesions.width * 0.09, height: deviceDimesions.Height * 0.045, borderRadius: 50, alignItems: 'center', justifyContent: 'center', elevation: 5 }}>
                                                <Image source={IconsPathVariable.ShieldIcon} style={{ height: deviceDimesions.Height * 0.03, width: deviceDimesions.width * 0.05 }} />
                                            </View>
                                    }

                                    <TouchableOpacity
                                        onPress={() => this.onSharePress()}
                                        style={{ marginRight: deviceDimesions.width * 0.02, padding: 2, backgroundColor: "#ffffff", width: deviceDimesions.width * 0.09, height: deviceDimesions.Height * 0.045, borderRadius: 50, alignItems: 'center', justifyContent: 'center', elevation: 5 }}
                                    >
                                        <Icon name="share-alt" color="orange" size={18} />
                                    </TouchableOpacity>
                                    {
                                        this.state.userGalleryImages == null ?
                                            null
                                            :
                                            this.state.userGalleryImages != null && this.state.userGalleryImages.length > 1 ?
                                                <View>
                                                    <TouchableOpacity onPress={() => this.onShowGalleryImagesPress()} style={{ padding: 2, backgroundColor: "#ffffff", width: deviceDimesions.width * 0.09, height: deviceDimesions.Height * 0.045, borderRadius: 50, alignItems: 'center', justifyContent: 'center', elevation: 5 }}>
                                                        <Icon name="images" color="orange" size={18} />
                                                    </TouchableOpacity>

                                                    <View style={{ position: 'absolute', right: 0, top: -deviceDimesions.Height * 0.014 }}>
                                                        <Badge style={{ padding: 2, width: deviceDimesions.width * 0.045, height: deviceDimesions.Height * 0.025, borderRadius: 50, alignItems: 'center', justifyContent: 'center', elevation: 5 }} warning>
                                                            <Text style={{ color: "white", fontSize: 10, fontWeight: '700', marginTop: -deviceDimesions.Height * 0.015 }}> {this.state.userGalleryImages !== null ? this.state.userGalleryImages.length : 0} </Text>
                                                        </Badge>
                                                    </View>

                                                </View>

                                                :
                                                null
                                    }


                                </View>

                            </View>

                            <TouchableOpacity
                                onPress={() => this.setState({ showProfilePictureZoomModal: true })}
                                style={{ height: deviceDimesions.Height * 0.35, width: deviceDimesions.width * 0.8 }}
                            ></TouchableOpacity>
                            <View style={{ alignSelf: 'flex-end', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', padding: 15 }}>
                                {this.state.membership != 1 ?
                                    <TouchableOpacity style={styles.HeaderBottomButtonTouchable}
                                    // onPress={()=>this.onShortlistPress()}
                                    >
                                        <NeuBorderView
                                            width={deviceDimesions.width * 0.13}
                                            height={deviceDimesions.Height * 0.07}
                                            color="#ffffff"
                                            borderRadius={20}
                                            inset
                                        >
                                            <Icon name="comment-alt" color="red" size={24} />
                                        </NeuBorderView>
                                    </TouchableOpacity>
                                    : null
                                }
                                <View>

                                    <TouchableOpacity style={styles.HeaderBottomButtonTouchable}
                                        onPress={() => this.onShortlistPress()}
                                    >
                                        <NeuBorderView
                                            width={deviceDimesions.width * 0.13}
                                            height={deviceDimesions.Height * 0.07}
                                            color="#ffffff"
                                            borderRadius={20}
                                            inset
                                        >

                                            <FAIcon name={this.state.userData && this.state.userData[0].shortlisted ? "bookmark" : "bookmark-o"} color="red" size={24} />
                                        </NeuBorderView>
                                    </TouchableOpacity>

                                </View>

                                <View >

                                    <TouchableOpacity style={{
                                        padding: 7,
                                        borderRadius: 50,
                                        backgroundColor: 'rgba(255,255,255,0.5)',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginLeft: 5, width: 55, height: 55
                                    }}
                                        onPress={() => this.onInterestSend()}
                                    >
                                        <NeuBorderView
                                            width={deviceDimesions.width * 0.13}
                                            height={deviceDimesions.Height * 0.07}
                                            color="#ffffff"
                                            borderRadius={20}
                                            inset
                                        >
                                            <FAIcon name={this.state.userData && this.state.userData[0].interest_sent ? "heart" : "heart-o"} color="red" size={24} />

                                        </NeuBorderView>
                                    </TouchableOpacity>

                                </View>

                            </View>

                            {/* Zoom profile picture modal */}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.showProfilePictureZoomModal}
                                onBackdropPress={() => this.setState({ showProfilePictureZoomModal: false })}
                                onRequestClose={() => {
                                    this.setState({ showProfilePictureZoomModal: false })
                                }}
                            >
                                <ImageViewer imageUrls={[{ url: BaseURL.DemoURL + this.state.userDetails.profile_image }]} />
                            </Modal>
                        </ImageBackground>
                        {/* <TouchableOpacity 
                            // onPress={() => this.onSwipeUpHandle(userData)} 
                            style={{ width: deviceDimesions.width * 0.9, height: deviceDimesions.Height * 0.18, alignSelf: 'center', backgroundColor: "#ffffff" }}> */}
                        <View style={{ flexDirection: 'row', width: deviceDimesions.width * 0.85, paddingVertical: deviceDimesions.Height * 0.01, alignItems: 'center', alignSelf: 'center', marginTop: deviceDimesions.Height * 0.015 }}>
                            <Text style={{ fontSize: 22, fontWeight: '700', letterSpacing: 2 }} selectable>{this.state.userDetails.first_name ? this.state.userDetails.first_name : ""} | </Text>
                            <Text style={{ fontSize: 12, fontWeight: '600', marginTop: 2 }} selectable>{userData.member_profile_id}</Text>
                        </View>
                        {/* <Text style={{width : deviceDimesions.width*0.85, alignSelf : 'center', fontSize : 16, fontWeight : '700', color : "#ff751a", paddingVertical : deviceDimesions.Height*0.01}}>About - </Text> */}
                        <Text style={{ fontSize: 16, fontWeight: '600', width: deviceDimesions.width * 0.85, alignSelf: 'center' }} selectable>
                            {userInfoLine1.length > 43 ? userInfoLine1.slice(0, 43) + "..." : userInfoLine1}
                            {/* {this.state.userDetails.age ? this.state.userDetails.age + ' year old, ' : ""}
                                {this.state.userDetails ? this.state.userDetails.edu_course_name && this.state.userDetails.edu_college ? this.state.userDetails.edu_course_name + " From " + this.state.userDetails.edu_college + ", " : "" : ""} */}
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '600', width: deviceDimesions.width * 0.85, alignSelf: 'center' }} selectable>
                            {userInfoLine2.length > 43 ? userInfoLine2.slice(0, 43) + "..." : userInfoLine2}
                            {/* {this.state.userDetails.career_type ? this.state.userDetails.career_type + ', ' : ""}
                                {this.state.userDetails.place_grew_up ? this.state.userDetails.place_grew_up : ""} */}
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '600', width: deviceDimesions.width * 0.85, alignSelf: 'center' }} selectable>
                            {
                                userInfoLine3.length > 43 ? userInfoLine3.slice(0, 43) + "..." : userInfoLine3
                                // userInfo.length > 20 ? userInfo.slice(0,20) + "..." : userInfo
                            }

                        </Text>


                        {
                            this.state.userDetails.profile_image == "uploads/gallery_image/default.jpg" ?

                                <View style={{ width: deviceDimesions.width * 0.85, alignSelf: 'center', alignItems: 'flex-end' }}>
                                    <TouchableOpacity
                                        style={{ backgroundColor: '#e67300', padding: 1.5, borderRadius: 15, alignItems: 'center', width: deviceDimesions.width * 0.3, }}
                                        onPress={() => this.OnPhotoRequestSend()}>
                                        <Text style={{ fontSize: 15, fontWeight: '700', color: '#ffffff' }}> {this.state.userRequestPhotorequested ? "Photo requested" : "Request Photo"}</Text>

                                    </TouchableOpacity>
                                </View>
                                : null
                        }


                        {
                            this.state.showPopover ?
                                <View style={{ marginTop: deviceDimesions.Height * 0.015, width: deviceDimesions.width * 0.85, height: deviceDimesions.Height * 0.15, backgroundColor: '#ffffff', elevation: 5, borderRadius: 10, alignSelf: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ showPopover: false })}
                                        style={{ alignSelf: 'flex-end', padding: 3 }}
                                    >
                                        <Icon name="times" color="#e67300" size={16} />
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: deviceDimesions.width * 0.8, alignItems: 'center', padding: 4 }}>
                                        <NeuBorderView
                                            height={deviceDimesions.Height * 0.12}
                                            width={deviceDimesions.width * 0.25}
                                            color="#ffffff"
                                            borderRadius={10}
                                        >
                                            <Image source={IconsPathVariable.UpgradeToPremiumBannerIcon} style={{ height: deviceDimesions.Height * 0.11, width: deviceDimesions.width * 0.23, resizeMode: 'stretch' }} />
                                        </NeuBorderView>
                                        <View style={{ width: deviceDimesions.width * 0.5, height: deviceDimesions.Height * 0.1, justifyContent: 'space-around' }}>
                                            <Text style={{ opacity: 0.7 }}>Upgrade Now To Contact This Member</Text>
                                            <TouchableOpacity
                                                style={{ backgroundColor: '#e67300', padding: 4, borderRadius: 15, alignItems: 'center', width: deviceDimesions.width * 0.3 }}
                                                onPress={() => goToUpgradeToPremiumScreen()}
                                            >
                                                <Text style={{ fontSize: 16, fontWeight: '700', color: '#ffffff' }}>Upgrade Now</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                :
                                null
                        }


                        {
                            this.state.ShortListedRequestCheckBanner ?
                                <View style={{ marginTop: deviceDimesions.Height * 0.015, width: deviceDimesions.width * 0.85, height: deviceDimesions.Height * 0.14, top: 5, backgroundColor: '#ffffff', elevation: 5, borderRadius: 10, alignSelf: 'center', justifyContent: 'center' }}>

                                    <View style={{ flexDirection: 'row', }}>

                                        <TouchableOpacity style={styles.HeaderBottomButtonTouchable}

                                        >
                                            <NeuBorderView
                                                width={deviceDimesions.width * 0.13}
                                                height={deviceDimesions.Height * 0.07}
                                                color="#ffffff"
                                                borderRadius={20}
                                                inset
                                            >
                                                <FAIcon name={"bookmark"} color="red" size={24} />

                                            </NeuBorderView>
                                        </TouchableOpacity>
                                        <View style={{ flex: 1, width: deviceDimesions.width * 0.5, height: deviceDimesions.Height * 0.1, justifyContent: 'space-around', marginLeft: 20 }}>
                                            <Text style={{ opacity: 0.7, }}>{this.state.userDetails.first_name ? this.state.userDetails.first_name : ""} Has Shortlisted You </Text>
                                            <Text style={{ opacity: 0.7, }}>Do you like {this.state.userDetails.gender == "2" ? "her" : "him"}?</Text>

                                            <View style={{ flexDirection: 'row', }}>

                                                <TouchableOpacity
                                                    onPress={() => this.onShortlistPress()}
                                                    style={{ backgroundColor: '#e67300', elevation: 5, padding: 4, borderRadius: 15, alignItems: 'center', width: deviceDimesions.width * 0.2 }}
                                                >
                                                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#ffffff' }}>Yes</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity

                                                    onPress={() => this.setState({ ShortListedRequestCheckBanner: false })}
                                                    style={{ backgroundColor: '#ffffff', elevation: 5, padding: 4, borderRadius: 15, alignItems: 'center', width: deviceDimesions.width * 0.2, marginLeft: 10 }}>
                                                    <Text style={{ fontSize: 16, fontWeight: '700', }}>No</Text>
                                                </TouchableOpacity>
                                            </View>



                                        </View>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ ShortListedRequestCheckBanner: false })}
                                            style={{ alignSelf: 'flex-end', marginRight: 10 }}
                                        >
                                            <Icon name="times" color="#e67300" size={16} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                :
                                null



                        }
                        {
                            this.state.IntrestedRequestCheckBanner ?


                                <View style={{ marginTop: deviceDimesions.Height * 0.015, width: deviceDimesions.width * 0.85, height: deviceDimesions.Height * 0.14, top: 5, backgroundColor: '#ffffff', elevation: 5, borderRadius: 10, alignSelf: 'center', justifyContent: 'center' }}>

                                    <View style={{ flexDirection: 'row', }}>

                                        <TouchableOpacity style={styles.HeaderBottomButtonTouchable}

                                        >
                                            <NeuBorderView
                                                width={deviceDimesions.width * 0.13}
                                                height={deviceDimesions.Height * 0.07}
                                                color="#ffffff"
                                                borderRadius={20}
                                                inset
                                            >
                                                <FAIcon name={"heart"} color="red" size={24} />

                                            </NeuBorderView>
                                        </TouchableOpacity>
                                        <View style={{ flex: 1, width: deviceDimesions.width * 0.5, height: deviceDimesions.Height * 0.1, justifyContent: 'space-around', marginLeft: 20 }}>
                                            <Text style={{ opacity: 0.7, }}>{this.state.userDetails.first_name ? this.state.userDetails.first_name : ""} Has Liked You </Text>
                                            <Text style={{ opacity: 0.7, }}>Do you like {this.state.userDetails.gender == "2" ? "her" : "him"}?</Text>

                                            <View style={{ flexDirection: 'row', }}>

                                                <TouchableOpacity
                                                    onPress={() => this.onInterestSend()}

                                                    style={{ backgroundColor: '#e67300', elevation: 5, padding: 4, borderRadius: 15, alignItems: 'center', width: deviceDimesions.width * 0.2 }}
                                                >
                                                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#ffffff' }}>Yes</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity

                                                    onPress={() => this.setState({ IntrestedRequestCheckBanner: false })}
                                                    style={{ backgroundColor: '#ffffff', elevation: 5, padding: 4, borderRadius: 15, alignItems: 'center', width: deviceDimesions.width * 0.2, marginLeft: 10 }}>
                                                    <Text style={{ fontSize: 16, fontWeight: '700', }}>No</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ IntrestedRequestCheckBanner: false })}
                                            style={{ alignSelf: 'flex-end', marginRight: 10 }}
                                        >
                                            <Icon name="times" color="#e67300" size={16} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                :
                                null

                        }

                        {
                            this.state.PhotoRequestCheckBanner ?

                                <View style={{ marginTop: deviceDimesions.Height * 0.015, width: deviceDimesions.width * 0.85, height: deviceDimesions.Height * 0.14, top: 5, backgroundColor: '#ffffff', elevation: 5, borderRadius: 10, alignSelf: 'center', justifyContent: 'center' }}>

                                    <View style={{ flexDirection: 'row', }}>

                                        <TouchableOpacity style={styles.HeaderBottomButtonTouchable}

                                        >
                                            <NeuBorderView
                                                width={deviceDimesions.width * 0.13}
                                                height={deviceDimesions.Height * 0.07}
                                                color="#ffffff"
                                                borderRadius={20}
                                                inset
                                            >
                                                <Image source={IconsPathVariable.PhotoRequestedIcon} style={{ height: deviceDimesions.Height * 0.04, width: deviceDimesions.width * 0.06 }} />

                                            </NeuBorderView>
                                        </TouchableOpacity>
                                        <View style={{ flex: 1, width: deviceDimesions.width * 0.5, height: deviceDimesions.Height * 0.1, justifyContent: 'space-around', marginLeft: 20 }}>
                                            <Text style={{ opacity: 0.7, marginLeft: 10 }}>{this.state.userDetails.first_name ? this.state.userDetails.first_name : ""} Has Requested You To Add Your Photo</Text>

                                            <View style={{ flexDirection: 'row', }}>

                                                <TouchableOpacity
                                                    onPress={() => this.onInterestSend()}

                                                    style={{ backgroundColor: '#e67300', elevation: 5, padding: 4, borderRadius: 15, alignItems: 'center', width: deviceDimesions.width * 0.2 }}
                                                >
                                                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#ffffff' }}>Yes</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => this.setState({ PhotoRequestCheckBanner: false })}

                                                    style={{ backgroundColor: '#ffffff', elevation: 5, padding: 4, borderRadius: 15, alignItems: 'center', width: deviceDimesions.width * 0.2, marginLeft: 10 }}>
                                                    <Text style={{ fontSize: 16, fontWeight: '700', }}>No</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ PhotoRequestCheckBanner: false })}
                                            style={{ alignSelf: 'flex-end', marginRight: 10 }}
                                        >
                                            <Icon name="times" color="#e67300" size={16} />
                                        </TouchableOpacity>
                                    </View>
                                </View>


                                :
                                null

                        }




                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showImageSliderModal}
                            onBackdropPress={() => this.setState({ showImageSliderModal: false })}
                            onRequestClose={() => {
                                this.setState({ showImageSliderModal: false })
                            }}
                        >
                            <ImageViewer
                                imageUrls={this.state.userGalleryImages} />
                        </Modal>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showVideoPlayerModal}
                            onBackdropPress={() => this.setState({ showVideoPlayerModal: false })}
                            onRequestClose={() => {
                                this.setState({ showVideoPlayerModal: false })
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Video source={{ uri: BaseURL.DemoURL + this.state.userDetails.profile_video }}   // Can be a URL or a local file.
                                        ref={(ref) => {
                                            this.player = ref
                                        }}                                      // Store reference

                                        style={styles.backgroundVideo}
                                        controls
                                    />
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>


                <MatchedUserFullProfiles data={userData} />

            </View>



            </ScrollView>
          

        )

    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#f0f0f0',
        height: deviceDimesions.Height * 0.55,
        width: deviceDimesions.width * 0.85,
        borderRadius: 15,
        alignSelf: 'center'
    },
    // -----------------------
    contain: {
        // flex: 1,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center'
    },
    panel: {
        flex: 1,
        backgroundColor: 'white',
        height: deviceDimesions.Height,
        width: deviceDimesions.width,
        alignSelf: 'center'
        // position: 'relative'
    },
    panelHeader: {
        height: 120,
        backgroundColor: '#b197fc',
        alignItems: 'center',
        justifyContent: 'center'
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
    //   ---------------------------------------
    contentContainer: {
        height: deviceDimesions.Height,
        width: deviceDimesions.width,
        padding: 10,
        //   backgroundColor : "rgba(255,255,255,0.4)"
    },
    HeaderBottomButtonTouchable: {
        padding: 7,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5
    },
    linearGradient: {
        // flex : 1,
        height: deviceDimesions.Height * 0.45,
        width: deviceDimesions.width,
        // marginTop : deviceDimesions.Height*0.08,
        alignItems: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        // marginTop: deviceDimesions.Height*0.01,
        backgroundColor: "rgba(255,255,255,0.8)",
    },
    modalView: {
        // margin: 20,
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        borderRadius: 20,
        height: deviceDimesions.Height,
        width: deviceDimesions.width,
        // padding: 20,
        alignItems: "center",
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        // alignSelf : 'center'
    },
    card: {
        flex: 5,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        justifyContent: "center",
        backgroundColor: "white",
        height: 500,

    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
    },
    done: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent'
    },
    swipCardcontainer: {

        height: deviceDimesions.Height,
        width: deviceDimesions.width,
        backgroundColor: "#ffffff"

    },
    faltlistswipcontainer: {
        flex: 1, backgroundColor: 'white'
    },

});
