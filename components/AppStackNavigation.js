import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import BarterrerDetailsScreen from '../screens/BartererDetailsScreen';


export const AppStackNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions:{
            headerShown : false
      },        
    },

    BarterScreen: {
        screen: BarterrerDetailsScreen     
    }

},
{initialRouteName: 'BarterScreen'}
)