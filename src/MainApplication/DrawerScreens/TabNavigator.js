/* eslint-disable prettier/prettier */
import { H3 } from 'native-base';
import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar, ImageBackground, Text, FlatList } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import ProgressCircle from 'react-native-progress-circle';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import { goToAllFiltersScreen, goToChatContainerScreen, goToDrawerHomeScreen, goToDrawerViewAllMatchedUserScreen, goToEditUserPreferencesScreen, goToEditUserProfilenScreen, goToFilterByTypeScreen, goToManagePhotoScreen, goToMatchedUserProfileOverviewrScreen, goToNotificationScreen, goToSearchProfilesScreen, goToTrustBadgesSliderScreen, goToTrustedBadgesScreen, goToUpgradeToPremiumScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import { BackHandler } from 'react-native';
import { AndroidBackHandler } from "react-navigation-backhandler";
import { BaseURL } from '../../API_config/BaseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PreferanceMemberListing, RecommendedMembersListings, NewlyJoinedMembers, MembersViewedMe, MutualMatchesListings, RemoveFromShortlist, AddToShortlist, SendInterest, PremiumMembersListings, GetSimilarProfiles, GetNearbyMembers, MembersLookingForMe, KeywordSearchAPI, GetMemberDetail, GetCountOfDiffRequests, GetShortlistedProfiles, GetInterestedMe, GetCountOfNotification, ViewAllMutualMatches } from '../../helper/API_Call/API_Call';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';
import { ToastAndroid } from 'react-native';
import { Alert } from 'react-native';
import { Pressable } from 'react-native';
import ContentLoader from 'react-native-easy-content-loader';
import { RefreshControl } from 'react-native';
import { Card } from 'react-native-elements';
import deviceInfoModule from 'react-native-device-info';
import HomeScreen from './HomeScreen';
import { thisTypeAnnotation } from '@babel/types';
import DrawerMailBoxScreen from './DrawerMailBoxScreen';
import ViewAllMatchedUserScreen from './ViewAllMatchedUser';
import { ChatContainer } from '../AuthScreens/ChatMessage/ChatContainer';
import { UpgradeToPremium } from './UpgradeToPremium';

export default class TabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HomeTab: true,
      ChatTab : false,
      Inbox:false,
      Matches:false,
      Premium:false

    }
  }
  async HomeTabData() {
    this.setState({ HomeTab: true })
    this.setState({ ChatTab: false })
    this.setState({ Inbox: false })
    this.setState({ Matches: false })
    this.setState({Premium:false})


  }
  async MachesTabData() {
    this.setState({ HomeTab: false })
    this.setState({ ChatTab: false })
    this.setState({ Inbox: false })
    this.setState({ Matches: true })
    this.setState({Premium:false})




  }
  async InboxTabData() {
    this.setState({ HomeTab: false })
    this.setState({ ChatTab: false })
    this.setState({ Inbox: true })
    this.setState({ Matches: false })
    this.setState({Premium:false})



  }
  async ChatTabData() {
    this.setState({ HomeTab: false })
    this.setState({ ChatTab: true })
    this.setState({ Inbox: false })
    this.setState({ Matches: false })    
    this.setState({Premium:false})



  }
  async PremiumTabData() {
    this.setState({ HomeTab: false })
    this.setState({ ChatTab: false })
    this.setState({ Inbox: false })
    this.setState({ Matches: false })
    this.setState({Premium:true})



  }
  

  
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.modalViewLocation}>

          <View style={{  flexDirection: 'row' }}>

            <TouchableOpacity
              style={{justifyContent:'center',alignContent:'center', width: deviceDimesions.width * 0.18,height:deviceDimesions.Height*0.1}}
              onPress={() => this.HomeTabData()}>
               <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
                <Image
                  style={styles.imageTopRow}
                  source={IconsPathVariable.HomeIcon1}
                />
                <Text style={{color:this.state.HomeTab ? "#e82f43" : "black" ,fontWeight: this.state.HomeTab ? '700' : '600'}}>Home</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity
              style={{justifyContent:'center',alignContent:'center', width: deviceDimesions.width * 0.18,height:deviceDimesions.Height*0.1}}
              onPress={() => this.MachesTabData()}>
             <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
                <Image
                  style={styles.imageTopRow}
                  source={IconsPathVariable.HomeIcon2}
                />
                   <Text style={{color:this.state.Matches ? "#e82f43" : "black" ,fontWeight: this.state.Matches ? '700' : '600'}}>Maches</Text>
              </View>
            </TouchableOpacity>

          
             <TouchableOpacity 
              style={{justifyContent:'center',alignContent:'center', width: deviceDimesions.width * 0.18,height:deviceDimesions.Height*0.1}}
             onPress={() => this.InboxTabData()}>
             <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
                <Image
                  style={styles.imageTopRow}
                  source={IconsPathVariable.HomeIcon3}
                />
                   <Text style={{color:this.state.Inbox ? "#e82f43" : "black" ,fontWeight: this.state.Inbox ? '700' : '600'}}>Inbox</Text>
              </View>
            </TouchableOpacity>


           
             <TouchableOpacity 
              style={{justifyContent:'center',alignContent:'center', width: deviceDimesions.width * 0.18,height:deviceDimesions.Height*0.1}}
             onPress={() => this.ChatTabData()}>
             <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
                <Image
                  style={styles.imageTopRow}
                  source={IconsPathVariable.HomeIcon4}
                />
                   <Text style={{color:this.state.ChatTab ? "#e82f43" : "black" ,fontWeight: this.state.ChatTab ? '700' : '600'}}>Chat</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={{justifyContent:'center',alignContent:'center', width: deviceDimesions.width * 0.18,height:deviceDimesions.Height*0.1}}
             onPress={() => this.PremiumTabData()}>
             <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
                <Image
                  style={styles.imageTopRow}
                  source={IconsPathVariable.HomeIcon5}
                />
                   <Text style={{color:this.state.Premium ? "#e82f43" : "black" ,fontWeight: this.state.Premium ? '700' : '600'}}>Premium</Text>
              </View>
            </TouchableOpacity>

          </View>

        </View>

        {
          this.state.HomeTab ?
            <HomeScreen></HomeScreen>
            :
            null
        }
        {
          this.state.Inbox ?
            <DrawerMailBoxScreen></DrawerMailBoxScreen>
              :
              null

        }
        {
          this.state.Matches ?
          <ViewAllMatchedUserScreen TitleText  />

          // <ViewAllMatchedUserScreen></ViewAllMatchedUserScreen>
          :
          null
        }

        {
         
         this.state.ChatTab ?
         <ChatContainer></ChatContainer>
         :
         null

        }

{
         
         this.state.Premium ?
         <UpgradeToPremium></UpgradeToPremium>
         :
         null

        }

        <View>

        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceDimesions.width

  },
  imageTopRow: {
    height: 30,
    width: 30,
  },

  modalViewLocation: {
    width: deviceDimesions.width,
    // backgroundColor: "#ffffff",
    // // borderRadius: 10,
    // flexDirection: 'row',
    // // shadowColor: "#000",
    // alignContent: 'center',
    // height: deviceDimesions.Height * 0.1,
    // padding: deviceDimesions.width * 0.04,
    // // shadowOffset: {
    // //   width: 0,
    // //   height: 2
    // // },
    // // shadowOpacity: 0.25,
    // // shadowRadius: 3.84,
    // // elevation: 5,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: 'center',
    marginTop:10

  }

});






