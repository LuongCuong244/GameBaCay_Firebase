import { firebase } from "@react-native-firebase/firestore";
import React, { Component } from "react";
import { ImageBackground, TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";
import RatingItem from "../components/Home/RatingItem";
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

let isUseState = true;

export default class LeaderBoards extends Component {

    state = {
        isSelectedTransaction: true,
        isSelectedLucky: false,
        isSelectedAchievements: false,
        listPlayersTransaction: [],
        listPlayersLucky: [],
        listPlayersAchievements: [],
        currentUserTransaction: null,
        currentUserLucky: null,
        currentUserAchievements: null,
    }

    componentDidMount() {
        isUseState = true;
        firestore().collection('Users').get()
        .then((query) =>{
            let listPlayer = [];
            query.forEach((queryDoc) =>{
                listPlayer.push(queryDoc.data());
            })
            listPlayer.sort((a,b) => b.coin - a.coin);
            let listPlayersTransaction = [];
            listPlayer.forEach((item,index) =>{
                if(index < 100){
                    listPlayersTransaction.push({
                        coin: item.coin,
                        avatar: item.avatar,
                        name: item.name,
                        userID: item.userID,
                    })
                }
                if(item.userID == auth().currentUser.uid && isUseState){
                    this.setState({
                        currentUserTransaction:{
                            coin: item.coin,
                            avatar: item.avatar,
                            name: item.name,
                            userID: item.userID,
                            index: index,
                        }
                    })
                }
            })
            if(isUseState){
                this.setState({
                    listPlayersTransaction: listPlayersTransaction
                })
            }
        })
    }

    componentWillUnmount() {
        isUseState = false;
    }

    clickButtonTransaction = () => {
        if (this.state.isSelectedTransaction === false && isUseState) {
            this.setState({
                isSelectedTransaction: true,
                isSelectedLucky: false,
                isSelectedAchievements: false,
            })
        }
    }

    clickButtonLucky = () => {
        if (this.state.isSelectedLucky === false && isUseState) {
            this.setState({
                isSelectedTransaction: false,
                isSelectedLucky: true,
                isSelectedAchievements: false,
            })
        }
    }

    clickButtonAchievement = () => {
        if (this.state.isSelectedAchievements === false && isUseState) {
            this.setState({
                isSelectedTransaction: false,
                isSelectedLucky: false,
                isSelectedAchievements: true,
            })
        }
    }

    rankCurrent = () =>{
        if(this.state.isSelectedTransaction && this.state.currentUserTransaction){
            return(
                <RatingItem item={this.state.currentUserTransaction} index={this.state.currentUserTransaction.index + 1} ofFlatList = {false} ></RatingItem>
            )
        }

        if(this.state.isSelectedLucky && this.state.currentUserLucky){
            return(
                <RatingItem item={this.state.currentUserLucky} index={this.state.currentUserLucky.index + 1} ofFlatList = {false} ></RatingItem>
            )
        }

        if(this.state.isSelectedAchievements && this.state.currentUserAchievements){
            return(
                <RatingItem item={this.state.currentUserAchievements} index={this.state.currentUserAchievements.index + 1} ofFlatList = {false} ></RatingItem>
            )
        }
    }

    render() {
        return (
            <ImageBackground
                style={{ flex: 1, flexDirection: 'row' }}
                source={require('../assets/img/Background/LeaderBoards.png')}
            >
                <View style={{ width: '30%', height: '100%', alignItems: 'center' }} >
                    <TouchableOpacity
                        style={[
                            styles.buttonStyle,
                            {
                                marginTop: 40,
                                backgroundColor: this.state.isSelectedTransaction ? '#eb4d4a' : '#95afc0',
                                borderColor: this.state.isSelectedTransaction ? 'cyan' : '#f9ca24'
                            }]}
                        activeOpacity={0.7}
                        onPress={() => {
                            this.clickButtonTransaction();
                        }}
                    >
                        <View style={styles.buttonView}>
                            <Text style={[
                                styles.buttonText,
                                {
                                    color: this.state.isSelectedTransaction ? 'white' : 'black'
                                }]}>Tiền giao dịch</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.buttonStyle,
                            {
                                backgroundColor: this.state.isSelectedLucky ? '#eb4d4a' : '#95afc0',
                                borderColor: this.state.isSelectedLucky ? 'cyan' : '#f9ca24'
                            }]}
                        activeOpacity={0.7}
                        onPress={() => {
                            this.clickButtonLucky();
                        }}
                    >
                        <View style={styles.buttonView}>
                            <Text style={[
                                styles.buttonText,
                                {
                                    color: this.state.isSelectedLucky ? 'white' : 'black'
                                }]}>Top nhân phẩm</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.buttonStyle,
                            {
                                backgroundColor: this.state.isSelectedAchievements ? '#eb4d4a' : '#95afc0',
                                borderColor: this.state.isSelectedAchievements ? 'cyan' : '#f9ca24'
                            }]}
                        activeOpacity={0.7}
                        onPress={() => {
                            this.clickButtonAchievement();
                        }}
                    >
                        <View style={styles.buttonView}>
                            <Text style={[
                                styles.buttonText,
                                {
                                    color: this.state.isSelectedAchievements ? 'white' : 'black'
                                }]}>Top thành tích</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, padding: 10 }} >
                    <View style={[styles.headersBoard, { height: 30, flexDirection: 'row' }]}>
                        <View style={{ height: '100%', width: '22%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#34616b', fontSize: 12, fontWeight: 'bold', left: '8%' }} >HẠNG</Text>
                        </View>
                        <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#34616b', fontSize: 12, fontWeight: 'bold', left: '8%' }} >NGƯỜI CHƠI</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#34616b', fontSize: 12, fontWeight: 'bold', right: '5%' }} >{this.state.isSelectedTransaction ? 'TỔNG TIỀN' : (this.state.isSelectedAchievements ? 'SỐ LƯỢNG' : 'TỶ LỆ')}</Text>
                        </View>
                    </View>

                    <FlatList
                        data={this.state.isSelectedTransaction ? this.state.listPlayersTransaction : (this.state.isSelectedAchievements ? this.state.listPlayersAchievements : this.state.listPlayersLucky)}
                        renderItem={(item) => {
                            return (
                                <RatingItem item={item.item} index={item.index + 1} ofFlatList = {true}></RatingItem>
                            )
                        }}
                        style={{ flex: 1 }}
                    ></FlatList>
                    <View style = {{height: 15}} ></View>
                    {
                        this.rankCurrent()
                    }
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: '90%',
        height: 40,
        backgroundColor: '#95afc0',
        marginVertical: 10,
        borderRadius: 100,
        borderColor: '#f9ca24',
        borderWidth: 1
    },
    buttonView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 15,
    },
    headersBoard: {
        backgroundColor: '#cedde2',
        width: '100%',
        height: 45,
    }
})