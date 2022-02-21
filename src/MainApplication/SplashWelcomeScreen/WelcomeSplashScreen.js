/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NeuButton } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToDrawerHomeScreen, goToDrawerScreen, goToLandingScreen, goToLoginScreen } from '../../helper/NavigationFunctions/NavigationFunctions';

const UserLoggedIn = {
  accessToken: AsyncStorage.getItem('access_token'),
  isLoggedIn: AsyncStorage.getItem('isLoggedIn'),
}
export default class WelcomeSplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: ''
    }
  }
  async componentDidMount() {
    this.setState({ loggedIn: await AsyncStorage.getItem('access_token') })

    // setTimeout(() => {
    //     // console.log(this.state.loggedIn)
    //     // this.props.
    //     this.state.loggedIn ? goToDrawerScreen() : goToLoginScreen({openModel : false})
    // }, 4000);   
  }
  onSignupPress() {
   
    this.state.loggedIn ? goToDrawerScreen() : goToLoginScreen({openModel : false})
   
}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <ImageBackground
          style={styles.splash}
          source={ImagesPathVariable.splashImage}
        >
          <Image style={styles.logo} source={ImagesPathVariable.LoginLogo} />
          <View style={{
            justifyContent: 'center',

            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}>

            <View style={{
              backgroundColor: 'rgba(255, 255, 255, .4)',
              width: '90%',
              height: 180,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
              bottom: 30,
              marginTop: 10
            }}>
              <Text style={{ color: '#ffffff', fontSize: 18, }}>New to Happy Weddings?</Text>
              <Text style={{ color: '#ffffff', fontSize: 18, }}>Signup with</Text>
              <View style={{ flexDirection: 'row', }}>

                <View style={{ alignItems: 'center', padding: 20 }}>
                  <Image style={{ width: 50, height: 50 }} source={ImagesPathVariable.GmailIcon} />
                  <Text style={{ color: '#ffffff', fontSize: 15, marginTop: 4 }}>Email</Text>
                </View>
                <View style={{ alignItems: 'center', padding: 20 }}>
                  <Image style={{ width: 50, height: 50 }} source={ImagesPathVariable.FacebbokIcon} />
                  <Text style={{ color: '#ffffff', fontSize: 15, marginTop: 4 }}>Facebook</Text>
                </View>
                <View style={{ alignItems: 'center', padding: 20 }}>
                  <Image style={{ width: 50, height: 50 }} source={ImagesPathVariable.GoogleIcon} />
                  <Text style={{ color: '#ffffff', fontSize: 15, marginTop: 4 }}>Google</Text>
                </View>

              </View>



            </View>



            <View style={{
              backgroundColor: "#e73140", width: '100%', height: 70, alignItems: 'center',
              justifyContent: 'center',
            }}>

              <View style={{
                flexDirection: 'row', justifyContent: 'center',
                alignItems: 'center',
              }}>

                <Text style={{ color: '#ffffff', fontSize: 18, }}>Already a member?</Text>

              
    <TouchableOpacity onPressIn={() => this.onSignupPress()}>

                  <View style={{
                    backgroundColor: '#e73140',
                    borderWidth: 1,
                    borderColor: '#fff',
                    width: 100,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    marginLeft: 10,
                    shadowColor: "#000",
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5
                  }}>
                    <Text style={{ color: '#ffffff', fontSize: 15, }}>Login</Text>
                  </View>

                </TouchableOpacity>


              </View>



            </View>

          </View>

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    // paddingLeft : 5,
  },
  splash: {
    resizeMode: 'cover',
    width: deviceDimesions.width,
    height: deviceDimesions.Height,
  },
  logo: {
    marginTop: deviceDimesions.Height * 0.02,
    marginLeft: deviceDimesions.width * 0.099,
    // resizeMode : "cover"
  }
});
