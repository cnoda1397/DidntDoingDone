import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Doing from '../screens/doing';
import Details from '../screens/details';
import Colors from '../constants/colors';

const doingStack = (props) => {
    const Stack = createStackNavigator();
    return(
            <Stack.Navigator 
                initialRouteName="Doing"
                screenOptions={{
                    headerShown:false,
                }}>
                <Stack.Screen name="Doing" component={Doing} options={{ 
                    title: "Doing",
                    }} />
                <Stack.Screen name="Details" component={Details} options={{ 
                    title: 'Details',
                    }} />
            </Stack.Navigator>
    );
};
export default doingStack;