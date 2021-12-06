import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import distributeCards from '../components/PlayGame/LogicGame';
import auth from '@react-native-firebase/auth'

export default SnapShotDocTable = (querySnapshot, GameContainer) => {
    let PlayGame = GameContainer.props.PlayGame;
    let listPlayer = querySnapshot.data().players;
    let tableName = PlayGame.props.route.params.tableName;

    if (listPlayer.tableOwner == null) {
        changeTableOwner(querySnapshot, listPlayer, tableName, PlayGame, GameContainer);
    } else {
        resetCountDown(querySnapshot, listPlayer, tableName, GameContainer);
        kickedOffTheTable(querySnapshot, listPlayer, PlayGame);
        checkShowReady(querySnapshot, tableName);
        checkAllReady(listPlayer, querySnapshot.data().numberPlayer, GameContainer, tableName);
        checkGameStart(querySnapshot, tableName, GameContainer);
        checkEndGame(querySnapshot, listPlayer, tableName);
        handleEndGame(querySnapshot, listPlayer, tableName, GameContainer);
    }
    PlayGame.loadDataFromServer();
}

const checkShowReady = (querySnapshot, tableName) => {
    if (querySnapshot.data().numberPlayer > 1) {
        if (querySnapshot.data().gameLoop == false && querySnapshot.data().players.tableOwner != null) {
            firestore().collection('AllTables').doc(tableName).update({
                gameLoop: true,
            })
        }
    } else {
        firestore().collection('AllTables').doc(tableName).update({
            gameLoop: false,
        }).then(() => {
            console.log("Đã dừng vòng lặp Game");
        })
    }
}

const checkAllReady = (listPlayer, numberPlayer, GameContainer, tableName) => {
    const postRef = firestore().collection('AllTables').doc(tableName);
    const batch = firestore().batch();
    let count = 0;
    let coinBetTotal = 0;
    for (const key in listPlayer) {
        if (listPlayer[key] != null) {
            if (listPlayer[key].confirmBet && listPlayer[key].stillInTheTable) {
                if (key != 'tableOwner') {
                    coinBetTotal += listPlayer[key].coinBet;
                }
                count++;
            } else {
                return;
            }
        }
    }
    if (count == numberPlayer) {
        for (const key in listPlayer) {
            if (listPlayer[key] != null) {
                switch (key) {
                    case 'firstSeat': {
                        batch.update(postRef, {
                            'players.firstSeat.confirmBet': false,
                        })
                        break;
                    }
                    case 'secondSeat': {
                        batch.update(postRef, {
                            'players.secondSeat.confirmBet': false,
                        })
                        break;
                    }
                    case 'thirdSeat': {
                        batch.update(postRef, {
                            'players.thirdSeat.confirmBet': false,
                        })
                        break;
                    }
                    case 'fourthSeat': {
                        batch.update(postRef, {
                            'players.fourthSeat.confirmBet': false,
                        })
                        break;
                    }
                    case 'fifthSeat': {
                        batch.update(postRef, {
                            'players.fifthSeat.confirmBet': false,
                        })
                        break;
                    }
                    case 'sixthSeat': {
                        batch.update(postRef, {
                            'players.sixthSeat.confirmBet': false,
                        })
                        break;
                    }
                    case 'seventhSeat': {
                        batch.update(postRef, {
                            'players.seventhSeat.confirmBet': false,
                        })
                        break;
                    }
                    case 'eighthSeat': {
                        batch.update(postRef, {
                            'players.eighthSeat.confirmBet': false,
                        })
                        break;
                    }
                    case 'ninthSeat': {
                        batch.update(postRef, {
                            'players.ninthSeat.confirmBet': false,
                        })
                        break;
                    }
                    case 'tableOwner': {
                        batch.update(postRef, {
                            'players.tableOwner.confirmBet': false,
                        })
                        break;
                    }
                }
            }
        }
        console.log("Tất cả đã sẵn sàng (Commit)");
        batch.update(postRef, {
            runningGame: true,
        })
        batch.commit();
        GameContainer.showTotalCoinBet(coinBetTotal);
    }
}

const checkGameStart = (querySnapshot, tableName, GameContainer) => {
    if (querySnapshot.data().runningGame && querySnapshot.data().acceptBets) {

        console.log("Ván đấu bắt đầu");

        firestore().collection('AllTables').doc(tableName).update({
            acceptBets: false,
        }).then(() => {
            if (querySnapshot.data().numberPlayer > 1) {
                GameContainer.setRunningGame(true);
                if (GameContainer.props.PlayGame.state.currentSeat == 10) {
                    distributeCards(GameContainer.props.PlayGame) // chia bài
                }
                if (GameContainer.refTableOwner.current != null) {
                    GameContainer.refTableOwner.current.countDown20s();
                }
            } else {
                firestore().collection('AllTables').doc(tableName).update({
                    runningGame: false,
                })
            }
        })
    }
}

const changeTableOwner = (querySnapShot, listPlayer, tableName, PlayGame, GameContainer) => {
    const postRef = firestore().collection('AllTables').doc(tableName);
    firestore().runTransaction(async transaction => {
        const postSnapshot = await transaction.get(postRef);
        if (!postSnapshot.exists) {
            throw "Post ko ton tai!";
        }
        return postSnapshot;
    }).then((postSnapshot) => {

        if (postSnapshot.data().players.tableOwner == null) {
            console.log("Không có chủ bàn");
            let listPlayer = postSnapshot.data().players;
            let coinMax = 0;
            let keyPlayer = '';
            for (const key in listPlayer) {
                if (listPlayer[key] != null) {
                    if (listPlayer[key].coin > coinMax) {
                        coinMax = listPlayer[key].coin;
                        keyPlayer = key;
                    }
                }
            }
            console.log("CoinMax: ", coinMax, 'KeyPlayer: ', keyPlayer, ' auth: ', auth().currentUser.uid);
            switch (keyPlayer) {
                case 'firstSeat': {
                    if (PlayGame.state.currentSeat == 1) {
                        firestore().collection('AllTables').doc(tableName).update({
                            'players.firstSeat': null,
                            'players.tableOwner': listPlayer[keyPlayer],
                        }).then(() => {
                            const postRef = firestore().collection('AllTables').doc(tableName);
                            firestore().runTransaction(async transaction => {
                                const postSnapshot = await transaction.get(postRef);
                                if (!postSnapshot.exists) {
                                    throw "Post is not exists!";
                                }
                                const batch = firestore().batch();
                                batch.update(postRef, {
                                    runningGame: false,
                                    acceptBets: false,
                                })
                                setCoinBetByTableOwner(postSnapshot.data().players, tableName, batch, true);
                            }).catch((error) => {
                                console.log(error, ' (Tại SnapShotDocTable.js -> changeTableOwner)');
                            })
                        })
                        PlayGame.setTableOwner();
                        if (querySnapShot.data().numberPlayer >= 2) {
                            GameContainer.countDown5sNewGame();
                        }
                    }
                    break;
                }
                case 'secondSeat': {
                    if (PlayGame.state.currentSeat == 2) {
                        firestore().collection('AllTables').doc(tableName).update({
                            'players.secondSeat': null,
                            'players.tableOwner': listPlayer[keyPlayer],
                        }).then(() => {
                            const postRef = firestore().collection('AllTables').doc(tableName);
                            firestore().runTransaction(async transaction => {
                                const postSnapshot = await transaction.get(postRef);
                                if (!postSnapshot.exists) {
                                    throw "Post is not exists!";
                                }
                                const batch = firestore().batch();
                                batch.update(postRef, {
                                    runningGame: false,
                                    acceptBets: false,
                                })
                                setCoinBetByTableOwner(postSnapshot.data().players, tableName, batch, true);
                            }).catch((error) => {
                                console.log(error, ' (Tại SnapShotDocTable.js -> changeTableOwner)');
                            })
                        })
                        PlayGame.setTableOwner();
                    }
                    break;
                }
                case 'thirdSeat': {
                    if (PlayGame.state.currentSeat == 3) {
                        firestore().collection('AllTables').doc(tableName).update({
                            'players.thirdSeat': null,
                            'players.tableOwner': listPlayer[keyPlayer],
                        }).then(() => {
                            const postRef = firestore().collection('AllTables').doc(tableName);
                            firestore().runTransaction(async transaction => {
                                const postSnapshot = await transaction.get(postRef);
                                if (!postSnapshot.exists) {
                                    throw "Post is not exists!";
                                }
                                const batch = firestore().batch();
                                batch.update(postRef, {
                                    runningGame: false,
                                    acceptBets: false,
                                })
                                setCoinBetByTableOwner(postSnapshot.data().players, tableName, batch, true);
                            }).catch((error) => {
                                console.log(error, ' (Tại SnapShotDocTable.js -> changeTableOwner)');
                            })
                        })
                        PlayGame.setTableOwner();
                    }
                    break;
                }
                case 'fourthSeat': {
                    if (PlayGame.state.currentSeat == 4) {
                        firestore().collection('AllTables').doc(tableName).update({
                            'players.fourthSeat': null,
                            'players.tableOwner': listPlayer[keyPlayer],
                        }).then(() => {
                            const postRef = firestore().collection('AllTables').doc(tableName);
                            firestore().runTransaction(async transaction => {
                                const postSnapshot = await transaction.get(postRef);
                                if (!postSnapshot.exists) {
                                    throw "Post is not exists!";
                                }
                                const batch = firestore().batch();
                                batch.update(postRef, {
                                    runningGame: false,
                                    acceptBets: false,
                                })
                                setCoinBetByTableOwner(postSnapshot.data().players, tableName, batch, true);
                            }).catch((error) => {
                                console.log(error, ' (Tại SnapShotDocTable.js -> changeTableOwner)');
                            })
                        })
                        PlayGame.setTableOwner();
                    }
                    break;
                }
                case 'fifthSeat': {
                    if (PlayGame.state.currentSeat == 5) {
                        firestore().collection('AllTables').doc(tableName).update({
                            'players.fifthSeat': null,
                            'players.tableOwner': listPlayer[keyPlayer],
                        }).then(() => {
                            const postRef = firestore().collection('AllTables').doc(tableName);
                            firestore().runTransaction(async transaction => {
                                const postSnapshot = await transaction.get(postRef);
                                if (!postSnapshot.exists) {
                                    throw "Post is not exists!";
                                }
                                const batch = firestore().batch();
                                batch.update(postRef, {
                                    runningGame: false,
                                    acceptBets: false,
                                })
                                setCoinBetByTableOwner(postSnapshot.data().players, tableName, batch, true);
                            }).catch((error) => {
                                console.log(error, ' (Tại SnapShotDocTable.js -> changeTableOwner)');
                            })
                        })
                        PlayGame.setTableOwner();
                    }
                    break;
                }
                case 'sixthSeat': {
                    if (PlayGame.state.currentSeat == 6) {
                        firestore().collection('AllTables').doc(tableName).update({
                            'players.sixthSeat': null,
                            'players.tableOwner': listPlayer[keyPlayer],
                        }).then(() => {
                            const postRef = firestore().collection('AllTables').doc(tableName);
                            firestore().runTransaction(async transaction => {
                                const postSnapshot = await transaction.get(postRef);
                                if (!postSnapshot.exists) {
                                    throw "Post is not exists!";
                                }
                                const batch = firestore().batch();
                                batch.update(postRef, {
                                    runningGame: false,
                                    acceptBets: false,
                                })
                                setCoinBetByTableOwner(postSnapshot.data().players, tableName, batch, true);
                            }).catch((error) => {
                                console.log(error, ' (Tại SnapShotDocTable.js -> changeTableOwner)');
                            })
                        })
                        PlayGame.setTableOwner();
                    }
                    break;
                }
                case 'seventhSeat': {
                    if (PlayGame.state.currentSeat == 7) {
                        firestore().collection('AllTables').doc(tableName).update({
                            'players.seventhSeat': null,
                            'players.tableOwner': listPlayer[keyPlayer],
                        }).then(() => {
                            const postRef = firestore().collection('AllTables').doc(tableName);
                            firestore().runTransaction(async transaction => {
                                const postSnapshot = await transaction.get(postRef);
                                if (!postSnapshot.exists) {
                                    throw "Post is not exists!";
                                }
                                const batch = firestore().batch();
                                batch.update(postRef, {
                                    runningGame: false,
                                    acceptBets: false,
                                })
                                setCoinBetByTableOwner(postSnapshot.data().players, tableName, batch, true);
                            }).catch((error) => {
                                console.log(error, ' (Tại SnapShotDocTable.js -> changeTableOwner)');
                            })
                        })
                        PlayGame.setTableOwner();
                    }
                    break;
                }
                case 'eighthSeat': {
                    if (PlayGame.state.currentSeat == 8) {
                        firestore().collection('AllTables').doc(tableName).update({
                            'players.eighthSeat': null,
                            'players.tableOwner': listPlayer[keyPlayer],
                        }).then(() => {
                            const postRef = firestore().collection('AllTables').doc(tableName);
                            firestore().runTransaction(async transaction => {
                                const postSnapshot = await transaction.get(postRef);
                                if (!postSnapshot.exists) {
                                    throw "Post is not exists!";
                                }
                                const batch = firestore().batch();
                                batch.update(postRef, {
                                    runningGame: false,
                                    acceptBets: false,
                                })
                                setCoinBetByTableOwner(postSnapshot.data().players, tableName, batch, true);
                            }).catch((error) => {
                                console.log(error, ' (Tại SnapShotDocTable.js -> changeTableOwner)');
                            })
                        })
                        PlayGame.setTableOwner();
                    }
                    break;
                }
                case 'ninthSeat': {
                    if (PlayGame.state.currentSeat == 9) {
                        firestore().collection('AllTables').doc(tableName).update({
                            'players.ninthSeat': null,
                            'players.tableOwner': listPlayer[keyPlayer],
                        }).then(() => {
                            const postRef = firestore().collection('AllTables').doc(tableName);
                            firestore().runTransaction(async transaction => {
                                const postSnapshot = await transaction.get(postRef);
                                if (!postSnapshot.exists) {
                                    throw "Post is not exists!";
                                }
                                const batch = firestore().batch();
                                batch.update(postRef, {
                                    runningGame: false,
                                    acceptBets: false,
                                })
                                setCoinBetByTableOwner(postSnapshot.data().players, tableName, batch, true);
                            }).catch((error) => {
                                console.log(error, ' (Tại SnapShotDocTable.js -> changeTableOwner)');
                            })
                        })
                        PlayGame.setTableOwner();
                    }
                    break;
                }
            }
        }
    })
}

const checkEndGame = (querySnapShot, listPlayer, tableName) => {
    if (querySnapShot.data().handleEndGame || querySnapShot.data().confirmEndGame) {
        return;
    }
    for (const key in listPlayer) {
        if (listPlayer[key] != null) {
            if (listPlayer[key].isWaiting == false) {
                if (listPlayer[key].flipCardFirst == false || listPlayer[key].flipCardSecond == false || listPlayer[key].flipCardThird == false ||
                    !listPlayer[key].cardFirst || !listPlayer[key].cardSecond || !listPlayer[key].cardThird) {
                    return;
                }
            }
        }
    }
    firestore().collection('AllTables').doc(tableName).update({
        confirmEndGame: true,
        handleEndGame: true,
    }).then(() => {
        console.log("ConfirmEndGame: true, RunningGame: false");
    })

}

const handleEndGame = (querySnapShot, listPlayer, tableName, GameContainer) => {
    const postReference = firestore().collection('AllTables').doc(tableName);
    if (querySnapShot.data().confirmEndGame && querySnapShot.data().handleEndGame) {
        firestore().runTransaction(async transaction => {
            const postSnapshot = await transaction.get(postReference);
            if (!postSnapshot.exists) {
                throw "Post ko ton tai! (handleEndGame)";
            }
            transaction.update(postReference, {
                confirmEndGame: false,
            })
        }).then(() => {
            console.log("Xử lý EndGame");
            if (GameContainer.refTableOwner.current) {
                GameContainer.refTableOwner.current.clearInterval20s();
            }
            GameContainer.setRunningGame(false);
            const batch = firestore().batch();
            handleCardAndCoin(querySnapShot, listPlayer, tableName, GameContainer, batch);
        })
    }
}

const handleCardAndCoin = (querySnapShot, listPlayer, tableName, GameContainer, batch) => {
    const postReference = firestore().collection('AllTables').doc(tableName);

    differentCoinBet(listPlayer, tableName, batch);
    setTimeout(() => {
        for (const key in listPlayer) {
            if (listPlayer[key] != null) {
                switch (key) {
                    case 'firstSeat': {
                        batch.update(postReference, {
                            'players.firstSeat.flipCardFirst': false,
                            'players.firstSeat.flipCardSecond': false,
                            'players.firstSeat.flipCardThird': false,
                            'players.firstSeat.cardFirst': null,
                            'players.firstSeat.cardSecond': null,
                            'players.firstSeat.cardThird': null,
                            'players.firstSeat.status': 'No',
                        })
                        break;
                    }
                    case 'secondSeat': {
                        batch.update(postReference, {
                            'players.secondSeat.flipCardFirst': false,
                            'players.secondSeat.flipCardSecond': false,
                            'players.secondSeat.flipCardThird': false,
                            'players.secondSeat.cardFirst': null,
                            'players.secondSeat.cardSecond': null,
                            'players.secondSeat.cardThird': null,
                            'players.secondSeat.status': 'No',
                        })
                        break;
                    }
                    case 'thirdSeat': {
                        batch.update(postReference, {
                            'players.thirdSeat.flipCardFirst': false,
                            'players.thirdSeat.flipCardSecond': false,
                            'players.thirdSeat.flipCardThird': false,
                            'players.thirdSeat.cardFirst': null,
                            'players.thirdSeat.cardSecond': null,
                            'players.thirdSeat.cardThird': null,
                            'players.thirdSeat.status': 'No',
                        })
                        break;
                    }
                    case 'fourthSeat': {
                        batch.update(postReference, {
                            'players.fourthSeat.flipCardFirst': false,
                            'players.fourthSeat.flipCardSecond': false,
                            'players.fourthSeat.flipCardThird': false,
                            'players.fourthSeat.cardFirst': null,
                            'players.fourthSeat.cardSecond': null,
                            'players.fourthSeat.cardThird': null,
                            'players.fourthSeat.status': 'No',
                        })
                        break;
                    }
                    case 'fifthSeat': {
                        batch.update(postReference, {
                            'players.fifthSeat.flipCardFirst': false,
                            'players.fifthSeat.flipCardSecond': false,
                            'players.fifthSeat.flipCardThird': false,
                            'players.fifthSeat.cardFirst': null,
                            'players.fifthSeat.cardSecond': null,
                            'players.fifthSeat.cardThird': null,
                            'players.fifthSeat.status': 'No',
                        })
                        break;
                    }
                    case 'sixthSeat': {
                        batch.update(postReference, {
                            'players.sixthSeat.flipCardFirst': false,
                            'players.sixthSeat.flipCardSecond': false,
                            'players.sixthSeat.flipCardThird': false,
                            'players.sixthSeat.cardFirst': null,
                            'players.sixthSeat.cardSecond': null,
                            'players.sixthSeat.cardThird': null,
                            'players.sixthSeat.status': 'No',
                        })
                        break;
                    }
                    case 'seventhSeat': {
                        batch.update(postReference, {
                            'players.seventhSeat.flipCardFirst': false,
                            'players.seventhSeat.flipCardSecond': false,
                            'players.seventhSeat.flipCardThird': false,
                            'players.seventhSeat.cardFirst': null,
                            'players.seventhSeat.cardSecond': null,
                            'players.seventhSeat.cardThird': null,
                            'players.seventhSeat.status': 'No',
                        })
                        break;
                    }
                    case 'eighthSeat': {
                        batch.update(postReference, {
                            'players.eighthSeat.flipCardFirst': false,
                            'players.eighthSeat.flipCardSecond': false,
                            'players.eighthSeat.flipCardThird': false,
                            'players.eighthSeat.cardFirst': null,
                            'players.eighthSeat.cardSecond': null,
                            'players.eighthSeat.cardThird': null,
                            'players.eighthSeat.status': 'No',
                        })
                        break;
                    }
                    case 'ninthSeat': {
                        batch.update(postReference, {
                            'players.ninthSeat.flipCardFirst': false,
                            'players.ninthSeat.flipCardSecond': false,
                            'players.ninthSeat.flipCardThird': false,
                            'players.ninthSeat.cardFirst': null,
                            'players.ninthSeat.cardSecond': null,
                            'players.ninthSeat.cardThird': null,
                            'players.ninthSeat.status': 'No',
                        })
                        break;
                    }
                    case 'tableOwner': {
                        batch.update(postReference, {
                            'players.tableOwner.flipCardFirst': false,
                            'players.tableOwner.flipCardSecond': false,
                            'players.tableOwner.flipCardThird': false,
                            'players.tableOwner.cardFirst': null,
                            'players.tableOwner.cardSecond': null,
                            'players.tableOwner.cardThird': null,
                            'players.tableOwner.status': 'No',
                        })
                        break;
                    }
                }
            }
        }
        setNewGame(querySnapShot, GameContainer, listPlayer, tableName, batch);
    }, 2000);
}

const setNewGame = (querySnapShot, GameContainer, listPlayer, tableName, batch) => {
    // Nếu người chơi không ở trong bàn thì Out.
    // Người chơi cược trên mức coin Chủ bàn / 10 thì set về coin Chủ bàn / 10,
    // Chủ bàn dưới 10k vàng thì xuống làm người chơi.
    // Kiểm tra và update thoát khỏi trạng thái đợi
    const postReference = firestore().collection('AllTables').doc(tableName);

    /* gọi runTransaction để phòng trường hợp chưa kịp batch.commit() mà lại có thằng
         nó vào dẫn đến numberPlayer + 1, rồi batch.commit() xong lại bị -1 */
    firestore().runTransaction(async transaction => {
        const postSnapshot = await transaction.get(postReference);
        if (!postSnapshot.exists) {
            throw 'Post ko ton tai';
        }
        return postSnapshot;
    }).then((postSnapshot) => {
        let listPlayer = postSnapshot.data().players;
        let playerInGame = 0;
        for (const key in listPlayer) {
            if (listPlayer[key] != null) {
                if (listPlayer[key].stillInTheTable) {
                    playerInGame++;
                }
                switch (key) {
                    case 'firstSeat': {
                        if (listPlayer[key].isWaiting) {
                            batch.update(postReference, {
                                'players.firstSeat.isWaiting': false,
                            })
                        }
                        if (!listPlayer[key].stillInTheTable) {
                            batch.update(postReference, {
                                'players.firstSeat': null,
                            })
                        } else {
                            console.log("Vẫn trong bàn");
                        }
                        break;
                    }
                    case 'secondSeat': {
                        if (listPlayer[key].isWaiting) {
                            batch.update(postReference, {
                                'players.secondSeat.isWaiting': false,
                            })
                        }
                        if (!listPlayer[key].stillInTheTable) {
                            batch.update(postReference, {
                                'players.secondSeat': null,
                            })
                        } else {
                            console.log("Vẫn trong bàn");
                        }
                        break;
                    }
                    case 'thirdSeat': {
                        if (listPlayer[key].isWaiting) {
                            batch.update(postReference, {
                                'players.thirdSeat.isWaiting': false,
                            })
                        }
                        if (!listPlayer[key].stillInTheTable) {
                            batch.update(postReference, {
                                'players.thirdSeat': null,
                            })
                        } else {
                            console.log("Vẫn trong bàn");
                        }
                        break;
                    }
                    case 'fourthSeat': {
                        if (listPlayer[key].isWaiting) {
                            batch.update(postReference, {
                                'players.fourthSeat.isWaiting': false,
                            })
                        }
                        if (!listPlayer[key].stillInTheTable) {
                            batch.update(postReference, {
                                'players.fourthSeat': null,
                            })
                        } else {
                            console.log("Vẫn trong bàn");
                        }
                        break;
                    }
                    case 'fifthSeat': {
                        if (listPlayer[key].isWaiting) {
                            batch.update(postReference, {
                                'players.fifthSeat.isWaiting': false,
                            })
                        }
                        if (!listPlayer[key].stillInTheTable) {
                            batch.update(postReference, {
                                'players.fifthSeat': null,
                            })
                        } else {
                            console.log("Vẫn trong bàn");
                        }
                        break;
                    }
                    case 'sixthSeat': {
                        if (listPlayer[key].isWaiting) {
                            batch.update(postReference, {
                                'players.sixthSeat.isWaiting': false,
                            })
                        }
                        if (!listPlayer[key].stillInTheTable) {
                            batch.update(postReference, {
                                'players.sixthSeat': null,
                            })
                        } else {
                            console.log("Vẫn trong bàn");
                        }
                        break;
                    }
                    case 'seventhSeat': {
                        if (listPlayer[key].isWaiting) {
                            batch.update(postReference, {
                                'players.seventhSeat.isWaiting': false,
                            })
                        }
                        if (!listPlayer[key].stillInTheTable) {
                            batch.update(postReference, {
                                'players.seventhSeat': null,
                            })
                        } else {
                            console.log("Vẫn trong bàn");
                        }
                        break;
                    }
                    case 'eighthSeat': {
                        if (listPlayer[key].isWaiting) {
                            batch.update(postReference, {
                                'players.eighthSeat.isWaiting': false,
                            })
                        }
                        if (!listPlayer[key].stillInTheTable) {
                            batch.update(postReference, {
                                'players.eighthSeat': null,
                            })
                        } else {
                            console.log("Vẫn trong bàn");
                        }
                        break;
                    }
                    case 'ninthSeat': {
                        if (listPlayer[key].isWaiting) {
                            batch.update(postReference, {
                                'players.ninthSeat.isWaiting': false,
                            })
                        }
                        if (!listPlayer[key].stillInTheTable) {
                            batch.update(postReference, {
                                'players.ninthSeat': null,
                            })
                        } else {
                            console.log("Vẫn trong bàn");
                        }
                        break;
                    }
                    case 'tableOwner': {
                        if (listPlayer[key].isWaiting) {
                            batch.update(postReference, {
                                'players.tableOwner.isWaiting': false,
                            })
                        }
                        break;
                    }
                }
            }
        }
        batch.update(postReference, {
            numberPlayer: playerInGame,
            runningGame: false,
        })

        if (listPlayer.tableOwner != null) {
            if (listPlayer.tableOwner.stillInTheTable) {
                console.log("Chủ bàn vẫn còn ở đây");
                setCoinBetByTableOwner(listPlayer, tableName, batch, false);
                if (playerInGame < 2) {
                    batch.update(postReference, {
                        gameLoop: false,
                    })
                } else {
                    console.log("HandleCardAndCoin: 5s");
                    GameContainer.countDown5sNewGame();
                }
            } else {
                console.log("Chủ bàn ko còn");
                batch.update(postReference, {
                    'players.tableOwner': null,
                    'gameLoop': false,
                })
            }
        }
        batch.update(postReference, {
            handleEndGame: false,
        })
        console.log("Đã NewGame (commit)");
        batch.commit();
    }).catch((error) => {
        console.log(error + ' (Tại: SnapShotDocTable.js -> setNewGame)');
    })
}

const differentCoinBet = (listPlayer, tableName, batch) => {
    const postReference = firestore().collection('AllTables').doc(tableName);
    let differentCoin = 0;

    let firstSeat = listPlayer.firstSeat;
    let secondSeat = listPlayer.secondSeat;
    let thirdSeat = listPlayer.thirdSeat;
    let fourthSeat = listPlayer.fourthSeat;
    let fifthSeat = listPlayer.fifthSeat;
    let sixthSeat = listPlayer.sixthSeat;
    let seventhSeat = listPlayer.seventhSeat;
    let eighthSeat = listPlayer.eighthSeat;
    let ninthSeat = listPlayer.ninthSeat;
    let tableOwner = listPlayer.tableOwner;

    if (firstSeat != null) {
        if (firstSeat.status == 'Win') {
            differentCoin -= firstSeat.coinBet;
        } else if (firstSeat.status == 'Lost') {
            differentCoin += firstSeat.coinBet;
        }

        if (firstSeat.stillInTheTable) {
            if (firstSeat.status == 'Win') {
                batch.update(postReference, {
                    'players.firstSeat.coin': firstSeat.coin + firstSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(firstSeat.userID), {
                    'coin': firstSeat.coin + firstSeat.coinBet,
                })
            } else if (firstSeat.status == 'Lost') {
                batch.update(postReference, {
                    'players.firstSeat.coin': firstSeat.coin - firstSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(firstSeat.userID), {
                    'coin': firstSeat.coin - firstSeat.coinBet,
                })
            }
        }
    }

    if (secondSeat != null) {
        if (secondSeat.status == 'Win') {
            differentCoin -= secondSeat.coinBet;
        } else if (secondSeat.status == 'Lost') {
            differentCoin += secondSeat.coinBet;
        }

        if (secondSeat.stillInTheTable) {
            if (secondSeat.status == 'Win') {
                batch.update(postReference, {
                    'players.secondSeat.coin': secondSeat.coin + secondSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(secondSeat.userID), {
                    'coin': secondSeat.coin + secondSeat.coinBet,
                })
            } else if (secondSeat.status == 'Lost') {
                batch.update(postReference, {
                    'players.secondSeat.coin': secondSeat.coin - secondSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(secondSeat.userID), {
                    'coin': secondSeat.coin - secondSeat.coinBet,
                })
            }
        }
    }

    if (thirdSeat != null) {
        if (thirdSeat.status == 'Win') {
            differentCoin -= thirdSeat.coinBet;
        } else if (thirdSeat.status == 'Lost') {
            differentCoin += thirdSeat.coinBet;
        }

        if (thirdSeat.stillInTheTable) {
            if (thirdSeat.status == 'Win') {
                batch.update(postReference, {
                    'players.thirdSeat.coin': thirdSeat.coin + thirdSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(thirdSeat.userID), {
                    'coin': thirdSeat.coin + thirdSeat.coinBet,
                })
            } else if (thirdSeat.status == 'Lost') {
                batch.update(postReference, {
                    'players.thirdSeat.coin': thirdSeat.coin - thirdSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(thirdSeat.userID), {
                    'coin': thirdSeat.coin - thirdSeat.coinBet,
                })
            }
        }
    }

    if (fourthSeat != null) {
        if (fourthSeat.status == 'Win') {
            differentCoin -= fourthSeat.coinBet;
        } else if (fourthSeat.status == 'Lost') {
            differentCoin += fourthSeat.coinBet;
        }

        if (fourthSeat.stillInTheTable) {
            if (fourthSeat.status == 'Win') {
                batch.update(postReference, {
                    'players.fourthSeat.coin': fourthSeat.coin + fourthSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(fourthSeat.userID), {
                    'coin': fourthSeat.coin + fourthSeat.coinBet,
                })
            } else if (fourthSeat.status == 'Lost') {
                batch.update(postReference, {
                    'players.fourthSeat.coin': fourthSeat.coin - fourthSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(fourthSeat.userID), {
                    'coin': fourthSeat.coin - fourthSeat.coinBet,
                })
            }
        }
    }

    if (fifthSeat != null) {
        if (fifthSeat.status == 'Win') {
            differentCoin -= fifthSeat.coinBet;
        } else if (fifthSeat.status == 'Lost') {
            differentCoin += fifthSeat.coinBet;
        }

        if (fifthSeat.stillInTheTable) {
            if (fifthSeat.status == 'Win') {
                batch.update(postReference, {
                    'players.fifthSeat.coin': fifthSeat.coin + fifthSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(fifthSeat.userID), {
                    'coin': fifthSeat.coin + fifthSeat.coinBet,
                })
            } else if (fifthSeat.status == 'Lost') {
                batch.update(postReference, {
                    'players.fifthSeat.coin': fifthSeat.coin - fifthSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(fifthSeat.userID), {
                    'coin': fifthSeat.coin - fifthSeat.coinBet,
                })
            }
        }
    }

    if (sixthSeat != null) {
        if (sixthSeat.status == 'Win') {
            differentCoin -= sixthSeat.coinBet;
        } else if (sixthSeat.status == 'Lost') {
            differentCoin += sixthSeat.coinBet;
        }

        if (sixthSeat.stillInTheTable) {
            if (sixthSeat.status == 'Win') {
                batch.update(postReference, {
                    'players.sixthSeat.coin': sixthSeat.coin + sixthSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(sixthSeat.userID), {
                    'coin': sixthSeat.coin + sixthSeat.coinBet,
                })
            } else if (sixthSeat.status == 'Lost') {
                batch.update(postReference, {
                    'players.sixthSeat.coin': sixthSeat.coin - sixthSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(sixthSeat.userID), {
                    'coin': sixthSeat.coin - sixthSeat.coinBet,
                })
            }
        }
    }

    if (seventhSeat != null) {
        if (seventhSeat.status == 'Win') {
            differentCoin -= seventhSeat.coinBet;
        } else if (seventhSeat.status == 'Lost') {
            differentCoin += seventhSeat.coinBet;
        }

        if (seventhSeat.stillInTheTable) {
            if (seventhSeat.status == 'Win') {
                batch.update(postReference, {
                    'players.seventhSeat.coin': seventhSeat.coin + seventhSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(seventhSeat.userID), {
                    'coin': seventhSeat.coin + seventhSeat.coinBet,
                })
            } else if (seventhSeat.status == 'Lost') {
                batch.update(postReference, {
                    'players.seventhSeat.coin': seventhSeat.coin - seventhSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(seventhSeat.userID), {
                    'coin': seventhSeat.coin - seventhSeat.coinBet,
                })
            }
        }
    }

    if (eighthSeat != null) {
        if (eighthSeat.status == 'Win') {
            differentCoin -= eighthSeat.coinBet;
        } else if (eighthSeat.status == 'Lost') {
            differentCoin += eighthSeat.coinBet;
        }

        if (eighthSeat.stillInTheTable) {
            if (eighthSeat.status == 'Win') {
                batch.update(postReference, {
                    'players.eighthSeat.coin': eighthSeat.coin + eighthSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(eighthSeat.userID), {
                    'coin': eighthSeat.coin + eighthSeat.coinBet,
                })
            } else if (eighthSeat.status == 'Lost') {
                batch.update(postReference, {
                    'players.eighthSeat.coin': eighthSeat.coin - eighthSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(eighthSeat.userID), {
                    'coin': eighthSeat.coin - eighthSeat.coinBet,
                })
            }
        }
    }

    if (ninthSeat != null) {
        if (ninthSeat.status == 'Win') {
            differentCoin -= ninthSeat.coinBet;
        } else if (ninthSeat.status == 'Lost') {
            differentCoin += ninthSeat.coinBet;
        }

        if (ninthSeat.stillInTheTable) {
            if (ninthSeat.status == 'Win') {
                batch.update(postReference, {
                    'players.ninthSeat.coin': ninthSeat.coin + ninthSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(ninthSeat.userID), {
                    'coin': ninthSeat.coin + ninthSeat.coinBet,
                })
            } else if (ninthSeat.status == 'Lost') {
                batch.update(postReference, {
                    'players.ninthSeat.coin': ninthSeat.coin - ninthSeat.coinBet,
                })
                batch.update(firestore().collection('Users').doc(ninthSeat.userID), {
                    'coin': ninthSeat.coin - ninthSeat.coinBet,
                })
            }
        }
    }

    if (tableOwner != null) {
        if (tableOwner.stillInTheTable) {
            batch.update(postReference, {
                'players.tableOwner.coin': tableOwner.coin + differentCoin,
            })
            batch.update(firestore().collection('Users').doc(tableOwner.userID), {
                'coin': tableOwner.coin + differentCoin,
            })
        }
    }
}

const setCoinBetByTableOwner = (listPlayer, tableName, batch, isCommitBatch) => {
    const postReference = firestore().doc(`AllTables/${tableName}`);
    const coinMax = listPlayer.tableOwner.coin / 10;
    for (const key in listPlayer) {
        if (listPlayer[key] != null && key != 'tableOwner') {
            if(!listPlayer[key].stillInTheTable){
                continue;
            }
            let coinBet = listPlayer[key].coinBet;
            switch (key) {
                case 'firstSeat': {
                    let min = Math.min(coinBet, coinMax, listPlayer[key].coin)
                    if (min != coinBet) {
                        batch.update(postReference, {
                            'players.firstSeat.coinBet': min,
                        })
                    }
                    break;
                }
                case 'secondSeat': {
                    let min = Math.min(coinBet, coinMax, listPlayer[key].coin)
                    if (min != coinBet) {
                        batch.update(postReference, {
                            'players.secondSeat.coinBet': min,
                        })
                    }
                    break;
                }
                case 'thirdSeat': {
                    let min = Math.min(coinBet, coinMax, listPlayer[key].coin)
                    if (min != coinBet) {
                        batch.update(postReference, {
                            'players.thirdSeat.coinBet': min,
                        })
                    }
                    break;
                }
                case 'fourthSeat': {
                    let min = Math.min(coinBet, coinMax, listPlayer[key].coin)
                    if (min != coinBet) {
                        batch.update(postReference, {
                            'players.fourthSeat.coinBet': min,
                        })
                    }
                    break;
                }
                case 'fifthSeat': {
                    let min = Math.min(coinBet, coinMax, listPlayer[key].coin)
                    if (min != coinBet) {
                        batch.update(postReference, {
                            'players.fifthSeat.coinBet': min,
                        })
                    }
                    break;
                }
                case 'sixthSeat': {
                    let min = Math.min(coinBet, coinMax, listPlayer[key].coin)
                    if (min != coinBet) {
                        batch.update(postReference, {
                            'players.sixthSeat.coinBet': min,
                        })
                    }
                    break;
                }
                case 'seventhSeat': {
                    let min = Math.min(coinBet, coinMax, listPlayer[key].coin)
                    if (min != coinBet) {
                        batch.update(postReference, {
                            'players.sixthSeat.coinBet': min,
                        })
                    }
                    break;
                }
                case 'eighthSeat': {
                    let min = Math.min(coinBet, coinMax, listPlayer[key].coin)
                    if (min != coinBet) {
                        batch.update(postReference, {
                            'players.sixthSeat.coinBet': min,
                        })
                    }
                    break;
                }
                case 'ninthSeat': {
                    let min = Math.min(coinBet, coinMax, listPlayer[key].coin)
                    if (min != coinBet) {
                        batch.update(postReference, {
                            'players.ninthSeat.coinBet': min,
                        })
                    }
                    break;
                }
            }
        }
    }
    if (isCommitBatch) {
        console.log("Đổi chủ bàn và setCoinBet (Commit)");
        batch.commit();
    }
}

const kickedOffTheTable = (querySnapShot, listPlayer, PlayGame) => {
    if (querySnapShot.data().runningGame) {
        return;
    }
    switch (PlayGame.state.currentSeat) {
        case 1: {
            if (listPlayer.firstSeat.coin < 1000) {
                PlayGame.leaveTable();
                Alert.alert("Bạn bị kích khỏi bàn vì không đủ tiền cược!")
            }
            break;
        }
        case 2: {
            if (listPlayer.secondSeat.coin < 1000) {
                PlayGame.leaveTable();
                Alert.alert("Bạn bị kích khỏi bàn vì không đủ tiền cược!")
            }
            break;
        }
        case 3: {
            if (listPlayer.thirdSeat.coin < 1000) {
                PlayGame.leaveTable();
                Alert.alert("Bạn bị kích khỏi bàn vì không đủ tiền cược!")
            }
            break;
        }
        case 4: {
            if (listPlayer.fourthSeat.coin < 1000) {
                PlayGame.leaveTable();
                Alert.alert("Bạn bị kích khỏi bàn vì không đủ tiền cược!")
            }
            break;
        }
        case 5: {
            if (listPlayer.fifthSeat.coin < 1000) {
                PlayGame.leaveTable();
                Alert.alert("Bạn bị kích khỏi bàn vì không đủ tiền cược!")
            }
            break;
        }
        case 6: {
            if (listPlayer.sixthSeat.coin < 1000) {
                PlayGame.leaveTable();
                Alert.alert("Bạn bị kích khỏi bàn vì không đủ tiền cược!")
            }
            break;
        }
        case 7: {
            if (listPlayer.seventhSeat.coin < 1000) {
                PlayGame.leaveTable();
                Alert.alert("Bạn bị kích khỏi bàn vì không đủ tiền cược!")
            }
            break;
        }
        case 8: {
            if (listPlayer.eighthSeat.coin < 1000) {
                PlayGame.leaveTable();
                Alert.alert("Bạn bị kích khỏi bàn vì không đủ tiền cược!")
            }
            break;
        }
        case 9: {
            if (listPlayer.ninthSeat.coin < 1000) {
                PlayGame.leaveTable();
                Alert.alert("Bạn bị kích khỏi bàn vì không đủ tiền cược!")
            }
            break;
        }
        case 10: {
            if (listPlayer.tableOwner.coin < 1000) {
                PlayGame.leaveTable();
                Alert.alert("Bạn bị kích khỏi bàn vì không đủ tiền cược!")
            }
            break;
        }
    }
}

const resetCountDown = (querySnapShot, listPlayer, tableName, GameContainer) => {
    const postRef = firestore().collection('AllTables').doc(tableName);
    if (querySnapShot.data().runningGame ||
        querySnapShot.data().gameLoop == false || querySnapShot.data().handleEndGame) {

        if (querySnapShot.data().someoneEnteredGame == false) {
            return;
        }
        const batch = firestore().batch();
        for (const key in listPlayer) {
            if (listPlayer[key] != null) {
                if (!listPlayer[key].cardFirst && !listPlayer[key].cardSecond && !listPlayer[key].cardThird && listPlayer[key].isWaiting == false) {
                    switch (key) {
                        case 'firstSeat': {
                            batch.update(postRef, {
                                'players.firstSeat.isWaiting': true,
                            })
                            break;
                        }
                        case 'secondSeat': {
                            batch.update(postRef, {
                                'players.secondSeat.isWaiting': true,
                            })
                            break;
                        }
                        case 'thirdSeat': {
                            batch.update(postRef, {
                                'players.thirdSeat.isWaiting': true,
                            })
                            break;
                        }
                        case 'fourthSeat': {
                            batch.update(postRef, {
                                'players.fourthSeat.isWaiting': true,
                            })
                            break;
                        }
                        case 'fifthSeat': {
                            batch.update(postRef, {
                                'players.fifthSeat.isWaiting': true,
                            })
                            break;
                        }
                        case 'sixthSeat': {
                            batch.update(postRef, {
                                'players.sixthSeat.isWaiting': true,
                            })
                            break;
                        }
                        case 'seventhSeat': {
                            batch.update(postRef, {
                                'players.seventhSeat.isWaiting': true,
                            })
                            break;
                        }
                        case 'eighthSeat': {
                            batch.update(postRef, {
                                'players.eighthSeat.isWaiting': true,
                            })
                            break;
                        }
                        case 'ninthSeat': {
                            batch.update(postRef, {
                                'players.ninthSeat.isWaiting': true,
                            })
                            break;
                        }
                        case 'tableOwner': {
                            batch.update(postRef, {
                                'players.tableOwner.isWaiting': true,
                            })
                            break;
                        }
                    }
                }
            }
        }
        batch.update(postRef, {
            someoneEnteredGame: false,
        })
        console.log("NGười mới vào trong trạng thái đợi (Commit)");
        batch.commit();
        return;
    }

    if (querySnapShot.data().someoneEnteredGame == false) {
        return;
    }

    const batch = firestore().batch();
    batch.update(postRef, {
        someoneEnteredGame: false,
    })

    console.log("Có người mới vào");
    if (listPlayer.firstSeat != null) {
        if (listPlayer.firstSeat.confirmBet) {
            batch.update(postRef, {
                'players.firstSeat.confirmBet': false,
            })
        }
    }

    if (listPlayer.secondSeat != null) {
        if (listPlayer.secondSeat.confirmBet) {
            batch.update(postRef, {
                'players.secondSeat.confirmBet': false,
            })
        }
    }

    if (listPlayer.thirdSeat != null) {
        if (listPlayer.thirdSeat.confirmBet) {
            batch.update(postRef, {
                'players.thirdSeat.confirmBet': false,
            })
        }
    }

    if (listPlayer.fourthSeat != null) {
        if (listPlayer.fourthSeat.confirmBet) {
            batch.update(postRef, {
                'players.fourthSeat.confirmBet': false,
            })
        }
    }

    if (listPlayer.fifthSeat != null) {
        if (listPlayer.fifthSeat.confirmBet) {
            batch.update(postRef, {
                'players.fifthSeat.confirmBet': false,
            })
        }
    }

    if (listPlayer.sixthSeat != null) {
        if (listPlayer.sixthSeat.confirmBet) {
            batch.update(postRef, {
                'players.sixthSeat.confirmBet': false,
            })
        }
    }

    if (listPlayer.seventhSeat != null) {
        if (listPlayer.seventhSeat.confirmBet) {
            batch.update(postRef, {
                'players.seventhSeat.confirmBet': false,
            })
        }
    }

    if (listPlayer.eighthSeat != null) {
        if (listPlayer.eighthSeat.confirmBet) {
            batch.update(postRef, {
                'players.eighthSeat.confirmBet': false,
            })
        }
    }

    if (listPlayer.ninthSeat != null) {
        if (listPlayer.ninthSeat.confirmBet) {
            batch.update(postRef, {
                'players.ninthSeat.confirmBet': false,
            })
        }
    }

    if (listPlayer.tableOwner != null) {
        if (listPlayer.tableOwner.confirmBet) {
            batch.update(postRef, {
                'players.tableOwner.confirmBet': false,
            })
        }
    }
    console.log("Reset CountDown (Commit)");
    batch.commit();
    GameContainer.resetCountDown5s();
}


