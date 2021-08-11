import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';

import Colors from '../constants/colors';
import Numerics from '../constants/numerics';

// Returns a styled object for a 3D shadow effect
const Card = props=>{
    return <View style={{...styles.card, ...props.style}}>
        {props.children}
    </View>
    
};
const styles = StyleSheet.create({
    card:{
        width: 500,
        maxWidth: '95%',
        padding: Numerics.cardPadding,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 10, 
        backgroundColor: Colors.primary,
    }
});

export default Card;