import React, { Component, createRef } from "react";
import { Alert, Dimensions, View, BackHandler } from "react-native";
import firestore from '@react-native-firebase/firestore'
import GameContainer from "../components/PlayGame/GameContainer";
import StatusBarGame from "../components/PlayGame/StatusBarGame";

let isUseState = false;

export default class PlayGame extends Component {

    constructor(props) {
        super(props);
        this.refGameContainer = createRef();
        this.refStatusBar = createRef();
    }

    state = {
        isTableOwner: this.props.route.params.isTableOwner,
        firstSeat: null,
        secondSeat: null,
        thirdSeat: null,
        fourthSeat: null,
        fifthSeat: null,
        sixthSeat: null,
        seventhSeat: null,
        eighthSeat: null,
        ninthSeat: null,
        tableOwnerSeat: null,
        currentSeat: null,
        runningGame: false,
        tableName: this.props.route.params.tableName
    }

    leaveTable() {
        const postReference = firestore().collection('AllTables').doc(this.state.tableName);
        const batch = firestore().batch();
        isUseState = true;
        firestore().runTransaction(async transtion =>{
            const postSnapshot = await transtion.get(postReference);
            if(!postSnapshot.exists){
                throw 'Post is not exists!';
            }
            return postSnapshot;
        }).then((query) => {
                let isRuningGame = query.data().runningGame;
                if (query.data().numberPlayer == 1) {
                    batch.delete(postReference);
                } else {
                    let listPlayer = query.data().players;
                    let activePlayers = 0;
                    for (const key in listPlayer) {
                        if (listPlayer[key] != null) {
                            if (listPlayer[key].stillInTheTable) {
                                activePlayers++;
                            }
                        }
                    }
                    if (activePlayers < 2) { // vì chắc chắn có 1 người vẫn còn trong bàn là người chơi chuẩn bị rời này.
                        batch.delete(postReference);
                        console.log("Xóa bàn: ", this.props.route.params.tableName);
                        return;
                    }

                    if (isRuningGame == false && query.data().numberPlayer == 2) {
                        batch.update(postReference,{
                            gameLoop: false,
                        })
                    }

                    switch (this.state.currentSeat) {
                        case 1: {
                            if (isRuningGame && query.data().players.firstSeat.isWaiting == false && query.data().handleEndGame == false) {
                                batch.update(postReference,{
                                    'players.firstSeat.stillInTheTable': false,
                                    'players.firstSeat.flipCardFirst': true,
                                    'players.firstSeat.flipCardSecond': true,
                                    'players.firstSeat.flipCardThird': true,
                                })
                                batch.update(firestore().collection('Users').doc(this.state.firstSeat.userID),{
                                    coin: query.data().players.firstSeat.coin - query.data().players.firstSeat.coinBet
                                })
                            } else {
                                batch.update(postReference,{
                                    'players.firstSeat': null,
                                    numberPlayer: query.data().numberPlayer - 1
                                })
                            }
                            break;
                        }
                        case 2: {
                            if (isRuningGame && query.data().players.secondSeat.isWaiting == false && query.data().handleEndGame == false) {
                                batch.update(postReference,{
                                    'players.secondSeat.stillInTheTable': false,
                                    'players.secondSeat.flipCardFirst': true,
                                    'players.secondSeat.flipCardSecond': true,
                                    'players.secondSeat.flipCardThird': true,
                                })
                                batch.update(firestore().collection('Users').doc(this.state.secondSeat.userID),{
                                    coin: query.data().players.secondSeat.coin - query.data().players.secondSeat.coinBet
                                })
                            } else {
                                batch.update(postReference,{
                                    'players.secondSeat': null,
                                    numberPlayer: query.data().numberPlayer - 1
                                })
                            }
                            break;
                        }
                        case 3: {
                            if (isRuningGame && query.data().players.thirdSeat.isWaiting == false && query.data().handleEndGame == false) {
                                batch.update(postReference,{
                                    'players.thirdSeat.stillInTheTable': false,
                                    'players.thirdSeat.flipCardFirst': true,
                                    'players.thirdSeat.flipCardSecond': true,
                                    'players.thirdSeat.flipCardThird': true,
                                })
                                batch.update(firestore().collection('Users').doc(this.state.thirdSeat.userID),{
                                    coin: query.data().players.thirdSeat.coin - query.data().players.thirdSeat.coinBet
                                })
                            } else {
                                batch.update(postReference,{
                                    'players.thirdSeat': null,
                                    numberPlayer: query.data().numberPlayer - 1
                                })
                            }
                            break;
                        }
                        case 4: {
                            if (isRuningGame && query.data().players.fourthSeat.isWaiting == false && query.data().handleEndGame == false) {
                                batch.update(postReference,{
                                    'players.fourthSeat.stillInTheTable': false,
                                    'players.fourthSeat.flipCardFirst': true,
                                    'players.fourthSeat.flipCardSecond': true,
                                    'players.fourthSeat.flipCardThird': true,
                                })
                                batch.update(firestore().collection('Users').doc(this.state.fourthSeat.userID),{
                                    coin: query.data().players.fourthSeat.coin - query.data().players.fourthSeat.coinBet
                                })
                            } else {
                                batch.update(postReference,{
                                    'players.fourthSeat': null,
                                    numberPlayer: query.data().numberPlayer - 1
                                })
                            }
                            break;
                        }
                        case 5: {
                            if (isRuningGame && query.data().players.fifthSeat.isWaiting == false && query.data().handleEndGame == false) {
                                batch.update(postReference,{
                                    'players.fifthSeat.stillInTheTable': false,
                                    'players.fifthSeat.flipCardFirst': true,
                                    'players.fifthSeat.flipCardSecond': true,
                                    'players.fifthSeat.flipCardThird': true,
                                })
                                batch.update(firestore().collection('Users').doc(this.state.fifthSeat.userID),{
                                    coin: query.data().players.fifthSeat.coin - query.data().players.fifthSeat.coinBet
                                })
                            } else {
                                batch.update(postReference,{
                                    'players.fifthSeat': null,
                                    numberPlayer: query.data().numberPlayer - 1
                                })
                            }
                            break;
                        }
                        case 6: {
                            if (isRuningGame && query.data().players.sixthSeat.isWaiting == false && query.data().handleEndGame == false) {
                                batch.update(postReference,{
                                    'players.sixthSeat.stillInTheTable': false,
                                    'players.sixthSeat.flipCardFirst': true,
                                    'players.sixthSeat.flipCardSecond': true,
                                    'players.sixthSeat.flipCardThird': true,
                                })
                                batch.update(firestore().collection('Users').doc(this.state.sixthSeat.userID),{
                                    coin: query.data().players.sixthSeat.coin - query.data().players.sixthSeat.coinBet
                                })
                            } else {
                                batch.update(postReference,{
                                    'players.sixthSeat': null,
                                    numberPlayer: query.data().numberPlayer - 1
                                })
                            }
                            break;
                        }
                        case 7: {
                            if (isRuningGame && query.data().players.seventhSeat.isWaiting == false && query.data().handleEndGame == false) {
                                batch.update(postReference,{
                                    'players.seventhSeat.stillInTheTable': false,
                                    'players.seventhSeat.flipCardFirst': true,
                                    'players.seventhSeat.flipCardSecond': true,
                                    'players.seventhSeat.flipCardThird': true,
                                })
                                batch.update(firestore().collection('Users').doc(this.state.seventhSeat.userID),{
                                    coin: query.data().players.seventhSeat.coin - query.data().players.seventhSeat.coinBet
                                })
                            } else {
                                batch.update(postReference,{
                                    'players.seventhSeat': null,
                                    numberPlayer: query.data().numberPlayer - 1
                                })
                            }
                            break;
                        }
                        case 8: {
                            if (isRuningGame && query.data().players.eighthSeat.isWaiting == false && query.data().handleEndGame == false) {
                                batch.update(postReference,{
                                    'players.eighthSeat.stillInTheTable': false,
                                    'players.eighthSeat.flipCardFirst': true,
                                    'players.eighthSeat.flipCardSecond': true,
                                    'players.eighthSeat.flipCardThird': true,
                                })
                                batch.update(firestore().collection('Users').doc(this.state.eighthSeat.userID),{
                                    coin: query.data().players.eighthSeat.coin - query.data().players.eighthSeat.coinBet
                                })
                            } else {
                                batch.update(postReference,{
                                    'players.eighthSeat': null,
                                    numberPlayer: query.data().numberPlayer - 1
                                })
                            }
                            break;
                        }
                        case 9: {
                            if (isRuningGame && query.data().players.ninthSeat.isWaiting == false && query.data().handleEndGame == false) {
                                batch.update(postReference,{
                                    'players.ninthSeat.stillInTheTable': false,
                                    'players.ninthSeat.flipCardFirst': true,
                                    'players.ninthSeat.flipCardSecond': true,
                                    'players.ninthSeat.flipCardThird': true,
                                })
                                batch.update(firestore().collection('Users').doc(this.state.ninthSeat.userID),{
                                    coin: query.data().players.ninthSeat.coin - query.data().players.ninthSeat.coinBet
                                })
                            } else {
                                batch.update(postReference,{
                                    'players.ninthSeat': null,
                                    numberPlayer: query.data().numberPlayer - 1
                                })
                            }
                            break;
                        }
                        case 10: {
                            if (isRuningGame && query.data().players.tableOwner.isWaiting == false && query.data().handleEndGame == false &&
                                query.data().players.tableOwner.cardFirst != null && query.data().players.tableOwner.cardSecond != null && query.data().players.tableOwner.cardThird != null) {
                                batch.update(postReference,{
                                    'players.tableOwner.stillInTheTable': false,
                                    'players.tableOwner.flipCardFirst': true,
                                    'players.tableOwner.flipCardSecond': true,
                                    'players.tableOwner.flipCardThird': true,
                                })
                                batch.update(firestore().collection('Users').doc(this.state.tableOwnerSeat.userID),{
                                    coin: query.data().players.tableOwner.coin - query.data().totalBet,
                                })
                            } else {
                                batch.update(postReference,{
                                    'players.tableOwner': null,
                                    numberPlayer: query.data().numberPlayer - 1,
                                    runningGame: false,
                                    acceptBets: false,
                                })
                            }
                            break;
                        }
                    }
                }
                console.log("Mot nguoi choi da roi ban");
                batch.commit();
            })
        this.props.navigation.goBack();
    }

    componentDidMount() {
        isUseState = true;
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            Alert.alert("Cảnh báo", "Muốn thoát game à?", [
                {
                    text: "Oh Noooo",
                    onPress: () => null,
                    style: "cancel"
                },
                {
                    text: "Ừ", onPress: () => {
                        if(this.refGameContainer.current != null){
                            this.refGameContainer.current.deleteSnapShot();
                            console.log("Xoas SnapShot");
                        }
                        this.leaveTable();
                    }
                }
            ]);
            return true;
        });
    }

    componentWillUnmount() {
        isUseState = false;
        this.backHandler.remove();
    }

    setTableOwner(){
        if(isUseState){
            this.setState({
                currentSeat: 10,
            })
        }
    }

    loadDataFromServer() {
        firestore().collection('AllTables').doc(this.props.route.params.tableName).get()
            .then((query) => {
                let dataTable = query.data();
                if (isUseState) {
                    this.setState({
                        firstSeat: dataTable.players.firstSeat,
                        secondSeat: dataTable.players.secondSeat,
                        thirdSeat: dataTable.players.thirdSeat,
                        fourthSeat: dataTable.players.fourthSeat,
                        fifthSeat: dataTable.players.fifthSeat,
                        sixthSeat: dataTable.players.sixthSeat,
                        seventhSeat: dataTable.players.seventhSeat,
                        eighthSeat: dataTable.players.eighthSeat,
                        ninthSeat: dataTable.players.ninthSeat,
                        tableOwnerSeat: dataTable.players.tableOwner,
                        runningGame: dataTable.runningGame,
                    })
                }
                if(this.refStatusBar.current != null){
                    this.refStatusBar.current.update();
                }
            }).catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'purple' }} >
                <View style={{ width: Dimensions.get('window').width, height: 50, backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    <StatusBarGame
                        PlayGame={this}
                        {...this.state}
                        ref = {this.refStatusBar}
                    ></StatusBarGame>
                </View>
                <GameContainer
                    PlayGame={this}
                    style={{ flex: 1 }}
                    {...this.state}
                    navigation={this.props.navigation}
                    ref={this.refGameContainer}
                ></GameContainer>
            </View>
        )
    }
}