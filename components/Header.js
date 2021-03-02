import { NativeAppEventEmitter } from "react-native";
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/colors';

const Header = props=> {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 20,
        paddingLeft: 20,
        backgroundColor: Colors.teal,
        alignContent: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: Colors.header,
        fontSize: 22
    }

});
export default Header;