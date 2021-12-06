import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import formatCoin from "../../modules/FormatCoin";

export default class ShowBetNotification extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.titleView}>
                    <Text style={styles.textTitleStyle}>THÔNG BÁO</Text>
                </View>
                <Text style={styles.textNotification}>Bạn có 10s để thay đổi mức cược trước khi ván đấu bắt đầu</Text>

                <View style={{ width: "100%", height: '32%', backgroundColor: 'pink', marginTop: 10, alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'red', marginHorizontal: 10 }} >Bạn đang cược:</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'blue', marginHorizontal: 10 }} >{formatCoin(this.props.coinBet)}</Text>
                </View>

                <View style={styles.containerButton} >
                    <TouchableOpacity
                        onPress={() => {
                            this.props.showFormSetBet();
                        }}
                        style={{ flex: 1, alignItems: 'center' }}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.styleButton, { backgroundColor: 'tomato' }]} >
                            <Text style={styles.styleTextButton} >ĐỔI MỨC CƯỢC</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.completeTheBet();
                        }}
                        style={{ flex: 1, alignItems: 'center' }}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.styleButton, { backgroundColor: 'green' }]} >
                            <Text style={styles.styleTextButton} >CHỐT NGAY</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleView: {
        width: '100%',
        height: '20%',
        borderColor: 'gray',
        borderRightColor: 0.5,
        backgroundColor: 'tomato',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    textNotification: {
        textAlign: 'center',
        fontSize: 15,
        fontStyle: 'italic',
        color: 'black',
        padding: 5
    },
    containerButton: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 15
    },
    styleButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '70%',
        height: "77%"
    },
    styleTextButton: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
})