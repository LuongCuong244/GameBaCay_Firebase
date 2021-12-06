import React, { Component } from "react";
import { View, Text, StyleSheet, Image} from "react-native";
import formatCoinByLetter from "../../modules/FormatCoinByLetter";
import auth from '@react-native-firebase/auth'

export default class RatingItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 1,
                    backgroundColor: (this.props.ofFlatList === false || this.props.item.userID == auth().currentUser.uid ) ? '#31336c' : '#e1eaef',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5,
                }}>
                    <View style={{ height: '100%', width: '22%', backgroundColor: 'white', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 18, fontStyle: 'italic', fontWeight: 'bold', color: '#34616b' }}># {this.props.index}</Text>
                    </View>
                    <View style={{ height: '100%', width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            style={{ width: 30, height: 30, marginLeft: 10 }}
                            source={{ uri: this.props.item.avatar }}
                        ></Image>
                        <Text style={{ 
                            fontSize: 14, 
                            color: (this.props.ofFlatList === false || this.props.item.userID == auth().currentUser.uid ) ? 'white' : '#34616b', 
                            marginLeft: 10 
                        }}>{this.props.item.name}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} >
                        <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#dcb109' }}>{formatCoinByLetter(this.props.item.coin)}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

//'#31336c', // màu tím

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#cedde2',
        width: '100%',
        height: 45,
        padding: 1,
        paddingHorizontal: 3,
        borderColor: '#cedfe6',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: '#c7d4d9',
    }
})