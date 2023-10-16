import React, { Component } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import ModalAlertMessage from '@components/ModalAlertMessage/ModalAlertMessage';

class CreateProfileOne extends Component {
  constructor(props) {
    super(props);
    this._renderModalAction = this._renderModalAction.bind(this);
    this.state = {
      name: "",
      lastname: "",
      modalMessage: { txtLabel: "", txtMessage: "", isShow: false }
    };
  }

  static navigationOptions = {
    title: "Perfil I"
  };

  componentDidMount() {
    this.props.navigation.setParams({ componentProfileId: 1 });
  }

  _handleNext() {
    const { name, lastname } = this.state;

    if (name.length > 2 && lastname.length > 2) {
      this.props.action(name, lastname);
    } else {
      this.setState({
        modalMessage: {
          txtLabel: "Info",
          txtMessage: 'Estimado usuario, debe completar los campos requeridos para continuar',
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

        <Text style={styles.txtTitle}>¿Cómo te llamas?</Text>

        <View style={styles.formSection}>
          <Text style={styles.labelInput}>Nombre</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
          />

          <Text style={styles.labelInput}>Apellido</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.lastname}
            onChangeText={text => this.setState({ lastname: text })}
          />
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

export default CreateProfileOne;
