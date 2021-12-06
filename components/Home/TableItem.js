import React, { Component } from "react";
import { ImageBackground, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import TableShow from "./TableShow";

export default class TableItem extends Component {

    state = {
        showInformationTable: false,
    }

    isCreateTableShow = (value) => {
        this.setState({
            showInformationTable: value
        })
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.setState({
                        showInformationTable: true,
                    })
                }}
                style={{ padding: 25 }}
                activeOpacity={0.5}
            >
                <TableShow
                    isShow={this.state.showInformationTable}
                    setVisible={this.isCreateTableShow}
                    tableItem={this.props.tableItem}
                    navigation={this.props.navigation}
                ></TableShow>

                <ImageBackground
                    style={{ width: this.props.widthFlatList / 3 - 50, height: (this.props.widthFlatList / 3 - 50)*308/334, justifyContent: 'center'}}
                    source={require('../../assets/img/Icon/Table.png')} 
                >
                    <View
                        style = {[{width: (this.props.widthFlatList / 3 - 50)*0.27,height: (this.props.widthFlatList / 3 - 50)*0.27},styles.containerTextNumber]}
                    >
                        <Text style = {styles.textNumberPlayer} >{this.props.tableItem.numberPlayer}</Text>
                    </View>
                    <Text style = {styles.tableName} >{this.props.tableItem.tableName}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    tableName: {
        textAlign: 'center',
        height: '20%',
        fontSize: 10,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: 'white',
        top: '26%',
    },
    containerTextNumber:{
        left: '19%',
        top: '7%'  
    },
    textNumberPlayer: {
        flex: 1,
        borderRadius: 100,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        bottom: '74%',
        left: '135%'    
    }
})