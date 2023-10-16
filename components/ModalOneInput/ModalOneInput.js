import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("window");

class ModalOneInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  _handleAction(txtInputValue) {
    if (txtInputValue.length < this.props.txtMinLength) {
      Alert.alert(
        "El valor ingresado debe cumplir con un mínimo de " +
          this.props.txtMinLength +
          " cáracteres"
      );
    } else {
      this.props.action(txtInputValue);
    }
  }

  _closeModal() {
    this.props.action("");
  }

  render() {
    return (
      <View>
        <Modal
          isVisible={true}
          backdropColor={"black"}
          backdropOpacity={0.8}
          animationIn={"zoomInDown"}
          animationOut={"zoomOutUp"}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => this._closeModal()}
            >
              <Text style={styles.txtCloseBtn}>X</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.labelInput}>{this.props.txtLabel}</Text>
              <TextInput
                style={styles.cardInput}
                secureTextEntry={
                  this.props.inputTxtType == "secure" ? true : false
                }
                maxLength={this.props.txtMaxLength}
                onChangeText={text => this.setState({ inputValue: text })}
              />

              <TouchableOpacity
                style={styles.btnSave}
                onPress={() => this._handleAction(this.state.inputValue)}
              >
                <Text style={styles.txtSave}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    width: width * 0.9,
    height: height * 0.9,
    justifyContent: "center"
  },
  labelInput: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
    textAlign: "left"
  },
  cardInput: {
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    shadowColor: "rgba(0, 0, 0, 0.17)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    elevation: 6,
    borderRadius: 6
  },
  btnSave: {
    backgroundColor: "#d81d5b",
    marginTop: "10%",
    padding: 10,
    borderRadius: 6
  },
  txtSave: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center"
  },
  closeBtn: {
    width: 30,
    height: 30,
    padding: 8,
    borderRadius: 10 / 2,
    backgroundColor: "#d81d5b",
    justifyContent: "center",
    alignSelf: "flex-end"
  },
  txtCloseBtn: {
    color: "#FFFFFF",
    textAlign: "center"
  }
});

export default ModalOneInput;
