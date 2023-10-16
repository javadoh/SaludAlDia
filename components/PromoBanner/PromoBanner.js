import React, { PureComponent } from "react";
import { FlatList, TouchableOpacity, Linking, Image, View } from "react-native";
import styles from "./styles";

class PromoBanner extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { dataPromos: this.props.dataPromos };
  }

  _openPromoWeb(url) {
    //Linking.openURL(url);
    if (url != null) {
      this.props.navigation.navigate("Web", {
        urlWeb: url,
        webViewTitle: this.props.webViewTitle
      });
    }
  }

  componentWillMount() {
    console.log("1. El componente de promos será cargado");
  }

  componentDidMount() {
    console.log("2. El componente de promos se cargo");
  }

  componentWillUnmount() {
    console.log("4. El componente de promos se está eliminando");
  }

  render() {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={this.state.dataPromos}
        renderItem={({ item: rowData }) => {
          return (
            <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => this._openPromoWeb(rowData.url)}>
              <Image
                style={styles.imageCardPromo}
                source={{ uri: rowData.picture }}
              >
              </Image>
            </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

export default PromoBanner;
