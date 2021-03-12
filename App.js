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
import SwipeNav from './navigation/SwipeNav';

const Stack = createStackNavigator();
let newList = [];
let index = 0;
const initialState = {
    refresh: true,
    didntList: [{title: 'I am Iron Man', description: 'I Love You 3000', key: '616', screen: 'didnt'}],
    doingList: [{title: 'I am Iron Man', description: 'I Love You 3000', key: '616', screen: 'doing'}],
    doneList: [{title: 'I am Iron Man', description: 'I Love You 3000', key: '616', screen: 'done'}],
}
const reducer = (state = initialState, action) => {
    
    let refreshScreen = !state.refresh;
    switch (action.type) {
        case 'ADD':
            let task = action.payload;
            task.key = Date.now().toString();
            state.didntList.push(task);
            //alert(JSON.stringify(action.payload));
            //console.log(JSON.stringify(state.counter));
            break;
        case 'DELETE':
            newList = state.didntList.filter((obj) => obj.key !== action.payload.key);
            state.didntList = newList;
            break;
        case 'UPDATE':
            newList = state.didntList;
            index = newList.findIndex(obj => obj.key === action.payload.key);
            newList[index] = action.payload;
            state.didntList = newList;
            alert(JSON.stringify(newList))
            break;

        default:
            return state;
    }
    const newState = {refresh: refreshScreen, didntList: state.didntList, doingList: state.doingList, doneLsit: state.doneList};
    return newState;
}

const addToList = ({task, list}) =>{
    newList = list;
    list.push(task);
    return newList;
}

const deleteFromList = ({task, list}) =>{
    newList = list.filter((obj)=>obj.key !== task.key)
    return newList;
}
const updateList = ({task, list}) =>{
    newList = state.didntList;
    index = newList.findIndex(obj => obj.key === action.payload.key);
    newList[index] = action.payload;
    return newList;
}
{/* algorithm:
    on details screen, make copy of original screen value or maybe use *initialValue?*
    On submission, compare the old screen to the new screen. If they match, use update.
    If they don't, use move -> pass in the first and new list destinations.
 */}
const moveToNewList = ({task, prevList, nextList}) =>{
    oldList = deleteFromList({task, prevList});
    newList = nextList;
    newList.push(task);
    return {old:oldList, new:newList};
}

const store = createStore(reducer)
export default class App extends React.Component {
 
    
    render(){
        return (
            <Provider store = {store} >
                <NavigationContainer>
                    <SwipeNav/>
                </NavigationContainer>
            </Provider>
        );
    }
}

