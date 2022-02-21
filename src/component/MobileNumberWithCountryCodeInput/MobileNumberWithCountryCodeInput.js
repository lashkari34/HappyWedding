// MobileNumberWithCountryCodeInput

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { View } from 'native-base';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { NeuBorderView, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
// import CountryCodeArr from '../../helper/CountryCodeJSON/CountryCodeJSON';
// import SearchableDropdown from 'react-native-searchable-dropdown';
// import { SafeAreaView } from 'react-native';
import RNPicker from "rn-modal-picker";

export default class MobileNumberWithCountryCodeInput extends React.Component{
  render(){
      const {placeholderText, CountryCodeArr, mobileNumber, mobileNumberChangeHandler, selectedCountryCode, onCountryCodeChange, onBlur } = this.props
    return(
      <View style={styles.container}>
        {/* <SafeAreaView>
        <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          //On text change listner on the searchable input
          onItemSelect={(item) => console.log(item)}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: deviceDimesions.Height*0.3,
          }}
          items={CountryCodeArr}
          //mapping of item array
          defaultIndex={2}
          //default selected item index
          placeholder="placeholder"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
            </SafeAreaView> */}
          <NeuBorderView
            color = "#f5f5f5"
            width = {deviceDimesions.width*0.9}
            height = {50}
            borderRadius = {20}
            inset
            containerStyle = {{
                flexDirection : "row",
                justifyContent : "space-around",
                paddingLeft : 10,
                alignItems : 'center'
            }}
          >
            <View style={{alignSelf : 'center', paddingTop : deviceDimesions.Height*0.01}}>
                <RNPicker
                    dataSource={CountryCodeArr}
                    dummyDataSource={CountryCodeArr}
                    defaultValue={selectedCountryCode}
                    pickerTitle={"Select Country"}
                    showSearchBar={true}
                    disablePicker={false}
                    changeAnimation={"none"}
                    searchBarPlaceHolder={"Search....."}
                    showPickerTitle={true}
                    // searchBarContainerStyle={{width : deviceDimesions.width*0.2}}
                    pickerStyle={{width : deviceDimesions.width*0.2}}
                    // itemSeparatorStyle={Styles.itemSeparatorStyle}
                    // pickerItemTextStyle={Styles.listTextViewStyle}
                    selectedLabel={selectedCountryCode}
                    placeHolderLabel={selectedCountryCode}
                    selectLabelTextStyle={{width : deviceDimesions.width*0.2, alignSelf : 'center', justifyContent : 'center'}}
                    // placeHolderTextStyle={Styles.placeHolderTextStyle}
                    // dropDownImageStyle={Styles.dropDownImageStyle}
                    dropDownImage={()=>null}
                    selectedValue={onCountryCodeChange}
                />
            </View>
              
                {/* <Picker
                    selectedValue={selectedCountryCode}
                    style={{width: deviceDimesions.width*0.3}}
                    onValueChange={onCountryCodeChange}
                    itemStyle = {{
                      backgroundColor : "#ff6600",
                      flexDirection : 'row',
                      justifyContent : 'space-around'
                    }}
                    >
                      <Picker.Item label="Country Code" value={null} />
                    {
                      CountryCodeArr.map((el,i)=>{
                        return <Picker.Item label={el.code + "   " + el.name} value={el.code} />
                      })
                    }
                </Picker> */}
                <TextInput keyboardType="phone-pad" style={{width : deviceDimesions.width*0.6, textAlign : "left", borderLeftWidth : 0.2, paddingHorizontal : deviceDimesions.width*0.05,  fontStyle : 'normal'}} maxLength = {12} placeholder={placeholderText} value={mobileNumber} onChangeText={mobileNumberChangeHandler} onBlur = {onBlur} />
          </NeuBorderView>
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