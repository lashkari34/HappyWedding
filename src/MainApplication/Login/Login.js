import { H2, H3, View } from 'native-base';
import React from 'react';
import {
    StyleSheet,
    ImageBackground,
    Image,
    StatusBar,
    KeyboardAvoidingView,
    Text,
    Modal,
    BackHandler,
    Alert,
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navigate } from '../../helper/RootNavigator/RootNavigator';
import CentralizedTextInput from '../../component/CentralizedTextInput/CentralizedTextInput';
import SubmitAndNextButton from '../../component/SubmitAndNextButton/SubmitAndNextButton';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import SocialLoginButton from '../../component/SocialLoginButton/SocialLoginButton';
import { goToDrawerScreen, goToForgetPasswordScreen, goToLoginWithOTPScreen, goToProfileForSignScreen, ToggleLoader } from '../../helper/NavigationFunctions/NavigationFunctions';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';
import { LoginWithUsernamePassword } from '../../helper/API_Call/API_Call';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { Linking } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { FirebaseConfig } from '../../helper/Firebase.Config/Firebase.Config';
import { TextInput } from 'react-native';
// Import FBSDK
import {
    LoginButton,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager,
} from 'react-native-fbsdk';
// import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            LoaderProperties: {
                isLoading: false,
                LoadingTitle: ""
            },
            username: '',
            password: '',
            isPasswordVisible: true,
            isSignUpMessage: true,
            userNameInModal: '',
            deviceToken: '',
            // props.route.params.openModel
        }
    }

    backAction = () => {
        if (!this.props.navigation.isFocused()) {
            return false;
        }
        else {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        }
    };

    async componentDidMount() {
      
      

        //Check if user is already signed in
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );

        this.setState({ username: "", password: "", userNameInModal: await AsyncStorage.getItem('first_name_registration') })
        await AsyncStorage.clear()
        // this.setState({isSignUpMessage : this.props.routethis.props.route.params.openModel})
        //  ? Alert.alert("True") : Alert.alert("False")

        // messaging()
          
            .getToken()
            .then(token => {
                console.log("token is -----" + token)
                this.setState({ deviceToken: token })
            });

   

    }

    ToggleLoader(name, title) {
        this.setState({
            // LoaderProperties : {
            //     ...prevState.LoaderProperties,
            //     LoadingTitle = "Logging In",
            //     isLoading : true,
            // }
            LoaderProperties: {
                ...this.state.LoaderProperties,
                LoadingTitle: name,
                isLoading: title,
            }
        })
    }

    // Login Button Press  
    onLoginPress() {
        let reqObj = {
            username: this.state.username,
            password: this.state.password,
            device_token: this.state.deviceToken
        }

        console.log(reqObj,"reqObj------")
        if (reqObj.username && reqObj.password && reqObj.device_token) {
            this.ToggleLoader("Logging In...", true)
            LoginWithUsernamePassword(reqObj).then(async (res) => {
                let response = res
                console.log(JSON.stringify(response.data))
                if (response.data.status) {
                    console.log(response.data)
                    AsyncStorage.setItem('user_data', JSON.stringify(response.data))
                    // accessToken : AsyncStorage.getItem('access_token'),
                    // isLoggedIn : AsyncStorage.getItem('isLoggedIn')
                    AsyncStorage.setItem('access_token', response.data.auth_token);
                    AsyncStorage.setItem('isLoggedIn', 'true');
                    // goToDrawerScreen()
                    this.props.navigation.replace('MainDrawer')
                    this.ToggleLoader("", false)
                    ToastAndroid.showWithGravityAndOffset(
                        'Logged in successfully.',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }
                else {
                    this.ToggleLoader("", false)
                    ToastAndroid.showWithGravityAndOffset(
                        response.data.message,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }
            })
        }
        else {
            if (reqObj.username === "") {
                ToastAndroid.showWithGravityAndOffset(
                    'Username can not be empty.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
            else if (reqObj.password === "") {
                ToastAndroid.showWithGravityAndOffset(
                    'Password can not be empty.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
        }


        // this.ToggleLoader("Logging In...", true)
        // setTimeout(() => {
        //     goToDrawerScreen()
        //     this.ToggleLoader("Logged In...", false)
        // }, 2000);
    }

    //  Go to signup screen 
    onSignupPress() {
        // this.ToggleLoader("Loading...", true)
        // setTimeout(() => {


        goToProfileForSignScreen()
        AsyncStorage.clear();
        //     this.ToggleLoader("", false)
        // }, 100);
    }

    async onSignupContinuePress() {
        let reqObj = {
            username: await AsyncStorage.getItem('user_email'),
            password: await AsyncStorage.getItem('user_password'),
        }
        this.ToggleLoader('Loading...', true)
        this.setState({ isSignUpMessage: false })
        await LoginWithUsernamePassword(reqObj).then(async (res) => {
            let response = res
            console.log(JSON.stringify(response.data))
            if (response.data.status) {
                // console.log(response.data)
                AsyncStorage.setItem('user_data', JSON.stringify(response.data))
                // accessToken : AsyncStorage.getItem('access_token'),
                // isLoggedIn : AsyncStorage.getItem('isLoggedIn')
                AsyncStorage.setItem('access_token', response.data.auth_token);
                AsyncStorage.setItem('isLoggedIn', 'true');
                goToDrawerScreen()
                this.ToggleLoader("", false)
                ToastAndroid.showWithGravityAndOffset(
                    'Logged in successfully.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
            else {
                this.ToggleLoader("", false)
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
        }).catch(err => {
            let error = err
            console.log(JSON.stringify(error))
            this.ToggleLoader("", false)
        })

    }


    async onGoogleLoginPress() {
        // GoogleSignin.configure({
        //     scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
        //     webClientId: '1004171943941-125ggpb1t8lm8hpbm3jjf4q7fnj0cet4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        //     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        //     // hostedDomain: '', // specifies a hosted domain restriction
        //     // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        //     // accountName: '', // [Android] specifies an account name on the device that should be used
        //     // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        //     // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
        //     // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
        //     // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
        //   });
        //   try {
        //     await GoogleSignin.hasPlayServices();
        //     const userInfo = await GoogleSignin.signIn();
        //     console.log(userInfo,"userInfo")
        //     // this.setState({ userInfo });
        //   } catch (error) {
        //       console.log(error,"error")
        //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //       // user cancelled the login flow
        //     } else if (error.code === statusCodes.IN_PROGRESS) {
        //       // operation (e.g. sign in) is in progress already
        //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //       // play services not available or outdated
        //     } else {
        //       // some other error happened
        //     }
        //   }
    }

    
    async handleFacebookLogin() {

        LoginManager.logInWithPermissions(['public_profile', 'user_friends', 'email'])
            .then(function (result) {
                if (result.isCancelled) {
                    // alert('Login cancelled');
                } else {
                    AccessToken
                        .getCurrentAccessToken()
                        .then((data) => {
                            let accessToken = data.accessToken
                            // alert(accessToken.toString())
                            const responseInfoCallback = (error, result) => {
                                if (error) {
                                    console.log(error)
                                    // alert('Error fetching data: ' + error.toString());
                                } else {
                                    console.log(result)
                                    AsyncStorage.setItem('user_Social_data', (result.name))
                                    AsyncStorage.setItem('user_Social_data_email', (result.email))

                                    goToProfileForSignScreen()
                                    // alert('Success fetching data: ' + result.toString());
                                }
                            }

                            const infoRequest = new GraphRequest('/me?fields=name,email', {
                                accessToken: accessToken,
                                httpMethod: 'GET',
                                version: 'v2.5',
                                parameters: {
                                    fields: {
                                        string: 'email,name,first_name,middle_name,last_name'
                                    }
                                }
                            }, responseInfoCallback);

                            // Start the graph request.
                            new GraphRequestManager()
                                .addRequest(infoRequest)
                                .start()

                        })
                }
            }, function (error) {
                alert('Login fail with error: ' + error);
            });
    }
    getInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'email,name,first_name,middle_name,last_name',
            },
        };
        const profileRequest = new GraphRequest(
            '/me',
            { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, result) => {
                if (error) {
                    console.log('login info has error: ' + JSON.stringify(error));
                } else {
                    console.log(result)
                    // socialLoginService(result).then(res => console.log(res?.data))
                }
            },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };
    render() {
        let isSignupWelcomeModalOpen = this.props.route.params.openModel

        return (
            <ImageBackground style={styles.background} source={ImagesPathVariable.LoginBackground}>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    barStyle="dark-content"
                />
                {/* Loader */}
                <LoaderOnButtonPress showLoader={this.state.LoaderProperties.isLoading} LoadingText={this.state.LoaderProperties.LoadingTitle} />

                <KeyboardAvoidingView>
                    <ScrollView contentContainerStyle={styles.container}>
                        <View style={styles.LogoContainer}>
                            <Image source={ImagesPathVariable.LoginLogo} />
                        </View>

                        <View style={{ flexDirection: "row", flex: 1, top: deviceDimesions.Height * 0.05, justifyContent: "space-evenly" }}>
                            <SocialLoginButton
                                buttonTitle="facebook"
                                buttonIcon={<Icon name="facebook" color="#3333ff" />}
                                onButtonPress={() => this.handleFacebookLogin()}
                            // onButtonPress = {()=>console.log("sadsdsd")}
                            />
                            <SocialLoginButton
                                buttonTitle="Google"
                                buttonIcon={<Icon name="google" color="#e62e00" />}
                                onButtonPress={() => this.onGoogleLoginPress()}
                            // onButtonPress = {()=>console.log("sadsdsd")}
                            />
                        </View>
                        {/* User Name Input */}
                        <View style={{ alignItems: "center", flex: 1, top: deviceDimesions.Height * 0.05 }}>
                            <NeuBorderView
                                color="#f5f5f5"
                                width={deviceDimesions.width * 0.65}
                                height={50}
                                borderRadius={20}
                            // inset
                            // containerStyle = {{
                            //   alignItems : "center",
                            //   flexDirection : "row",
                            //   justifyContent : "space-evenly"
                            // }}
                            >
                                <TextInput keyboardType="email-address" placeholder="Email ID" value={this.state.username} style={{ fontFamily: 'roboto-Regular', width: deviceDimesions.width * 0.58 }} onChangeText={(text) => this.setState({ username: text.trimStart() })} textAlignVertical="center" />
                            </NeuBorderView>
                        </View>
                        {/* <CentralizedTextInput keyboardType = "email-address" placeholder="Email ID" value={this.state.username}  style={{ fontFamily: 'roboto-Regular', width : deviceDimesions.width*0.5}} onChangeText={(text) => this.setState({ username: text.trimStart() })} /> */}

                        {/* Password Input */}
                        <View style={{ alignItems: "center", flex: 1, top: deviceDimesions.Height * 0.05 }}>
                            <NeuBorderView
                                color="#f5f5f5"
                                width={deviceDimesions.width * 0.65}
                                height={50}
                                borderRadius={20}
                                // inset
                                containerStyle={{
                                    alignItems: "center",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly"
                                }}
                            >
                                <TextInput key='Password' placeholder="Password" value={this.state.password} secureTextEntry={this.state.isPasswordVisible} style={{ fontFamily: 'roboto-Regular', width: deviceDimesions.width * 0.5 }} onChangeText={(text) => this.setState({ password: text.trimStart() })} textAlignVertical="center" />
                                <TouchableOpacity style={{ padding: 5 }} onPress={() => this.setState({ isPasswordVisible: !this.state.isPasswordVisible })}>
                                    <Icon name={this.state.isPasswordVisible ? "eye" : "eye-slash"} size={18} />
                                </TouchableOpacity>
                            </NeuBorderView>
                        </View>
                        {/* <CentralizedTextInput key='Password' placeholder="Password" value={this.state.password} secureTextEntry={true} style={{ fontFamily: 'roboto-Regular', width : deviceDimesions.width*0.5}} onChangeText={(text) => this.setState({ password: text.trimStart() })} /> */}

                        {/* Forget Password Text with navigation */}
                        <View style={styles.forgetPasswordContainer}>
                            <TouchableOpacity onPressIn={() => goToForgetPasswordScreen()}>
                                <Text>Forgot Password</Text>
                            </TouchableOpacity>
                        </View>


                        {/* Login Button */}
                        <SubmitAndNextButton
                            buttonTitle="Login"
                            buttonIcon={<Icon name="sign-in" color="#e62e00" />}
                            // onSubmitPress = {()=>goToDrawerScreen()}
                            onSubmitPress={() => this.onLoginPress()}
                        />

                        {/* Login Button */}
                        <SubmitAndNextButton
                            buttonTitle="Login With OTP"
                            buttonIcon={<Icon name="phone" color="red" size={16} />}
                            // buttonIcon={<Image source={IconsPathVariable.LoginOTP} />}
                            onSubmitPress={() => goToLoginWithOTPScreen()}
                        />

                        <View style={styles.RegisterButtonContainer}>
                            <TouchableOpacity onPressIn={() => this.onSignupPress()}>
                                <LinearGradient
                                    colors={['#e62e00', '#e62e00', '#ff8c1a']}
                                    style={styles.linearGradient}
                                >
                                    <Text style={styles.RegisterButtonText}>Register For Free</Text>
                                    <NeuBorderView
                                        color="#f5f5f5"
                                        width={15}
                                        height={15}
                                        borderRadius={20}
                                    // inset
                                    >
                                        <LinearGradient
                                            colors={['#e62e00', '#e62e00', '#ff8c1a']}
                                            style={styles.linearGradientForIcon}
                                        >
                                            <Icon name="plus" size={16} color="#f5f5f5" />
                                        </LinearGradient>
                                    </NeuBorderView>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>


                    </ScrollView>
                </KeyboardAvoidingView>

                {/* Modal After Signup Completed */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isSignupWelcomeModalOpen && this.state.isSignUpMessage}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.contentContainer}>
                                <View style={styles.textAndLogoContainer}>
                                    <View style={{ marginTop: deviceDimesions.Height * 0.02, marginBottom: deviceDimesions.Height * 0.02 }}>
                                        <NeuView
                                            color="#f5f5f5"
                                            width={deviceDimesions.width * 0.2}
                                            height={deviceDimesions.Height * 0.1}
                                            borderRadius={40}
                                        >
                                            <Image source={IconsPathVariable.CompleteIcon} />
                                        </NeuView>
                                    </View>
                                    {/* <View style={styles.textContainer}> */}
                                    <H2>Hi {this.state.userNameInModal}</H2>
                                    <Text style={{ fontSize: 18, fontWeight: "500" }}>Welcome to Happyweddings.com</Text>
                                    <Text style={styles.smallText}>You are now a Verified Member. Let’s start Searching</Text>
                                    <Text style={styles.smallText}>for your Dream Partner</Text>
                                    {/* </View> */}
                                </View>
                                <View style={styles.contactContainer}>
                                    <View style={styles.textWithIcon}>
                                        <NeuButton
                                            color="#f5f5f5"
                                            width={deviceDimesions.width * 0.1}
                                            height={deviceDimesions.Height * 0.05}
                                            borderRadius={20}
                                            onPress={() => Linking.openURL('mailto:care@happyweddings.com')}
                                        >
                                            <Image source={IconsPathVariable.EmailIcon} />
                                        </NeuButton>
                                        <Text style={{ marginLeft: 20, fontWeight: 'bold', opacity: 0.8 }}>care@happyweddings.com</Text>
                                    </View>

                                    <View style={styles.phoneNumberContainer}>
                                        <View style={styles.textWithIcon}>
                                            <NeuButton
                                                color="#f5f5f5"
                                                width={deviceDimesions.width * 0.1}
                                                height={deviceDimesions.Height * 0.05}
                                                borderRadius={20}
                                                onPress={() => Linking.openURL(`tel:1800 1237 80036`)}
                                            >
                                                <Image source={IconsPathVariable.PhoneIcon} />
                                            </NeuButton>
                                            <Text style={{ marginLeft: 5, fontWeight: 'bold', opacity: 0.8 }}>1800 1237 80036</Text>
                                        </View>
                                        <View style={styles.textWithIcon}>
                                            <NeuButton
                                                color="#f5f5f5"
                                                width={deviceDimesions.width * 0.1}
                                                height={deviceDimesions.Height * 0.05}
                                                borderRadius={20}
                                                onPress={() => Linking.openURL('whatsapp://send?text=hello&phone=+91 8943000724')}
                                            >
                                                {/* <Image source={IconsPathVariable.PhoneIcon} /> */}
                                                <Icon name="whatsapp" color="green" size={24} />
                                            </NeuButton>
                                            <Text style={{ marginLeft: 5, fontWeight: 'bold', opacity: 0.8 }}>+91 8943000724</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                            <SubmitAndNextButton
                                buttonTitle="Continue"
                                buttonIcon={<Icon name="chevron-right" color="red" />}
                                onSubmitPress={() => this.onSignupContinuePress()}
                            />
                        </View>
                    </View>
                </Modal>
            </ImageBackground>
        );
    }
};

const styles = StyleSheet.create({
    background: {
        flex: 1
        // height : deviceDimesions.Height,
        // width : deviceDimesions.width
    },
    container: {
        //   flex : 2,
        width: deviceDimesions.width,
        //   aspectRatio : 2/2.5,
        height: deviceDimesions.Height / 1.55,
        padding: 10,
        //   backgroundColor : "blue"
    },
    LogoContainer: {
        alignItems: "center",
        flex: 1,
        top: deviceDimesions.Height * 0.02
    },
    RegisterButtonContainer: {
        alignItems: "center",
        flex: 1,
        top: deviceDimesions.Height * 0.02
    },
    linearGradient: {
        padding: 13,
        width: deviceDimesions.width * 0.6,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    RegisterButtonText: {
        color: "#f5f5f5",
        fontSize: 16,
        fontWeight: "700"
    },
    linearGradientForIcon: {
        // padding : 10,
        alignItems: "center",
        justifyContent: "center",
        width: deviceDimesions.width * 0.07,
        aspectRatio: 1,
        borderRadius: 20
    },
    forgetPasswordContainer: {
        alignItems: "center",
        flex: 1,
        top: deviceDimesions.Height * 0.05,
        opacity: 0.7
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        // marginTop: deviceDimesions.Height*0.01,
        backgroundColor: "rgba(255,255,255,0.8)",
    },
    modalView: {
        // margin: 20,
        backgroundColor: "rgba(255,255,255,1)",
        justifyContent: "center",
        borderRadius: 20,
        height: deviceDimesions.Height * 0.6,
        width: deviceDimesions.width,
        // padding: 20,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
    },
    contentContainer: {
        // justifyContent : "center",
        // alignItems : "center",
        padding: 10
        // backgroundColor : "#f5f5f5"
    },
    textAndLogoContainer: {
        alignItems: "center"
    },
    smallText: {
        opacity: 0.7,
        marginTop: deviceDimesions.Height * 0.005,
        fontSize: 14
    },
    contactContainer: {
        marginTop: deviceDimesions.Height * 0.02,
    },
    textWithIcon: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    phoneNumberContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: deviceDimesions.Height * 0.02,
        marginBottom: deviceDimesions.Height * 0.03
    },
});
