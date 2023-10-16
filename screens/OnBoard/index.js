import React, { Component } from "react";
import { View, Text, Alert, Dimensions } from "react-native";
import OnBoardOne from "@components/OnBoard/OnBoardOne";
import OnBoardTwo from "@components/OnBoard/OnBoardTwo";
import OnBoardThree from "@components/OnBoard/OnBoardThree";
import OnBoardFour from "@components/OnBoard/OnBoardFour";
import styles from "../SearchProductsHome/styles";
import * as api from "@utils/Api";
import { STATIC_TOKEN_CONNECTION } from "@utils/Constants";
import { saveUserIdAnonymousStorage } from "@utils/storage/storage";
import ErrorServer from '@components/ErrorServer/ErrorServer';
import LoadSpinner from '@components/LoadSpin/LoadSpin';

const { height } = Dimensions.get('window');

class OnBoardInit extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this._renderComponentOnBoardTwo = this._renderComponentOnBoardTwo.bind(
      this
    );
    this._renderComponentOnBoardThree = this._renderComponentOnBoardThree.bind(
      this
    );
    this._renderComponentOnBoardFour = this._renderComponentOnBoardFour.bind(
      this
    );
    this._renderComponentOnBoardFive = this._renderComponentOnBoardFive.bind(
      this
    );

    this.state = {
      isShowOnBoardOne: true,
      isShowOnBoardTwo: false,
      isShowOnBoardThree: false,
      isShowOnBoardFour: false,
      loading: true,
      dataConfig: [],
      dataInitComunas: [],
      dataInitPrevisiones: [],
      dataInitConvenios: [],
      selectedComuna: null,
      selectedPrevision: null,
      selectedConvenios: [],
      error404: false,
      error500: false
    };
  }

  async componentWillMount() {

    await Expo.Font.loadAsync({
      proximanova: require("@assets/fonts/proximanova.ttf")
    });
    this.setState({ loading: false });

    this._getOnBoardConfigInitParameters();
  }

  /****** BUSQUEDA DE PARAMETROS CONFIG ES2017 ******/
  async _getOnBoardConfigInitParameters() {
    try {
      console.log("INIT ON BOARD DATA");
      const responseJson = await api.GET_ONBOARD_INIT_PARAMS.getOnBoardInitData();

      if (responseJson.municipalityList.length > 0) {
        this.setState({
          dataInitComunas: responseJson.municipalityList
        });
      }

      if (responseJson.healthInsuranceList.length > 0) {
        this.setState({
          dataInitPrevisiones: responseJson.healthInsuranceList
        });
      }

      if (responseJson.allianceList.length > 0) {
        this.setState({
          dataInitConvenios: responseJson.allianceList
        });
      }
    } catch (error) {
      //console.error(error);
      this.setState({error500: true})
    } finally {
      console.log("Fin consulta onboard");
    }
  }

  /****** ADD USER CONFIG FROM ON BOARD ******/
  async _addUserOnBoardInformation(continueProfile, selectedConveniosArray) {
    let jsonBody = `{"id_municipality": ${
      this.state.selectedComuna
    }, "id_prevision": ${this.state.selectedPrevision}, 
            "alianzas": [${selectedConveniosArray}], "token": "${STATIC_TOKEN_CONNECTION}"}`;

    try {
      console.log("POST ON BOARD DATA, json: " + jsonBody);
      const responseJson = await api.POST_ONBOARD_USER_DATA.postOnBoardUserData(
        jsonBody
      );

      if (responseJson != null) {
        console.log(
          "Se guardaron los datos ok, el token es: " +
            responseJson +
            " , el servidor dice: " +
            responseJson
        );
        saveUserIdAnonymousStorage(
          STATIC_TOKEN_CONNECTION + "?" + JSON.stringify(responseJson)
        );
      } else {
        console.log(
          "No se logro enviar los datos del onboard, status: " + responseJson
        );
        Alert.alert("Error status: " + responseJson);
      }
    } catch (error) {
      //console.error(error);
      this.setState({error500: true});
    } finally {
      console.log("Fin post onboard");
      if (!continueProfile) {
        this.props.navigation.navigate("Home");
      } else {
        this.props.navigation.navigate("ProfileCreate");
      }
    }
  }

  _renderComponentOnBoardTwo = () => {
    this.setState({ isShowOnBoardOne: false, isShowOnBoardTwo: true });
  };

  _renderComponentOnBoardThree = selectedComunaId => {
    this.setState({
      isShowOnBoardTwo: false,
      isShowOnBoardThree: true,
      selectedComuna: selectedComunaId
    });
    console.log("Comuna seleccionada en ob2" + this.state.selectedComuna);
  };

  _renderComponentOnBoardFour = (
    selectedIdPrevision,
    selectedNamePrevision
  ) => {
    this.setState({
      isShowOnBoardThree: false,
      isShowOnBoardFour: true,
      selectedPrevision: selectedIdPrevision
    });
    console.log(selectedIdPrevision + selectedNamePrevision);
  };

  _renderComponentOnBoardFive = (selectedConveniosArray, continueProfile) => {
    console.log(
      "EN ONBOARD INDEX: " +
        selectedConveniosArray +
        ", BOOLEAN: " +
        continueProfile
    );

    this.setState({
      isShowOnBoardThree: false,
      isShowOnBoardFour: false,
      selectedConvenios: selectedConveniosArray
    });

    //Enviando los datos al servidor
    this._addUserOnBoardInformation(continueProfile, selectedConveniosArray);
  };

  render() {
    if (this.state.loading) {
      return (<View style={{height: height}}><LoadSpinner /></View>);
    }

    return (
      <View style={styles.container}>

      {this.state.error500 ? (
        <ErrorServer />
      ): null}
      
        {this.state.isShowOnBoardOne && !this.state.loading ? (
          <OnBoardOne action={this._renderComponentOnBoardTwo} />
        ) : (
          <Text />
        )}

        {this.state.isShowOnBoardTwo ? (
          <OnBoardTwo
            actionOb2={this._renderComponentOnBoardThree}
            dataComunas={this.state.dataInitComunas}
          />
        ) : (
          <Text />
        )}

        {this.state.isShowOnBoardThree ? (
          <OnBoardThree
            actionOb3={this._renderComponentOnBoardFour}
            dataPrevisiones={this.state.dataInitPrevisiones}
            comuna={this.state.selectedComuna}
          />
        ) : (
          <Text />
        )}

        {this.state.isShowOnBoardFour ? (
          <OnBoardFour
            actionOb4={this._renderComponentOnBoardFive}
            dataConvenios={this.state.dataInitConvenios}
          />
        ) : (
          <Text />
        )}
      </View>
    );
  }
}

export default OnBoardInit;
