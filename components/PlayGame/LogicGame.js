import firestore from '@react-native-firebase/firestore'

const listCard = [
    'bich1', 'bich2', 'bich3', 'bich4', 'bich5', 'bich6', 'bich7', 'bich8', 'bich9',
    'co1', 'co2', 'co3', 'co4', 'co5', 'co6', 'co7', 'co8', 'co9',
    'ro1', 'ro2', 'ro3', 'ro4', 'ro5', 'ro6', 'ro7', 'ro8', 'ro9',
    'tep1', 'tep2', 'tep3', 'tep4', 'tep5', 'tep6', 'tep7', 'tep8', 'tep9',
]

const distributeCards = (PlayGame) => {

    console.log("Chia bài");

    let tableName = PlayGame.props.route.params.tableName;
    const postRef = firestore().collection('AllTables').doc(tableName);
    const batch = firestore().batch();

    let list = [].concat(listCard);
    let arr = [];
    let i = 36;
    while (arr.length < 33) {
        let rd = Math.floor(Math.random() * i);
        if (rd >= i) {
            rd = i - 1;
        }
        arr.push(list[rd]);
        list.splice(rd, 1);
        i--;
    }
    let arr1 = arr.slice(0, 3);
    let arr2 = arr.slice(3, 6);
    let arr3 = arr.slice(6, 9);
    let arr4 = arr.slice(9, 12);
    let arr5 = arr.slice(12, 15);
    let arr6 = arr.slice(15, 18);
    let arr7 = arr.slice(18, 21);
    let arr8 = arr.slice(21, 24);
    let arr9 = arr.slice(24, 27);
    let arr10 = arr.slice(27, 30);

    let isWinUser_1 = checkScores(arr1, arr10);
    let isWinUser_2 = checkScores(arr2, arr10);
    let isWinUser_3 = checkScores(arr3, arr10);
    let isWinUser_4 = checkScores(arr4, arr10);
    let isWinUser_5 = checkScores(arr5, arr10);
    let isWinUser_6 = checkScores(arr6, arr10);
    let isWinUser_7 = checkScores(arr7, arr10);
    let isWinUser_8 = checkScores(arr8, arr10);
    let isWinUser_9 = checkScores(arr9, arr10);

    if (PlayGame.state.firstSeat != null) {
        if(PlayGame.state.firstSeat.isWaiting == false){
            batch.update(postRef,{
                'players.firstSeat.cardFirst': arr1[0],
                'players.firstSeat.cardSecond': arr1[1],
                'players.firstSeat.cardThird': arr1[2],
                'players.firstSeat.status': isWinUser_1,
            })
        }
    }

    if (PlayGame.state.secondSeat != null) {
        if(PlayGame.state.secondSeat.isWaiting == false){
            batch.update(postRef,{
                'players.secondSeat.cardFirst': arr2[0],
                'players.secondSeat.cardSecond': arr2[1],
                'players.secondSeat.cardThird': arr2[2],
                'players.secondSeat.status': isWinUser_2,
            })
        }
    }

    if (PlayGame.state.thirdSeat != null) {
        if(PlayGame.state.thirdSeat.isWaiting == false){
            batch.update(postRef,{
                'players.thirdSeat.cardFirst': arr3[0],
                'players.thirdSeat.cardSecond': arr3[1],
                'players.thirdSeat.cardThird': arr3[2],
                'players.thirdSeat.status': isWinUser_3,
            })
        }
    }

    if (PlayGame.state.fourthSeat != null) {
        if(PlayGame.state.fourthSeat.isWaiting == false){
            batch.update(postRef,{
                'players.fourthSeat.cardFirst': arr4[0],
                'players.fourthSeat.cardSecond': arr4[1],
                'players.fourthSeat.cardThird': arr4[2],
                'players.fourthSeat.status': isWinUser_4,
            })
        }
    }

    if (PlayGame.state.fifthSeat != null) {
        if(PlayGame.state.fifthSeat.isWaiting == false){
            batch.update(postRef,{
                'players.fifthSeat.cardFirst': arr5[0],
                'players.fifthSeat.cardSecond': arr5[1],
                'players.fifthSeat.cardThird': arr5[2],
                'players.fifthSeat.status': isWinUser_5,
            })
        }
    }

    if (PlayGame.state.sixthSeat != null) {
        if(PlayGame.state.sixthSeat.isWaiting == false){
            batch.update(postRef,{
                'players.sixthSeat.cardFirst': arr6[0],
                'players.sixthSeat.cardSecond': arr6[1],
                'players.sixthSeat.cardThird': arr6[2],
                'players.sixthSeat.status': isWinUser_6,
            })
        }
    }

    if (PlayGame.state.seventhSeat != null) {
        if(PlayGame.state.seventhSeat.isWaiting == false){
            batch.update(postRef,{
                'players.seventhSeat.cardFirst': arr7[0],
                'players.seventhSeat.cardSecond': arr7[1],
                'players.seventhSeat.cardThird': arr7[2],
                'players.seventhSeat.status': isWinUser_7,
            })
        }
    }

    if (PlayGame.state.eighthSeat != null) {
        if(PlayGame.state.eighthSeat.isWaiting == false){
            batch.update(postRef,{
                'players.eighthSeat.cardFirst': arr8[0],
                'players.eighthSeat.cardSecond': arr8[1],
                'players.eighthSeat.cardThird': arr8[2],
                'players.eighthSeat.status': isWinUser_8,
            })
        }
    }

    if (PlayGame.state.ninthSeat != null) {       
        if(PlayGame.state.ninthSeat.isWaiting == false){
            batch.update(postRef,{
                'players.ninthSeat.cardFirst': arr9[0],
                'players.ninthSeat.cardSecond': arr9[1],
                'players.ninthSeat.cardThird': arr9[2],
                'players.ninthSeat.status': isWinUser_9,
            })
        }
    }

    if (PlayGame.state.tableOwnerSeat != null) {       
        if(PlayGame.state.tableOwnerSeat.isWaiting == false){
            batch.update(postRef,{
                'players.tableOwner.cardFirst': arr10[0],
                'players.tableOwner.cardSecond': arr10[1],
                'players.tableOwner.cardThird': arr10[2],
            })
        }
    }

    batch.commit();
}

const checkScores = (guest, own) => {
    let scoreGuest_1 = parseInt(guest[0].charAt(guest[0].length - 1));
    let scoreGuest_2 = parseInt(guest[1].charAt(guest[1].length - 1));
    let scoreGuest_3 = parseInt(guest[2].charAt(guest[2].length - 1));

    let scoreOwn_1 = parseInt(own[0].charAt(own[0].length - 1));
    let scoreOwn_2 = parseInt(own[1].charAt(own[1].length - 1));
    let scoreOwn_3 = parseInt(own[2].charAt(own[2].length - 1));

    let scoreGuest = (scoreGuest_1 + scoreGuest_2 + scoreGuest_3) % 10;
    let scoreOwn = (scoreOwn_1 + scoreOwn_2 + scoreOwn_3) % 10;

    if (scoreGuest == 0 && scoreOwn != 0) {
        return 'Win';
    }
    if (scoreGuest != 0 && scoreOwn == 0) {
        return 'Lost';
    }
    if (scoreGuest > scoreOwn) {
        return 'Win';
    } else if (scoreGuest < scoreOwn) {
        return 'Lost';
    } else {
        let maxGuest1, maxGuest2, maxGuest3;
        let maxOwn1, maxOwn2, maxOwn3;

        // Tìm lá bài lớn nhất của người chơi
        if (guest[0].indexOf('ro')) {
            if (scoreGuest_1 == 1) {
                return 'Win';
            }
            maxGuest1 = 400 + scoreGuest_1;
        } else if (guest[0].indexOf('co')) {
            maxGuest1 = 300 + scoreGuest_1;
        } else if (guest[0].indexOf('tep')) {
            maxGuest1 = 200 + scoreGuest_1;
        } else {
            maxGuest1 = 100 + scoreGuest_1;
        }
        if (guest[1].indexOf('ro')) {
            if (scoreGuest_2 == 2) {
                return 'Win';
            }
            maxGuest2 = 400 + scoreGuest_2;
        } else if (guest[1].indexOf('co')) {
            maxGuest2 = 300 + scoreGuest_2;
        } else if (guest[1].indexOf('tep')) {
            maxGuest2 = 200 + scoreGuest_2;
        } else {
            maxGuest2 = 100 + scoreGuest_2;
        }
        if (guest[2].indexOf('ro')) {
            if (scoreGuest_3 == 3) {
                return 'Win';
            }
            maxGuest3 = 400 + scoreGuest_3;
        } else if (guest[2].indexOf('co')) {
            maxGuest3 = 300 + scoreGuest_3;
        } else if (guest[2].indexOf('tep')) {
            maxGuest3 = 200 + scoreGuest_3;
        } else {
            maxGuest3 = 100 + scoreGuest_3;
        }

        // Tìm lá bài lớn nhất của chủ bàn
        if (own[0].indexOf('ro')) {
            if (scoreOwn_1 == 1) {
                return 'Win';
            }
            maxOwn1 = 400 + scoreOwn_1;
        } else if (own[0].indexOf('co')) {
            maxOwn1 = 300 + scoreOwn_1;
        } else if (own[0].indexOf('tep')) {
            maxOwn1 = 200 + scoreOwn_1;
        } else {
            maxOwn1 = 100 + scoreOwn_1;
        }
        if (own[1].indexOf('ro')) {
            if (scoreOwn_2 == 2) {
                return 'Win';
            }
            maxOwn2 = 400 + scoreOwn_2;
        } else if (own[1].indexOf('co')) {
            maxOwn2 = 300 + scoreOwn_2;
        } else if (own[1].indexOf('tep')) {
            maxOwn2 = 200 + scoreOwn_2;
        } else {
            maxOwn2 = 100 + scoreOwn_2;
        }
        if (own[2].indexOf('ro')) {
            if (scoreOwn_3 == 3) {
                return 'Win';
            }
            maxOwn3 = 400 + scoreOwn_3;
        } else if (own[2].indexOf('co')) {
            maxOwn3 = 300 + scoreOwn_3;
        } else if (own[2].indexOf('tep')) {
            maxOwn3 = 200 + scoreOwn_3;
        } else {
            maxOwn3 = 100 + scoreOwn_3;
        }

        if (Math.max(maxGuest1, maxGuest2, maxGuest3) > Math.max(maxOwn1, maxOwn2, maxOwn3)) {
            return 'Win';
        } else {
            return 'Lost';
        }
    }
}
module.exports = distributeCards;