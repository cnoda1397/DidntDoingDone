// React & React Native
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Keyboard, StyleSheet, Text, View, Modal, Button} from 'react-native';
//React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SwipeNav from './navigation/SwipeNav';
//SQL Database
import db from './constants/database';
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
            tx.executeSql('create table if not exists didnt (title text, description text, key text, screen text);', [], this.successCB, this.errorCB);
            tx.executeSql('create table if not exists doing (title text, description text, key text, screen text);', [], this.successCB, this.errorCB);
            tx.executeSql('create table if not exists done (title text, description text, key text, screen text);', [], this.successCB, this.errorCB);

            //Debugging commands to have commands in a table on startup
            
            //tx.executeSql('insert into didnt (title, description, key, screen) values (?, ?, ?, ?)', ['Hello World', 'Can you hear me?', Date.now().toString(), 'didnt']);
            //tx.executeSql('insert into doing (title, description, key, screen) values (?, ?, ?, ?)', ['good bye', 'I know you hear me.', Date.now().toString(), 'doing']);
            //tx.executeSql('select * from didnt', [], (_, { rows }) => console.log(JSON.stringify(rows))) ;
            //tx.executeSql('delete from ' + temp + ' where title = ?;', ['H']);
            //tx.executeSql('select * from ' + 'didnt', [], (_, { rows }) => console.log(JSON.stringify(rows))) ;

        });
        console.log('populated');
    }

    errorCB = err => {
        console.error('Fail:', err)
        return false
        }

    successCB = () => {
        console.log('Table Created')
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