import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Didnt from '../screens/didnt';
import Details from '../screens/details';
import Colors from '../constants/colors';

const didntStack = (props) => {
    const Stack = createStackNavigator();
    return(
            <Stack.Navigator 
                initialRouteName="Didnt"
                screenOptions={{
                    headerShown:false,
                }}>
                <Stack.Screen name="Didnt" component={Didnt} options={{ 
                    title: "Didn't",
                    }} />
                <Stack.Screen name="Details" component={Details} options={{ 
                    title: 'Details',
                    }} />
            </Stack.Navigator>
    );
};

export default didntStack;