import React, { Component } from "react";
import { WebView, View, ActivityIndicator } from "react-native";
import styles from "./styles";

class WebViewCheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  showSpinner() {
    this.setState({ visible: true });
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title")
    };
  };

  _onMessage(data) {
    console.log(data);
  }

  render() {
    const urlAddress = this.props.route.params.urlWeb;

    return (
      <View
        style={this.state.visible === true ? styles.styleOld : styles.styleNew}
      >
        {this.state.visible ? (
          <ActivityIndicator
            color="#009688"
            size="large"
            style={styles.activityIndicatorStyle}
            animating={true}
          />
        ) : null}

        <WebView
          source={{ uri: urlAddress }}
          style={styles.webViewStyle}
          onLoadStart={() => this.showSpinner()}
          onLoad={() => this.hideSpinner()}
          javaScriptEnabledAndroid={true}
        />
      </View>
    );
  }
}

export default WebViewCheckOut;
