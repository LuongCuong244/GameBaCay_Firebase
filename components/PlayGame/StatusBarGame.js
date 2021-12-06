import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import formatCoinByLetter from '../../modules/FormatCoinByLetter';
import firestore from '@react-native-firebase/firestore'

let isUseState = true;

export default class StatusBarGame extends Component {

    state = {
        currentUser: null,
    }

    update() {
        switch (this.props.currentSeat) {
            case 1: {
                if (isUseState) {
                    this.setState({
                        currentUser: this.props.firstSeat
                    })
                }
                break;
            }
            case 2: {
                if (isUseState) {
                    this.setState({
                        currentUser: this.props.secondSeat
                    })
                }
                break;
            }
            case 3: {
                if (isUseState) {
                    this.setState({
                        currentUser: this.props.thirdSeat
                    })
                }
                break;
            }
            case 4: {
                if (isUseState) {
                    this.setState({
                        currentUser: this.props.fourthSeat
                    })
                }
                break;
            }
            case 5: {
                if (isUseState) {
                    this.setState({
                        currentUser: this.props.fifthSeat
                    })
                }
                break;
            }
            case 6: {
                if (isUseState) {
                    this.setState({
                        currentUser: this.props.sixthSeat
                    })
                }
                break;
            }
            case 7: {
                if (isUseState) {
                    this.setState({
                        currentUser: this.props.seventhSeat
                    })
                }
                break;
            }
            case 8: {
                if (isUseState) {
                    this.setState({
                        currentUser: this.props.eighthSeat
                    })
                }
                break;
            }
            case 9: {
                if (isUseState) {
                    this.setState({
                        currentUser: this.props.ninthSeat
                    })
                }
                break;
            }
            case 10: {
                if (isUseState) {
                    this.setState({
                        currentUser: this.props.tableOwnerSeat
                    })
                }
                break;
            }
        }
    }

    componentDidMount() {
        isUseState = true;
        this.update();
    }

    componentWillUnmount() {
        isUseState = false;
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        Alert.alert("Cảnh báo", "Muốn thoát game à?", [
                            {
                                text: "Oh Noooo",
                                onPress: () => null,
                                style: "cancel"
                            },
                            {
                                text: "Ừ", onPress: () => {
                                    if (this.props.PlayGame.refGameContainer.current != null) {
                                        this.props.PlayGame.refGameContainer.current.deleteSnapShot();
                                        console.log("Xoas SnapShot");
                                    }
                                    this.props.PlayGame.leaveTable();
                                }
                            }
                        ]);
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome5 name='arrow-circle-left' size={35} color='red' style={styles.styleIcon} ></FontAwesome5>
                    </View>
                </TouchableOpacity>
                {this.state.currentUser != null &&
                    (
                        <View style={{ flex: 1, height: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.containerChat}
                            >
                                <View style={styles.displayMessage}>
                                    <Text style={styles.textName} >Cuong:</Text>
                                    <Text style={styles.textMessage} >Thang so hai choi ga vcd</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    this.flipCard('First');
                                }}
                            >
                                <View style={[styles.flipCard, { backgroundColor: (this.state.currentUser.cardFirst != null && this.state.currentUser.flipCardFirst) ? 'green' : 'tomato' }]}>
                                    <Text
                                        style={[styles.textFlipCard, { fontSize: this.state.currentUser.flipCardFirst ? 20 : 13 }]}
                                    >{((this.state.currentUser.cardFirst != null && this.state.currentUser.flipCardFirst) ? parseInt(this.state.currentUser.cardFirst.charAt(this.state.currentUser.cardFirst.length - 1)) : 'Lật lá bài 1')}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    this.flipCard('Second');
                                }}
                            >
                                <View style={[styles.flipCard, { backgroundColor: (this.state.currentUser.cardSecond != null && this.state.currentUser.flipCardSecond) ? 'green' : 'tomato' }]}>
                                    <Text
                                        style={[styles.textFlipCard, { fontSize: this.state.currentUser.flipCardSecond ? 20 : 13 }]}
                                    >{((this.state.currentUser.cardSecond != null && this.state.currentUser.flipCardSecond) ? parseInt(this.state.currentUser.cardSecond.charAt(this.state.currentUser.cardSecond.length - 1)) : 'Lật lá bài 2')}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    this.flipCard('Third');
                                }}
                            >
                                <View style={[styles.flipCard, { backgroundColor: (this.state.currentUser.cardThird != null && this.state.currentUser.flipCardThird) ? 'green' : 'tomato' }]}>
                                    <Text
                                        style={[styles.textFlipCard, { fontSize: this.state.currentUser.flipCardThird ? 20 : 13 }]}
                                    >{((this.state.currentUser.cardThird != null && this.state.currentUser.flipCardThird) ? parseInt(this.state.currentUser.cardThird.charAt(this.state.currentUser.cardThird.length - 1)) : 'Lật lá bài 3')}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    this.flipCard('All');
                                }}
                            >
                                <View style={[styles.flipCard, { backgroundColor: (this.state.currentUser.cardThird != null && this.state.currentUser.flipCardThird) != null ? 'blue' : 'green' }]}>
                                    <Text style={[styles.textFlipCard, { fontSize: 25 }]}>
                                        {(this.state.currentUser.cardFirst != null && this.state.currentUser.flipCardFirst && this.state.currentUser.cardSecond != null && this.state.currentUser.flipCardSecond && this.state.currentUser.cardThird != null && this.state.currentUser.flipCardThird)
                                            ? (parseInt(this.state.currentUser.cardFirst.charAt(this.state.currentUser.cardFirst.length - 1)) +
                                                parseInt(this.state.currentUser.cardSecond.charAt(this.state.currentUser.cardSecond.length - 1)) +
                                                parseInt(this.state.currentUser.cardThird.charAt(this.state.currentUser.cardThird.length - 1)))
                                            : '?'}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <View style={styles.coinContainer}>
                                <MaterialIcons name='attach-money' color='#ffd700' size={17} ></MaterialIcons>
                                <Text style={styles.textCoin} >{formatCoinByLetter(this.state.currentUser.coin)}</Text>
                            </View>
                        </View>
                    )
                }
            </View>
        )
    }

    flipCard = (number) => {
        switch (this.props.currentSeat) {
            case 1: {
                switch (number) {
                    case 'First': {
                        if (this.state.currentUser.flipCardFirst == false && this.state.currentUser.cardFirst != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.firstSeat.flipCardFirst': true,
                            })
                        }
                        break;
                    }
                    case 'Second': {
                        if (this.state.currentUser.flipCardSecond == false && this.state.currentUser.cardSecond != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.firstSeat.flipCardSecond': true,
                            })
                        }
                        break;
                    }
                    case 'Third': {
                        if (this.state.currentUser.flipCardThird == false && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.firstSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                    default: {
                        if ((this.state.currentUser.flipCardFirst == false || this.state.currentUser.flipCardSecond || this.state.currentUser.flipCardThird == false)
                            && this.state.currentUser.cardFirst != null && this.state.currentUser.cardSecond != null && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.firstSeat.flipCardFirst': true,
                                'players.firstSeat.flipCardSecond': true,
                                'players.firstSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                }
                break;
            }
            case 2: {
                switch (number) {
                    case 'First': {
                        if (this.state.currentUser.flipCardFirst == false && this.state.currentUser.cardFirst != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.secondSeat.flipCardFirst': true,
                            })
                        }
                        break;
                    }
                    case 'Second': {
                        if (this.state.currentUser.flipCardSecond == false && this.state.currentUser.cardSecond != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.secondSeat.flipCardSecond': true,
                            })
                        }
                        break;
                    }
                    case 'Third': {
                        if (this.state.currentUser.flipCardThird == false && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.secondSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                    default: {
                        if ((this.state.currentUser.flipCardFirst == false || this.state.currentUser.flipCardSecond || this.state.currentUser.flipCardThird == false)
                            && this.state.currentUser.cardFirst != null && this.state.currentUser.cardSecond != null && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.secondSeat.flipCardFirst': true,
                                'players.secondSeat.flipCardSecond': true,
                                'players.secondSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                }
                break;
            }
            case 3: {
                switch (number) {
                    case 'First': {
                        if (this.state.currentUser.flipCardFirst == false && this.state.currentUser.cardFirst != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.thirdSeat.flipCardFirst': true,
                            })
                        }
                        break;
                    }
                    case 'Second': {
                        if (this.state.currentUser.flipCardSecond == false && this.state.currentUser.cardSecond != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.thirdSeat.flipCardSecond': true,
                            })
                        }
                        break;
                    }
                    case 'Third': {
                        if (this.state.currentUser.flipCardThird == false && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.thirdSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                    default: {
                        if ((this.state.currentUser.flipCardFirst == false || this.state.currentUser.flipCardSecond || this.state.currentUser.flipCardThird == false)
                            && this.state.currentUser.cardFirst != null && this.state.currentUser.cardSecond != null && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.thirdSeat.flipCardFirst': true,
                                'players.thirdSeat.flipCardSecond': true,
                                'players.thirdSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                }
                break;
            }
            case 4: {
                switch (number) {
                    case 'First': {
                        if (this.state.currentUser.flipCardFirst == false && this.state.currentUser.cardFirst != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.fourthSeat.flipCardFirst': true,
                            })
                        }
                        break;
                    }
                    case 'Second': {
                        if (this.state.currentUser.flipCardSecond == false && this.state.currentUser.cardSecond != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.fourthSeat.flipCardSecond': true,
                            })
                        }
                        break;
                    }
                    case 'Third': {
                        if (this.state.currentUser.flipCardThird == false && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.fourthSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                    default: {
                        if ((this.state.currentUser.flipCardFirst == false || this.state.currentUser.flipCardSecond || this.state.currentUser.flipCardThird == false)
                            && this.state.currentUser.cardFirst != null && this.state.currentUser.cardSecond != null && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.fourthSeat.flipCardFirst': true,
                                'players.fourthSeat.flipCardSecond': true,
                                'players.fourthSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                }
                break;
            }
            case 5: {
                switch (number) {
                    case 'First': {
                        if (this.state.currentUser.flipCardFirst == false && this.state.currentUser.cardFirst != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.fifthSeat.flipCardFirst': true,
                            })
                        }
                        break;
                    }
                    case 'Second': {
                        if (this.state.currentUser.flipCardSecond == false && this.state.currentUser.cardSecond != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.fifthSeat.flipCardSecond': true,
                            })
                        }
                        break;
                    }
                    case 'Third': {
                        if (this.state.currentUser.flipCardThird == false && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.fifthSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                    default: {
                        if ((this.state.currentUser.flipCardFirst == false || this.state.currentUser.flipCardSecond || this.state.currentUser.flipCardThird == false)
                            && this.state.currentUser.cardFirst != null && this.state.currentUser.cardSecond != null && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.fifthSeat.flipCardFirst': true,
                                'players.fifthSeat.flipCardSecond': true,
                                'players.fifthSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                }
                break;
            }
            case 6: {
                switch (number) {
                    case 'First': {
                        if (this.state.currentUser.flipCardFirst == false && this.state.currentUser.cardFirst != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.sixthSeat.flipCardFirst': true,
                            })
                        }
                        break;
                    }
                    case 'Second': {
                        if (this.state.currentUser.flipCardSecond == false && this.state.currentUser.cardSecond != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.sixthSeat.flipCardSecond': true,
                            })
                        }
                        break;
                    }
                    case 'Third': {
                        if (this.state.currentUser.flipCardThird == false && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.sixthSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                    default: {
                        if ((this.state.currentUser.flipCardFirst == false || this.state.currentUser.flipCardSecond || this.state.currentUser.flipCardThird == false)
                            && this.state.currentUser.cardFirst != null && this.state.currentUser.cardSecond != null && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.sixthSeat.flipCardFirst': true,
                                'players.sixthSeat.flipCardSecond': true,
                                'players.sixthSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                }
                break;
            }
            case 7: {
                switch (number) {
                    case 'First': {
                        if (this.state.currentUser.flipCardFirst == false && this.state.currentUser.cardFirst != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.seventhSeat.flipCardFirst': true,
                            })
                        }
                        break;
                    }
                    case 'Second': {
                        if (this.state.currentUser.flipCardSecond == false && this.state.currentUser.cardSecond != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.seventhSeat.flipCardSecond': true,
                            })
                        }
                        break;
                    }
                    case 'Third': {
                        if (this.state.currentUser.flipCardThird == false && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.seventhSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                    default: {
                        if ((this.state.currentUser.flipCardFirst == false || this.state.currentUser.flipCardSecond || this.state.currentUser.flipCardThird == false)
                            && this.state.currentUser.cardFirst != null && this.state.currentUser.cardSecond != null && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.seventhSeat.flipCardFirst': true,
                                'players.seventhSeat.flipCardSecond': true,
                                'players.seventhSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                }
                break;
            }
            case 8: {
                switch (number) {
                    case 'First': {
                        if (this.state.currentUser.flipCardFirst == false && this.state.currentUser.cardFirst != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.eighthSeat.flipCardFirst': true,
                            })
                        }
                        break;
                    }
                    case 'Second': {
                        if (this.state.currentUser.flipCardSecond == false && this.state.currentUser.cardSecond != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.eighthSeat.flipCardSecond': true,
                            })
                        }
                        break;
                    }
                    case 'Third': {
                        if (this.state.currentUser.flipCardThird == false && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.eighthSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                    default: {
                        if ((this.state.currentUser.flipCardFirst == false || this.state.currentUser.flipCardSecond || this.state.currentUser.flipCardThird == false)
                            && this.state.currentUser.cardFirst != null && this.state.currentUser.cardSecond != null && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.eighthSeat.flipCardFirst': true,
                                'players.eighthSeat.flipCardSecond': true,
                                'players.eighthSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                }
                break;
            }
            case 9: {
                switch (number) {
                    case 'First': {
                        if (this.state.currentUser.flipCardFirst == false && this.state.currentUser.cardFirst != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.ninthSeat.flipCardFirst': true,
                            })
                        }
                        break;
                    }
                    case 'Second': {
                        if (this.state.currentUser.flipCardSecond == false && this.state.currentUser.cardSecond != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.ninthSeat.flipCardSecond': true,
                            })
                        }
                        break;
                    }
                    case 'Third': {
                        if (this.state.currentUser.flipCardThird == false && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.ninthSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                    default: {
                        if ((this.state.currentUser.flipCardFirst == false || this.state.currentUser.flipCardSecond || this.state.currentUser.flipCardThird == false)
                            && this.state.currentUser.cardFirst != null && this.state.currentUser.cardSecond != null && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.ninthSeat.flipCardFirst': true,
                                'players.ninthSeat.flipCardSecond': true,
                                'players.ninthSeat.flipCardThird': true,
                            })
                        }
                        break;
                    }
                }
                break;
            }
            case 10: {
                switch (number) {
                    case 'First': {
                        if (this.state.currentUser.flipCardFirst == false && this.state.currentUser.cardFirst != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.tableOwner.flipCardFirst': true,
                            })
                        }
                        break;
                    }
                    case 'Second': {
                        if (this.state.currentUser.flipCardSecond == false && this.state.currentUser.cardSecond != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.tableOwner.flipCardSecond': true,
                            })
                        }
                        break;
                    }
                    case 'Third': {
                        if (this.state.currentUser.flipCardThird == false && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.tableOwner.flipCardThird': true,
                            })
                        }
                        break;
                    }
                    default: {
                        if ((this.state.currentUser.flipCardFirst == false || this.state.currentUser.flipCardSecond || this.state.currentUser.flipCardThird == false)
                            && this.state.currentUser.cardFirst != null && this.state.currentUser.cardSecond != null && this.state.currentUser.cardThird != null) {
                            firestore().collection('AllTables').doc(this.props.tableName).update({
                                'players.tableOwner.flipCardFirst': true,
                                'players.tableOwner.flipCardSecond': true,
                                'players.tableOwner.flipCardThird': true,
                            })
                        }
                        break;
                    }
                }
                break;
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    styleIcon: {
        marginLeft: 10,
        borderRadius: 100,
        backgroundColor: 'white'
    },
    containerChat: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    displayMessage: {
        width: '100%',
        height: '65%',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 100,
        paddingHorizontal: 10,
    },
    textName: {
        fontWeight: 'bold',
        fontSize: 12,
        fontStyle: 'italic',
        color: 'yellow'
    },
    textMessage: {
        fontSize: 11,
        color: 'white',
        marginLeft: 3
    },
    flipCard: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: 'center',
        marginHorizontal: 8,
    },
    textFlipCard: {
        textAlign: 'center',
        width: '100%',
        color: 'white',
        fontWeight: 'bold'
    },
    coinContainer: {
        width: '15%',
        height: '70%',
        marginRight: 5,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 7,
    },
    textCoin: {
        fontWeight: 'bold',
        color: '#ffd700',
        textAlign: 'center',
        fontSize: 15,
    }
})