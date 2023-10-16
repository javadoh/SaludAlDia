import React, { PureComponent } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";
import Images from "@assets/images";

class LoadSpin extends PureComponent {
  constructor() {
    super();
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.spin();
  }
  spin() {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear
    }).start(() => this.spin());
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    return (
      <View style={styles.container}>
        <Animated.Image
          style={{
            resizeMode: "contain"
          }}
          source={Images.reloadSpinner}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LoadSpin;
