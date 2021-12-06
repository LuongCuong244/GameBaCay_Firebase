const handleEndGame = (querySnapShot, listPlayer, tableName, GameContainer) => {
    if (querySnapShot.data().confirmEndGame) {
        firestore().collection('AllTables').doc(tableName).update({
            confirmEndGame: false,
        }).then(() => {
            console.log("Xử lý EndGame");
            if (GameContainer.refTableOwner.current) {
                GameContainer.refTableOwner.current.clearInterval20s();
            }
            GameContainer.setRunningGame(false);
            handleCardAndCoin(querySnapShot, listPlayer, tableName, GameContainer);
        })
    }
}

const handleCardAndCoin = (querySnapShot, listPlayer, tableName, GameContainer) => {
    differentCoinBet(listPlayer, tableName);

    setTimeout(() => {
        for (const key in listPlayer) {
            if (listPlayer[key] != null) {
                switch (key) {
                    case 'firstSeat': {
                        firestore().collection('AllTables').doc(tableName).update({
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
                        firestore().collection('AllTables').doc(tableName).update({
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
                        firestore().collection('AllTables').doc(tableName).update({
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
                        firestore().collection('AllTables').doc(tableName).update({
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
                        firestore().collection('AllTables').doc(tableName).update({
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
                        firestore().collection('AllTables').doc(tableName).update({
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
                        firestore().collection('AllTables').doc(tableName).update({
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
                        firestore().collection('AllTables').doc(tableName).update({
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
                        firestore().collection('AllTables').doc(tableName).update({
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
                        firestore().collection('AllTables').doc(tableName).update({
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
        setNewGame(querySnapShot, GameContainer, listPlayer, tableName);
    }, 3000);
}

const differentCoinBet = (listPlayer, tableName) => {
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
                firestore().collection('AllTables').doc(tableName).update({
                    'players.firstSeat.coin': firstSeat.coin + firstSeat.coinBet,
                })
                firestore().collection('Users').doc(firstSeat.userID).update({
                    'coin': firstSeat.coin + firstSeat.coinBet,
                })
            } else if (firstSeat.status == 'Lost') {
                firestore().collection('AllTables').doc(tableName).update({
                    'players.firstSeat.coin': firstSeat.coin - firstSeat.coinBet,
                })
                firestore().collection('Users').doc(firstSeat.userID).update({
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
                firestore().collection('AllTables').doc(tableName).update({
                    'players.secondSeat.coin': secondSeat.coin + secondSeat.coinBet,
                })
                firestore().collection('Users').doc(secondSeat.userID).update({
                    'coin': secondSeat.coin + secondSeat.coinBet,
                })
            } else if (secondSeat.status == 'Lost') {
                firestore().collection('AllTables').doc(tableName).update({
                    'players.secondSeat.coin': secondSeat.coin - secondSeat.coinBet,
                })
                firestore().collection('Users').doc(secondSeat.userID).update({
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
                firestore().collection('AllTables').doc(tableName).update({
                    'players.thirdSeat.coin': thirdSeat.coin + thirdSeat.coinBet,
                })
                firestore().collection('Users').doc(thirdSeat.userID).update({
                    'coin': thirdSeat.coin + thirdSeat.coinBet,
                })
            } else if (thirdSeat.status == 'Lost') {
                firestore().collection('AllTables').doc(tableName).update({
                    'players.thirdSeat.coin': thirdSeat.coin - thirdSeat.coinBet,
                })
                firestore().collection('Users').doc(thirdSeat.userID).update({
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
                firestore().collection('AllTables').doc(tableName).update({
                    'players.fourthSeat.coin': fourthSeat.coin + fourthSeat.coinBet,
                })
                firestore().collection('Users').doc(fourthSeat.userID).update({
                    'coin': fourthSeat.coin + fourthSeat.coinBet,
                })
            } else if (fourthSeat.status == 'Lost') {
                firestore().collection('AllTables').doc(tableName).update({
                    'players.fourthSeat.coin': fourthSeat.coin - fourthSeat.coinBet,
                })
                firestore().collection('Users').doc(fourthSeat.userID).update({
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
                firestore().collection('AllTables').doc(tableName).update({
                    'players.fifthSeat.coin': fifthSeat.coin + fifthSeat.coinBet,
                })
                firestore().collection('Users').doc(fifthSeat.userID).update({
                    'coin': fifthSeat.coin + fifthSeat.coinBet,
                })
            } else if (fifthSeat.status == 'Lost') {
                firestore().collection('AllTables').doc(tableName).update({
                    'players.fifthSeat.coin': fifthSeat.coin - fifthSeat.coinBet,
                })
                firestore().collection('Users').doc(fifthSeat.userID).update({
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
                firestore().collection('AllTables').doc(tableName).update({
                    'players.sixthSeat.coin': sixthSeat.coin + sixthSeat.coinBet,
                })
                firestore().collection('Users').doc(sixthSeat.userID).update({
                    'coin': sixthSeat.coin + sixthSeat.coinBet,
                })
            } else if (sixthSeat.status == 'Lost') {
                firestore().collection('AllTables').doc(tableName).update({
                    'players.sixthSeat.coin': sixthSeat.coin - sixthSeat.coinBet,
                })
                firestore().collection('Users').doc(sixthSeat.userID).update({
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
                firestore().collection('AllTables').doc(tableName).update({
                    'players.seventhSeat.coin': seventhSeat.coin + seventhSeat.coinBet,
                })
                firestore().collection('Users').doc(seventhSeat.userID).update({
                    'coin': seventhSeat.coin + seventhSeat.coinBet,
                })
            } else if (seventhSeat.status == 'Lost') {
                firestore().collection('AllTables').doc(tableName).update({
                    'players.seventhSeat.coin': seventhSeat.coin - seventhSeat.coinBet,
                })
                firestore().collection('Users').doc(seventhSeat.userID).update({
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
                firestore().collection('AllTables').doc(tableName).update({
                    'players.eighthSeat.coin': eighthSeat.coin + eighthSeat.coinBet,
                })
                firestore().collection('Users').doc(eighthSeat.userID).update({
                    'coin': eighthSeat.coin + eighthSeat.coinBet,
                })
            } else if (eighthSeat.status == 'Lost') {
                firestore().collection('AllTables').doc(tableName).update({
                    'players.eighthSeat.coin': eighthSeat.coin - eighthSeat.coinBet,
                })
                firestore().collection('Users').doc(eighthSeat.userID).update({
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
                firestore().collection('AllTables').doc(tableName).update({
                    'players.ninthSeat.coin': ninthSeat.coin + ninthSeat.coinBet,
                })
                firestore().collection('Users').doc(ninthSeat.userID).update({
                    'coin': ninthSeat.coin + ninthSeat.coinBet,
                })
            } else if (ninthSeat.status == 'Lost') {
                firestore().collection('AllTables').doc(tableName).update({
                    'players.ninthSeat.coin': ninthSeat.coin - ninthSeat.coinBet,
                })
                firestore().collection('Users').doc(ninthSeat.userID).update({
                    'coin': ninthSeat.coin - ninthSeat.coinBet,
                })
            }
        }
    }

    if (tableOwner != null) {
        if (tableOwner.stillInTheTable) {
            firestore().collection('AllTables').doc(tableName).update({
                'players.tableOwner.coin': tableOwner.coin + differentCoin,
            })
            firestore().collection('Users').doc(tableOwner.userID).update({
                'coin': tableOwner.coin + differentCoin,
            })
        }
    }
}

const setNewGame = (querySnapShot, GameContainer, listPlayer, tableName) => {
    // Nếu người chơi không ở trong bàn thì Out.
    // Người chơi cược trên mức coin Chủ bàn / 10 thì set về coin Chủ bàn / 10,
    // Chủ bàn dưới 10k vàng thì xuống làm người chơi.
    const postReference = firestore().collection('AllTables').doc(tableName);

    let numberPlayer = 0;
    for (const key in listPlayer) {
        if (listPlayer[key] != null && key != 'tableOwner') {
            switch (key) {
                case 'firstSeat': {
                    if (listPlayer[key].stillInTheTable == false) {
                        firestore().collection('AllTables').doc(tableName).update({
                            'numberPlayer': querySnapShot.data().numberPlayer - 1,
                            'players.firstSeat': null,
                        }).then(() =>{
                            console.log("Xóa 1");
                        })
                        .catch((error) => {
                            console.log(error, ' Tại: SnapShotDocTable.js (setNewGame)');
                        })
                    } else {
                        numberPlayer++;
                    }
                    break;
                }
                case 'secondSeat': {
                    if (listPlayer[key].stillInTheTable == false) {
                        if (listPlayer[key].stillInTheTable == false) {
                            firestore().collection('AllTables').doc(tableName).update({
                                'numberPlayer': querySnapShot.data().numberPlayer - 1,
                                'players.secondSeat': null,
                            }).then(() =>{
                                console.log("Xóa 2");
                            })
                            .catch((error) => {
                                console.log(error, ' Tại: SnapShotDocTable.js (setNewGame)');
                            })
                        } else {
                            numberPlayer++;
                        }
                    } else {
                        numberPlayer++;
                    }
                    break;
                }
                case 'thirdSeat': {
                    if (listPlayer[key].stillInTheTable == false) {
                        if (listPlayer[key].stillInTheTable == false) {
                            firestore().collection('AllTables').doc(tableName).update({
                                'numberPlayer': querySnapShot.data().numberPlayer - 1,
                                'players.thirdSeat': null,
                            }).then(() =>{
                                console.log("Xóa 3");
                            })
                            .catch((error) => {
                                console.log(error, ' Tại: SnapShotDocTable.js (setNewGame)');
                            })
                        } else {
                            numberPlayer++;
                        }
                    } else {
                        numberPlayer++;
                    }
                    break;
                }
                case 'fourthSeat': {
                    if (listPlayer[key].stillInTheTable == false) {
                        if (listPlayer[key].stillInTheTable == false) {
                            firestore().collection('AllTables').doc(tableName).update({
                                'numberPlayer': querySnapShot.data().numberPlayer - 1,
                                'players.fourthSeat': null,
                            }).then(() =>{
                                console.log("Xóa 4");
                            })
                            .catch((error) => {
                                console.log(error, ' Tại: SnapShotDocTable.js (setNewGame)');
                            })
                        } else {
                            numberPlayer++;
                        }
                    } else {
                        numberPlayer++;
                    }
                    break;
                }
                case 'fifthSeat': {
                    if (listPlayer[key].stillInTheTable == false) {
                        if (listPlayer[key].stillInTheTable == false) {
                            firestore().collection('AllTables').doc(tableName).update({
                                'numberPlayer': querySnapShot.data().numberPlayer - 1,
                                'players.fifthSeat': null,
                            }).then(() =>{
                                console.log("Xóa 5");
                            })
                            .catch((error) => {
                                console.log(error, ' Tại: SnapShotDocTable.js (setNewGame)');
                            })
                        } else {
                            numberPlayer++;
                        }
                    } else {
                        numberPlayer++;
                    }
                    break;
                }
                case 'sixthSeat': {
                    if (listPlayer[key].stillInTheTable == false) {
                        if (listPlayer[key].stillInTheTable == false) {
                            firestore().collection('AllTables').doc(tableName).update({
                                'numberPlayer': querySnapShot.data().numberPlayer - 1,
                                'players.sixthSeat': null,
                            }).then(() =>{
                                console.log("Xóa 6");
                            })
                            .catch((error) => {
                                console.log(error, ' Tại: SnapShotDocTable.js (setNewGame)');
                            })
                        } else {
                            numberPlayer++;
                        }
                    } else {
                        numberPlayer++;
                    }
                    break;
                }
                case 'seventhSeat': {
                    if (listPlayer[key].stillInTheTable == false) {
                        if (listPlayer[key].stillInTheTable == false) {
                            firestore().collection('AllTables').doc(tableName).update({
                                'numberPlayer': querySnapShot.data().numberPlayer - 1,
                                'players.seventhSeat': null,
                            }).then(() =>{
                                console.log("Xóa 7");
                            })
                            .catch((error) => {
                                console.log(error, ' Tại: SnapShotDocTable.js (setNewGame)');
                            })
                        } else {
                            numberPlayer++;
                        }
                    } else {
                        numberPlayer++;
                    }
                    break;
                }
                case 'eighthSeat': {
                    if (listPlayer[key].stillInTheTable == false) {
                        if (listPlayer[key].stillInTheTable == false) {
                            firestore().collection('AllTables').doc(tableName).update({
                                'numberPlayer': querySnapShot.data().numberPlayer - 1,
                                'players.eighthSeat': null,
                            }).then(() =>{
                                console.log("Xóa 8");
                            })
                            .catch((error) => {
                                console.log(error, ' Tại: SnapShotDocTable.js (setNewGame)');
                            })
                        } else {
                            numberPlayer++;
                        }
                    } else {
                        numberPlayer++;
                    }
                    break;
                }
                case 'ninthSeat': {
                    if (listPlayer[key].stillInTheTable == false) {
                        if (listPlayer[key].stillInTheTable == false) {
                            firestore().collection('AllTables').doc(tableName).update({
                                'numberPlayer': querySnapShot.data().numberPlayer - 1,
                                'players.ninthSeat': null,
                            }).then(() =>{
                                console.log("Xóa 9");
                            })
                            .catch((error) => {
                                console.log(error, ' Tại: SnapShotDocTable.js (setNewGame)');
                            })
                        } else {
                            numberPlayer++;
                        }
                    } else {
                        numberPlayer++;
                    }
                    break;
                }
            }
        }

        if (listPlayer.tableOwner != null) {
            if (listPlayer.tableOwner.stillInTheTable) {
                console.log("Chủ bàn vẫn còn ở đây");
                numberPlayer++;
                setCoinBetByTableOwner(listPlayer, tableName);
                if (numberPlayer < 2) {
                    firestore().collection('AllTables').doc(tableName).update({
                        gameLoop: false,
                    })
                } else {
                    console.log("HandleCardAndCoin: 5s");
                    GameContainer.countDown5sNewGame();
                }
            } else {
                console.log("Chủ bàn ko còn");
                firestore().collection('AllTables').doc(tableName).update({
                    'numberPlayer': queryDoc.data().numberPlayer - 1,
                    'players.tableOwner': null,
                })
            }
        }
    }
}

const setCoinBetByTableOwner = (listPlayer, tableName) => {
    const postReference = firestore().doc(`AllTables/${tableName}`);
    const batch = firestore().batch();
    const coinMax = listPlayer.tableOwner.coin / 10;
    for (const key in listPlayer) {
        if (listPlayer[key] != null && key != 'tableOwner') {
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
    batch.commit();
}

module.exports = handleEndGame;