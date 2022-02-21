import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal, ImageBackground, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Bubble, Composer, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';;
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { H2 } from 'native-base';
import ImagesPathVariable from '../../../helper/ImagesPathVariable/ImagesPathVariable';
import deviceDimesions from '../../../helper/DeviceDimensions/DeviceDimensions';
import ProgressCircle from 'react-native-progress-circle';
import { goToPreviousScreen } from '../../../helper/NavigationFunctions/NavigationFunctions';
import { color } from 'react-native-reanimated';

export default class ChatMessageScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            messages: [],
            typingText: "",
            NewChatModelOpen : false
        }
    }

  UNSAFE_componentWillMount() {
    this.setState({
      messages: [
        // {
        //   _id: 1,
        //   text: 'Hello Happy Wedding User',
        //   createdAt: new Date(),
        //   user: {
        //     _id: 2,
        //     name: 'React Native',
        //     avatar: 'https://facebook.github.io/react/img/logo_og.png',
        //   },
        // },
        // {
        //     _id: 2,
        //     text: 'Hello Happy Wedding Manager',
        //     createdAt: new Date(),
        //     user: {
        //       _id: 1,
        //       name: 'React Native',
        //       avatar: 'https://facebook.github.io/react/img/logo_og.png',
        //     },
        //   },
      ],
    });
  }

//   renderCustomView(props) {
//     return (
//       <CustomView
//         {...props}
//       />
//     );
//   }

//   renderFooter(props) {
//     if (this.state.typingText) {
//       return (
//         <View style={styles.footerContainer}>
//           <Text style={styles.footerText}>
//             {this.state.typingText}
//           </Text>
//         </View>
//       );
//     }
//     return null;
//   }

  renderBubble(props) {
    return (
        <View style={{marginBottom : deviceDimesions.Height*0.02}}>
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        // backgroundColor: '#f5f5f5',
                        backgroundColor : "#f2f2f2", elevation : 4, borderRadius : 10, padding : deviceDimesions.width*0.02
                        // maxWidth : deviceDimesions.width*0.5
                        // color : "#000",
                    },
                    right: {
                        // backgroundColor: '#f5f5f5',
                        backgroundColor : "#f2f2f2", elevation : 4, borderRadius : 10, padding : deviceDimesions.width*0.02
                        // maxWidth : deviceDimesions.width*0.5
                        // color : "red",
                    }
                }}
                textStyle = {{
                    left: {
                        color : "#000",

                    },
                    right: {
                        color : "#000",
                    }
                }}
                tickStyle = {{
                    color : "rgba(0,0,0,0.7)"
                }}
                renderTime = {()=><Text style={{fontSize : 10, opacity : 0.6, margin : deviceDimesions.Height*0.01}}>{new Date().getHours()} : {new Date().getMinutes()}</Text>}

            />
        </View>
      
    );
  }

  renderInputToolbar(props){
    return(
        <InputToolbar 
            {...props}
            containerStyle={{
                backgroundColor : "#f2f2f2",
                borderTopColor : "#f5f5f5",
                borderTopWidth : 0.5,
                alignItems : "center",
                flexDirection : "row",
                justifyContent : "space-around",
                padding : 5,
                // paddingBottom : deviceDimesions.Height*0.03,
                // width : deviceDimesions.width*0.95
                alignSelf : "center",
            }}
        >
            {this.renderComposer}
            {this.renderSend}
        </InputToolbar>
    )
  }

  renderComposer(props){
      return(
        <View style={{ width : deviceDimesions.width*0.8, borderColor : "#f5f5f5", borderRadius : 15, borderWidth : 0.005, elevation : 1  }}>
              <Composer 
                {...props}
                // composerHeight: number | undefined;
                // text: string;
                // placeholderTextColor: string;
                placeholder = "Message..."
                // textInputProps: null;
                // multiline: boolean;
                // disableComposer: boolean;
                // textInputStyle = {{
                //     borderColor :"#f5f5f5",
                //     borderWidth : 0.5,
                //     borderRadius : 10,
                //     elevation : 1,
                //     width : deviceDimesions.width*0.8
                //     // maxHeight : deviceDimesions.Height*0.15,
                // }}
                // textInputAutoFocus: boolean;
                // keyboardAppearance: string;
                // onTextChanged: () => void;
                // onInputSizeChanged: () => void;
            />
        </View>
      )
  }

  renderSend(props){
      return(
        <Send
            {...props}
        >
            <NeuView
                color = "#f2f2f2"
                width = {deviceDimesions.width*0.15}
                height = {deviceDimesions.Height*0.06}
                borderRadius = {15}
                convex
            >
                <Icon name = "arrow-up" color = "orange" size={18} />
            </NeuView>
        </Send>
      )
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
        <View style={styles.container}>
            {/* <View style={{height : this.state.messages == [] ? deviceDimesions.Height*0.2 : deviceDimesions.Height*0.8, position : "absolute", bottom : 10, width : deviceDimesions.width}}> */}
              <StatusBar
                  backgroundColor = "rgba(0,0,0,0)"
                  barStyle = "dark-content"
              />

              <View style={{flexDirection:'row', justifyContent:"space-between",marginTop : 20, padding : 10, alignItems : "center", backgroundColor : 'transparent'}}>
                            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                <TouchableOpacity 
                                  style={{marginLeft : 5, marginRight : 20}} 
                                  onPress={()=>goToPreviousScreen(this)}>
                                    <Icon name="angle-left" color="black" size = {30} />
                                </TouchableOpacity>
                                <ProgressCircle
                                    percent={68}
                                    radius={30}
                                    borderWidth={5}
                                    color="#ff6f00"
                                    shadowColor="#999"
                                    bgColor="#fff"
                                >
                                    {/* <Text style={{ fontSize: 18 }}>{'30%'}</Text> */}
                                    <Image source={ImagesPathVariable.DummyUserSmall} style={{height : deviceDimesions.Height*0.05, width : deviceDimesions.width*0.08}} />
                                </ProgressCircle>
                                <View>
                                    <Text style={{marginLeft : 20, fontSize : 18, fontWeight : '600'}}>Venki</Text>
                                    <Text style={{marginLeft : 20, fontSize : 12, fontWeight : '600', color : 'green'}}>online</Text>
                                </View>
                                
                            </View>
                            
                            <View style={{flexDirection : 'row'}}>
                                <TouchableOpacity style={{padding : 5}}
                                    onPress = {()=>this.setState({NewChatModelOpen : true})}
                                >
                                    <NeuView
                                        color = '#f5f5f5'
                                        height = {40}
                                        width = {40}
                                        borderRadius = {20}
                                        convex
                                    >
                                        <Icon name="video-camera" color="orange" size={20} />
                                    </NeuView>
                                </TouchableOpacity>
                            
                                <TouchableOpacity style={{marginLeft : 20,padding : 5}}>
                                    <NeuView
                                        color = '#f5f5f5'
                                        height = {40}
                                        width = {40}
                                        borderRadius = {20}
                                        convex
                                    >
                                        <Icon name="phone" color="orange" size={20} />
                                    </NeuView>
                                </TouchableOpacity>
                            </View>
                </View>
               
               {/* {
                 this.state.messages.length <= 0 ?
                  <View style={{alignItems : "center", width : deviceDimesions.width, marginTop : deviceDimesions.Height*0.1}}>
                        <Text style={{fontSize : 20, opacity : 0.7, marginTop: deviceDimesions.Height*0.02}}>Chat To Know More</Text>
                        <Text style={{fontSize : 16, opacity : 0.7, fontWeight : "700", marginTop: deviceDimesions.Height*0.04}}>Only paid members can start the chat</Text>
                        <TouchableOpacity
                            style={{width : deviceDimesions.width*0.5, height : deviceDimesions.Height*0.06, flexDirection : "row", justifyContent : "space-evenly", alignItems : "center", marginTop : deviceDimesions.Height*0.02, backgroundColor : "#ff8c1a", borderRadius : 20}}
                        >
                            <Text style={{color : "white"}}>Upgrade Now</Text>
                            <NeuBorderView
                                height = {deviceDimesions.Height*0.04}
                                width = {deviceDimesions.width*0.07}
                                borderRadius = {20}
                                color = "#ff8c1a"
                            >
                                <Icon name="chevron-right" color = "#f5f5f5" />
                            </NeuBorderView>
                        </TouchableOpacity>
                  </View>

                  : null
               } */}
               
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    renderAvatar = {()=>null}
                    alwaysShowSend = {true}
                    // loadEarlier={this.state.loadEarlier}
                    // onLoadEarlier={this.onLoadEarlier}
                    // isLoadingEarlier={this.state.isLoadingEarlier}
            
                    user={{
                    _id: 1, // sent messages should have same user._id
                    }}
            
                    // renderActions={this.renderCustomActions}
                    renderBubble={this.renderBubble}
                    // renderCustomView={this.renderCustomView}
                    // renderFooter={this.renderFooter}
                    renderComposer = {this.renderComposer}
                    maxComposerHeight = {deviceDimesions.Height*0.15}
                    scrollToBottom = {true}
                    renderInputToolbar = {this.renderInputToolbar}
                    backgroundImage = {ImagesPathVariable.DrawerScreenBackGround}
                    renderSend = {this.renderSend}
                />
            {/* </View> */}
            <Modal  animationType="slide"
                    transparent={true}
                    visible={this.state.NewChatModelOpen}
                    onBackdropPress = {()=>this.setState({NewChatModelOpen : false})}
                    onRequestClose={()=>this.setState({NewChatModelOpen : false})}
            >
                
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{alignItems : "center"}}>
                            <Image source = {ImagesPathVariable.ChatScreenModalImage} style={{height : deviceDimesions.Height*0.15, width : deviceDimesions.width*0.7, resizeMode : "center"}} />
                            <H2 style={{marginTop : deviceDimesions.Height*0.02}}>Hi Ahana</H2>
                            <Text style={{marginTop : 10, opacity : 0.5}}>Please send interest to Venki for Video Call</Text>
                        </View>
                        
                        <View style={{marginTop : 20, flexDirection : "row", justifyContent : "space-around", width : deviceDimesions.width*0.7}}>
                            <TouchableOpacity 
                                style={{flexDirection : "row", width : deviceDimesions.width*0.3, height : deviceDimesions.Height*0.05, elavation : 5, justifyContent : "space-around", backgroundColor : '#ff8000', borderRadius : 15, padding : 10, alignItems : "center", elevation : 2}}
                                onPress={()=>this.setState({NewChatModelOpen : false})}
                            >
                                <NeuBorderView
                                    color="#ff8000"
                                    height = {deviceDimesions.Height*0.04}
                                    width = {deviceDimesions.width*0.07}
                                    borderRadius = {20}
                                >
                                    <Icon name="paper-plane" size={14} color="white" />
                                </NeuBorderView>
                                <Text style={{color : "white", marginLeft : deviceDimesions.width*0.02, fontSize : 12, fontWeight : "600"}}>Send Interest</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{flexDirection : "row", width : deviceDimesions.width*0.3, height : deviceDimesions.Height*0.05, elavation : 5, marginLeft : 10,  justifyContent : "space-around", backgroundColor : '#ffffff', borderRadius : 15, padding : 10, alignItems : "center", elevation : 2}}
                                onPress={()=>this.setState({NewChatModelOpen : false})}
                            >
                                <NeuBorderView
                                    color="#f5f5f5"
                                    height = {deviceDimesions.Height*0.04}
                                    width = {deviceDimesions.width*0.07}
                                    borderRadius = {20}
                                >
                                    <Icon name="angle-left" size={14} color="#ff8000" />
                                </NeuBorderView>
                                <Text style={{color : "#ff8000", marginLeft : deviceDimesions.width*0.02, fontSize : 12, fontWeight : "600"}}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>        
                </View>
            </Modal> 
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        // backgroundColor : "#f5f5f5"
        height : deviceDimesions.Height,
        width : deviceDimesions.width,
        paddingBottom : deviceDimesions.Height*0.015
    },
    centeredView: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
      },
      modalView: {
        // margin: 20,
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        padding : 35,
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
      modalInput : {
        marginTop : 20,
    },
})