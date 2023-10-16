import React, { PureComponent } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { REPO_IMG_PRODUCT_SERV_URL } from "@utils/Constants";

class CustomHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  _backArrowAction() {
    this.props.navigation.navigate("Splash");
  }

  render() {
    const product = this.props.data;
    const imageUrl =
      REPO_IMG_PRODUCT_SERV_URL + this.props.data.productImageUrl;
    return (
      <View style={styles.container}>
        <Ionicons
          name="md-arrow-back"
          onPress={() => this._backArrowAction()}
          style={styles.arrowIcon}
          size={24}
          navigation={this.props.navigation}
        />
        <View style={styles.containerRow}>
          <View style={styles.sectionLeft}>
            <Text style={styles.txtProductName}>{product.productName}</Text>
            <Text style={styles.txtActivePrinciple}>
              {product.activePrincipleName} {product.presentation}
            </Text>
            <Text>{product.composition}</Text>
          </View>
          <View style={styles.sectionRight}>
            <Image style={styles.imageProduct} source={{ uri: imageUrl }} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: "rgba(101, 101, 101, 0.34)",
    shadowOffset: { width: 2, height: 0 },
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 3
  },
  containerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    marginHorizontal: 10
  },
  sectionLeft: {
    width: "70%"
  },
  sectionRight: {
    width: "30%"
  },
  arrowIcon: {
    alignItems: "flex-start",
    alignSelf: "flex-start",
    paddingLeft: "5%"
  },
  imageProduct: {
    width: 80,
    height: 60,
    alignSelf: "flex-end",
    alignItems: "flex-end"
  },
  txtProductName: {
    fontSize: 18,
    fontWeight: "bold"
  },
  txtActivePrinciple: {
    fontSize: 10
  }
});

export default CustomHeader;
