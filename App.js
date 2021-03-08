// React & React Native
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Keyboard, StyleSheet, Text, View, Modal, Button} from 'react-native';
//React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// Components & Constants
import Header from './components/Header';
import Didnt from './screens/didnt.js';
import Details from './screens/details';
// import Modal from 'react-native-modal';
import {globalStyles} from './constants/styles';
import Colors from './constants/colors';
import {TaskInfo} from './components/TaskAdder';
import Task from './components/Task';
// Redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const Stack = createStackNavigator();

const initialState = {
    counter: [{title: 'hello world', description: 'I am Iron Man', key: '616'}],
}
const reducer = (state = initialState, action) => {
    //const {taskList} = state;
    switch (action.type) {
        case 'INCREASE_COUNTER':
            state.counter.push(action.payload);
            console.log(JSON.stringify(state.counter))
            return {counter: state.counter};
        case 'DECREASE_COUNTER':
            state.counter = state.counter.filter((obj) => obj.key !== action.payload.key)
        default:
            return state;
    }
    const newState = {taskList};
    return newState;
}
const store = createStore(reducer)
export default class App extends React.Component {
 
    
    render(){
        return (
            <Provider store = {store} >
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Didnt">
                        <Stack.Screen name="Didnt" component={Didnt} options={{ 
                            title: "Didn't",
                            headerStyle: {
                                backgroundColor: Colors.primary,
                                },
                                headerTintColor: 'white',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                    fontSize: 30
                                }}} />
                        <Stack.Screen name="Details" component={Details} options={{ 
                            title: 'Details',
                            headerStyle: {
                                backgroundColor: Colors.primary,
                                },
                                headerTintColor: 'white',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                    fontSize: 30
                                }}} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}

