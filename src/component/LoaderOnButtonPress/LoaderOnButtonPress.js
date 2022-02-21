// LoaderOnButtonPress

import { View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import AnimatedLoader from "react-native-animated-loader";

export default class LoaderOnButtonPress extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // showLoader : true,
        }
    }
    render(){
        const {showLoader, LoadingText} = this.props
        return(
            <AnimatedLoader
                visible={showLoader}
                overlayColor="rgba(0,0,0,0.8)"
                source={require("./loader.json")}
                animationStyle={styles.lottie}
                speed={1}
            >
            </AnimatedLoader>
            // <Spinner
            //     visible = {showLoader}
            //     animation = "fade"
            //     color = "#00cc00"
            //     // textContent = {LoadingText}
            //     // textStyle = {{
            //     //     color : "#ff6600",
            //     // }}
            //     // children = {<Text>Logging In</Text>}
            // />
        )
    }
}

const styles = StyleSheet.create({
    lottie: {
      width: deviceDimesions.width*0.7,
      height: deviceDimesions.Height*0.4
    }
  });