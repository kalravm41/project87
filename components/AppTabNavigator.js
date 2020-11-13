import React,{Component}from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExchangeScreen from '../screens/ExchangeScreen';


   export var AppTabNavigator = createBottomTabNavigator({
    Exchange_screen: {screen: ExchangeScreen, navigationoptions : {
        tabBarLabel: 'Exchange Screen'
    }},

    Home_screen: {screen: HomeScreen, navigationoptions : {
        tabBarLabel: 'Home Screen'
    }}
});

