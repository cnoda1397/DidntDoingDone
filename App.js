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
//
class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            refresh: true,
            didntList: [],
            doingList: [],
            doneList: []
        }

        this.populateDB();
    }
    populateDB = () => {
        db.transaction(tx =>{
            //tx.executeSql('drop table didnt if exists');
            tx.executeSql('create table if not exists didnt (title text, description text, key text, screen text);', [], this.successCB, this.errorCB);
            //tx.executeSql('delete from didnt where screen = ?', ['didnt'])
            tx.executeSql('create table if not exists doing (title text, description text, key text, screen text);', [], this.successCB, this.errorCB);
            tx.executeSql('create table if not exists done (title text, description text, key text, screen text);', [], this.successCB, this.errorCB);
            //tx.executeSql('insert into doing (title, description, key, screen) values (?, ?, ?, ?)', ['Hello World', 'Can you hear me?', Date.now().toString(), 'didnt']);
            //tx.executeSql('insert into doing (title, description, key, screen) values (?, ?, ?, ?)', ['good bye', 'I know you hear me.', Date.now().toString(), 'didnt']);
            //tx.executeSql('select * from didnt', [], (_, { rows }) => console.log(JSON.stringify(rows))) ;
            
            //tx.executeSql('delete from ' + temp + ' where title = ?;', ['H']);
            tx.executeSql('select * from ' + 'didnt', [], (_, { rows }) => console.log(JSON.stringify(rows))) ;

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
    insertTask = task => {
        db.transaction(tx =>{
            tx.executeSql('insert into didnt (title, description, key, screen) values (?, ?, ?, ?)', [task.title, task.description, task.key, task.screen]);
            tx.executeSql('select * from didnt', [], (_, { rows }) => console.log(JSON.stringify(rows))) ;
        });
    }

    queryDidnt = () => {
        db.transaction(tx =>{
            tx.executeSql('select * from didnt', null, 
            (txObj, { rows: { _array } }) => this.setState({testData: _array}), this.errorCB);
        });
    }
    queryDidntSuccess = (tx, results) => {
        console.log(JSON.stringify(results.rows.item(0)));
    }

    setDidnt = () =>{
        let list = [];
        db.transaction(tx =>{tx.executeSql(tx.executeSql('select * from didnt', [], (_, {rows: {_array}}) => {list = [..._array]}))});
        return list;
    }
     Stack = createStackNavigator();

    componentDidMount(){
        console.log('Mounted');
    }
    render(){
        return (
            <NavigationContainer>
                    <SwipeNav/>
            </NavigationContainer>
        );
    }
}

export default App