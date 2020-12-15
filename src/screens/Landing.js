//Global Libraries
import React, { Component } from "react";
import { View, Text, StatusBar, Image } from "react-native";
import { colors } from "../theme";

class Landing extends Component {


  render() {
    return (
      <View style={{ justifyContent: 'center', flex:1,backgroundColor: colors.pink }}>
        <StatusBar backgroundColor={colors.pink} barStyle={'dark'} />

        <Text style={{ alignSelf: 'center', fontSize: 50, color: 'white',fontWeight:'bold' }}>{'USERDATA\nBANK'}</Text>
      </View>
    );
  }
}

export default Landing;
