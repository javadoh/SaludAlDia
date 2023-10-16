import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity 
} from "react-native";
import Modal from "react-native-modal";

const { width } = Dimensions.get("window");

class ModalAlertMessage extends PureComponent {

  constructor(props){
    super(props);
  }

  _closeModal() {
    this.props.action();
  }

  render(){
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
            
            <View>
            <Text style={styles.labelInput}>{this.props.txtLabel}</Text>
              <Text style={styles.txtMessage}>{this.props.txtMessage}</Text>
              <TouchableOpacity
                style={[styles.btnSave, this.props.backColorBtn != null ? {backgroundColor: this.props.backColorBtn} : {backgroundColor: "#d81d5b"}]}
                onPress={() => this._closeModal()}
              >
                <Text style={styles.txtSave}>OK</Text>
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
    alignSelf:'baseline',
    padding: 10,
    justifyContent: "center",
    backgroundColor: '#FFFFFF'
  },
  labelInput: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
    textAlign: "left"
  },
  txtMessage: {
    marginTop: "5%",
    textAlign: 'center',
    padding: 10,
    color: '#000000',
    fontSize: 14
  },
  btnSave: {
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

export default ModalAlertMessage;