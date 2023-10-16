import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { _validateRegisterEmail } from "@utils/Utils";
import styles from "./styles";
import ModalAlertMessage from '@components/ModalAlertMessage/ModalAlertMessage';

class CreateProfileFour extends Component {
  constructor(props) {
    super(props);
    this._renderModalAction = this._renderModalAction.bind(this);
    this.state = {
      email: "",
      modalMessage: { txtLabel: "", txtMessage: "", isShow: false }
    };
  }

  static navigationOptions = {
    title: "Perfil IV"
  };

  componentDidMount() {
    this.props.navigation.setParams({ componentProfileId: 4 });
  }

  _handleNext() {
    const { email } = this.state;

    if (_validateRegisterEmail(email)) {
      this.props.action(email);
    } else {
      this.setState({
        modalMessage: {
          txtLabel: "Info",
          txtMessage: 'Estimado usuario, debe ingresar un correo válido para continuar',
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

        <Text style={styles.txtTitle}>¿Cuál es tu correo?</Text>
        <View style={styles.formSection}>
          <Text style={styles.labelInput}>Correo</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
          <Text style={styles.textBodyMsgForm}>
            Saber tu correo electrónico será necesario para entregarte
            información relevante sobre tus compras.
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

export default CreateProfileFour;
