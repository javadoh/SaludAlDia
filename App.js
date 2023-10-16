import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Constants } from "expo";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SplashScreen from "@screens/SplashScreen";
import { AppNavigator, OnBoardNavigator } from "./Routes";

const InitialNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    App: AppNavigator,
    OnBoardApp: OnBoardNavigator
  },
  {
    initialRouteName: "Splash"
  }
);

const AppContainer = createAppContainer(InitialNavigator);

export default class App extends Component {

  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight
  }
});
