import React, { Component } from "react";
import { StatusBar, View, Text } from 'react-native'
import { AppContainer } from "../Router";
import Landing from '../screens/Landing'
import { colors } from "../theme";

console.disableYellowBox = true
export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timePassed: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setTimePassed()
        }, 4000);

    }




    setTimePassed() {
        this.setState({ timePassed: true });
    }


    render() {

        if (!this.state.timePassed)
            return <Landing />
        else {

            return (
                <View style={{ flex: 1 }}>
                    <StatusBar backgroundColor={colors.pink} barStyle={'dark'} />
                    <AppContainer />

                </View>
            );
        }
    }
}
