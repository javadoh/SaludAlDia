import React, { Component } from "react";
import { WebView, ActivityIndicator, View } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

class WebViewFullSize extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  showSpinner() {
    this.setState({ visible: true });
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("webViewTitle"),
      headerLeft: (
        <Ionicons
          name="md-arrow-back"
          onPress={() => navigation.navigate("Home")}
          style={styles.backArrowNav}
          size={32}
        />
      )
    };
  };

  _onMessage(data) {
    console.log(data);
  }

  render() {
    //let jsCode = `alert('Desde RN');`;
    const urlWeb = this.props.route.params.urlWeb;

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
          source={{ uri: urlWeb }}
          style={styles.webViewStyle}
          onLoadStart={() => this.showSpinner()}
          onLoad={() => this.hideSpinner()}
          javaScriptEnabledAndroid={true}
        />
      </View>
    );
  }
}

export default WebViewFullSize;
