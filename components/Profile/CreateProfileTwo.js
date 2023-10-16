import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button
} from "react-native";
import styles from "./styles";
import { _validateRut, _formatRut } from "@utils/Utils";
import ModalAlertMessage from '@components/ModalAlertMessage/ModalAlertMessage';

class CreateProfileTwo extends Component {
  constructor(props) {
    super(props);
    this._renderModalAction = this._renderModalAction.bind(this);
    this.state = {
      rut: "",
      modalMessage: { txtLabel: "", txtMessage: "", isShow: false }
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ componentProfileId: 2 });
  }

  static navigationOptions = {
    title: "Perfil II",
    headerLeft: (
      <Button
        onPress={() => alert("This is a button!")}
        title="Info"
        color="#fff"
      />
    )
  };

  _formatTxtRut(text) {
    return _formatRut(text);
  }

  _handleNext() {
    const { rut } = this.state;

    var rutSinFormato = rut.replace(/[^a-zA-Z0-9]/g, "");
    rutSinFormato = rutSinFormato
      .substring(0, rutSinFormato.length - 1)
      .concat("-")
      .concat(
        rutSinFormato.substring(rutSinFormato.length, rutSinFormato.length - 1)
      );

    if (_validateRut(rutSinFormato)) {
      this.props.action(rutSinFormato);
    } else {
      this.setState({
        modalMessage: {
          txtLabel: "Info",
          txtMessage: 'Estimado usuario, debe ingresar una rut válida para continuar.',
          isShow: true
        }
      });
    }
  }

  _renderModalAction() {
    this.setState({
      modalMessage: { txtLabel: "", txtMessage: "", isShow: false }
    });
  }

  render() {
    return (
      <View>
        {this.state.modalMessage.isShow == true ? (
          <ModalAlertMessage
            txtLabel={this.state.modalMessage.txtLabel}
            txtMessage={this.state.modalMessage.txtMessage}
            action={this._renderModalAction}
          />
        ) : null}

        <Text style={styles.txtTitle}>¿Cuál es tu rut?</Text>

        <View style={styles.formSection}>
          <Text style={styles.labelInput}>RUT</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.rut}
            onChangeText={text => this.setState({ rut: text })}
          />

          <Text style={styles.textBodyMsgForm}>
            Saber tu RUT es necesario para buscar todos los descuentos asociados
            a él sobre el precio de lista de los productos.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.btnNext}
          onPress={() => this._handleNext()}
        >
          <Text style={styles.txtBtnNext}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CreateProfileTwo;
