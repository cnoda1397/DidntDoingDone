import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Didnt from '../screens/didnt';
import Doing from '../screens/doing';
import Done from '../screens/done';
import Colors from '../constants/colors';

import DidntStack from './didntStack';
import DoingStack from './doingStack';
import DoneStack from './doneStack';

  
const SwipeNav = (props) => {
    const Tab = createMaterialTopTabNavigator();
    return (
            <Tab.Navigator 
            tabBarOptions={{
                inactiveTintColor:'white',
                activeTintColor: Colors.secondary,
                allowFontScaling: true,
                indicatorStyle:{
                    width:0,
                },
                labelStyle: { 
                    fontSize: 25,
                    fontWeight:'bold', 
                    paddingVertical: 10,
                    justifyContent: 'center',
                    alignContent: 'center',
                },
                tabStyle: {
                    justifyContent:'space-around'
                },
                style: { 
                    backgroundColor: Colors.primary,
                    width: '100%',
                    justifyContent: 'center',
                    // borderBottomWidth: 1,
                    // borderBottomColor: Colors.secondary,
                    shadowColor: 'black',
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    shadowRadius: 6,
                    shadowOpacity: 0.26,
                    elevation: 10, 
                 },
              }}>
                <Tab.Screen name="Didn't" component={DidntStack}/>
                <Tab.Screen name="Doing" component={DoingStack}/>
                <Tab.Screen name="Done" component={DoneStack}/>
            </Tab.Navigator>
    );
};
  
export default SwipeNav;