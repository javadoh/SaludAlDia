import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./styles";
import { _validateRegisterPassword } from "@utils/Utils";
import ModalAlertMessage from '@components/ModalAlertMessage/ModalAlertMessage';

class CreateProfileFive extends Component {
  constructor(props) {
    super(props);
    this._renderModalAction = this._renderModalAction.bind(this);
    this.state = {
      password: "",
      passwordConfirmation: "",
      modalMessage: { txtLabel: "", txtMessage: "", isShow: false }
    };
  }

  static navigationOptions = {
    title: "Perfil V"
  };

  componentDidMount() {
    this.props.navigation.setParams({ componentProfileId: 5 });
  }

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  _handleNext() {
    const { password, passwordConfirmation } = this.state;

    if (password.length > 5 && passwordConfirmation.length > 5) {
      if (password == passwordConfirmation) {
        if (_validateRegisterPassword(password)) {
          this.props.action(password);
        } else {
          this.setState({
            modalMessage: {
              txtLabel: "Info",
              txtMessage: 'Estimado usuario, debe ingresar una contraseña alfánumerica válida, de entre 6 y 10 caractéres de longitud',
              isShow: true
            }
          });
        }
      } else {
        this.setState({
          modalMessage: {
            txtLabel: "Info",
            txtMessage: 'Estimado usuario, las contraseñas ingresadas deben coincidir',
            isShow: true
          }
        });
      }
    } else {
      this.setState({
        modalMessage: {
          txtLabel: "Info",
          txtMessage: 'Estimado usuario, debe ingresar una contraseña mayor a 6 caractéres de longitud',
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

        <Text style={styles.txtTitle}>Crea tu contraseña</Text>
        <View style={styles.formSection}>
          <Text style={styles.labelInput}>Crear Contraseña</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.password}
            secureTextEntry={true}
            maxLength={10}
            onChangeText={text => this.setState({ password: text })}
          />

          <Text style={styles.labelInput}>Repetir Contraseña</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.passwordConfirmation}
            secureTextEntry={true}
            maxLength={10}
            onChangeText={text => this.setState({ passwordConfirmation: text })}
          />

          <Text style={styles.textBodyMsgForm}>
            Tu contraseña será necesaria para completar tu perfil.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnNext}
          onPress={() => this._handleNext()}
        >
          <Text style={styles.txtBtnNext}>Crear mi perfil</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CreateProfileFive;
