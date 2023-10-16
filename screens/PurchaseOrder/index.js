import React, { Component } from "react";
import WebViewPurchase from "@components/WebViewFullSize/WebViewCheckOut";

class PurchaseOrder extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title")
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WebViewPurchase
        navigation={this.props.navigation}
        urlWeb={this.props.urlWeb}
      />
    );
  }
}

export default PurchaseOrder;
