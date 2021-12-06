import React, { Component } from "react";
import { View, 
    Dimensions, 
    ImageBackground, 
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default class SetName extends Component {

    state = {
        textName: 'Your Name',
    }

    onPressConfirm = () => {
        let nameUser = this.state.textName.trim();
        if (nameUser == 'Your Name') {
            Alert.alert("Bạn tên 'Your Name' ư. Tôi không tin. Bấm vào 'Your Name' để nhập tên của bạn!");
            return;
        }
        if (nameUser == '') {
            Alert.alert("Tên không được bỏ trống");
            return;
        }
        if (nameUser.length >= 15) {
            Alert.alert("Tên chỉ được 15 ký tự thôi, đặt gì mà dài thế");
            return;
        }
        let userID = auth().currentUser.uid;
        firestore().collection('Users').doc(`${auth().currentUser.uid}`).set({
            "userID": userID,
            "email": '',
            "password": '',
            "name": nameUser,
            "coin": 10000,
            "loginWith": this.props.route.params.loginWith,
            "diamond": 100,
            "avatar": 'https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2020/01/05/Than-bai-Chau-Nhuan-Phat-bat-ngo-vuong-scandal-danh-dap-Anh-hau-Kim-Tuong-den-muc-suyt-chet_3.jpg',
            "totalTransactionCoins": 0,
            'achievements': [],
            'unachievedAchievements': [],
        }).then(()=>{
            auth().currentUser.updateProfile({
                photoURL: 'https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2020/01/05/Than-bai-Chau-Nhuan-Phat-bat-ngo-vuong-scandal-danh-dap-Anh-hau-Kim-Tuong-den-muc-suyt-chet_3.jpg'
            })
            this.props.navigation.navigate('Home');
        }).catch((error) =>{
            Alert.alert("Đã có lỗi xảy ra!")
        })
    }

    render() {
        return (
            <View style={styles.container} >
                <ImageBackground
                    style={styles.imageBackground}
                    source={require('../assets/img/YourName.jpg')}
                >
                    <TextInput style={styles.edtText} onChangeText={(text) => this.setState({ textName: text })} >Your Name</TextInput>
                    <TouchableOpacity activeOpacity={0.7} onPress={this.onPressConfirm}>
                        <View style={styles.buttonConfirm} >
                            <Text style={styles.textConfirm} >XÁC NHẬN</Text>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBackground: {
        height: height,
        width: (2067 / 1241) * height,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    edtText: {
        width: 400,
        height: 100,
        fontSize: 55,
        color: 'rgb(255,148,0)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        textShadowColor: 'white',
        fontWeight: 'bold',
        bottom: '49%',
        left: '28%'
    },
    buttonConfirm: {
        backgroundColor: '#12d457',
        width: 160,
        height: 40,
        marginBottom: 10,
        borderRadius: 20,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 1.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        justifyContent: 'center',
        alignItems: 'center'
    },
    textConfirm: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    }
})