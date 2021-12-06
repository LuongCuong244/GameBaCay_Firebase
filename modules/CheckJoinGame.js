import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native';

export default CheckJoinGame = async (TableShow, isTableOwner, tableName) => {

    let dataUser;
    let id = auth().currentUser.uid;
    await firestore().collection('Users').doc(id).get()
        .then((doc) => {
            dataUser = doc.data();
        }).catch((error) => {
            console.log(error);
        })

    if (!dataUser) {
        console.log("Lỗi kết nối với server! (Tại CheckJoinGame.js )")
        return;
    }

    if(dataUser.coin < 1000){
        Alert.alert("Bạn không đủ tiền cược!");
        return;
    }

    firestore().collection('AllTables').doc(tableName).get()
        .then((querydoc) => {

            if (querydoc.data().numberPlayer == 10) {
                Alert.alert("Bàn không có chỗ trống!");
                return;
            }

            let allPlayer = querydoc.data().players;
            // kiểm tra người dùng đã có trong bàn hay chưa ( chưa làm ) 
            for (const key in allPlayer) {
                if (allPlayer[key] == null) {
                    continue;
                }
                if (allPlayer[key].userID == id) {
                    Alert.alert('Đã có trong bàn (Tại CheckJoinGame.js )');
                    return;
                }
            }

            // random chỗ ngồi
            if (isTableOwner == false) {
                let numberPlayer = querydoc.data().numberPlayer
                let emptySeats = [];
                if (!allPlayer.firstSeat) {
                    emptySeats.push(1)
                }
                if (!allPlayer.secondSeat) {
                    emptySeats.push(2)
                }
                if (!allPlayer.thirdSeat) {
                    emptySeats.push(3)
                }
                if (!allPlayer.fourthSeat) {
                    emptySeats.push(4)
                }
                if (!allPlayer.fifthSeat) {
                    emptySeats.push(5)
                }
                if (!allPlayer.sixthSeat) {
                    emptySeats.push(6)
                }
                if (!allPlayer.seventhSeat) {
                    emptySeats.push(7)
                }
                if (!allPlayer.eighthSeat) {
                    emptySeats.push(8)
                }
                if (!allPlayer.ninthSeat) {
                    emptySeats.push(9)
                }
                if (emptySeats.length <= 0) {
                    console.log('Bạn không được vào bàn này! (Tại: CheckJoinGame)')
                    return;
                }
                let value = Math.floor(Math.random() * emptySeats.length);
                if (value >= emptySeats.length) {
                    value = emptySeats.length - 1;
                }
                let item = emptySeats[value];

                TableShow.props.navigation.navigate('PlayGame', {
                    isTableOwner: false,
                    tableName: TableShow.props.tableItem.tableName,
                    numberPlayer: numberPlayer,
                    seatItem: item,
                    dataUser: dataUser,
                });
                TableShow._onClose();
            }            
        }).catch((error) => {
            console.log(error);
        })
}