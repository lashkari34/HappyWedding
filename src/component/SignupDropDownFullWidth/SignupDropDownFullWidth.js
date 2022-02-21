// SignupDropDownFullWidth

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { View } from 'native-base';
import React from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, Text } from 'react-native';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import {Picker} from '@react-native-picker/picker';
import RNModalPicker from 'rn-modal-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Modal } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Pressable } from 'react-native';

class SignupDropDownFullWidth extends React.Component{
  render(){
      const {selectedPickerValue, pickerDataArr, onChangeHandler, staticLable, renderPickerOption, containerWidth, pickerWidth } = this.props
    return(
      <View style={styles.container}>
         <NeuBorderView
            color = "#f5f5f5"
            width = {containerWidth ? containerWidth : deviceDimesions.width*0.9}
            height = {50}
            borderRadius = {20}
            inset
         >
             <Picker
                selectedValue={selectedPickerValue}
                style={{width: pickerWidth ? pickerWidth : deviceDimesions.width*0.8}}
                // onValueChange={(itemValue, itemIndex) =>
                //     this.setState({language: itemValue})
                // }
                onValueChange = {onChangeHandler}
            >
              <Picker.Item label = {staticLable} value = {null} />
                {renderPickerOption()}
             </Picker>
         </NeuBorderView>
      </View>
    )
  }
}

class SignupDropDownFullWidthWithSearch extends React.Component{
    // constructor(props){
    //   super(props)
    //   this.state = {
    //     showPickerModal : false,
    //     InputValue : "",
    //     FilterData : [],
    //     AllArrData : [],
    //   }
    // }
    // componentDidMount(){
    //   console.log(this.props)
    //   this.setState({AllArrData : this.props.pickerDataArr, FilterData : this.props.pickerDataArr})
    // }

    // onInputChange(text){
    //   this.setState({InputValue : text})
    //   if(text !== ""){
    //     let ModifiedData = [];
    //     for(var i = 0; i < this.state.AllArrData.length; i++){
    //       if(this.state.AllArrData[i].name.toLowerCase().includes(text.toLowerCase())){
    //         ModifiedData.push(this.state.AllArrData[i])
    //       }
    //     }
    //     // setFilterData(ModifiedData)
    //     this.setState({FilterData : ModifiedData})
    //   }
    //   else{
    //     // setFilterData(AllArrData);
    //     this.setState({FilterData : this.state.AllArrData})
    //   }
    // }
  render(){
      const {selectedPickerValue, pickerDataArr, onChangeHandler, staticLable, renderPickerOption, containerWidth, pickerWidth, itemSeparatorStyle, customItemSeparatorHeight,  ShowIcon } = this.props
    return(
      <View style={styles.container}>
         <NeuBorderView
            color = "#f5f5f5"
            width = {containerWidth ? containerWidth : deviceDimesions.width*0.93}
            height = {53}
            borderRadius = {20}
            inset
            containerStyle = {
              ShowIcon ?
              {
                width : containerWidth ? containerWidth : deviceDimesions.width*0.9,
                flexDirection : 'row',
                justifyContent : 'space-evenly'
            }
            :null
          }
         >
           {/* <TouchableHighlight underlayColor = "none" onPress = {()=>this.setState({showPickerModal : true})} style={{width : containerWidth ? containerWidth*0.7 : deviceDimesions.width*0.75, padding : 10}}>
              <Text>{selectedPickerValue}</Text>
           </TouchableHighlight>
           
           <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.showPickerModal}
              onBackdropPress = {()=>{this.setState({ showPickerModal: !this.state.showPickerModal }) }}
              onRequestClose={() => { this.setState({ showPickerModal: !this.state.showPickerModal }) }}
           >
             <View style={styles.centeredView}>
               <View style={styles.modalView}>
                 <View style={{alignSelf : 'center', padding : deviceDimesions.Height*0.01}}>
                    <Text>{staticLable ? staticLable : ""}</Text>
                 </View>
                  
                  <TextInput placeholder = "Search" onChangeText = {(text)=>this.onInputChange(text)} value = {this.state.InputValue} style = {{padding : 20}} />
                  <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    keyboardShouldPersistTaps = "always"
                    style={{marginBottom : 50}}>
                      {
                        this.state.FilterData ? 
                        this.state.FilterData.map((el,i)=>{
                          return(
                            <Pressable underlayColor = "none" style={{borderTopWidth : 0.1, padding : 20, marginBottom : this.state.FilterData.length == i+1 ? 40 : 0}} onPress = {()=>{this.setState({showPickerModal : false});onChangeHandler(i,el)}} key = {i}>
                                <Text>{el.name}</Text>
                            </Pressable>
                          )
                        })
                        :
                        this.state.AllArrData ? this.state.AllArrData.map((el,i)=>{
                          return(
                            <Pressable underlayColor = "none" style={{borderTopWidth : 0.1, padding : 20, marginBottom : this.state.AllArrData.length == i+1 ? 40 : 0}} onPress = {()=>{this.setState({showPickerModal : false});onChangeHandler(i,el)}} key = {i}>
                                <Text>{el.name}</Text>
                            </Pressable>
                          )
                        })
                        :null
                      }
              </ScrollView>
               </View>
             </View>
             
           </Modal>
                 */}
                <RNModalPicker
                    // keyboardShouldPersistTaps='always'
                    dataSource={pickerDataArr}
                    dummyDataSource={pickerDataArr}
                    defaultValue={staticLable}
                    pickerTitle={staticLable}
                    showSearchBar={true}
                    disablePicker={false}
                    changeAnimation={"none"}
                    searchBarPlaceHolder={staticLable + "..."}
                    showPickerTitle={true}
                    placeHolderText = {staticLable}
                    // searchBarContainerStyle={{width : deviceDimesions.width*0.75}}
                    pickerStyle={{width : pickerWidth ? pickerWidth : ShowIcon ? deviceDimesions.width*0.6 : deviceDimesions.width*0.8,}}
                    itemSeparatorStyle={itemSeparatorStyle ? customItemSeparatorHeight ? {height : customItemSeparatorHeight} : {height : deviceDimesions.Height*0.05} : {}}
                    // pickerItemTextStyle={{height : deviceDimesions.Height*0.05}}
                    selectedLabel={selectedPickerValue}
                    placeHolderLabel={staticLable}
                    // selectLabelTextStyle={{width : deviceDimesions.width*0.75, alignSelf : 'center', justifyContent : 'center', marginTop : deviceDimesions.Height*0.01}}
                    // placeHolderTextStyle={Styles.placeHolderTextStyle}
                    // dropDownImageStyle={{backgroundColor : 'red'}}
                    dropDownImage={()=>null}
                    selectedValue={onChangeHandler}
                />






                
             {/* <Picker
                selectedValue={selectedPickerValue}
                style={{width: pickerWidth ? pickerWidth : deviceDimesions.width*0.8}}
                // onValueChange={(itemValue, itemIndex) =>
                //     this.setState({language: itemValue})
                // }
                onValueChange = {onChangeHandler}
            >
              <Picker.Item label = {staticLable} value = {null} />
                {renderPickerOption()}

             </Picker> */}
             {
               ShowIcon ? <Icon name="chevron-down" color="#999999" /> : null
             }
             
         </NeuBorderView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        alignItems : "center",
        // flex : 1,
        marginTop : deviceDimesions.Height*0.05
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // marginTop: 22,
      backgroundColor : 'rgba(255,255,255,0.5)'
  },
  modalView: {
      // margin: 20,
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
      height : deviceDimesions.Height*0.7,
      width : deviceDimesions.width*0.9,
      padding : 10,
      // alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
  },
  });

  export {SignupDropDownFullWidth, SignupDropDownFullWidthWithSearch}