import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import didnt from '../screens/didnt';
import Details from '../screens/details';
import Colors from '../constants/colors';

const screens = {
    Home: {
        screen: didnt,
        navigationOptions:{
            title: "Didn't",
            headerStyle: {backgroundColor: Colors.header}
        }
    },
    Details: {
        screen: Details,
        navigationOptions:{
            title: "Task Details",
            headerStyle: {backgroundColor: Colors.purple}
        }
    }
}
const stackNav = createStackNavigator(screens, {
    defaultNavigationOptions:{
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: Colors.header,
            height: 60,
        }
    }
});
export default createAppContainer(stackNav);