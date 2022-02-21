// DateInput
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { View } from 'native-base';
import React from 'react';
import { Alert, StyleSheet, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableHighlight } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default class DateInput extends React.Component{
  render(){
      const {buttonTitle, onButtonPress, DownIcon, ButtonWidth, InputWidth, onInputChange, hideCalenderButton} = this.props
    return(
      <View style={styles.container}>
          {/* <TouchableOpacity style={{padding : 5}} onPress = {()=>onButtonPress()}> */}
              <NeuBorderView
                active
                height = {50}
                width = {ButtonWidth ? ButtonWidth : deviceDimesions.width*0.9}
                color = "#f5f5f5"
                borderRadius = {20}
                containerStyle = {{
                    flexDirection : "row",
                    justifyContent : "space-between",
                    paddingLeft : 30,
                    paddingRight : 30
                }}
              >
                <TextInputMask
                  refInput={(ref) => this.myDateText = ref}
                  type={'datetime'}
                  value = {buttonTitle}
                  placeholder = "DD-MM-YYYY"
                  maxLength = {10}
                  onChangeText = {onInputChange}
                  keyboardType = "number-pad"
                  style={{width : InputWidth ? InputWidth : deviceDimesions.width*0.7, fontStyle : 'normal'}}
                  options={{
                    format: 'DD-MM-YYYY HH:mm:ss'
                  }}
                />
                {/* <TextInput maxLength={10} placeholder = "Date Of Birth  :  DD-MM-YYYY" value = {buttonTitle} keyboardType = "number-pad" onChangeText = {onInputChange} style={{width : InputWidth ? InputWidth : deviceDimesions.width*0.7,  fontStyle : 'normal'}} /> */}
                {
                  hideCalenderButton ? 
                  null
                  :
                  <TouchableOpacity onPress={onButtonPress} style = {{padding : deviceDimesions.width*0.02, backgroundColor : "#f5f5f5", color : '#f5f5f5'}}>
                      <Icon name="calendar" color = 'red' size = {18} />
                  </TouchableOpacity>
               }
            </NeuBorderView>
          {/* </TouchableOpacity> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        // alignItems : "center",
        // flex : 1,
        marginTop : deviceDimesions.Height*0.04
    }
  });

  // Ignore Member 
	
  //   	Reject Interest
    
  //   	Accept Interest
    
  //   	You and Her API

	// Get Contact Details API

	// Get Matching Criteria Expectation
    
  //   	Get Similar Profiles

	// Send Photo Request API
    
  //   	Mailbox Interest
	
	// Get Hobbies Parameters
    
  //   	Get Interests Parameters
    
  //  	Get All Music Parameters
    
  //   	Get All Reading Parameters
    
  //   	Get Movies Parameters
    
  //   	Get Sports Parameters
    
  //   	Get Cuisine Params
    
  //   	Get Dress Params
    
  //   	Hobbies and Interests Main Labels
    
  //   	Hobbies and Interests Sub Labels
  	
	// Update Residency Info

	// Update Partner Preferance Basic
    
  //   	Update Partner Preferance Physical
    
  //   	Get All Notification
    
  //   	Get Member Details From Notification
    
  //   	Upload Identity Badge
    
  //   	Upload Education / Salary Badge
    
  //   	Upload Profile Picture Badge
    
  //   	Check Trust Badge Status
    	
	// Package List

	// Count of Members Viewed
    
  //   	Count of Pending Contacts

	// Get Disable OptionsGet Match Members Online
    
  //   	Check Interest Sent API
    
  //   	Check Shortlist Status with other member API
    
  //   	Check Contact Number Viewed
    
  //   	View Contact Number

	// Check Photo Request from Other Member

	// Update Partner Preference Professional

	// Get All Gallery Videos of Logged in Member
    
