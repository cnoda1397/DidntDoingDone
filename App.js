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

import * as SQLite from 'expo-sqlite';
//import SQLite from 'react-native-sqlite-2';
// SQL stuff to store data in a database
let doOnce = true;
const database_name = 'taskDB'
const database_version = '1.0'
const database_displayname = 'TaskList Database'
const database_size = 200000
let db = SQLite.openDatabase(database_name);
class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            refresh: true,
            didntList: [],
            doingList: [],
            doneList: []
        }
        //this.loadAndQueryDB();
        this.populateDB();
        db.transaction(tx =>{
            tx.executeSql(tx.executeSql('select * from didnt', [], (_, {rows: {_array}}) => this.setState({didntList: _array})));
        })
        //this.initialState.didntList = this.state.didntList;
    }

    populateDB = () => {
        db.transaction(tx =>{
            tx.executeSql('create table if not exists didnt (title text, description text, key text, screen text);', [], this.successCB, this.errorCB);
            // tx.executeSql('insert into didnt (title, description, key, screen) values (?, ?, ?, ?)', ['Hello World', 'can you hear me?', '123456789', 'didnt']);
            tx.executeSql('select * from didnt', [], (_, { rows }) => console.log(JSON.stringify(rows))) ;
            //tx.executeSql(tx.executeSql('select * from didnt', [], (_, {rows: {_array}}) => this.setState({testData: _array})));
            // tx.executeSql('delete * from didnt where key = ?', ['123456789'], this.successCB, this.errorCB);
            // tx.executeSql('CREATE TABLE IF NOT EXISTS Didnt (Title text, Description text, Key text, Screen text);', [], successCB, errorCB)
            // tx.executeSql('CREATE TABLE IF NOT EXISTS Didnt (Title text, Description text, Key text, Screen text);', [], successCB, errorCB)    
        });
        console.log('populated');
    }

    errorCB = err => {
        console.error('error:', err)
        return false
        }

    successCB = () => {
        console.log('SQL executed ...')
    }

    openCB = () => {
        console.log('Database OPEN\n ###########')
    }

    closeCB = () => {
        console.log('Database CLOSED')
    }

    deleteCB = () => {
        console.log('Database DELETED')
    }
    insertDidnt = task => {
        console.log('Beginning of insertDidnt');
        db.transaction(tx =>{
            tx.executeSql('insert into didnt (title, description, key, screen) values (?, ?, ?, ?)', [task.title, task.description, task.key, task.screen]);
            tx.executeSql('select * from didnt', [], (_, { rows }) => console.log(JSON.stringify(rows))) ;
        });
        console.log('End of insertedDidnt');
    }

    queryDidnt = () => {
        console.log('queryDidnt');
        db.transaction(tx =>{
            tx.executeSql('select * from didnt', null, 
            (txObj, { rows: { _array } }) => this.setState({testData: _array}), this.errorCB);
        });
        console.log(JSON.stringify(this.state.testData))
        console.log('//////////////////////////////////////')
    }
    queryDidntSuccess = (tx, results) => {
        console.log(JSON.stringify(results.rows.item(0)));
    }
    loadAndQueryDB = () => {
        console.log('Opening database ...');
        // db = SQLite.openDatabase(
        // database_name,
        // database_version,
        // database_displayname,
        // database_size,
        // this.openCB,
        // this.errorCB
        // )
        this.populateDB();
    }

    // REDUX stuff to create a shared state between all screens
    Stack = createStackNavigator();
    newList = [];
    list = [];
    index = 0;
    map = new Map;
    initialState = this.state;
    // initialState = {
    //     refresh: true,
    //     didntList: [{title: 'I am Iron Man', description: 'I Love You 3000', key: '616', screen: 'didnt'}],
    //     //didntList: db.transaction(tx =>{tx.executeSql(tx.executeSql('select * from didnt', [], (_, {rows: {_array}}) => {return _array}))}),
    //     doingList: [{title: 'I am Batman', description: 'I am the NIGHT', key: '1', screen: 'doing'}],
    //     doneList: [{title: 'I am Groot', description: 'I am Groot', key: '1610', screen: 'done'}],
    // }

    reducer = (state = this.initialState, action) => {
        let refreshScreen = !state.refresh;
        let task = action.payload;
        if(action.payload !== undefined){
            switch (task.screen){
                case 'didnt':
                    newList = state.didntList;
                    break;
                case 'doing':
                    newList = state.doingList;
                    break;
                case 'done':
                    newList = state.doneList;
                    break;
            }
        }
        switch (action.type) {
            case 'ADD':
                task.key = Date.now().toString();
                newList.push(task);
                this.insertDidnt(task);
                // db.transaction(tx =>{
                //     tx.executeSql('insert into', task.screen + '(Title, Description, Screen) values (?, ?, ?),', [task.title, task.description, task.key, task.screen]);
                //     tx.executeSql('select * from', task.screen, [], (_, { rows }) =>
                //         console.log('the number of rows are',JSON.stringify(rows))
                //         );
                // })
                break;
            case 'DELETE':
                list = newList;
                newList = list.filter((obj)=>obj.key !== task.key)
                break;
            case 'UPDATE':
                index = newList.findIndex(obj => obj.key === action.payload.key);
                newList[index] = action.payload;
                
                break;
            // case 'MOVE':
            //     let movefrom = [];
            //     switch (action.prevList){
            //         case 'didnt':
            //             movefrom = state.didntList;
            //             break;
            //         case 'doing':
            //             movefrom = state.doingList;
            //             break;
            //         case 'done':
            //             movefrom = state.doneList;
            //             break;
            //     }
            default:
                return state;
        }
        switch(task.screen){
            case 'didnt':
                state.didntList = newList;
                break;
            case 'doing':
                state.doingList = newList;
                break;
            case 'done':
                state.doneList = newList;
                break;
        }
        const newState = {refresh: refreshScreen, didntList: state.didntList, doingList: state.doingList, doneList: state.doneList};
        return newState;
    }

// const moveToNewList = ({task, prevList, nextList}) =>{
//     oldList = deletefromList({task, prevList});
//     newList = nextList;
//     newList.push(task);
//     return {old:oldList, new:newList};
// }

    store = createStore(this.reducer)

 
    componentDidMount(){
        //this.loadAndQueryDB();
        this.initialState = this.state;
        
        //populateDatabase(db);
        // db.transaction(
        //     tx =>{
        //         tx.executeSql('select * from Didnt where screen=didnt', [], (_, {list}) => {return list})
        //     }
        // ),
        // db.transaction(
        //     tx =>{
        //         tx.executeSql('select * from Didnt where screen=doing', [], (_, {list}) => {return list})
        //     }
        // ),
        // db.transaction(
        //     tx =>{
        //         tx.executeSql('select * from Didnt where screen=done', [], (_, {list}) => {return list})
        //     }
        // )
    }
    render(){
        return (
            <Provider store = {this.store} >
                <NavigationContainer>
                    <SwipeNav/>
                </NavigationContainer>
            </Provider>
        );
    }
}

export default App