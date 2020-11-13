import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import SettingsScreen from '../screens/SettingsScreen';
import BarterrerDetailsScreen from '../screens/BartererDetailsScreen';
import MyBarters from '../screens/MyBarters';
import Notification from '../screens/Notification';
import  ReceivedItems from '../screens/ReceivedItems';
import  Login from '../screens/Login';


export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
    Login:{screen:Login},
    settings: {screen: SettingsScreen},

   BarterScreen: {screen: BarterrerDetailsScreen},   

    MyBarters: {screen: MyBarters},
    
    Notification: {screen: Notification},

    ReceivedList: {screen:ReceivedItems}
  },
  
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home_Screen'
  })
