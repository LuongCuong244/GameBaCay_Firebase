import React, { Component, createRef } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Animated, TouchableOpacity, Alert } from "react-native";
import FirstSeat from "./ChildContainer/FirstSeat";
import SecondSeat from "./ChildContainer/SecondSeat";
import ThirdSeat from "./ChildContainer/ThirdSeat";
import FourthSeat from "./ChildContainer/FourthSeat";
import FifthSeat from "./ChildContainer/FifthSeat";
import SixthSeat from "./ChildContainer/SixthSeat";
import SeventhSeat from "./ChildContainer/SeventhSeat";
import EighthSeat from "./ChildContainer/EighthSeat";
import NinthSeat from "./ChildContainer/NinthSeat";
import TableOwner from "./ChildContainer/TableOwner";
import firestore from "@react-native-firebase/firestore"
import formatCoin from "../../modules/FormatCoin";
import UpdateNewComers from '../../modules/UpdateNewComers'
import SnapShotDocTable from "../../modules/SnapShotDocTable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

let time;
let snapShot;
let numberOfAnim = 0;
let isUseState = true;

const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height

export default class GameContainer extends Component {

    constructor(props) {
        super(props);
        this.refTableOwner = createRef();
    }

    state = {
        // showFormNotification: 2,
        // showFormSetBet: 1,
        widthAvatarContainer: 40,
        heightAvatarContainer: 100,
        showReadyButton: 0, // 2 là show, 0 là ẩn
        showBetTotal: 0, // dành cho chủ bàn, xem có ôm cược hay là không.
        countDown: 5,
        coinBet: 1000,
        coinBetTotal: 1000,
        user: null,
        runningGame: false,

        animReady: new Animated.Value(0.9),
        animBetConfirm: new Animated.Value(-Dimensions.get('window').width * 0.8),
    }

    componentDidMount() {
        isUseState = true;

        UpdateNewComers(this); // trong này sẽ xác định user và coinBet
        
        console.log("Đắng ký SnapShot");
        snapShot = firestore().collection('AllTables').doc(this.props.PlayGame.props.route.params.tableName).onSnapshot((querySnapShot) => {
            SnapShotDocTable(querySnapShot, this);
        }, (error) => {
            console.log(error);
        })
    }

    setRunningGame(value){
        if(isUseState){
            this.setState({
                runningGame: value,
            })
        }
    }

    resetCountDown5s = () => {
        if(time){
            clearInterval(time);
            time = null;
        }
        if(isUseState){
            this.setState({
                countDown: 5,
            })
        }
        this.countDown5sNewGame();
    }
    
    countDown5sNewGame() {
        if(time != null){
            console.log("countDown5sNewGame khác null");
            return;
        }
        console.log('Start 5s sẵn sàng');
        if(isUseState){
            this.setState({
                showReadyButton: 2,
            })
        }
        time = setInterval(() => {
            if (this.state.countDown <= 0) {
                this.updateReadyToServer();
            } else {
                if(isUseState){
                    this.setState({
                        countDown: this.state.countDown - 1,
                    })
                }
            }
        }, 1000);
    }

    showTotalCoinBet(coinBetTotal) {
        this.setState({
            showBetTotal: 2,
            coinBetTotal: coinBetTotal,
        })
        this.animBetConfirmIn();
    }

    updateAcceptBetsToServer = () => {
        if(this.props.PlayGame.state.currentSeat == 10){
            console.log("acceptBets la true");
            firestore().collection('AllTables').doc(this.props.PlayGame.props.route.params.tableName).update({
                acceptBets: true,
                totalBet: this.state.coinBetTotal,
            })
        }
    }

    updateReadyToServer = () => {
        clearInterval(time);
        time = null;
        if(isUseState){
            this.setState({
                showReadyButton: 0,
                countDown: 5,
            })
        }
        console.log('CurrentSeat: ',this.props.currentSeat );
        switch (this.props.currentSeat) {
            case 1: {
                firestore().collection('AllTables').doc(this.props.tableName).update({
                    'players.firstSeat.coinBet': this.state.coinBet,
                    'players.firstSeat.confirmBet': true,
                })
                break;
            }
            case 2: {
                firestore().collection('AllTables').doc(this.props.tableName).update({
                    'players.secondSeat.coinBet': this.state.coinBet,
                    'players.secondSeat.confirmBet': true,
                })
                break;
            }
            case 3: {
                firestore().collection('AllTables').doc(this.props.tableName).update({
                    'players.thirdSeat.coinBet': this.state.coinBet,
                    'players.thirdSeat.confirmBet': true,
                })
                break;
            }
            case 4: {
                firestore().collection('AllTables').doc(this.props.tableName).update({
                    'players.fourthSeat.coinBet': this.state.coinBet,
                    'players.fourthSeat.confirmBet': true,
                })
                break;
            }
            case 5: {
                firestore().collection('AllTables').doc(this.props.tableName).update({
                    'players.fifthSeat.coinBet': this.state.coinBet,
                    'players.fifthSeat.confirmBet': true,
                })
                break;
            }
            case 6: {
                firestore().collection('AllTables').doc(this.props.tableName).update({
                    'players.sixthSeat.coinBet': this.state.coinBet,
                    'players.sixthSeat.confirmBet': true,
                })
                break;
            }
            case 7: {
                firestore().collection('AllTables').doc(this.props.tableName).update({
                    'players.seventhSeat.coinBet': this.state.coinBet,
                    'players.seventhSeat.confirmBet': true,
                })
                break;
            }
            case 8: {
                firestore().collection('AllTables').doc(this.props.tableName).update({
                    'players.eighthSeat.coinBet': this.state.coinBet,
                    'players.eighthSeat.confirmBet': true,
                })
                break;
            }
            case 9: {
                firestore().collection('AllTables').doc(this.props.tableName).update({
                    'players.ninthSeat.coinBet': this.state.coinBet,
                    'players.ninthSeat.confirmBet': true,
                })
                break;
            }
            case 10: {
                firestore().collection('AllTables').doc(this.props.tableName).update({
                    'players.tableOwner.coinBet': this.state.coinBet,
                    'players.tableOwner.confirmBet': true,
                })
                break;
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                {
                    this.state.user && (
                        <View style={{ flex: 1 }} >
                            <ImageBackground style={styles.container}>
                                <View style={styles.imageGuestContainer}>
                                    <View style={styles.viewChildTable} >
                                        <View style={styles.rowContainer} >
                                            <FirstSeat {...this.props.firstSeat} runningGame = {this.state.runningGame} currentSeat = {this.props.currentSeat} tableName = {this.props.tableName}></FirstSeat>
                                            <SecondSeat {...this.props.secondSeat} runningGame = {this.state.runningGame} currentSeat = {this.props.currentSeat} tableName = {this.props.tableName}></SecondSeat>
                                            <ThirdSeat {...this.props.thirdSeat} runningGame = {this.state.runningGame} currentSeat = {this.props.currentSeat} tableName = {this.props.tableName}></ThirdSeat>
                                        </View>

                                        <View style={styles.rowContainer} >
                                            <FourthSeat {...this.props.fourthSeat} runningGame = {this.state.runningGame} currentSeat = {this.props.currentSeat} tableName = {this.props.tableName}></FourthSeat>
                                            <FifthSeat {...this.props.fifthSeat} runningGame = {this.state.runningGame} currentSeat = {this.props.currentSeat} tableName = {this.props.tableName}></FifthSeat>
                                            <SixthSeat {...this.props.sixthSeat} runningGame = {this.state.runningGame} currentSeat = {this.props.currentSeat} tableName = {this.props.tableName}></SixthSeat>
                                        </View>

                                        <View style={styles.rowContainer} >
                                            <SeventhSeat {...this.props.seventhSeat} runningGame = {this.state.runningGame} currentSeat = {this.props.currentSeat} tableName = {this.props.tableName}></SeventhSeat>
                                            <EighthSeat {...this.props.eighthSeat} runningGame = {this.state.runningGame} currentSeat = {this.props.currentSeat} tableName = {this.props.tableName}></EighthSeat>
                                            <NinthSeat {...this.props.ninthSeat} runningGame = {this.state.runningGame} currentSeat = {this.props.currentSeat} tableName = {this.props.tableName}></NinthSeat>
                                        </View>
                                    </View>
                                </View>
                                <TableOwner
                                    ref={this.refTableOwner}
                                    {...this.props.tableOwnerSeat}
                                    currentSeat = {this.props.currentSeat}
                                    tableName = {this.props.tableName}
                                    runningGame = {this.state.runningGame}
                                ></TableOwner>
                            </ImageBackground>

                            <View
                                style={{
                                    flex: 1,
                                    zIndex: this.state.showReadyButton,
                                    position: 'absolute',
                                }}
                            >
                                <View style={[styles.containerModal, { backgroundColor: 'rgba(0,0,0,0)', justifyContent: 'center', padding: 10, alignItems: 'center' }]} >
                                    <View style={[styles.viewTime, { bottom: 50, width: 70, height: 70 }]}>
                                        <Text style={styles.textTime} >{this.state.countDown}</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={{ width: 150, height: 50, bottom: 30 }}
                                        activeOpacity={0.7}
                                        onPress={() => {
                                            this.updateReadyToServer();
                                        }}
                                    >
                                        <Animated.View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', elevation: 10, borderRadius: 100, transform: [{ scale: this.state.animReady }] }}>
                                            <Text style={{ textAlign: 'center', fontSize: 21, fontWeight: 'bold', color: 'white' }} >Sẵn sàng</Text>
                                        </Animated.View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    zIndex: this.state.showBetTotal,
                                    position: 'absolute',
                                }}
                            >
                                <View style={{width: widthScreen,height: heightScreen,backgroundColor: 'rgba(0,0,0,0)'}}>
                                    <Animated.View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transform: [{
                                            translateY: this.state.animBetConfirm
                                        }]
                                    }}>
                                        <View
                                            style = {{width: '100%',height: 55,bottom: '5%',justifyContent: 'center',alignItems: 'center',flexDirection: 'row',backgroundColor: 'rgba(0,0,0,0.7)'}}
                                        >
                                            <Text style={{ textAlign: 'center',fontStyle: 'italic', color: 'white', fontSize: 22,right: '50%' }} >Tổng cược: </Text>
                                            <Text style={{ textAlign: 'center',fontWeight: 'bold', color: '#ffd700', fontSize: 37 }} >{formatCoin(this.state.coinBetTotal)}</Text>
                                            <MaterialIcons name='attach-money' color='#ffd700' size={40} ></MaterialIcons>
                                        </View>
                                        {/* <View style={styles.viewTime}>
                                            <Text style={styles.textTime} >{this.state.countDown10s}</Text>
                                        </View> */}

                                        {/* <View style={{ width: '55%', height: '60%', borderRadius: 20, marginTop: 10, backgroundColor: 'white', alignItems: 'center' }} >
                                            <View style={{ width: '100%', height: '20%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'tomato', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} >
                                                <Text style={{ fontWeight: 'bold', color: 'white' }} >XÁC NHẬN ÔM CƯỢC</Text>
                                            </View>
                                            <Text style={{ width: '100%', height: '10%', color: 'black', textAlign: 'center', fontWeight: 'bold', fontStyle: 'italic', margin: 10 }} >Tổng tiền cược ván này</Text>
                                            <View style={{ width: '100%', height: '20%', backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ textAlign: 'center', color: '#ffd700', fontSize: 22 }} >{formatCoin(this.state.coinBetTotal)}</Text>
                                            </View>

                                            <TouchableOpacity
                                                style={{ flex: 1, width: '80%', padding: 5 }}
                                                activeOpacity={0.7}
                                                onPress={() => {

                                                }}
                                            >
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', borderRadius: 100 }}>
                                                    <Text style={{ fontStyle: 'italic', color: 'white', }}>Rời bàn và mất đi 10% tiền cược</Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={{ flex: 1, width: '80%', padding: 5 }}
                                                activeOpacity={0.7}
                                                onPress={() => {
                                                    this.updateAcceptBetsToServer();
                                                }}
                                            >
                                                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'green', alignItems: 'center', borderRadius: 100 }}>
                                                    <Text style={{ fontStyle: 'italic', color: 'white', }}>Ôm và bắt đầu ván đấu</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View> */}
                                    </Animated.View>
                                </View>
                            </View>

                        </View>
                    )
                }
            </View>
        )
    }

    deleteSnapShot(){
        snapShot();
    }

    componentWillUnmount(){
        isUseState = false;
        snapShot();
    }

    animReadyIn = () => {
        Animated.timing(this.state.animReady, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.animReadyOut();
        })
    }

    animReadyOut = () => {
        Animated.timing(this.state.animReady, {
            toValue: 0.9,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            if (numberOfAnim > 7) {
                numberOfAnim = 0;
            } else {
                numberOfAnim++;
                this.animReadyIn();
            }
        })
    }

    animBetConfirmIn = () => {
        Animated.timing(this.state.animBetConfirm, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(()=>{
            setTimeout(()=>{
                this.animBetConfirmOut();
                this.updateAcceptBetsToServer();
            },1000);
        });
    }

    animBetConfirmOut = () => {
        Animated.timing(this.state.animBetConfirm, {
            toValue: Dimensions.get('window').width * 0.8,
            duration: 500,
            useNativeDriver: true
        }).start(()=>{
            if(isUseState){
                this.setState({
                    showBetTotal: 0,
                    coinBetTotal: 0,
                })
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'purple',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
    },
    imageGuestContainer: {
        backgroundColor: 'purple',
        height: '100%',
        flex: 1
    },
    viewChildTable: {
        width: '100%',
        height: '100%'
    },
    rowContainer: {
        width: '100%',
        height: '33.333333%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageTableOwner: {
        height: 240,
        width: 120,
    },
    containerModal: {
        width: widthScreen,
        height: heightScreen,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    viewTime: {
        borderRadius: 100,
        width: 50,
        height: 50,
        borderColor: 'white',
        borderWidth: 4,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTime: {
        textAlign: 'center',
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold'
    },
    stackView: {
        width: '60%',
        height: '60%',
        borderRadius: 20,
        backgroundColor: 'white',
        marginTop: 10,
    },
    styleContainerView: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        backgroundColor: 'white',
        position: 'absolute'
    },
})