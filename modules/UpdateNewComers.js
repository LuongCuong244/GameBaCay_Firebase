import firestore from '@react-native-firebase/firestore'

export default UpdateNewComers = async (GameContainer) => {

    const PlayGame = GameContainer.props.PlayGame;

    let isCreateTable = PlayGame.props.route.params.isTableOwner;
    let seatItem = PlayGame.props.route.params.seatItem;
    let tableName = PlayGame.props.route.params.tableName;
    let numberPlayer = PlayGame.props.route.params.numberPlayer;
    let dataUser = PlayGame.props.route.params.dataUser;

    if (isCreateTable == false) {
        switch (seatItem) {
            case 1: {
                await firestore().collection('AllTables').doc(tableName).update({
                    'players.firstSeat': {
                        ...dataUser,
                        coinBet: 1000, // số tiền cược
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
                    numberPlayer: numberPlayer + 1
                }).then(() => {
                    PlayGame.setState({
                        firstSeat: {
                            ...dataUser,
                            coinBet: 1000, // số tiền cược
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
                        currentSeat: seatItem,
                    });
                    console.log("Vào bàn thành công 1");
                }).catch((error) => {
                    console.log(error + 'Tai UpdateNewComers');
                })
                break;
            }
            case 2: {
                await firestore().collection('AllTables').doc(tableName).update({
                    'players.secondSeat': {
                        ...dataUser,
                        coinBet: 1000, // số tiền cược
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
                    numberPlayer: numberPlayer + 1
                }).then(() => {
                    PlayGame.setState({
                        secondSeat: {
                            ...dataUser,
                            coinBet: 1000, // số tiền cược
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
                        currentSeat: seatItem,
                    });
                    console.log("Vào bàn thành công 2");
                }).catch((error) => {
                    console.log(error + 'Tai UpdateNewComers');
                })
                break;
            }
            case 3: {
                await firestore().collection('AllTables').doc(tableName).update({
                    'players.thirdSeat': {
                        ...dataUser,
                        coinBet: 1000, // số tiền cược
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
                    numberPlayer: numberPlayer + 1
                }).then(() => {
                    PlayGame.setState({
                        thirdSeat: {
                            ...dataUser,
                            coinBet: 1000, // số tiền cược
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
                        currentSeat: seatItem,
                    });
                    console.log("Vào bàn thành công 3");
                }).catch((error) => {
                    console.log(error + 'Tai UpdateNewComers');
                })
                break;
            }
            case 4: {
                await firestore().collection('AllTables').doc(tableName).update({
                    'players.fourthSeat': {
                        ...dataUser,
                        coinBet: 1000, // số tiền cược
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
                    numberPlayer: numberPlayer + 1
                }).then(() => {
                    PlayGame.setState({
                        fourthSeat: {
                            ...dataUser,
                            coinBet: 1000, // số tiền cược
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
                        currentSeat: seatItem,
                    });
                    console.log("Vào bàn thành công 4");
                }).catch((error) => {
                    console.log(error + 'Tai UpdateNewComers');
                })
                break;
            }
            case 5: {
                await firestore().collection('AllTables').doc(tableName).update({
                    'players.fifthSeat': {
                        ...dataUser,
                        coinBet: 1000, // số tiền cược
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
                    numberPlayer: numberPlayer + 1
                }).then(() => {
                    PlayGame.setState({
                        fifthSeat: {
                            ...dataUser,
                            coinBet: 1000, // số tiền cược
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
                        currentSeat: seatItem,
                    });
                    console.log("Vào bàn thành công 5");
                }).catch((error) => {
                    console.log(error + 'Tai UpdateNewComers');
                })
                break;
            }
            case 6: {
                await firestore().collection('AllTables').doc(tableName).update({
                    'players.sixthSeat': {
                        ...dataUser,
                        coinBet: 1000, // số tiền cược
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
                    numberPlayer: numberPlayer + 1
                }).then(() => {
                    PlayGame.setState({
                        sixthSeat: {
                            ...dataUser,
                            coinBet: 1000, // số tiền cược
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
                        currentSeat: seatItem,
                    });
                    console.log("Vào bàn thành công 6");
                }).catch((error) => {
                    console.log(error + 'Tai UpdateNewComers');
                })
                break;
            }
            case 7: {
                await firestore().collection('AllTables').doc(tableName).update({
                    'players.seventhSeat': {
                        ...dataUser,
                        coinBet: 1000, // số tiền cược
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
                    numberPlayer: numberPlayer + 1
                }).then(() => {
                    PlayGame.setState({
                        seventhSeat: {
                            ...dataUser,
                            coinBet: 1000, // số tiền cược
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
                        currentSeat: seatItem,
                    });
                    console.log("Vào bàn thành công 7");
                }).catch((error) => {
                    console.log(error + 'Tai UpdateNewComers');
                })
                break;
            }
            case 8: {
                await firestore().collection('AllTables').doc(tableName).update({
                    'players.eighthSeat': {
                        ...dataUser,
                        coinBet: 1000, // số tiền cược
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
                    numberPlayer: numberPlayer + 1
                }).then(() => {
                    PlayGame.setState({
                        eighthSeat: {
                            ...dataUser,
                            coinBet: 1000, // số tiền cược
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
                        currentSeat: seatItem,
                    });
                    console.log("Vào bàn thành công 8");
                }).catch((error) => {
                    console.log(error + 'Tai UpdateNewComers');
                })
                break;
            }
            case 9: {
                await firestore().collection('AllTables').doc(tableName).update({
                    'players.ninthSeat': {
                        ...dataUser,
                        coinBet: 1000, // số tiền cược
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
                    numberPlayer: numberPlayer + 1
                }).then(() => {
                    PlayGame.setState({
                        ninthSeat: {
                            ...dataUser,
                            coinBet: 1000, // số tiền cược
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
                        currentSeat: seatItem,
                    });
                    console.log("Vào bàn thành công 9");
                }).catch((error) => {
                    console.log(error + 'Tai UpdateNewComers');
                })
                break;
            }
        }

        firestore().collection('AllTables').doc(tableName).update({
            someoneEnteredGame: true,
        })

    } else {
        PlayGame.setState({
            tableOwnerSeat: {
                ...dataUser,
                coinBet: 1000, // số tiền cược
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
            currentSeat: 10,
        })
    }

    GameContainer.setState({
        user: {
            ...dataUser,
            coinBet: 1000, // số tiền cược
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
        coinBet: 1000
    })
}