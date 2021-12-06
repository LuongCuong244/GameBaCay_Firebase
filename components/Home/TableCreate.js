import React, { Component } from "react";
import { Modal, StyleSheet, TouchableOpacity, View, Text, TextInput, Alert } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import auth from '@react-native-firebase/auth'
import firestore from "@react-native-firebase/firestore";

export default class TableCreate extends Component {

    state = {
        tableName: '',
        tablePassword: ''
    }


    onChanText_Name(text) {
        this.setState({
            tableName: text.trim()
        })
    }

    onChanText_Password(text) {
        this.setState({
            tablePassword: text.trim()
        })
    }

    onClose() {
        this.setState({
            tableName: '',
            tablePassword: ''
        })
        this.props.setVisible(false);
    }

    onPressTableCreate = async () => {
        if (this.state.tableName == '') {
            Alert.alert('Tên bàn không hợp lệ!')
        }
        if (this.state.tableName.length > 15) {
            Alert.alert('Tên bàn chỉ tối đa 15 ký tự!')
        }
        if (this.state.tablePassword.length > 15) {
            Alert.alert('Mật khẩu chỉ tối đa 15 ký tự!')
        }
        let dataUser;
        await firestore().collection('Users').doc(auth().currentUser.uid).get()
            .then((query) => {
                dataUser = query.data();
            })

        if (!dataUser) {
            Alert.alert('Tạo bàn thất bại!');
            return;
        }

        await firestore().collection('AllTables').where('tableName', '==', this.state.tableName).get()
            .then((query) => {
                if (query.size != 0) {
                    Alert.alert('Tên bàn đã tồn tại. Chọn tên khác đi!');
                    return;
                }
                firestore().collection('AllTables').doc(this.state.tableName).set({
                    tableName: this.state.tableName,
                    tablePassword: this.state.tablePassword,
                    players: {
                        tableOwner: {
                            ...dataUser,
                            coinBet: 0, // số tiền cược
                            status: 'No', // kiểm tra xem là đang thắng hay thua, No là ko có gì cả
                            confirmBet: false,
                            cardFirst: null,
                            cardSecond: null,
                            cardThird: null,
                            flipCardFirst: false,
                            flipCardSecond: false,
                            flipCardThird: false,
                            stillInTheTable: true,
                            isWaiting: false,
                        },
                        firstSeat: null,
                        secondSeat: null,
                        thirdSeat: null,
                        fourthSeat: null,
                        fifthSeat: null,
                        sixthSeat: null,
                        seventhSeat: null,
                        eighthSeat: null,
                        ninthSeat: null,
                    },
                    numberPlayer: 1,
                    runningGame: false, // xác định game đang chạy
                    acceptBets: false, // xác định chủ bàn chấp nhận cược hay không
                    gameLoop: false, // xác định vòng lặp game,
                    confirmEndGame: false, // xác định kết thúc ván đấu
                    handleEndGame: false,
                    someoneEnteredGame: false, // xác định có người mới vô game
                    totalBet: 0, 
                }).then(() => {
                    let name = this.state.tableName;
                    this.onClose();
                    this.props.navigation.navigate('PlayGame', {
                        isTableOwner: true,
                        tableName: name,
                        dataUser: {
                            ...dataUser,
                            // coinBet: 0, // số tiền cược
                            // status: 'No', // kiểm tra xem là đang thắng hay thua, No là ko có gì cả
                            // confirmBet: false,
                            // cardFirst: null,
                            // cardTwo: null,
                            // cardThird: null,
                            // stillInTheTable: true,
                        }
                    });
                }).catch((error) => {
                    console.log(error);
                    Alert.alert('Tạo bàn thất bại!');
                })
            }).catch((error) => {
                Alert.alert('Lỗi kết nối server!');
            })
    }

    render() {
        return (
            <Modal
                transparent={true}
                animationType='fade'
                visible={this.props.isShow}
                statusBarTranslucent={true}
            >
                <View style={styles.modalContainer} >
                    <View style={styles.viewContainer} >
                        <View style={styles.viewContainerClose} >
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.setVisible(false)
                                }}
                                activeOpacity={0.7}
                            >
                                <AntDesign name='closecircle' size={45} color='red' style={{ backgroundColor: 'white', borderRadius: 50 }}></AntDesign>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.viewTextInput} >
                            <FontAwesome name='table' size={30} color='#e0bd01' style={{ padding: 5 }}></FontAwesome>
                            <View style={{ width: 1, height: '100%', backgroundColor: 'rgb(180,180,150)', marginHorizontal: 5 }} ></View>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Nhập tên bàn'
                                onChangeText={(text) => {
                                    this.onChanText_Name(text);
                                }}
                            ></TextInput>
                        </View>

                        <View style={styles.viewTextInput} >
                            <FontAwesome5 name='key' size={25} color='#e0bd01' style={{ padding: 5 }}></FontAwesome5>
                            <View style={{ width: 1, height: '100%', backgroundColor: 'rgb(180,180,150)', marginHorizontal: 5 }} ></View>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Nhập mật khẩu ( nếu có )'
                                onChangeText={(text) => {
                                    this.onChanText_Password(text);
                                }}
                            ></TextInput>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                this.onPressTableCreate();
                            }}
                            activeOpacity={0.7}
                        >
                            <View style={styles.viewButton} >
                                <Entypo
                                    name='circle-with-plus'
                                    size={25}
                                    color='rgb(255,255,255)'
                                    style={{
                                        margin: 5
                                    }}
                                ></Entypo>
                                <Text style={styles.textButton} >Tạo mới</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewContainer: {
        height: '60%',
        width: '55%',
        backgroundColor: '#e0fafb',
        borderRadius: 20,
        alignItems: 'center'
    },
    viewContainerClose: {
        width: '100%',
        alignItems: 'flex-end',
        bottom: '8%',
        left: '6%'
    },
    viewTextInput: {
        width: '80%',
        height: '18%',
        borderRadius: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        flexDirection: 'row'
    },
    textInput: {
        fontSize: 15,
        top: 2,
        fontWeight: '300',
    },
    viewButton: {
        borderRadius: 100,
        width: 125,
        height: 40,
        backgroundColor: 'rgb(0,200,0)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    textButton: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
})