// ActiveContacts


import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal, TouchableOpacity } from 'react-native';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToUpgradeToPremiumScreen } from '../../helper/NavigationFunctions/NavigationFunctions';

export class ActiveContacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            membership: 1,
        }
    }

    async componentDidMount() {
        let userData = JSON.parse(await AsyncStorage.getItem('user_data'))
        // console.log(userData)
        this.setState({ membership: userData.userdata.membership })
    }
    render() {
        return (
            <>
                {this.state.membership != 1 ?
                    <ScrollView style={styles.container}>
                        <View style={{alignItems:'center',width:deviceDimesions.width*0.9,marginTop:60}}>

                            <View >
                                <Image source={ImagesPathVariable.ChatOnlineImage} style={{ width: deviceDimesions.width * 0.99, height: deviceDimesions.Height * 0.3, }} />

                            </View>
                            <Text>No members online.</Text>

                        </View>


                        {/* 
                        <TouchableOpacity style={{ padding : deviceDimesions.width*0.02,width : deviceDimesions.width*0.9, alignSelf : "center", alignItems : "center", backgroundColor : "#ffffff", elevation : 4, borderRadius : 10, margin : deviceDimesions.Height*0.01,}}>
                            <View style={{flexDirection : "row", alignItems : "center", width : deviceDimesions.width*0.9, padding : 5}}>
                                <View style={{width : deviceDimesions.width*0.2}}>
                                    <Image source={ImagesPathVariable.DummyUserSmall} style={{width : deviceDimesions.width*0.17, height : deviceDimesions.Height*0.09, resizeMode : "contain"}} />
                                </View>
                                <View style={{marginLeft : deviceDimesions.width*0.02,width : deviceDimesions.width*0.4}}>
                                    <View style={{flexDirection : "row", alignItems : "center"}}>
                                        <Text>ManojKumar</Text>
                                        <Text style={{marginLeft : deviceDimesions.width*0.02, fontSize : 10, opacity : 0.8}}>20 jul 2020</Text>
                                        <View 
                                            style={{marginLeft : deviceDimesions.width*0.02, alignItems : "center", justifyContent : "center", borderRadius : 20, padding : 4, backgroundColor : '#ff6600'}}>
                                            <Text style={{color : "#ffffff", fontSize : 12}}>10</Text>
                                        </View>
                                    </View>
                                    <Text style={{fontSize : 10, opacity : 0.8}}>ES435AF</Text>
                                </View>
                                <View style={{alignItems : "flex-end",width : deviceDimesions.width*0.2}}>
                                    <Text style={{color : "#00cc00", fontSize : 10}}>Online</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding : deviceDimesions.width*0.02,width : deviceDimesions.width*0.9, alignSelf : "center", alignItems : "center", backgroundColor : "#ffffff", elevation : 4, borderRadius : 10, margin : deviceDimesions.Height*0.01,}}>
                            <View style={{flexDirection : "row", alignItems : "center", width : deviceDimesions.width*0.9, padding : 5}}>
                                <View style={{width : deviceDimesions.width*0.2}}>
                                    <Image source={ImagesPathVariable.DummyUserSmall} style={{width : deviceDimesions.width*0.17, height : deviceDimesions.Height*0.09, resizeMode : "contain"}} />
                                </View>
                                <View style={{marginLeft : deviceDimesions.width*0.02,width : deviceDimesions.width*0.4}}>
                                    <View style={{flexDirection : "row", alignItems : "center"}}>
                                        <Text>ManojKumar</Text>
                                        <Text style={{marginLeft : deviceDimesions.width*0.02, fontSize : 10, opacity : 0.8}}>20 jul 2020</Text>
                                        <View 
                                            style={{marginLeft : deviceDimesions.width*0.02, alignItems : "center", justifyContent : "center", borderRadius : 20, padding : 4, backgroundColor : '#ff6600'}}>
                                            <Text style={{color : "#ffffff", fontSize : 12}}>10</Text>
                                        </View>
                                    </View>
                                    <Text style={{fontSize : 10, opacity : 0.8}}>ES435AF</Text>
                                </View>
                                <View style={{alignItems : "flex-end",width : deviceDimesions.width*0.2}}>
                                    <Text style={{color : "#00cc00", fontSize : 10}}>Online</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                   
                    */}

                    </ScrollView>
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => goToUpgradeToPremiumScreen()} style={{ elevation: 5, padding: 1, backgroundColor: "#ffffff", borderRadius: 10 }}>
                            <Image source={ImagesPathVariable.MatchedUserProfileScreenSliderImage2} style={{ height: deviceDimesions.Height * 0.25, width: deviceDimesions.width * 0.9 }} />
                        </TouchableOpacity>
                    </View>
                }
            </>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        
    },
});