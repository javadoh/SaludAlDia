import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

class TextRowLabelValueFullWidth extends PureComponent {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.txtLabel, {color: this.props.labelColor}]}>{this.props.textLabel}</Text>
        <Text style={styles.txtValue}>{this.props.textValue}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    shadowColor: "rgba(101, 101, 101, 0.34)",
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 5,
    elevation: 3,
    padding: 15
  },
  txtLabel: {
    width: "45%",
    fontSize: 16,
    textAlign: "left",
    alignSelf: "stretch"
  },
  txtValue: {
    width: "55%",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "right",
    alignSelf: "stretch"
  }
});

export default TextRowLabelValueFullWidth;
