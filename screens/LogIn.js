import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
    webClientId: '1003441925950-sdaurk1h7p4pceu7qovnmkg2ht89me9u.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}

export default class LogIn extends Component {

    checkUserID(userID,loginWith) {
        firestore().collection('Users').where('userID', '==', userID).get()
            .then((querySnapshot) => {
                if (querySnapshot.size == 0) {
                    this.props.navigation.navigate('SetName',{
                        loginWith: loginWith
                    });
                }else{
                    this.props.navigation.navigate('Home');
                }

            }).catch((error) => {
                Alert.alert("Lỗi truy cập!");
            })
    }

    onPressLoginGoogle = () => {
        onGoogleButtonPress()
            .then(() => {
                this.checkUserID(auth().currentUser.uid,"Google");
            })
            .catch((error) => {
                Alert.alert("Đã có lỗi! Vui lòng thử lại sau!");
            })
    }

    onPressLoginAnonymously = () => {
        auth().signInAnonymously()
            .then(() => {
                this.checkUserID(auth().currentUser.uid,"Anonymous");
            })
            .catch(error => {
                Alert.alert("Đã có lỗi! Vui lòng thử lại sau!");
            });
    }
   
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <TouchableOpacity activeOpacity={0.5} style={{ marginBottom: 15 }} onPress={this.onPressLoginGoogle}>
                    <View style={[styles.button, { backgroundColor: 'rgb(224,73,47)' }]} >
                        <Icon name='google-' color='white' size={30} style={styles.icon} ></Icon>
                        <View style={{ height: 40, width: 1, backgroundColor: 'white', opacity: 0.8 }}></View>
                        <Text style={styles.text} >Đăng nhập bằng google</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={this.onPressLoginAnonymously} >
                    <View style={[styles.button, { backgroundColor: 'rgb(66,66,66)' }]} >
                        <Icon name='user' color='white' size={30} style={styles.icon} ></Icon>
                        <View style={{ height: 40, width: 1, backgroundColor: 'white', opacity: 0.8 }}></View>
                        <Text style={styles.text} >Đăng nhập tư cách khách</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 320,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
    },
    text: {
        fontSize: 20,
        color: 'white',
        marginHorizontal: 20
    },
    icon: {
        margin: 10
    },
})