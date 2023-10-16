import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import TextLabelValueFullWidth from "@components/TextLabelValueFullWidth/TextLabelValueFullWidth";

const { width, height } = Dimensions.get("window");

class PurchaseCheckOut extends Component {
  static navigationOptions = {
    title: "CheckOut"
  };

  constructor(props) {
    super(props);
    this.state = {
      card: "",
      isModalVisible: false,
      visibleModal: null, 
      userId: this.props.navigation.getParam('userId'), 
      address: this.props.navigation.getParam('purchaseAddress'), 
      data: this.props.navigation.getParam('data'), 

    };
  }

  _endPurchaseAndSendProducts() {
    console.log("Confirmando compra y enviando productos.");
    this.props.navigation.navigate("PurchaseOrder", {
      urlWeb:
        "https://playground.qvo.cl/webpay_oneclick/init_inscription/woi_9u_LGRESNYmoRXeHdC67jA",
      title: "Pago Yapp"
    });
  }

  _addPayCard() {
    console.log("Abriendo página de tarjeta de crédito.");
    this.props.navigation.navigate("PurchaseOrder", {
      urlWeb:
        "https://playground.qvo.cl/webpay_oneclick/init_inscription/woi_9u_LGRESNYmoRXeHdC67jA",
      title: "Agregar tarjeta de pago"
    });
    //this.props.navigation.navigate('Web', {urlWeb: 'https://playground.qvo.cl/webpay_oneclick/init_inscription/woi_9u_LGRESNYmoRXeHdC67jA', webViewTitle: 'Agregar Tarjeta Pago'});
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Hello!</Text>
      {this._renderButton("Close", () => this.setState({ visibleModal: null }))}
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <TextLabelValueFullWidth
          textLabel="Dirección"
          textValue={this.state.address}
          labelColor={'#dededf'}
        />
        <TextLabelValueFullWidth
          textLabel="Entrega estimada"
          textValue="48 Horas"
          labelColor={'#dededf'}
        />
        <TouchableOpacity
          style={styles.btnCardForPurchase}
          onPress={() => this._addPayCard()}
        >
          <Text style={styles.txtCardForPurchase}>+ Añadir tarjeta</Text>
        </TouchableOpacity>

        <TextLabelValueFullWidth 
        textLabel="Total a pagar"
        textValue={`$${this.state.data.valueTotalWithDispatch} CLP`}
        labelColor={'#282e55'}
        />

        <TouchableOpacity
          style={styles.btnPurchase}
          onPress={() => this._endPurchaseAndSendProducts()}
        >
          <Text style={styles.txtBtnPurchaseQuantity}>{this.state.data.preOrderQuantity}</Text>
          <Text style={styles.txtBtnPurchaseMessage}>Enviar pedido</Text>
          <Text style={styles.txtBtnPurchaseMessage}>
                ${this.state.data.valueTotalWithDispatch}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    shadowColor: "rgba(101, 101, 101, 0.34)",
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 5,
    elevation: 8
  },
  btnCardForPurchase: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    shadowColor: "rgba(101, 101, 101, 0.34)",
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 5,
    elevation: 8
  },
  txtCardForPurchase: {
    color: "#1ea39e",
    fontSize: 16,
    fontWeight: "bold"
  },
  /******** BUTTON PURCHASE SECTION ********/
  btnPurchase: {
    width: width * 0.9,
    flexDirection: "row",
    backgroundColor: "#d81d5b",
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 15,
    bottom: 0,
    position: "absolute"
  },
  txtBtnPurchaseQuantity: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#af1749",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16
  },
  txtBtnPurchaseMessage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginHorizontal: 10
  },
  modalContainer: {
    width: width * 0.9,
    height: height * 0.9,
    justifyContent: "center"
  },
  labelInput: {
    color: "#000000",
    fontSize: 16,
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
  }
});

export default PurchaseCheckOut;
