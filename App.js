import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from "./screens/LogIn";
import SetName from "./screens/SetName";
import { Alert, BackHandler, StatusBar, View } from 'react-native';
import Home from "./screens/Home";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import PlayGame from "./screens/PlayGame";
import AllTable from "./screens/AllTable";
import LeaderBoards from "./screens/LeaderBoards";
//import database from '@react-native-firebase/database';

const Stack = createNativeStackNavigator();

const showAlert = () =>
  Alert.alert(
    "Tài khoản của bạn đã bị tạm ngưng vĩnh viễn.",
    [
      {
        text: "OK",
        onPress: () => BackHandler.exitApp(),
        style: "cancel",
      },
    ]
  );

export default class App extends Component {

  componentDidMount() {
    console.log('Kiểm tra sự tồn tại người dùng');
    if (auth().currentUser) {
      let uid = auth().currentUser.uid;
      auth().currentUser.reload() // load lại người dùng, phòng trường hợp đã bị xóa bởi quản trị viên trên firebase
        .catch((error) => {
          if (error.code == 'auth/user-not-found') { // người dùng có thể đã bị xóa
            console.log('Đã xóa');
            // xóa luôn ở database
            firestore().collection('Users').doc(`${uid}`).delete().catch((error) => { console.log("Lỗi khi xóa dữ liệu trên firestore"); })
            //
            showAlert();
          } else if (error.code == 'auth/user-disabled') {
            console.log('Đã ẩn');
            showAlert();
          }
        });
    }

    // const userId = auth().currentUser.uid;

    // const reference = database().ref(`/online/${userId}`);
    // // Set the /users/:userId value to true
    // reference.set(true).then(() => console.log('Online presence set'));

    // // Remove the node whenever the client disconnects
    // reference
    //   .onDisconnect()
    //   .remove()
    //   .then(() => console.log('On disconnect function configured.'));
  }

  render() {
    return (
      <NavigationContainer >
        <StatusBar hidden ></StatusBar>
        {auth().currentUser != null ? (
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
            <Stack.Screen name="SetName" component={SetName} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='AllTable' component={AllTable} options={{ headerShown: false }} />
            <Stack.Screen name='PlayGame' component={PlayGame} options={{ headerShown: false }} />
            <Stack.Screen name='LeaderBoards' component={LeaderBoards} options={{title: 'Bảng xếp hạng'}} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName='LogIn'>
            <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
            <Stack.Screen name="SetName" component={SetName} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='AllTable' component={AllTable} options={{ headerShown: false }} />
            <Stack.Screen name='PlayGame' component={PlayGame} options={{ headerShown: false }} />
            <Stack.Screen name='LeaderBoards' component={LeaderBoards} options={{title: 'Bảng xếp hạng'}} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    )
  }
}