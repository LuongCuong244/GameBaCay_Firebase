import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert, ImageBackground ,Image} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import TableItem from "../components/Home/TableItem";
import TableCreate from "../components/Home/TableCreate";
import firestore from "@react-native-firebase/firestore";

let snapShot;

export default class AllTable extends Component {

    state = {
        tables: [],
        listDisplayTable: [],
        widthFlatList: 150,
        widthContainerTable: 200,
        heightContainerTable: 100,
        widthBar: 100,
        createTableShow: false,
        isSelectedAll: true,
        isSelectedNoPassworld: false,
        isSelectedALotOfMoney: false,
        isSelectedMultiplePlayer: false,
    }

    componentDidMount() {
        snapShot = firestore().collection('AllTables').onSnapshot((querySnapshot) => {
            let listTable = [];
            querySnapshot.forEach((doc) => {
                listTable.push(doc.data());
            })
            this.setState({
                tables: listTable,
            })
            if(this.state.isSelectedAll){
                this.loadTableAll();
            }else if(this.state.isSelectedNoPassworld){
                this.loadTableNoPassworld();
            }else if(this.state.isSelectedALotOfMoney){
                this.loadTableALotOfMoney();
            }else if(this.state.isSelectedMultiplePlayer){
                this.loadTableMultiplePlayer();
            }
        }, (error) => {
            console.log(error);
        })
    }

    componentWillUnmount() {
        snapShot();
    }

    isCreateTableShow = (value) => {
        this.setState({
            createTableShow: value
        })
    }

    render() {
        return (
            <ImageBackground 
                style={styles.viewContainer}
                source = {require('../assets/img/Background/Forest.jpg')}
            >

                <TableCreate
                    isShow={this.state.createTableShow}
                    setVisible={this.isCreateTableShow}
                    navigation={this.props.navigation}
                ></TableCreate>

                <View style={styles.titleContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.isCreateTableShow(true);
                        }}
                        activeOpacity={0.5}
                    >
                        <Entypo
                            name='circle-with-plus'
                            size={35}
                            color='rgb(0,255,0)'
                            style={{
                                margin: 5
                            }}
                        ></Entypo>
                    </TouchableOpacity>
                    <Text style={styles.titleText} >Tạo bàn</Text>
                    <View style={styles.viewFind} >
                        <View style={styles.containerFind}>
                            <TextInput
                                style={styles.inputFind}
                                placeholder='Tìm theo tên'
                            ></TextInput>
                            <FontAwesome name="search" color='#9cceef' size={15} ></FontAwesome>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View 
                        style={styles.optionsBarContainer} 
                        onLayout = {(even)=>{
                            this.setState({
                                widthBar: even.nativeEvent.layout.width
                            })
                        }}>
                        <TouchableOpacity
                            activeOpacity = {0.9}
                            onPress = {()=>{
                                if(this.state.isSelectedAll == false){
                                    this.setState({
                                        isSelectedMultiplePlayer: false,
                                        isSelectedAll: true,
                                        isSelectedALotOfMoney: false,
                                        isSelectedNoPassworld: false,
                                    })
                                    this.loadTableAll();
                                }
                            }}
                        >
                            <Image
                                style = {{width: this.state.widthBar*0.8,height: this.state.widthBar*0.8*189/634,marginTop: 30}}
                                source = {this.state.isSelectedAll ? require('../assets/img/Bar/AllBar_On.png') : require('../assets/img/Bar/AllBar_Off.png')}
                            ></Image>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity = {0.9}
                            onPress = {()=>{
                                if(this.state.isSelectedNoPassworld == false){
                                    this.setState({
                                        isSelectedMultiplePlayer: false,
                                        isSelectedAll: false,
                                        isSelectedALotOfMoney: false,
                                        isSelectedNoPassworld: true,
                                    })
                                    this.loadTableNoPassworld();
                                }
                            }}
                        >
                            <Image
                                style = {{width: this.state.widthBar*0.8,height: this.state.widthBar*0.8*189/634,marginTop: 15}}
                                source = {this.state.isSelectedNoPassworld ? require('../assets/img/Bar/NoPassworldBar_On.png') : require('../assets/img/Bar/NoPassworldBar_Off.png')}
                            ></Image>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity = {0.9}
                            onPress = {()=>{
                                if(this.state.isSelectedALotOfMoney == false){
                                    this.setState({
                                        isSelectedMultiplePlayer: false,
                                        isSelectedAll: false,
                                        isSelectedALotOfMoney: true,
                                        isSelectedNoPassworld: false,
                                    })
                                    this.loadTableALotOfMoney();
                                }
                            }}
                        >
                            <Image
                                style = {{width: this.state.widthBar*0.8,height: this.state.widthBar*0.8*189/634,marginTop: 15}}
                                source = {this.state.isSelectedALotOfMoney ? require('../assets/img/Bar/ALotOfMoneyBar_On.png') : require('../assets/img/Bar/ALotOfMoneyBar_Off.png')}
                            ></Image>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity = {0.9}
                            onPress = {()=>{
                                if(this.state.isSelectedMultiplePlayer == false){
                                    this.setState({
                                        isSelectedMultiplePlayer: true,
                                        isSelectedAll: false,
                                        isSelectedALotOfMoney: false,
                                        isSelectedNoPassworld: false,
                                    })
                                    this.loadTableMultiplePlayer();
                                }
                            }}
                        >
                            <Image
                                style = {{width: this.state.widthBar*0.8,height: this.state.widthBar*0.8*189/634,marginTop: 15}}
                                source = {this.state.isSelectedMultiplePlayer ? require('../assets/img/Bar/MultiplayerBar_On.png') : require('../assets/img/Bar/MultiplayerBar_Off.png')}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tableContainer}
                        onLayout={(even) => {
                            this.setState({
                                widthContainerTable: even.nativeEvent.layout.width,
                                heightContainerTable: even.nativeEvent.layout.height
                            })
                        }}
                    >
                        <ImageBackground
                            style={{ flex: 1, padding: '5%' }}
                            source={require('../assets/img/Container/ContainerTable.png')}
                            resizeMode="stretch"
                        >
                            <FlatList
                                data={this.state.listDisplayTable}
                                numColumns={4}
                                onLayout={(even) => {
                                    this.setState({
                                        widthFlatList: even.nativeEvent.layout.width
                                    })
                                }}
                                renderItem={(tableItem) => {
                                    return (
                                        <TableItem
                                            navigation={this.props.navigation}
                                            widthFlatList={this.state.widthFlatList}
                                            tableItem={tableItem.item}
                                        ></TableItem>
                                    )
                                }}
                                style={{ flex: 1, width: '100%' }}
                                keyExtractor={(item) => item.tableName}
                            ></FlatList>
                        </ImageBackground>
                    </View>
                </View>

            </ImageBackground>
        )
    }

    loadTableAll = () =>{
        this.setState({
            listDisplayTable: this.state.tables
        })
    }

    loadTableNoPassworld = () =>{
        this.setState({
            listDisplayTable: this.state.tables.filter(item => item.tablePassword === "")
        })
    }

    loadTableALotOfMoney = () =>{
        this.setState({
            listDisplayTable: this.state.tables.filter(item => item.players.tableOwner.coin > 1000000)
        })
    }

    loadTableMultiplePlayer = () =>{
        this.setState({
            listDisplayTable: this.state.tables.filter(item => item.numberPlayer >= 5)
        })
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: '#95a5a6',
        marginTop: 2,
        flex: 1,
        alignItems: 'center'
    },
    titleContainer: {
        backgroundColor: '#2980b9',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    titleText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    viewFind: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    inputFind: {
        flex: 1,
        height: 50,
        fontSize: 16
    },
    containerFind: {
        width: '80%',
        height: 35,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
        marginRight: 10,
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 10
    },
    createTable: {
        height: 40,
        marginVertical: 5,
        borderRadius: 20,
        backgroundColor: 'rgb(0,200,0)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    textCreateTable: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginHorizontal: 7,
    },
    optionsBarContainer:{
        width: '28%', 
        height: '100%',
        margin: 10,
        alignItems: 'center',
    },
    tableContainer:{
        flex: 1, 
        padding: 5,
    }
})