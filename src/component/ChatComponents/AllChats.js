// AllChats


import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal, TouchableOpacity} from 'react-native';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';

export class AllChats extends Component{
    render(){
        return(
            <></>
        //     <ScrollView contentContainerStyle = {styles.container}>
        //         <TouchableOpacity style={{ padding : deviceDimesions.width*0.02,width : deviceDimesions.width*0.9, alignSelf : "center", alignItems : "center", backgroundColor : "#ffffff", elevation : 4, borderRadius : 10}}>
        //             <View style={{flexDirection : "row", alignItems : "center", width : deviceDimesions.width*0.9, padding : 5}}>
        //                 <View style={{width : deviceDimesions.width*0.2}}>
        //                     <Image source={ImagesPathVariable.DummyUserSmall} style={{width : deviceDimesions.width*0.17, height : deviceDimesions.Height*0.09, resizeMode : "contain"}} />
        //                 </View>
        //                 <View style={{marginLeft : deviceDimesions.width*0.01,width : deviceDimesions.width*0.4}}>
        //                     <View style={{flexDirection : "row", alignItems : "center"}}>
        //                         <Text>ManojKumar</Text>
        //                         <Text style={{marginLeft : deviceDimesions.width*0.02, fontSize : 10, opacity : 0.8}}>20 jul 2020</Text>
        //                         <View 
        //                             style={{marginLeft : deviceDimesions.width*0.02, alignItems : "center", justifyContent : "center", borderRadius : 20, padding : 4, backgroundColor : '#ff6600'}}>
        //                             <Text style={{color : "#ffffff", fontSize : 12}}>10</Text>
        //                         </View>
        //                     </View>
        //                     <Text style={{fontSize : 10, opacity : 0.8}}>ES435AF</Text>
        //                     <Text style={{fontSize : 12}}>Hi, This is manojkumar  from chennai</Text>
        //                 </View>
        //                 <View style={{alignItems : "flex-end",width : deviceDimesions.width*0.2}}>
        //                     <Text style={{color : "#00cc00", fontSize : 10}}>Online</Text>
        //                 </View>
        //             </View>
        //         </TouchableOpacity>
        //         <TouchableOpacity style={{ padding : deviceDimesions.width*0.02,width : deviceDimesions.width*0.9, alignSelf : "center", alignItems : "center", backgroundColor : "#ffffff", elevation : 4, borderRadius : 10, marginTop : deviceDimesions.Height*0.01,}}>
        //             <View style={{flexDirection : "row", alignItems : "center", width : deviceDimesions.width*0.9, padding : 5}}>
        //                 <View style={{width : deviceDimesions.width*0.2}}>
        //                     <Image source={ImagesPathVariable.DummyUserSmall} style={{width : deviceDimesions.width*0.17, height : deviceDimesions.Height*0.09, resizeMode : "contain"}} />
        //                 </View>
        //                 <View style={{marginLeft : deviceDimesions.width*0.01,width : deviceDimesions.width*0.4}}>
        //                     <View style={{flexDirection : "row", alignItems : "center"}}>
        //                         <Text>ManojKumar</Text>
        //                         <Text style={{marginLeft : deviceDimesions.width*0.02, fontSize : 10, opacity : 0.8}}>20 jul 2020</Text>
        //                         <View 
        //                             style={{marginLeft : deviceDimesions.width*0.02, alignItems : "center", justifyContent : "center", borderRadius : 20, padding : 4, backgroundColor : '#ff6600'}}>
        //                             <Text style={{color : "#ffffff", fontSize : 12}}>10</Text>
        //                         </View>
        //                     </View>
        //                     <Text style={{fontSize : 10, opacity : 0.8}}>ES435AF</Text>
        //                     <Text style={{fontSize : 12}}>Hi, This is manojkumar  from chennai</Text>
        //                 </View>
        //                 <View style={{alignItems : "flex-end",width : deviceDimesions.width*0.2}}>
        //                     <Text style={{color : "#00cc00", fontSize : 10}}>Online</Text>
        //                 </View>
        //             </View>
        //         </TouchableOpacity>
        //         <TouchableOpacity style={{ padding : deviceDimesions.width*0.02,width : deviceDimesions.width*0.9, alignSelf : "center", alignItems : "center", backgroundColor : "#ffffff", elevation : 4, borderRadius : 10, marginTop : deviceDimesions.Height*0.01,}}>
        //             <View style={{flexDirection : "row", alignItems : "center", width : deviceDimesions.width*0.9, padding : 5}}>
        //                 <View style={{width : deviceDimesions.width*0.2}}>
        //                     <Image source={ImagesPathVariable.DummyUserSmall} style={{width : deviceDimesions.width*0.17, height : deviceDimesions.Height*0.09, resizeMode : "contain"}} />
        //                 </View>
        //                 <View style={{marginLeft : deviceDimesions.width*0.01,width : deviceDimesions.width*0.4}}>
        //                     <View style={{flexDirection : "row", alignItems : "center"}}>
        //                         <Text>ManojKumar</Text>
        //                         <Text style={{marginLeft : deviceDimesions.width*0.02, fontSize : 10, opacity : 0.8}}>20 jul 2020</Text>
        //                         <View 
        //                             style={{marginLeft : deviceDimesions.width*0.02, alignItems : "center", justifyContent : "center", borderRadius : 20, padding : 4, backgroundColor : '#ff6600'}}>
        //                             <Text style={{color : "#ffffff", fontSize : 12}}>10</Text>
        //                         </View>
        //                     </View>
        //                     <Text style={{fontSize : 10, opacity : 0.8}}>ES435AF</Text>
        //                     <Text style={{fontSize : 12}}>Hi, This is manojkumar  from chennai</Text>
        //                 </View>
        //                 <View style={{alignItems : "flex-end",width : deviceDimesions.width*0.2}}>
        //                     <Text style={{color : "#00cc00", fontSize : 10}}>Online</Text>
        //                 </View>
        //             </View>
        //         </TouchableOpacity>
        //         <TouchableOpacity style={{ padding : deviceDimesions.width*0.02,width : deviceDimesions.width*0.9, alignSelf : "center", alignItems : "center", backgroundColor : "#ffffff", elevation : 4, borderRadius : 10, marginTop : deviceDimesions.Height*0.01,}}>
        //             <View style={{flexDirection : "row", alignItems : "center", width : deviceDimesions.width*0.9, padding : 5}}>
        //                 <View style={{width : deviceDimesions.width*0.2}}>
        //                     <Image source={ImagesPathVariable.DummyUserSmall} style={{width : deviceDimesions.width*0.17, height : deviceDimesions.Height*0.09, resizeMode : "contain"}} />
        //                 </View>
        //                 <View style={{marginLeft : deviceDimesions.width*0.01,width : deviceDimesions.width*0.4}}>
        //                     <View style={{flexDirection : "row", alignItems : "center"}}>
        //                         <Text>ManojKumar</Text>
        //                         <Text style={{marginLeft : deviceDimesions.width*0.02, fontSize : 10, opacity : 0.8}}>20 jul 2020</Text>
        //                         <View 
        //                             style={{marginLeft : deviceDimesions.width*0.02, alignItems : "center", justifyContent : "center", borderRadius : 20, padding : 4, backgroundColor : '#ff6600'}}>
        //                             <Text style={{color : "#ffffff", fontSize : 12}}>10</Text>
        //                         </View>
        //                     </View>
        //                     <Text style={{fontSize : 10, opacity : 0.8}}>ES435AF</Text>
        //                     <Text style={{fontSize : 12}}>Hi, This is manojkumar  from chennai</Text>
        //                 </View>
        //                 <View style={{alignItems : "flex-end",width : deviceDimesions.width*0.2}}>
        //                     <Text style={{color : "#00cc00", fontSize : 10}}>Online</Text>
        //                 </View>
        //             </View>
        //         </TouchableOpacity>
        //         <TouchableOpacity style={{ padding : deviceDimesions.width*0.02,width : deviceDimesions.width*0.9, alignSelf : "center", alignItems : "center", backgroundColor : "#ffffff", elevation : 4, borderRadius : 10, marginTop : deviceDimesions.Height*0.01,}}>
        //             <View style={{flexDirection : "row", alignItems : "center", width : deviceDimesions.width*0.9, padding : 5}}>
        //                 <View style={{width : deviceDimesions.width*0.2}}>
        //                     <Image source={ImagesPathVariable.DummyUserSmall} style={{width : deviceDimesions.width*0.17, height : deviceDimesions.Height*0.09, resizeMode : "contain"}} />
        //                 </View>
        //                 <View style={{marginLeft : deviceDimesions.width*0.01,width : deviceDimesions.width*0.4}}>
        //                     <View style={{flexDirection : "row", alignItems : "center"}}>
        //                         <Text>ManojKumar</Text>
        //                         <Text style={{marginLeft : deviceDimesions.width*0.02, fontSize : 10, opacity : 0.8}}>20 jul 2020</Text>
        //                         <View 
        //                             style={{marginLeft : deviceDimesions.width*0.02, alignItems : "center", justifyContent : "center", borderRadius : 20, padding : 4, backgroundColor : '#ff6600'}}>
        //                             <Text style={{color : "#ffffff", fontSize : 12}}>10</Text>
        //                         </View>
        //                     </View>
        //                     <Text style={{fontSize : 10, opacity : 0.8}}>ES435AF</Text>
        //                     <Text style={{fontSize : 12}}>Hi, This is manojkumar  from chennai</Text>
        //                 </View>
        //                 <View style={{alignItems : "flex-end",width : deviceDimesions.width*0.2}}>
        //                     <Text style={{color : "#00cc00", fontSize : 10}}>Online</Text>
        //                 </View>
        //             </View>
        //         </TouchableOpacity>
        //         <TouchableOpacity style={{ padding : deviceDimesions.width*0.02,width : deviceDimesions.width*0.9, alignSelf : "center", alignItems : "center", backgroundColor : "#ffffff", elevation : 4, borderRadius : 10, marginTop : deviceDimesions.Height*0.01,}}>
        //             <View style={{flexDirection : "row", alignItems : "center", width : deviceDimesions.width*0.9, padding : 5}}>
        //                 <View style={{width : deviceDimesions.width*0.2}}>
        //                     <Image source={ImagesPathVariable.DummyUserSmall} style={{width : deviceDimesions.width*0.17, height : deviceDimesions.Height*0.09, resizeMode : "contain"}} />
        //                 </View>
        //                 <View style={{marginLeft : deviceDimesions.width*0.01,width : deviceDimesions.width*0.4}}>
        //                     <View style={{flexDirection : "row", alignItems : "center"}}>
        //                         <Text>ManojKumar</Text>
        //                         <Text style={{marginLeft : deviceDimesions.width*0.02, fontSize : 10, opacity : 0.8}}>20 jul 2020</Text>
        //                         <View 
        //                             style={{marginLeft : deviceDimesions.width*0.02, alignItems : "center", justifyContent : "center", borderRadius : 20, padding : 4, backgroundColor : '#ff6600'}}>
        //                             <Text style={{color : "#ffffff", fontSize : 12}}>10</Text>
        //                         </View>
        //                     </View>
        //                     <Text style={{fontSize : 10, opacity : 0.8}}>ES435AF</Text>
        //                     <Text style={{fontSize : 12}}>Hi, This is manojkumar  from chennai</Text>
        //                 </View>
        //                 <View style={{alignItems : "flex-end",width : deviceDimesions.width*0.2}}>
        //                     <Text style={{color : "#00cc00", fontSize : 10}}>Online</Text>
        //                 </View>
        //             </View>
        //         </TouchableOpacity>
        //         <TouchableOpacity style={{ padding : deviceDimesions.width*0.02,width : deviceDimesions.width*0.9, alignSelf : "center", alignItems : "center", backgroundColor : "#ffffff", elevation : 4, borderRadius : 10, marginTop : deviceDimesions.Height*0.01,}}>
        //             <View style={{flexDirection : "row", alignItems : "center", width : deviceDimesions.width*0.9, padding : 5}}>
        //                 <View style={{width : deviceDimesions.width*0.2}}>
        //                     <Image source={ImagesPathVariable.DummyUserSmall} style={{width : deviceDimesions.width*0.17, height : deviceDimesions.Height*0.09, resizeMode : "contain"}} />
        //                 </View>
        //                 <View style={{marginLeft : deviceDimesions.width*0.01,width : deviceDimesions.width*0.4}}>
        //                     <View style={{flexDirection : "row", alignItems : "center"}}>
        //                         <Text>ManojKumar</Text>
        //                         <Text style={{marginLeft : deviceDimesions.width*0.02, fontSize : 10, opacity : 0.8}}>20 jul 2020</Text>
        //                         <View 
        //                             style={{marginLeft : deviceDimesions.width*0.02, alignItems : "center", justifyContent : "center", borderRadius : 20, padding : 4, backgroundColor : '#ff6600'}}>
        //                             <Text style={{color : "#ffffff", fontSize : 12}}>10</Text>
        //                         </View>
        //                     </View>
        //                     <Text style={{fontSize : 10, opacity : 0.8}}>ES435AF</Text>
        //                     <Text style={{fontSize : 12}}>Hi, This is manojkumar  from chennai</Text>
        //                 </View>
        //                 <View style={{alignItems : "flex-end",width : deviceDimesions.width*0.2}}>
        //                     <Text style={{color : "#00cc00", fontSize : 10}}>Online</Text>
        //                 </View>
        //             </View>
        //         </TouchableOpacity>
           
        //     </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // paddingTop : deviceDimesions.Height*0.02,
        padding : 10,
    },
  });