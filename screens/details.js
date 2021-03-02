import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, FlatList, Button, Modal, ScrollView, Touchable} from 'react-native'
import { Header } from 'react-native/Libraries/NewAppScreen';
import {Formik} from 'formik';
import {CommonActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {globalStyles} from '../constants/styles';
import Numerics from '../constants/numerics';
import Card from '../components/Card';
import Task from '../components/Task';
import Colors from '../constants/colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// takes in task with values title, description, key; [setFunctions for each?]
const Details = ({route, navigation}) => {
    const {title, description, key} = route.params;
    const [newTitle, setnewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    return (
        <View style={globalStyles.screen}>
            <View style={{
                flex: 1,
                alignItems: 'center',
                padding: 20
                }}>
                <TextInput style={globalStyles.input}
                    value = {newTitle}
                    onChangeText={(value) => setnewTitle(value)}
                    editable = {true}
                />
            </View>
            <View style={{
                flex: 3,
                alignItems: 'center',
                padding: 20
                }}>
                <TextInput style={globalStyles.input}
                    value = {newDescription}
                    onChangeText={(value) => setNewDescription(value)}
                    editable = {true}
                    multiline ={true}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress = {() => {
                    navigation.navigate('Didnt', {terminate: true, key: key, title: null, description: null})
                    }}>
                    <Ionicons name="trash-outline" size={60} color={Colors.secondary} />
                    <Text>Delete </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress = {() => {
                    navigation.navigate('Didnt', {title: newTitle, description: newDescription, key: key, terminate: null})
                    }}>
                    <Ionicons name="enter-outline" size={60} color={Colors.secondary} />
                    <Text> Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems:'flex-end',
        color: 'red',
        justifyContent: 'space-around',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default Details;