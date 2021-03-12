import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Done from '../screens/done';
import Details from '../screens/details';
import Colors from '../constants/colors';

const doneStack = (props) => {
    const Stack = createStackNavigator();
    return(
            <Stack.Navigator 
                initialRouteName="Done"
                screenOptions={{
                    headerShown:false,
                }}>
                <Stack.Screen name="Done" component={Done} options={{ 
                    title: "Done",
                    }} />
                <Stack.Screen name="Details" component={Details} options={{ 
                    title: 'Details',
                    }} />
            </Stack.Navigator>
    );
};
export default doneStack;