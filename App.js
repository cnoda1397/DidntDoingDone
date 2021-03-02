import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Keyboard, StyleSheet, Text, View, Modal, Button} from 'react-native';
import Header from './components/Header';
import Didnt from './screens/didnt.js';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Details from './screens/details';
// import Modal from 'react-native-modal';
import {globalStyles} from './constants/styles';
import Colors from './constants/colors';
import {TaskInfo} from './components/TaskAdder';
import Task from './components/Task';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
export default function App() {
 
    const Stack = createStackNavigator();

  	return (
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




		// <View style={globalStyles.screen}>
        
		// 	<Header title = "What Have You Done So Far?"/>
		// 	<StatusBar style="auto"/>
        //      {content}
        //     {/*<Button
        //         title="open"
        //         color= {Colors.purple}
        //         onPress = {() => {
        //         }}
        //     /> */}
		// </View>
  	);
}

