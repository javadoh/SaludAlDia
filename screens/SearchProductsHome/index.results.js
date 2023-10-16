import React, { Component } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from "react-native";
import PromoBanner from "@components/PromoBanner/PromoBanner";
import styles from "./styles.results";
import CardProductResultBrand from "@components/Cards/CardProductResultBrand";
import CardProductResultCategories from "@components/Cards/CardProductResultCategories";
import CustomHeader from "@components/CustomHeader/CustomHeader";
import { Location, Permissions } from "expo";
import * as api from "@utils/Api";
import ModalAlertMessage from "@components/ModalAlertMessage/ModalAlertMessage";

/*const data = 
    {
        productAdversiting: null,
        product: [ 
            {
                id: 1, 
                productName: 'Kitadol',
                productImageUrl: "http://cumafar.helencaltum.com/wp-content/uploads/2016/11/paracetamol.jpg",
                activePrincipleName: "Paracetamol", 
                composition: "500 mg", 
                presentation: "16 cápsulas", 
                labName: "Laboratorio yapp", 
                pharmacyChainName: "Farmacias Ahumada", 
                listPrice: "$ 30.000 CLP", 
                discountPrice: "$ 26.000 CLP", 
                pharmacyChainOnline: 1, 
                pharmacyChainLatitude: "",
                pharmacyChainLongitude: "",
                pharmacyAvailable: "Abierta",
                stock: true
              },
              {
                id: 2, 
                productName: 'Paracetamol',
                productImageUrl: "http://cumafar.helencaltum.com/wp-content/uploads/2016/11/paracetamol.jpg",
                activePrincipleName: "Paracetamol", 
                composition: "500 mg", 
                presentation: "16 cápsulas", 
                labName: "Laboratorio yapp", 
                pharmacyChainName: "Farmacias Ahumada", 
                listPrice: "$ 20.000 CLP", 
                discountPrice: "$ 18.000 CLP", 
                pharmacyChainOnline: 1, 
                pharmacyChainLatitude: "",
                pharmacyChainLongitude: "",
                pharmacyAvailable: "Abierta",
                stock: false 
              }
        ],
    yappLife: [
    {
      id: 1, 
      productName: 'Kitadol',
      productImageUrl: "http://cumafar.helencaltum.com/wp-content/uploads/2016/11/paracetamol.jpg",
      activePrincipleName: "Paracetamol", 
      composition: "500 mg", 
      presentation: "16 cápsulas", 
      labName: "Laboratorio yapp", 
      pharmacyChainName: "Farmacias Ahumada", 
      listPrice: "$ 30.000 CLP", 
      discountPrice: "$ 26.000 CLP", 
      pharmacyChainOnline: 1, 
      pharmacyChainLatitude: "",
      pharmacyChainLongitude: "",
      pharmacyAvailable: "Abierta",
      stock: true
    },
    {
      id: 2, 
      productName: 'Paracetamol',
      productImageUrl: "http://cumafar.helencaltum.com/wp-content/uploads/2016/11/paracetamol.jpg",
      activePrincipleName: "Paracetamol", 
      composition: "500 mg", 
      presentation: "16 cápsulas", 
      labName: "Laboratorio yapp", 
      pharmacyChainName: "Farmacias Ahumada", 
      listPrice: "$ 20.000 CLP", 
      discountPrice: "$ 18.000 CLP", 
      pharmacyChainOnline: 1, 
      pharmacyChainLatitude: "",
      pharmacyChainLongitude: "",
      pharmacyAvailable: "Cerrada",
      stock: false 
    }
    ], 
    bioequivalent:[
        {
            id: 1, 
            productName: 'Ketoprofeno',
            productImageUrl: "http://cumafar.helencaltum.com/wp-content/uploads/2016/11/paracetamol.jpg",
            activePrincipleName: "Paracetamol", 
            composition: "500 mg", 
            presentation: "16 cápsulas", 
            labName: "Laboratorio yapp", 
            pharmacyChainName: "Farmacias Ahumada", 
            listPrice: "$ 45.000 CLP", 
            discountPrice: "$ 39.000 CLP", 
            pharmacyChainOnline: 1, 
            pharmacyChainLatitude: "",
            pharmacyChainLongitude: "",
            pharmacyAvailable: "Abierta",
            stock: false 
          },
          {
            id: 2, 
            productName: 'Ibuprofeno',
            productImageUrl: "http://cumafar.helencaltum.com/wp-content/uploads/2016/11/paracetamol.jpg",
            activePrincipleName: "Ibuprofeno", 
            composition: "500 mg", 
            presentation: "16 cápsulas", 
            labName: "Laboratorio yapp", 
            pharmacyChainName: "Farmacias Ahumada", 
            listPrice: "$ 1.000 CLP", 
            discountPrice: "$ 800 CLP", 
            pharmacyChainOnline: 1, 
            pharmacyChainLatitude: "",
            pharmacyChainLongitude: "",
            pharmacyAvailable: "Abierta",
            stock: true 
          }
    ],
    other:[
        {
            id: 1, 
            productName: "Generico Otro",
            imageUrl: "http://cumafar.helencaltum.com/wp-content/uploads/2016/11/paracetamol.jpg",
            activePrincipleName: "Génerico", 
            composition: "500 mg", 
            presentation: "16 cápsulas", 
            labName: "Laboratorio yapp", 
            pharmacyChainName: "Farmacias Ahumada", 
            listPrice: "$ 700 CLP", 
            discountPrice: "$ 600 CLP", 
            pharmacyChainOnline: 1, 
            pharmacyChainLatitude: "",
            pharmacyChainLongitude: "",
            pharmacyAvailable: "Cerrada",
            stock: true 
          },
          {
            id: 2, 
            productName: "Paracetamol", 
            imageUrl: "http://cumafar.helencaltum.com/wp-content/uploads/2016/11/paracetamol.jpg",
            activePrincipleName: "Paracetamol", 
            composition: "500 mg", 
            presentation: "16 cápsulas", 
            labName: "Laboratorio yapp", 
            pharmacyChainName: "Farmacias Ahumada", 
            listPrice: "$ 700 CLP", 
            discountPrice: "$ 600 CLP", 
            pharmacyChainOnline: 1, 
            pharmacyChainLatitude: "",
            pharmacyChainLongitude: "",
            pharmacyAvailable: "Abierta",
            stock: true 
          }
    ]
    }*/

class SearchProductsHomeResults extends Component {
  constructor(props) {
    super(props);

    this._renderModalAction = this._renderModalAction.bind(this);

    this.state = {
      data: this.props.data,
      hasLocationPermissions: false,
      mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      locationResult: null,
      location: { coords: { latitude: 37.78825, longitude: -122.4324 } },
      modalMessage: { txtLabel: "", txtMessage: "", isShow: false }
    };
    if (this.props.data.product.length > 0) {
      console.log("VA A DESMONTAR LA TOOLBAR");
      this.props.unMountToolBar();
    }
  }

  static navigationOptions = {
    title: "PRODUCTO"
  };
  /******** AGREGAR PRODUCTO AL CARRITO O VER MAPA *******/
  async _addProductToPreOrder(rowData) {
    if (rowData.stock == true) {
      this.setState({
        showMapView: false
      });

      try {
        let userId =
          this.props.userDataSession != null
            ? this.props.userDataSession
            : this.props.userDataAnonymous;
        userId = userId.substring(userId.lastIndexOf("?") + 1, userId.length);

        let jsonBody = `{
                    "discountPriceId": ${rowData.discountId},
                    "priceId": ${rowData.priceId},
                    "productId": ${rowData.productId},
                    "quantity": 1,
                    "userDts": ${userId}
            }`;

        console.log("Compra: " + jsonBody);
        const responseJson = await api.POST_PRODUCT_TO_PRE_ORDER.postProductToPreOrder(
          jsonBody
        );
        if (responseJson != null) {
          console.log(responseJson);

          this.setState({
            modalMessage: {
              txtLabel: "Mensaje",
              txtMessage: `Producto añadido con éxito, el código del producto es el siguiente: ${
                rowData.productId
              }`,
              isShow: true
            }
          });

          //Alert.alert('Producto añadido con éxito, código '+rowData.productId);
        } else {
          Alert.alert(
            "Este producto no podemos rescatarlo, lo sentimos." + rowData.id
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        console.log("Fin agregar producto a carrito");
      }
    } else {
      if (this.state.locationResult == null) {
        try {
          this._getLocationAsync("cardProduct");
        } catch {
          error;
        }
      } else {
        this.props.navigation.navigate("MapHome", {
          location: this.state.location,
          hasLocationPermissions: this.state.hasLocationPermissions,
          locationResult: this.state.locationResult,
          data: this.state.data
        });
        this.setState({
          showMapView: true
        });
      }
    }
  }

  async componentWillMount() {
    this._getLocationAsync("init");
  }

  /******* CAPTURA DE LOCALIZACION ************/
  _getLocationAsync = async whoCall => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied",
        hasLocationPermissions: false,
        location
      });
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1000
    })
      .then(location => {
        this.setState({
          locationResult: JSON.stringify(location),
          location,
          hasLocationPermissions: true
        });
      })
      .catch(error => {
        console.log("error: ", error);
        if (whoCall === "cardProduct") {
          Alert.alert(
            "Debe activar la localización en el dispositivo para ver el mapa"
          );
        }
      });
  };

  _renderModalAction() {
    this.setState({
      modalMessage: { txtLabel: "", txtMessage: "", isShow: false }
    });
  }

  render() {
    return (
      //*************************** INICIO PRODUCTOS POR CATEGORIA **************************//
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {this.state.modalMessage.isShow == true ? (
          <ModalAlertMessage
            txtLabel={this.state.modalMessage.txtLabel}
            txtMessage={this.state.modalMessage.txtMessage}
            action={this._renderModalAction}
          />
        ) : null}

        {this.state.data.product.length == 0 ? ( //this.state.data[0].marca[0]
          <View style={{ marginBottom: 20 }}>
            {this.state.data.advertisingList.length > 0 ? (
              <PromoBanner
                navigation={this.props.navigation}
                dataPromos={this.state.data.advertisingList}
                webViewTitle="Promociones del Producto"
              />
            ) : null}

            {this.state.data.yappLife.length > 0 ? (
              <Text style={styles.titleCategory}>Yapp Life</Text>
            ) : null}

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={this.state.data.yappLife}
              renderItem={({ item: rowData }) => {
                return (
                  <View>
                    <CardProductResultCategories
                      rowData={rowData}
                      styles={styles}
                    />
                    <TouchableOpacity
                      style={[
                        styles.btnAddProductToPreOrder,
                        {
                          backgroundColor:
                            rowData.stock == true ? "#6578ff" : "#1ea39e"
                        }
                      ]}
                      onPress={() => this._addProductToPreOrder(rowData)}
                    >
                      <Text style={styles.txtBtnQuantityPurchase}>
                        {" "}
                        {rowData.stock == true
                          ? "+ Agregar al carro"
                          : "Ver en mapa"}{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />

            {this.state.data.bioequivalent.length > 0 ? (
              <Text style={styles.titleCategory}>Bioequivalentes</Text>
            ) : null}

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={this.state.data.bioequivalent}
              renderItem={({ item: rowData }) => {
                return (
                  <View>
                    <CardProductResultCategories
                      rowData={rowData}
                      styles={styles}
                    />
                    <TouchableOpacity
                      style={[
                        styles.btnAddProductToPreOrder,
                        {
                          backgroundColor:
                            rowData.stock == true ? "#6578ff" : "#1ea39e"
                        }
                      ]}
                      onPress={() => this._addProductToPreOrder(rowData)}
                    >
                      <Text style={styles.txtBtnQuantityPurchase}>
                        {" "}
                        {rowData.stock == true
                          ? "+ Agregar al carro"
                          : "Ver en mapa"}{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />

            {this.state.data.other.length > 0 ? (
              <Text style={styles.titleCategory}>Otros</Text>
            ) : null}

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={this.state.data.other}
              renderItem={({ item: rowData }) => {
                return (
                  <View>
                    <CardProductResultCategories
                      rowData={rowData}
                      styles={styles}
                    />

                    <TouchableOpacity
                      style={[
                        styles.btnAddProductToPreOrder,
                        {
                          backgroundColor:
                            rowData.stock == true ? "#6578ff" : "#1ea39e"
                        }
                      ]}
                      onPress={() => this._addProductToPreOrder(rowData)}
                    >
                      <Text style={styles.txtBtnQuantityPurchase}>
                        {" "}
                        {rowData.stock == true
                          ? "+ Agregar al carro"
                          : "Ver en mapa"}{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : (
          //VISTA DE RESULTADOS POR MARCA
          <View style={{ marginBottom: 20 }}>
            <CustomHeader
              data={this.state.data.product[0]}
              navigation={this.props.navigation}
            />

            <Text style={styles.titleCategory}>Beneficios</Text>
            <PromoBanner
              navigation={this.props.navigation}
              webViewTitle="Promociones del Producto Marca"
              dataPromos={this.state.data.advertisingList}
            />

            <Text style={styles.titleCategory}>Resultados de búsqueda</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.data.product}
              renderItem={({ item: rowData }) => {
                //this.state.data[0].marca

                return (
                  <View>
                    <CardProductResultBrand rowData={rowData} styles={styles} />
                    <TouchableOpacity
                      style={[
                        styles.btnAddProductToPreOrderBrand,
                        {
                          backgroundColor:
                            rowData.stock == true ? "#6578ff" : "#1ea39e"
                        }
                      ]}
                      onPress={() => this._addProductToPreOrder(rowData)}
                    >
                      <Text style={styles.txtBtnQuantityPurchase}>
                        {rowData.stock == true
                          ? "+ Agregar al carro"
                          : "Ver en mapa"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

export default SearchProductsHomeResults;
