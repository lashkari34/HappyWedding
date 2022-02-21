/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NeuButton } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToDrawerHomeScreen, goToDrawerScreen, goToLandingScreen, goToLoginScreen, goToSplashWelcomeScreen, goToWelcomeScreen } from '../../helper/NavigationFunctions/NavigationFunctions';

const UserLoggedIn = {
  accessToken: AsyncStorage.getItem('access_token'),
  isLoggedIn: AsyncStorage.getItem('isLoggedIn'),
}
export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: ''
    }
  }
  async componentDidMount() {
    this.setState({ loggedIn: await AsyncStorage.getItem('access_token') })

    setTimeout(() => {
        // console.log(this.state.loggedIn)
        // this.props.
        this.state.loggedIn ? goToDrawerScreen() : goToSplashWelcomeScreen({openModel : false})
    }, 1000);   
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
