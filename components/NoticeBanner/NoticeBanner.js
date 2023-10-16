import React, { PureComponent } from "react";
import { FlatList, TouchableOpacity, View, Image, Text } from "react-native";
import styles from "./styles";

class NoticeBanner extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { dataNotices: this.props.dataNotices };
  }

  _openNoticeWebView(url) {
    //PARCHE PARA VER YA QUE LA DATA EN SERVICIO NO FUNCIONA
    url =
      "http://www.lahora.cl/2018/07/conoce-yapp-la-aplicacion-te-muestra-donde-estan-los-medicamentos-mas-baratos/";
    if (url != null) {
      this.props.navigation.navigate("Web", {
        urlWeb: url,
        webViewTitle: this.props.webViewTitle
      });
    }
  }

  render() {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={this.state.dataNotices}
        renderItem={({ item: rowData }) => {
          return (
            <View style={styles.cardContainer}>
            <TouchableOpacity
              onPress={() => this._openNoticeWebView(rowData.url)}
            >
              <Image
                source={{ uri: "https://www.yapp.cl/img/prensa/10.jpg" }}
                style={styles.imageCardNotice}
              />    
              <Text style={styles.titleNotice}>{rowData.headline}</Text>
              <Text style={styles.txtNotice}>{rowData.text}...</Text>
            </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

export default NoticeBanner;
