import React, { Component } from "react";
import { View, Dimensions, StyleSheet, ImageBackground, Text, TouchableOpacity, Image, Animated } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import showCard from "../../../modules/ShowCard";
import formatCoinByLetter from "../../../modules/FormatCoinByLetter";
import firestore from '@react-native-firebase/firestore';
import showScore from "../../../modules/ShowScore";

export default class SeventhSeat extends Component {

    state = {
        widthAvatarContainer: 40,
        heightAvatarContainer: 100,
        widthCardContainer: 50,
        scaleAnim: new Animated.Value(0.8),
        stopAnimation: false,
    }

    componentDidMount() {
        this.scaleIn();
    }

    scaleIn = () => {
        Animated.timing(this.state.scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            if (this.state.stopAnimation === false) {
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
            if (this.state.stopAnimation === false) {
                this.scaleIn();
            }
        });
    };
    render() {
        return (
            <View>
                <ImageBackground
                    style={[styles.imageChildTable, { marginHorizontal: 5, borderWidth: this.props.currentSeat == 7 ? 1 : 0 }]}
                    source={require('../../../assets/img/7.png')}
                >
                    {this.props.userID != null && (
                        <View style={{ flex: 1, flexDirection: 'row' }}
                        >
                            <View
                                style={styles.displayAvatar}
                                onLayout={even => {
                                    this.setState({
                                        widthAvatarContainer: even.nativeEvent.layout.width,
                                        heightAvatarContainer: even.nativeEvent.layout.height,
                                    })
                                }}
                            >
                                <View style={[styles.containerName, { height: (this.state.heightAvatarContainer - 0.55 * this.state.widthAvatarContainer) / 2 }]}>
                                    <Text style={styles.textName} >{this.props.name}</Text>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={{ height: 0.55 * this.state.widthAvatarContainer, width: 0.55 * this.state.widthAvatarContainer, marginRight: "8%", borderRadius: 5 }}
                                >
                                    <Image
                                        style={{ width: '100%', height: '100%', borderRadius: 100 }}
                                        source={{ uri: this.props.avatar }}
                                    ></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.displayInformation}
                                onLayout={(even) => {
                                    this.setState({
                                        widthCardContainer: even.nativeEvent.layout.width
                                    })
                                }}
                            >
                                <View style={styles.coinBetContainer} >
                                    <View style={styles.coinBet} >
                                        <MaterialIcons name='attach-money' color='#ffd700' size={15} ></MaterialIcons>
                                        <Text style={styles.textCoin} >{formatCoinByLetter(this.props.coinBet)}</Text>
                                    </View>
                                </View>
                                {
                                    this.props.cardFirst != null && this.props.cardSecond != null && this.props.cardThird != null && (
                                        <View style={styles.containerCard}>
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                style={{ flex: 1, alignItems: 'center' }}
                                                onPress={() => {
                                                    if (this.props.currentSeat == 7) {
                                                        firestore().collection('AllTables').doc(this.props.tableName).update({
                                                            'players.seventhSeat.flipCardFirst': true,
                                                        })
                                                    }
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        width: (this.state.widthCardContainer - 20) / 3,
                                                        height: ((this.state.widthCardContainer - 20) / 3) * (240 / 155),
                                                        borderRadius: 1
                                                    }}
                                                    source={showCard(this.props.flipCardFirst ? this.props.cardFirst : 'hide')}
                                                ></Image>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                style={{ flex: 1, marginLeft: 2.5 }}
                                                onPress={() => {
                                                    if (this.props.currentSeat == 7) {
                                                        firestore().collection('AllTables').doc(this.props.tableName).update({
                                                            'players.seventhSeat.flipCardSecond': true,
                                                        })
                                                    }
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        width: (this.state.widthCardContainer - 20) / 3,
                                                        height: ((this.state.widthCardContainer - 20) / 3) * (240 / 155),
                                                        borderRadius: 1
                                                    }}
                                                    source={showCard(this.props.flipCardSecond ? this.props.cardSecond : 'hide')}
                                                ></Image>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                style={{ flex: 1 }}
                                                onPress={() => {
                                                    if (this.props.currentSeat == 7) {
                                                        firestore().collection('AllTables').doc(this.props.tableName).update({
                                                            'players.seventhSeat.flipCardThird': true,
                                                        })
                                                    }
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        width: (this.state.widthCardContainer - 20) / 3,
                                                        height: ((this.state.widthCardContainer - 20) / 3) * (240 / 155),
                                                        borderRadius: 1
                                                    }}
                                                    source={showCard(this.props.flipCardThird ? this.props.cardThird : 'hide')}
                                                ></Image>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    )}
                </ImageBackground>
                {
                    this.props.status == 'Win' && this.props.runningGame == false &&
                    (
                        <View style={[styles.styleModal, { left: '7%' }]}>
                            <View>
                                <Animated.Image
                                    style={
                                        [styles.imageStatusWin,
                                        {
                                            transform: [
                                                {
                                                    scale: this.state.scaleAnim
                                                }
                                            ]
                                        }]}
                                    source={require('../../../assets/img/win.png')}
                                ></Animated.Image>
                            </View>
                        </View>
                    )
                }

                {
                    this.props.status == 'Lost' && this.props.runningGame == false &&
                    (
                        <View style={[styles.styleModal, { left: '11%' }]}>
                            <View>
                                <Animated.Image
                                    style={
                                        [styles.imageStatusLost,
                                        {
                                            transform: [
                                                {
                                                    scale: this.state.scaleAnim
                                                }
                                            ]
                                        }]}
                                    source={require('../../../assets/img/lost.png')}
                                ></Animated.Image>
                            </View>
                        </View>
                    )
                }

                {
                    this.props.cardFirst != null && this.props.cardSecond != null && this.props.cardThird != null &&
                    this.props.flipCardFirst && this.props.flipCardSecond && this.props.flipCardThird && 
                    (
                        <View style={[styles.styleModal, { right: '17%', bottom: '27%' }]}>
                            <View>
                                <Animated.Image
                                    style={
                                        [styles.styleImageScores,
                                        {
                                            transform: [
                                                {
                                                    scale: this.props.runningGame ? this.state.scaleAnim : 0.8
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
}

// width/height = 285/160
// padding 10

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

let heightChildTable;
let widthChildTable;

if ((widthScreen - 120) / (heightScreen - 50) > (285 / 160)) {
    // tỷ lệ height nhỏ hơn, tính theo height
    heightChildTable = ((heightScreen - 50) - 40) / 3;
    widthChildTable = (285 / 160) * heightChildTable;
} else {
    // tỷ lệ width nhỏ hơn, tính theo width
    widthChildTable = ((widthScreen - 120) - 40) / 3;
    heightChildTable = (160 / 285) * widthChildTable;
}

const styles = StyleSheet.create({
    imageChildTable: {
        width: widthChildTable,
        height: heightChildTable,
        borderColor: 'yellow',
        zIndex: 0
    },
    styleModal: {
        height: heightChildTable,
        width: widthChildTable,
        justifyContent: 'center',
        alignItems: 'flex-end',
        zIndex: 1,
        position: 'absolute',
    },
    imageStatusWin: {
        width: 0.7 * widthChildTable,
        height: 0.7 * widthChildTable * (108 / 358)
    },
    imageStatusLost: {
        width: 0.75 * widthChildTable,
        height: 0.75 * widthChildTable * (108 / 448),
        shadowColor: 'black',
        shadowRadius: 100,
        shadowOffset: { width: 0, height: 10 },
    },
    displayInformation: {
        flex: 1,
        height: '100%',
        flexDirection: 'column-reverse'
    },
    containerCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    coinBetContainer: {
        width: '100%',
        height: '28%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    coinBet: {
        width: '70%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'tomato',
        borderRadius: 100,
        padding: 2,
        marginTop: 10
    },
    textCoin: {
        fontWeight: 'bold',
        color: '#ffd700',
        textAlign: 'center',
        fontSize: 12,
        bottom: 1
    },
    displayAvatar: {
        width: '44%',
        height: '100%',
        alignItems: 'flex-end',
    },
    containerName: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5
    },
    textName: {
        flex: 1,
        width: '95%',
        backgroundColor: 'white',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        borderRadius: 100,
        fontSize: 9
    },
    styleImageScores: {
        width: 0.25 * widthChildTable,
        height: 0.25 * widthChildTable,
    }
})