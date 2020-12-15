import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { StackActions, NavigationActions, createAppContainer } from 'react-navigation';
import Home from './screens/Home'
import AddUser from './screens/AddUser'
import { colors } from './theme';
const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                header: null
            }
        },
        AddUser: {
            screen: AddUser,
            navigationOptions: ({ navigation }) => ({
                title: 'Add User',
                headerStyle: {
                    backgroundColor: colors.pink,
                    elevation: 1, // remove shadow on Android
                    shadowOpacity: 1, // remove shadow on iOS

                },
                headerTintColor: colors.White,
            }),
        },

    },
    {
        initialRouteName: 'Home',
        // headerMode: 'None',
    },
);




export const AppContainer = createAppContainer(AppNavigator);