import React, { Component } from "react";
import { View, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import MessageContainer from "../components/Home/MessageContainer";

let isUseState = true;

export default class WorldChat extends Component {

    state = {
        widthButtonClose: 50,
    }

    componentDidMount(){
        isUseState = true;
    }
    componentWillUnmount(){
        isUseState = false;
    }

    render() {
        return (
            <View style = {{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',justifyContent: 'center',alignItems: 'center'}}>
                <ImageBackground
                    style={styles.viewChat}
                    source={require('../assets/img/Background/BackgroundMessage.png')}
                    onLayout = {(even) =>{
                        if(isUseState){
                            this.setState({
                                widthButtonClose: even.nativeEvent.layout.width
                            })
                        }
                    }}
                >
                    <View style = {{width: '81%',height: "70%"}}>
                        <MessageContainer collection_Path = 'WorldChat' ></MessageContainer>
                    </View>

                    <TouchableOpacity
                        activeOpacity = {1}
                        onPress = {() =>{
                            this.props.hideWorldChat();
                        }}
                    >
                        <View
                            style = {{
                                backgroundColor: 'rgba(255,0,0,0.01)',
                                borderRadius: 100,
                                width: this.state.widthButtonClose*0.13,
                                height: this.state.widthButtonClose*0.13,
                                bottom: '5%',
                                left: '43.5%'
                            }}
                        ></View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    viewChat: {
        height: height*0.8,
        width: height*0.8*724/500,
        flexDirection: 'column-reverse',
        alignItems: 'center',
        justifyContent: 'center'
    }
})