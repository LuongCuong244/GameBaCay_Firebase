import React, { Component } from "react";
import { Modal, StyleSheet, TouchableOpacity, View, Text, TextInput, ImageBackground } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CheckJoinGame from "../../modules/CheckJoinGame";

export default class TableShow extends Component {

    state = {
        heightViewInformation: 100,
        password: null
    }

    _onClose() {
        this.setState({
            password: null
        })
        this.props.setVisible(false);
    }

    _onChanText_Password(text) {
        this.setState({
            password: text,
        })
    }

    _onVisit() {
        // this._onClose();
        // this.props.navigation.navigate('PlayGame', {
        //     isTableOwner: false,
        //     tableName: this.props.tableItem.tableName
        // });
    }

    _onComePlay() {
        // Cần phải check trước khi chuyển màn hình
        CheckJoinGame(this,false,this.props.tableItem.tableName);
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
                                    this._onClose();
                                }}
                                activeOpacity={0.7}
                            >
                                <AntDesign name='closecircle' size={45} color='red' style={{ backgroundColor: 'white', borderRadius: 50 }}></AntDesign>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={styles.informationContainer}
                            onLayout={(even) => {
                                this.setState({
                                    heightViewInformation: even.nativeEvent.layout.height
                                });
                            }}
                        >
                            <ImageBackground
                                style={{
                                    width: this.props.tableItem.tablePassword != '' ? 0.8 * this.state.heightViewInformation : 0.6 * this.state.heightViewInformation,
                                    height: this.props.tableItem.tablePassword != '' ? 0.8 * this.state.heightViewInformation : 0.6 * this.state.heightViewInformation,
                                    marginHorizontal: 0.1 * this.state.heightViewInformation,
                                    borderRadius: this.props.tableItem.tablePassword != '' ? 0.8 * 0.25 * this.state.heightViewInformation : 0.6 * 0.25 * this.state.heightViewInformation,
                                    backgroundColor: 'yellow',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end'
                                }}
                                source={{ uri: this.props.tableItem.players.tableOwner != null ? this.props.tableItem.players.tableOwner.avatar : 'http://f/f' }}
                            >
                                <View style={styles.coinOwnerContainer} >
                                    <MaterialIcons name='attach-money' color='#ffd700' size={18} ></MaterialIcons>
                                    <Text style={styles.textCoin} >{this.props.tableItem.players.tableOwner ? this.props.tableItem.players.tableOwner.coin : 0}</Text>
                                </View>
                            </ImageBackground>

                            <View style={styles.informationTable} >
                                <View style={styles.rowInformation}>
                                    <Text style={[styles.textProperties, { color: '#ebbd05', }]}>Chủ bàn:</Text>
                                    <Text style={[styles.textProperties, { color: 'white', }]}>{this.props.tableItem.players.tableOwner ? this.props.tableItem.players.tableOwner.name : 'Không load được'}</Text>
                                </View>
                                <View style={styles.rowInformation}>
                                    <Text style={[styles.textProperties, { color: '#ebbd05', }]}>Số người chơi:</Text>
                                    <Text style={[styles.textProperties, { color: 'white', }]}>{this.props.tableItem.numberPlayer}/10</Text>
                                </View>
                                <View style={styles.rowInformation}>
                                    <Text style={[styles.textProperties, { color: '#ebbd05', }]}>Số người xem:</Text>
                                    <Text style={[styles.textProperties, { color: 'white', }]}>0</Text>
                                </View>
                                <View style={styles.rowInformation}>
                                    <Text style={[styles.textProperties, { color: '#ebbd05', }]}>Thể loại:</Text>
                                    <Text style={[styles.textProperties, { color: 'white', }]}>Chơi chương</Text>
                                </View>
                            </View>
                        </View>

                        {
                            this.props.tableItem.tablePassword != '' &&
                            (
                                <View style={styles.passwordContainer}>
                                    <Text style={styles.textPassword} >Mật khẩu:</Text>
                                    <View style={styles.viewTextInput} >
                                        <FontAwesome5 name='key' size={18} color='#e0bd01'></FontAwesome5>
                                        <View style={{ width: 1, height: '100%', backgroundColor: 'rgb(180,180,150)', marginHorizontal: 5 }} ></View>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder='Bàn này có mật khẩu'
                                            placeholderTextColor='gray'
                                            onChangeText={(text) => {
                                                this._onChanText_Password(text);
                                            }}
                                        ></TextInput>
                                    </View>
                                </View>

                            )

                        }

                        <View style={styles.buttonContainer} >
                            <TouchableOpacity
                                style={[styles.buttonStyle, { backgroundColor: 'rgb(0,255,0)' }]}
                                activeOpacity={0.7}
                                onPress={() => {
                                    this._onComePlay()
                                }}
                            >
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.textButton} >Vào chơi</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.buttonStyle, { backgroundColor: 'cyan' }]}
                                activeOpacity={0.7}
                                onPress={() => {
                                    this._onVisit()
                                }}
                            >
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.textButton} >Vào xem</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
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
        height: '70%',
        width: '55%',
        backgroundColor: '#535d69',
        borderRadius: 20,
        alignItems: 'center'
    },
    viewContainerClose: {
        width: '100%',
        alignItems: 'flex-end',
        bottom: '8%',
        left: '6%',
    },
    informationContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    coinOwnerContainer: {
        height: '25%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(49,51,108,0.5)',
        marginBottom: '25%'
    },
    textCoin: {
        fontWeight: 'bold',
        color: '#ffd700',
    },
    informationTable: {
        flex: 1,
        height: '90%',
        paddingHorizontal: 10,
        marginRight: 10,
        borderRadius: 20,
        borderColor: 'gray',
        borderWidth: 1,
    },
    rowInformation: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingLeft: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    textProperties: {
        fontWeight: 'bold',
        marginRight: 5
    },
    passwordContainer: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textPassword: {
        marginHorizontal: 10,
        color: '#eb4d4a',
        fontSize: 20,
        fontWeight: 'bold'
    },
    viewTextInput: {
        flex: 1,
        marginRight: 10,
        height: 35,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        height: 45,
        fontSize: 16,
        fontStyle: 'italic',
        color: 'white'
    },
    buttonContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        height: 30,
        width: '30%',
        marginHorizontal: '5%',
        borderRadius: 100,
    },
    textButton: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    }
})