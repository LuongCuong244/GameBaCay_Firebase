import React, { Component } from "react";
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, Text, Dimensions, Animated } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import showCard from "../../../modules/ShowCard";
import firestore from '@react-native-firebase/firestore'
import showScore from "../../../modules/ShowScore";
import formatCoinByLetter from '../../../modules/FormatCoinByLetter';

let time;
let isUseState = true;

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export default class TableOwner extends Component {

    state = {
        widthAvatarContainer: 120,
        heightAvatarContainer: 240,

        countDown: 21,
        scaleAnim: new Animated.Value(0.8),
        stopAnim: false,
    }

    componentDidMount() {
        console.log('did');
        isUseState = true;
        if(this.state.stopAnim){
            if(isUseState){
                this.setState({
                    stopAnim: false,
                })
            }
        }
        this.scaleIn();
    }

    componentWillUnmount(){
        console.log('will');
        isUseState = false;
    }

    scaleIn = () => {
        Animated.timing(this.state.scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            if(this.state.stopAnim == false){
                this.scaleOut();
            }
        });
    };

    scaleOut = () => {
        Animated.timing(this.state.scaleAnim, {
            toValue: 0.8,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            if(this.state.stopAnim == false){
                this.scaleIn();
            }
        });
    };

    clearInterval20s = () =>{
        if(isUseState){
            this.setState({
                countDown: 21,
            });
        }
        clearInterval(time);
        time = null;
    }

    countDown20s() {
        if(time != null){
            console.log("countDown20s khác null");
            return;
        }
        time = setInterval(() => {
            if (this.state.countDown == 0) {
                if(this.props.flipCardFirst == false || this.props.flipCardSecond == false || this.props.flipCardThird == false){
                    this.flipAll(this.props.tableName);
                }
                this.clearInterval20s();
            } else{
                if(isUseState){
                    this.setState({
                        countDown: this.state.countDown - 1,
                    })
                }
            }   
        }, 1000)
    }

    render() {
        return (
            <View style={{ height: 240, width: 120 }}>
                <ImageBackground
                    style={[styles.imageTableOwner,{borderWidth: this.props.currentSeat == 10 ? 1 : 0}]}
                    source={require('../../../assets/img/10.png')}
                >
                    {this.props.userID != null && (
                        <View style={styles.imageTableOwner}>

                            <View style={styles.imageAvatarContainer}
                                onLayout={even => {
                                    if(isUseState){
                                        this.setState({
                                            widthAvatarContainer: even.nativeEvent.layout.width,
                                            heightAvatarContainer: even.nativeEvent.layout.height,
                                        })
                                    }
                                }}
                            >
                                <View style={{ width: '100%', height: (this.state.heightAvatarContainer - 0.75 * this.state.widthAvatarContainer - 2) / 2, justifyContent: 'flex-end' }}>

                                    <View style={styles.containerName}>
                                        <Text style={styles.textName} >{this.props.name}</Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={{ height: 0.75 * this.state.widthAvatarContainer, width: 0.75 * this.state.widthAvatarContainer }}
                                >
                                    <Image
                                        style={{ width: 0.75 * this.state.widthAvatarContainer, height: 0.75 * this.state.widthAvatarContainer, borderRadius: 100 }}
                                        source={{ uri: this.props.avatar }}
                                    ></Image>
                                </TouchableOpacity>

                                <View style={styles.coinBet} >
                                    <MaterialIcons name='attach-money' color='#ffd700' size={20} ></MaterialIcons>
                                    <Text style={styles.textCoin} >{formatCoinByLetter(this.props.coin)}</Text>
                                </View>

                                {
                                    this.state.countDown < 21 && (
                                        <View
                                            style={[{
                                                width: this.state.widthAvatarContainer,
                                                height: this.state.widthAvatarContainer,
                                            }, styles.timeContainer]}
                                        >
                                            <Text style={styles.textTime} >{this.state.countDown}</Text>
                                        </View>
                                    )
                                }
                            </View>

                            {
                                this.props.cardFirst != null && this.props.cardSecond != null && this.props.cardThird != null && (
                                    <View style={styles.displayInformation}>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => {
                                                if (this.props.currentSeat == 10) {
                                                    firestore().collection('AllTables').doc(this.props.tableName).update({
                                                        'players.tableOwner.flipCardFirst': true,
                                                    })
                                                }
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    width: ((widthScreen - 120) / (heightScreen - 40)) > (285 / 160) ? (0.56 * (285 / 160) * (((heightScreen - 40) - 40) / 3) - 20) / 3 : (0.56 * (((widthScreen - 120) - 40) / 3) - 20) / 3, // giải thích trong phần comment ở dưới
                                                    height: (((widthScreen - 120) / (heightScreen - 40)) > (285 / 160) ? (0.56 * (285 / 160) * (((heightScreen - 40) - 40) / 3) - 20) / 3 : (0.56 * (((widthScreen - 120) - 40) / 3) - 20) / 3) * (240 / 155),
                                                    transform: [{ rotate: '270deg' }],
                                                    marginTop: '50%'
                                                }}
                                                source={showCard(this.props.flipCardFirst ? this.props.cardFirst : 'hide')}
                                            ></Image>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => {
                                                if (this.props.currentSeat == 10) {
                                                    firestore().collection('AllTables').doc(this.props.tableName).update({
                                                        'players.tableOwner.flipCardSecond': true,
                                                    })
                                                }
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    width: ((widthScreen - 120) / (heightScreen - 40)) > (285 / 160) ? (0.56 * (285 / 160) * (((heightScreen - 40) - 40) / 3) - 20) / 3 : (0.56 * (((widthScreen - 120) - 40) / 3) - 20) / 3, // giải thích trong phần comment ở dưới
                                                    height: (((widthScreen - 120) / (heightScreen - 40)) > (285 / 160) ? (0.56 * (285 / 160) * (((heightScreen - 40) - 40) / 3) - 20) / 3 : (0.56 * (((widthScreen - 120) - 40) / 3) - 20) / 3) * (240 / 155),
                                                    transform: [{ rotate: '270deg' }]
                                                }}
                                                source={showCard(this.props.flipCardSecond ? this.props.cardSecond : 'hide')}
                                            ></Image>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => {
                                                if (this.props.currentSeat == 10) {
                                                    firestore().collection('AllTables').doc(this.props.tableName).update({
                                                        'players.tableOwner.flipCardThird': true,
                                                    })
                                                }
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    width: ((widthScreen - 120) / (heightScreen - 40)) > (285 / 160) ? (0.56 * (285 / 160) * (((heightScreen - 40) - 40) / 3) - 20) / 3 : (0.56 * (((widthScreen - 120) - 40) / 3) - 20) / 3, // giải thích trong phần comment ở dưới
                                                    height: (((widthScreen - 120) / (heightScreen - 40)) > (285 / 160) ? (0.56 * (285 / 160) * (((heightScreen - 40) - 40) / 3) - 20) / 3 : (0.56 * (((widthScreen - 120) - 40) / 3) - 20) / 3) * (240 / 155),
                                                    transform: [{ rotate: '270deg' }]
                                                }}
                                                source={showCard(this.props.flipCardThird ? this.props.cardThird : 'hide')}
                                            ></Image>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        </View>
                    )}
                </ImageBackground>

                {
                    this.props.cardFirst != null && this.props.cardSecond != null && this.props.cardThird != null &&
                    this.props.flipCardFirst && this.props.flipCardSecond && this.props.flipCardThird &&
                    (
                        <View style={[styles.styleModal,{bottom: '37%',left: '10%'}]}>
                            <View>
                                <Animated.Image
                                    style={
                                        [styles.styleImageScores,
                                        {
                                            transform: [
                                                {
                                                    scale: this.state.scaleAnim
                                                }
                                            ]
                                        }]}
                                    source={showScore(
                                        parseInt(this.props.cardFirst.charAt(this.props.cardFirst.length - 1)) +
                                        parseInt(this.props.cardSecond.charAt(this.props.cardSecond.length - 1)) +
                                        parseInt(this.props.cardThird.charAt(this.props.cardThird.length - 1))
                                    )}
                                ></Animated.Image>
                            </View>
                        </View>
                    )
                }
            </View>
        )
    }

    flipAll = (tableName) =>{
        switch(this.props.currentSeat){
            case 1:{
                firestore().collection('AllTables').doc(tableName).update({
                    'players.firstSeat.flipCardFirst' : true,
                    'players.firstSeat.flipCardSecond' : true,
                    'players.firstSeat.flipCardThird' : true,
                })
                break;
            }
            case 2:{
                firestore().collection('AllTables').doc(tableName).update({
                    'players.secondSeat.flipCardFirst' : true,
                    'players.secondSeat.flipCardSecond' : true,
                    'players.secondSeat.flipCardThird' : true,
                })
                break;
            }
            case 3:{
                firestore().collection('AllTables').doc(tableName).update({
                    'players.thirdSeat.flipCardFirst' : true,
                    'players.thirdSeat.flipCardSecond' : true,
                    'players.thirdSeat.flipCardThird' : true,
                })
                break;
            }
            case 4:{
                firestore().collection('AllTables').doc(tableName).update({
                    'players.fourthSeat.flipCardFirst' : true,
                    'players.fourthSeat.flipCardSecond' : true,
                    'players.fourthSeat.flipCardThird' : true,
                })
                break;
            }
            case 5:{
                firestore().collection('AllTables').doc(tableName).update({
                    'players.fifthSeat.flipCardFirst' : true,
                    'players.fifthSeat.flipCardSecond' : true,
                    'players.fifthSeat.flipCardThird' : true,
                })
                break;
            }
            case 6:{
                firestore().collection('AllTables').doc(tableName).update({
                    'players.sixthSeat.flipCardFirst' : true,
                    'players.sixthSeat.flipCardSecond' : true,
                    'players.sixthSeat.flipCardThird' : true,
                })
                break;
            }
            case 7:{
                firestore().collection('AllTables').doc(tableName).update({
                    'players.seventhSeat.flipCardFirst' : true,
                    'players.seventhSeat.flipCardSecond' : true,
                    'players.seventhSeat.flipCardThird' : true,
                })
                break;
            }
            case 8:{
                firestore().collection('AllTables').doc(tableName).update({
                    'players.eighthSeat.flipCardFirst' : true,
                    'players.eighthSeat.flipCardSecond' : true,
                    'players.eighthSeat.flipCardThird' : true,
                })
                break;
            }
            case 9:{
                firestore().collection('AllTables').doc(tableName).update({
                    'players.ninthSeat.flipCardFirst' : true,
                    'players.ninthSeat.flipCardSecond' : true,
                    'players.ninthSeat.flipCardThird' : true,
                })
                break;
            }
            case 10:{
                firestore().collection('AllTables').doc(tableName).update({
                    'players.tableOwner.flipCardFirst' : true,
                    'players.tableOwner.flipCardSecond' : true,
                    'players.tableOwner.flipCardThird' : true,
                })
                break;
            }
        }
    }
}


// width/height = 285/160
// padding 10

// let heightChildTable;
// let widthChildTable;

// if ((widthScreen - 120) / (heightScreen - 40) > (285 / 160)) {
//     // tỷ lệ height nhỏ hơn, tính theo height
//     heightChildTable = ((heightScreen - 40) - 40) / 3;
//     widthChildTable = (285 / 160) * heightChildTable;
// } else {
//     // tỷ lệ width nhỏ hơn, tính theo width
//     widthChildTable = ((widthScreen - 120) - 40) / 3;
//     heightChildTable = (160 / 285) * widthChildTable;
// }

// Mục đích để lấy kích thước của quân bài width =( 0.66*widthChildTable - 20)/3
//                                        height = width*(240/155)



const styles = StyleSheet.create({
    imageTableOwner: {
        height: 240,
        width: 120,
        flexDirection: 'row-reverse',
        zIndex: 1,
        position: 'absolute',
        borderColor: 'yellow',
    },
    displayInformation: {
        flex: 1,
        height: '100%',
        alignItems: 'center'
    },
    imageAvatarContainer: {
        height: '100%',
        width: '45%',
        alignItems: 'center',
    },
    containerName: {
        width: '100%',
        height: 33,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 7,
    },
    textName: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        borderRadius: 100,
        fontSize: 8
    },
    coinBet: {
        width: 90,
        marginTop: 25,
        right: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 2,
    },
    textCoin: {
        fontWeight: 'bold',
        color: '#ffd700',
        textAlign: 'center',
        fontSize: 16,
        bottom: 1
    },
    timeContainer: {
        borderRadius: 200,
        backgroundColor: 'rgb(0,0,128)',
        marginRight: "90%",
        marginTop: 10,
        borderColor: 'yellow',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTime: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    styleModal: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        zIndex: 2,
        position: 'absolute',
    },
    styleImageScores: {
        width: 90,
        height: 90,
    }
})