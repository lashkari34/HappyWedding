// RangeSliderForSignup

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { View } from 'native-base';
import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { NeuBorderView, NeuView } from 'react-native-neu-element';
import RangeSlider from 'rn-range-slider';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';

export default class RangeSliderForSignup extends React.Component{
  render(){
      const {sliderTitle, minValue, maxValue, selectedValue, onChangeHandler} = this.props
    return(
      <View style={styles.container}>
            <Text style={styles.sliderTitle}>{sliderTitle}</Text>
            <RangeSlider
                style={styles.sliderMain}
                gravity={'top'}
                min={minValue}
                max={maxValue}
                rangeEnabled = {false}
                // step={20}
                selectionColor="#f618"
                blankColor="#ffe6cc"
                labelBackgroundColor = "#f5f5f5"
                labelTextColor = "#000"
                labelGapHeight = {-10}
                labelFontSize = {12}
                lineWidth = {5}
                onValueChanged = {onChangeHandler}
                // thumbColor = "#000"
                // onValueChanged={(low, high, fromUser) => {
                //     // this.setState({rangeLow: low, rangeHigh: high})
                //     console.log(low, high)
                // }}
            />
            <View style={styles.endLabelContainer}>
                <NeuView
                    color="#f5f5f5"
                    borderRadius={20}
                    width={deviceDimesions.width*0.08}
                    height={deviceDimesions.Height*0.04}
                    concave
                >
                    <Text>{selectedValue}</Text>
                </NeuView>
            </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        // alignItems : "center",
        // flex : 1,
        marginTop : deviceDimesions.Height*0.02
    },
    sliderTitle : {

    },
    sliderMain : {
        // flex : 1,
        width : deviceDimesions.width*0.82,
        height : deviceDimesions.Height*0.1
    },
    endLabelContainer : {
        // alignContent : "flex-end",
        alignItems : "flex-end",
        marginTop : -deviceDimesions.Height*0.08,
        marginLeft : deviceDimesions.width*0.005
    }
  });