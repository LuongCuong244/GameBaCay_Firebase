import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, ToolbarAndroidComponent, TouchableHighlight, TouchableOpacity, Alert } from "react-native";
import formatCoin from "../../modules/FormatCoin";

export default class ShowChangeBet extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.titleView}>
                    <Text style={styles.textTitleStyle}>ĐẶT MỨC CƯỢC</Text>
                </View>
                <View style={{ width: '100%', height: '12%', backgroundColor: 'rgb(0,128,255)', marginVertical: 2, flexDirection: 'row', }} >
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, borderRightColor: 'gray', borderRightWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#ffd700', fontWeight: 'bold', fontStyle: 'italic' }} >Min: </Text>
                        <Text style={{ color: 'white', fontWeight: 'bold' }} >1.000</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, borderLeftColor: 'gray', borderLeftWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#ffd700', fontWeight: 'bold', fontStyle: 'italic' }} >Max: </Text>
                        <Text style={{ color: 'white', fontWeight: 'bold' }} >{formatCoin(this.props.tableOwnerSeat.coin / 10)}</Text>
                    </View>
                </View>

                <Text style={{ fontStyle: 'italic', color: 'black', textAlign: 'center', width: '100%' }}>Đặt bằng phần trăm số tiền hiện có</Text>

                <View style={{ flex: 1, width: '100%' }}>
                    <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.updateCoinBet(this.props.coinTotal * 0.02);
                            }}
                            style={styles.styleButtonPercent}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                <Text>2%</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.updateCoinBet(this.props.coinTotal * 0.05);
                            }}
                            style={styles.styleButtonPercent}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                <Text>5%</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.updateCoinBet(this.props.coinTotal * 0.1);
                            }}
                            style={styles.styleButtonPercent}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                <Text>10%</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.updateCoinBet(this.props.coinTotal * 0.2);
                            }}
                            style={styles.styleButtonPercent}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                <Text>20%</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.updateCoinBet(this.props.coinTotal * 0.3);
                            }}
                            style={styles.styleButtonPercent}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                <Text>30%</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.updateCoinBet(this.props.coinTotal * 0.5);
                            }}
                            style={styles.styleButtonPercent}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                <Text>50%</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.updateCoinBet(this.props.coinTotal * 0.8);
                            }}
                            style={styles.styleButtonPercent}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                <Text>80%</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.updateCoinBet(this.props.coinTotal);
                            }}
                            style={styles.styleButtonPercent}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                <Text>100%</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ width: '100%', height: 45, borderTopColor: 'gray', borderTopWidth: 1, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, flexDirection: 'row', alignItems: 'center' }} >
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 15, fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', color: 'red' }}>Đang cược: </Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'blue' }} >{formatCoin(this.props.coinBet)}</Text>
                    </View>
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

const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height

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
    styleButtonPercent: {
        height: '60%',
        width: '20%',
        marginVertical: 3,
        marginHorizontal: 5,
        backgroundColor: 'cyan',
        borderRadius: 100,
    },
    textPercent: {
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    }
})