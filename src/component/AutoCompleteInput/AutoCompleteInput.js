// AutoCompleteInput
import React from 'react';
import { Keyboard } from 'react-native';
import {  View, TextInput, StyleSheet } from "react-native";
import Autocomplete from 'react-native-autocomplete-input';
import { NeuBorderView } from "react-native-neu-element"
import deviceDimesions from "../../helper/DeviceDimensions/DeviceDimensions";

export const AutoCompleteInput = ({data, value, placeHolder, onChangeText, renderOptions}) => {
    return(
        <View style={styles.container}>
            {/* <NeuBorderView
                color = "#f5f5f5"
                width = {deviceDimesions.width*0.9}
                height = {deviceDimesions.Height*0.6}
                borderRadius = {20}
                inset
            > */}
                <Autocomplete
                    data={data}
                    placeholder = {placeHolder}
                    value = {value}
                    // autoFocus
                    // defaultValue={query} 
                    onChangeText={(text)=>{onChangeText(text)}}
                    renderItem ={renderOptions}
                    style = {styles.TextInputStyle}
                    inputContainerStyle = {styles.TextInputContainerStyle}
                    defaultValue={
                        !value ? '' : value
                      }
                />
            {/* </NeuBorderView> */}
      </View>
    )
}

const styles = StyleSheet.create({
    container : {
        alignSelf : "center",
        // flex : 1,
        marginTop : deviceDimesions.Height*0.05
    },
    TextInputContainerStyle : {
        borderBottomWidth : 2,
        borderRadius : 15,
        // elevation : 1,
        borderColor : '#e6e6e6',
        padding : deviceDimesions.Height*0.01
    },
    TextInputStyle : {
        width : deviceDimesions.width*0.75,
    }
  });
