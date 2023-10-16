import React, { PureComponent } from "react";
import { TextInput, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

const BLUE = "#428AF8";

class SearchBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: [], textSearch: "" };
  }

  _getSearchTextToParent(text) {
    if (text.length > 2) {
      this.props.action(true, text);
    } else {
      this.props.action(false, text);
    }
  }

  render() {
    return (
      <View style={styles.searchRectangle}>
        <Ionicons name="md-search" style={styles.searchIcon} size={24} />
        <TextInput
          onChangeText={text => {
            this._getSearchTextToParent(text);
          }}
          placeholder="Busca tus productos de farmacia"
          style={styles.textSearchButton}
          selectionColor={BLUE}
        />
        <TouchableOpacity>
          <Text name="search" size={16} color="#000" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default SearchBar;
