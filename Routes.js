import React from "react";
import { createStackNavigator } from "react-navigation";
import OnBoardScreen from "@screens/OnBoard/index";
import HomeScreen from "@screens/SearchProductsHome/index";
import WebViewScreen from "@components/WebViewFullSize/WebViewFullSize";
import PurchasePreOrderScreen from "@screens/PurchasePreOrder/index";
import PurchaseCheckOutScreen from "@screens/PurchaseCheckOut/index";
import PurchaseOrderScreen from "@screens/PurchaseOrder/index";
import ProfileCreateScreen from "@screens/Profile/CreateProfile";
import ProfileSessionScreen from "@screens/Profile/SessionProfile";
import MapHomeScreen from "@screens/MapHome/MapHome";

export const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  ProfileCreate: {
    screen: ProfileCreateScreen
  },
  ProfileSession: {
    screen: ProfileSessionScreen
  },
  Web: {
    screen: WebViewScreen
  },
  Purchase: {
    screen: PurchasePreOrderScreen
  },
  PurchaseCheckOut: {
    screen: PurchaseCheckOutScreen
  },
  PurchaseOrder: {
    screen: PurchaseOrderScreen
  },
  MapHome: {
    screen: MapHomeScreen
  }
});

export const OnBoardNavigator = createStackNavigator({
  OnBoard: {
    screen: OnBoardScreen //LA PRINCIPAL DE ESTE STACK
  },
  Home: {
    screen: HomeScreen
  },
  ProfileCreate: {
    screen: ProfileCreateScreen
  }
});
