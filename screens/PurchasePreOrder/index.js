import React, { Component } from "react";
import {
  View,
  BackHandler,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  AsyncStorage
} from "react-native";
import { _handleBackButtonMsg } from "@utils/Utils";
import styles from "./styles";
import ModalOneInput from "@components/ModalOneInput/ModalOneInput";
import * as api from "@utils/Api";
import { REPO_IMG_PRODUCT_SERV_URL } from "@utils/Constants";
import LoadSpinner from "@components/LoadSpin/LoadSpin";
import NoDataFound from "@components/NoDataFound/NoDataFound";
import ModalAlertMessage from "@components/ModalAlertMessage/ModalAlertMessage";

/*const dataDummie = {
    "valueTotal": 31000,
    "valueTotalDiscount": 27000,
    "preOrderQuantity": 4,
    "valueTotalWithDispatch": 29500,
    "address": null, 
    "pharmacies": [
        {"id": 1,
         "name": "Ahumada",
         "productInfoDtos": [
            {
            "id": 7,
            "name": "Abrilar",
			"activePrinciple": "Ibuprofeno",
			"gramaje": "200 mg",
			"presentation": "10 cápsulas ",
			"price": 3000,
			"priceWithDiscount": 2850,
			"qtyProductInCart": 2,
            "laboratory": "Laboratorio de Chile",
            "productImage": "http://cumafar.helencaltum.com/wp-content/uploads/2016/11/paracetamol.jpg"
            },
            {
            "id": 5,
            "name": "Ibuprofeno",
            "activePrinciple": "Ibuprofeno",
            "gramaje": "500 mg",
            "presentation": "30 cápsulas ",
            "price": 5500,
            "priceWithDiscount": 4900,
            "qtyProductInCart": 3,
            "laboratory": "Laboratorio Yapp",
            "productImage": "http://cumafar.helencaltum.com/wp-content/uploads/2016/11/paracetamol.jpg"
            }
         ]
        },
        {"id": 2,
         "name": "Cruz Verde",
         "productInfoDtos": [
            {
            "id": 44,
            "name": "Paracetamol",
			"activePrinciple": "Paracetamol",
			"gramaje": "100 mg",
			"presentation": "20 cápsulas ",
			"price": 7000,
			"priceWithDiscount": 4700,
			"qtyProductInCart": 1,
            "laboratory": "Laboratorio de Chile",
            "productImage": "http://cumafar.helencaltum.com/wp-content/uploads/2016/11/paracetamol.jpg"
            },
            {
            "id": 3,
            "name": "Jarabe para la tos",
            "activePrinciple": "Kiketanol",
            "gramaje": "200 ml",
            "presentation": "1 frasco",
            "price": 8000,
            "priceWithDiscount": null,
            "qtyProductInCart": 3,
            "laboratory": "Laboratorio Yapp",
            "productImage": "http://cumafar.helencaltum.com/wp-content/uploads/2016/11/paracetamol.jpg"
            }
         ]
        }
    ],
}*/

class PurchasePreOrder extends Component {
  static navigationOptions = {
    title: "Carro de Compras"
  };

  constructor(props) {
    super(props);

    this._renderModalAction = this._renderModalAction.bind(this);

    this.state = {
      data: null,
      addressInput: null,
      isShowBtnAddAddress: false,
      isShowModalAddress: false,
      userId: this.props.route.params.userId,
      userIdAnonymous: this.props.route.params.userIdAnonymous,
      error404: false,
      modalMessage: { txtLabel: "", txtMessage: "", isShow: false }
    };
  }

  async componentWillMount() {
    this._getShoppingCart();
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.navigate("Home");
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  async _removeQuantity(rowdata) {
    console.log("Eliminando cantidad producto a preorder");

    //SE COMENTA HASTA QUE GETCARRITO TRAIGA EL ID CORRELATIVO DE PREORDER PARA ENVIARSE ACA

    /*try{
            let userId = this._getUserIdFromSession();
            const responseJson = await api.DELETE_PRODUCT_FROM_PRE_ORDER.deleteProductFromPreOrder(userId);
                  console.log(responseJson);
                  if(responseJson != null){
                    Alert.alert('Producto eliminado con éxito, código '+rowData.id);
                  }else{
                    Alert.alert('Este producto no podemos rescatarlo, lo sentimos.'+rowData.id);
                  }
          } catch (error) {
            console.error(error);
          }finally{
            console.log('Fin eliminar producto a carrito, refrescamos carro de compra');
            this._getShoppingCart();
          }*/
  }

  async _addQuantity(rowData) {
    //SE NECESITA EL ID DE LA PREORDER ADEMAS DE ASOCIACION POR FARMACIA PARA QUE FUNCIONE BIEN
    console.log("Agregando cantidad producto a preorder");
    try {
      let userId = this._getUserIdFromSession();
      let jsonBody = `{
                "discountPriceId": ${0},
                "priceId": ${rowData.price},
                "productId": ${rowData.id},
                "quantity": 1,
                "userDts": ${userId}
        }`;
      console.log(jsonBody);

      const responseJson = await api.POST_PRODUCT_TO_PRE_ORDER.postProductToPreOrder(
        jsonBody
      );
      console.log(responseJson);
      if (responseJson != null) {
        //Alert.alert('Producto añadido con éxito, código '+rowData.id+' , cantidad en carrito: '+responseJson);
        this.setState({
          modalMessage: {
            txtLabel: "",
            txtMessage: `Producto añadido con éxito, código ${
              rowData.id
            } , cantidad en carrito: ${responseJson}`,
            isShow: true
          }
        });
      } else {
        this.setState({
          modalMessage: {
            txtLabel: "Error",
            txtMessage: `Este producto no podemos rescatarlo, lo sentimos. ${
              rowData.id
            }`,
            isShow: true
          }
        });
        //Alert.alert('Este producto no podemos rescatarlo, lo sentimos.'+rowData.id);
      }
    } catch (error) {
      //console.error(error);
      this.setState({
        modalMessage: {
          txtLabel: "Error",
          txtMessage: `${error}`,
          isShow: true
        }
      });
    } finally {
      console.log(
        "Fin agregar producto a carrito, refrescamos el carro de compra"
      );
      this._getShoppingCart();
    }
  }

  /*_uploadPrescription(){
        console.log("Subiendo receta");
    }*/

  async _purchase() {
    console.log("COMPRANDO");
    if (this.state.addressInput == null) {
      this.setState({
        modalMessage: {
          txtLabel: "Info",
          txtMessage: "Antes debes ingresar una dirección de despacho",
          isShow: true
        }
      });
    } else {
      if (this.state.userId != null) {
        console.log('ADDRESS: '+this.state.addressInput);
        this.props.navigation.navigate("PurchaseCheckOut", {
          purchaseAddress: this.state.addressInput,
          userId: this.state.userId,
          data: this.state.data
        });
      } else {
        let user = await AsyncStorage.getItem("userId");
        if (user != null) {
          this.props.navigation.navigate("PurchaseCheckOut", {
            purchaseAddress: this.state.addressInput,
            userId: user,
            data: this.state.data
          });
        } else {
          this.setState({
            modalMessage: {
              txtLabel: "Info",
              txtMessage: "Antes de realizar una compra, registra tu perfil",
              isShow: true
            }
          });
        }
      }
    }
  }

  async _getShoppingCart() {
    try {
      let userId = this._getUserIdFromSession();

      if (userId != null) {
        console.log("BUSCANDO CARRITO DE COMPRA, userId: " + userId);
        const responseJson = await api.GET_USER_PRE_ORDER.getUserProductPreOrder(
          userId
        );

        console.log("CARRO DATA ACW: " + responseJson);
        if (responseJson != null) {
          this.setState({
            data: responseJson
          });

          if (responseJson.address != null) {
            this.setState({ addressInput: responseJson.address });
          }
        } else {
          console.log("No se obtuvo el carrito de compra");
        }
      } else {
        Alert.alert("Hubo un error no tenemos un usuario reconocido.");
      }
    } catch (error) {
      //console.error(error);
      this.setState({ error404: true });
    } finally {
      console.log("Se cargo el carrito de compra: " + this.state.data);
    }
  }

  _toggleAddressAction(address) {
    if (address != null) {
      this.setState({
        isShowBtnAddAddress: false,
        addressInput: address
      });
    } else {
      this.setState({
        isShowBtnAddAddress: true
      });
    }
  }

  _handleAddressModal() {
    this.setState({
      isShowModalAddress: true
    });
  }

  _renderInputDataComponent = value => {
    if (value.length === 0) {
      this.setState({
        isShowModalAddress: false,
        addressInput: null
      });
    } else {
      /**** ENVIAMOS NUEVA DIRECCION AL SERVIDOR ****/
      try {
        let userId = this._getUserIdFromSession();
        let jsonBody = `{
                    address: "${value}",
                    address2: "", 
                    municipality_id: null, 
                    personId: ${userId},
                }`;

        console.log("JSON POST ADDRESS: " + jsonBody);

        api.POST_ADDRESS_PRE_ORDER.postAddressPreOrder(jsonBody).then(
          response => {
            if (response != null) {
              console.log(
                "Se registro bien la nueva dirección, response: " + response
              );
              this.setState({
                addressInput: value,
                isShowModalAddress: false
              });
            } else {
              this.setState({
                isShowModalAddress: false
              });
              Alert.alert(
                "Ocurrió un error registrando la dirección en el servidor, code status: " +
                  response
              );
            }
          }
        );

        console.log("Address input: " + this.state.addressInput);
        this._toggleAddressAction(this.state.addressInput);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  };

  _getUserIdFromSession() {
    //FUNCION AUXILIAR POR IMPLEMENTACION BACKEND
    let { userId, userIdAnonymous } = this.state;
    if (userId == null) {
      userId = userIdAnonymous;
    }

    if (userId != null) {
      userId = userId.substring(userId.lastIndexOf("?") + 1, userId.length);
    }
    return userId;
  }

  _renderModalAction() {
    this.setState({
      modalMessage: { txtLabel: "", txtMessage: "", isShow: false }
    });
  }

  render() {
    const dataPharmaciesProducts =
      this.state.data != null
        ? this.state.data.pharmacies.map((pharmacy, i) => {
            return (
              <View key={i} style={styles.container}>
                {this.state.modalMessage.isShow == true ? (
                  <ModalAlertMessage
                    txtLabel={this.state.modalMessage.txtLabel}
                    txtMessage={this.state.modalMessage.txtMessage}
                    action={this._renderModalAction}
                  />
                ) : null}

                <Text style={styles.cardTitleHeader}>{pharmacy.name}</Text>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={pharmacy.productInfoDtos}
                  renderItem={({ item: rowData }) => {
                    return (
                      <View style={styles.card}>
                        <View style={styles.separator} />
                        <View style={styles.rowCard}>
                          <View style={styles.cardSectionOne}>
                            <Image
                              style={styles.cardImageProduct}
                              source={{
                                uri:
                                  REPO_IMG_PRODUCT_SERV_URL +
                                  rowData.productImage
                              }}
                            />
                          </View>

                          <View style={styles.cardSectionTwo}>
                            <Text style={styles.cardTitleProduct}>
                              {rowData.name}
                            </Text>
                            <Text style={styles.cardActivePrinciple}>
                              {rowData.activePrinciple}
                            </Text>
                            <Text style={styles.cardLaboratoryProduct}>
                              {rowData.laboratory}
                            </Text>
                          </View>

                          <View style={styles.cardSectionThree}>
                            <View style={styles.rowAuxQuantity}>
                              <TouchableOpacity
                                style={styles.btnQuantity}
                                onPress={() => this._removeQuantity(rowData)}
                              >
                                <Text style={styles.txtBtnQuantity}>-</Text>
                              </TouchableOpacity>
                              <Text style={styles.cardProductQuantity}>
                                {rowData.qtyProductInCart}
                              </Text>
                              <TouchableOpacity
                                style={styles.btnQuantity}
                                onPress={() => this._addQuantity(rowData)}
                              >
                                <Text style={styles.txtBtnQuantity}>+</Text>
                              </TouchableOpacity>
                            </View>
                            <Text style={styles.cardSubTotalPrice}>
                              $
                              {rowData.priceWithDiscount > 0
                                ? rowData.priceWithDiscount
                                : rowData.price}{" "}
                              CLP
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            );
          })
        : null;

    return (
      <ScrollView style={styles.container}>
        {this.state.data != null ? (
          <View>
            <View style={styles.containerHeader}>
              <Text style={[styles.sectionLeft, styles.labelHeader]}>
                Subtotal
              </Text>
              <View style={styles.sectionRight}>
                <Text style={styles.subTotalHeader}>
                  ${this.state.data.valueTotal} CLP
                </Text>
              </View>
            </View>

            {this.state.isShowModalAddress ? (
              <ModalOneInput
                txtLabel="Añadir dirección"
                inputTxtType="no secure"
                txtMinLength={8}
                txtMaxLength={100}
                action={this._renderInputDataComponent}
              />
            ) : (
              <Text />
            )}

            {dataPharmaciesProducts}

            <View style={styles.pricesDiscountsContainer}>
              <View style={styles.rowFooter}>
                <Text style={[styles.sectionLeft, styles.labelDescription]}>
                  Subtotal Productos
                </Text>
                <View style={styles.sectionRight}>
                  <Text style={styles.total}>
                    ${this.state.data.valueTotal} CLP
                  </Text>
                </View>
              </View>
              <View style={styles.rowFooter}>
                <Text style={[styles.sectionLeft, styles.labelDescription]}>
                  Descuento Yapp Life
                </Text>
                <View style={styles.sectionRight}>
                  <Text style={styles.total}>
                    $ {this.state.data.valueTotalDiscount} CLP
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.rowFooterDispatch, styles.separator]}>
              <Text style={[styles.sectionLeft, styles.dispatchLabel]}>
                Despacho a domicilio
              </Text>
              <View style={styles.sectionRight}>
                <Text style={styles.totalDispatch}>
                  ${this.state.data.valueTotalWithDispatch} CLP
                </Text>
              </View>
            </View>

            {this.state.data.address == null &&
            this.state.addressInput == null ? (
              <TouchableOpacity
                style={[styles.rowFooter, styles.btnUserDirectionChange]}
              >
                <Text
                  style={styles.txtUserDirectionChange}
                  onPress={() => this._handleAddressModal()}
                >
                  + Añadir dirección de despacho
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.rowFooter}>
                <Text style={[styles.sectionLeft, styles.userDirection]}>
                  {this.state.data.address != null
                    ? this.state.data.address
                    : this.state.addressInput}
                </Text>
                <TouchableOpacity
                  style={[styles.sectionRight, styles.btnUserDirectionChange]}
                >
                  <Text
                    style={styles.txtUserDirectionChange}
                    onPress={() => this._handleAddressModal()}
                  >
                    Cambiar
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/*<TouchableOpacity style={styles.btnUploadYourPrescription} onPress={() => this._uploadPrescription()}>
            <Text style={styles.textUploadYourPrescription}>+ Carga tu Receta</Text>
            </TouchableOpacity>*/}

            <TouchableOpacity
              style={styles.btnPurchase}
              onPress={() =>
                this._purchase(this.state.data, this.state.addressInput)
              }
            >
              <Text style={styles.txtBtnPurchaseQuantity}>
                {this.state.data.preOrderQuantity}
              </Text>
              <Text style={styles.txtBtnPurchase}>Comprar</Text>
              <Text style={styles.txtBtnPurchasePrice}>
                ${this.state.data.valueTotalWithDispatch}
              </Text>
            </TouchableOpacity>
          </View>
        ) : !this.state.error404 ? (
          <View style={styles.spinner}>
            <LoadSpinner />
          </View>
        ) : (
          <NoDataFound />
        )}
      </ScrollView>
    );
  }
}

export default PurchasePreOrder;
