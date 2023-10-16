import React, { PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

class ToolBar extends PureComponent {
  constructor(props) {
    super(props);
  }

  _userIconAction() {
    if (this.props.userDataSession == null) {
      this.props.navigation.navigate("ProfileCreate", {userIdAnonymous: this.props.userDataAnonymous});
    } else {
      this.props.navigation.navigate("ProfileSession", {userId: this.props.userDataSession});
    }
  }

  _shoppingCartAction() {
    console.log("ShoppingCart userAnonymous: " + this.props.userDataAnonymous);
    this.props.navigation.navigate("Purchase", {
      userId: this.props.userDataSession,
      userIdAnonymous: this.props.userDataAnonymous
    }); //reemplazar 1000239 por userDataAnonymous
  }

  render() {
    return (
      <View style={styles.container}>
        <Feather
          name="user"
          onPress={() => this._userIconAction()}
          style={styles.userIcon}
          size={32}
          navigation={this.props.navigation}
        />
        <Text style={styles.logo}>YAPP</Text>
        <Feather
          name="shopping-cart"
          onPress={() => this._shoppingCartAction()}
          style={styles.cartIcon}
          size={32}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    margin: 10
  },
  userIcon: {
    alignItems: "center",
    alignSelf: "center"
  },
  logo: {
    fontFamily: "proximanova",
    fontSize: 28,
    textAlign: "center",
    flex: 1,
    alignSelf: "center"
  },
  cartIcon: {
    alignItems: "center",
    alignSelf: "center"
  }
});

export default ToolBar;
