// React & React Native
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, FlatList, Button, Modal, TouchableHighlight, TouchableOpacity} from 'react-native'
import {Formik} from 'formik';
import { Ionicons } from '@expo/vector-icons';
// React Navigation
import {CommonActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// Components & Constants
import {globalStyles} from '../constants/styles';
import Numerics from '../constants/numerics';
import Card from '../components/Card';
import Task from '../components/Task';
import Colors from '../constants/colors';
import TaskAdder from '../components/TaskAdder'
// Redux
import { connect } from 'react-redux'

const done = (props) =>{
    return(
        <Text>Hello from Done Screen</Text>
    );
};
function mapStateToProps(state) {
    return {
        refresh: state.refresh,
        didntList: state.didntList
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addToList: (task) => dispatch({ type: 'ADD', payload: task}),
        deleteFromList: (task) => dispatch({ type: 'DELETE', payload: task}),
        editList: (task) => dispatch({type: 'UPDATE', payload: task}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(done);