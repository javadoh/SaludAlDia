import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DatePickerSpin from "@components/DatePickerSpin";
import styles from "./styles";

class CreateProfileThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthday: ""
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ componentProfileId: 3 });
  }

  static navigationOptions = {
    title: "Perfil III"
  };

  _handleNext() {
    const { birthday } = this.state;
    this.props.action(birthday);
  }

  _handleDatePicked = datePicked => {
    this.setState({
      birthday: datePicked
    });
  };

  render() {
    return (
      <View>
        <Text style={styles.txtTitle}>¿Cuándo es tu cumpleaños?</Text>

        <View style={styles.formSection}>
          <Text style={styles.labelInput}>CUMPLEAÑOS</Text>

          <DatePickerSpin action={this._handleDatePicked} />
        </View>

        <TouchableOpacity
          style={styles.btnNext}
          onPress={() => this._handleNext()}
        >
          <Text style={styles.txtBtnNext}>Siguiente</Text>
        </TouchableOpacity>
        <Text style={styles.txtOmitir} onPress={() => this._handleNext()}>
          Omitir
        </Text>
      </View>
    );
  }
}

export default CreateProfileThree;
