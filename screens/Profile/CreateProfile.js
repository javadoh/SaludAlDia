import React, { Component } from "react";
import { View, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import { Constants } from "expo";
import CreateProfileOne from "@components/Profile/CreateProfileOne";
import CreateProfileTwo from "@components/Profile/CreateProfileTwo";
import CreateProfileThree from "@components/Profile/CreateProfileThree";
import CreateProfileFour from "@components/Profile/CreateProfileFour";
import CreateProfileFive from "@components/Profile/CreateProfileFive";
import CreateProfileSix from "@components/Profile/CreateProfileSix";
import { Ionicons } from "@expo/vector-icons";
import * as api from "@utils/Api";
import { saveUserIdStorage } from "@utils/storage/storage";
import { STATIC_TOKEN_CONNECTION } from "@utils/Constants";

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowCreateProfileOne: true,
      isShowCreateProfileTwo: false,
      isShowCreateProfileThree: false,
      isShowCreateProfileFour: false,
      isShowCreateProfileFive: false,
      isShowCreateProfileSix: false,
      navigationCount: 1,
      userName: null,
      userLastName: null,
      userRut: null,
      userEmail: null,
      userBirthDate: null,
      userPassword: null
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Registro Yapp",
      headerLeft: (
        <TouchableOpacity onPress={navigation.getParam("handleNavigation")}>
          <Ionicons
            style={{ paddingLeft: 15 }}
            name="md-arrow-back"
            size={24}
          />
        </TouchableOpacity>
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleNavigation: this._handleNavigationComponents
    });
  }

  _handleNavigationComponents = () => {
    console.log(
      "Entro en handleNavigationComponents, navigationCount: " +
        this.state.navigationCount
    );

    switch (this.state.navigationCount - 1) {
      case 0:
        this.props.navigation.navigate("Home");

      case 1:
        this.setState({
          isShowCreateProfileOne: true,
          isShowCreateProfileTwo: false,
          navigationCount: this.state.navigationCount - 1
        });
        break;

      case 2:
        this.setState({
          isShowCreateProfileTwo: true,
          isShowCreateProfileThree: false,
          navigationCount: this.state.navigationCount - 1
        });
        break;

      case 3:
        this.setState({
          isShowCreateProfileThree: true,
          isShowCreateProfileFour: false,
          navigationCount: this.state.navigationCount - 1
        });
        break;

      case 4:
        this.setState({
          isShowCreateProfileFour: true,
          isShowCreateProfileFive: false,
          navigationCount: this.state.navigationCount - 1
        });
        break;

      case 5:
        this.setState({
          isShowCreateProfileFive: true,
          isShowCreateProfileSix: false,
          navigationCount: this.state.navigationCount - 1
        });
        break;

      default:
        this.props.navigation.navigate("Home");
    }
  };

  async _sendDataProfile(isRedirectYappLife) {
    console.log("Entro en send data profile");

    try {
      let jsonBody = `{"id_municipality": null, "id_prevision": null, "allianceList": [], 
                            "personDto": {"firstName": "${
                              this.state.userName
                            }", 
                                        "lastName": "${
                                          this.state.userLastName
                                        }", 
                                        "rut": "${this.state.userRut}",
                                        "birthDate": "${
                                          this.state.userBirthDate
                                        }", 
                                        "email": " ${this.state.userEmail}",
                                        "password": "${this.state.userPassword}"
                                        }
                            }`;

      console.log("POST PROFILE USER DATA, json: " + jsonBody);

      const responseJson = await api.POST_PROFILE_USER_DATA.postProfileUserData(
        jsonBody
      );

      if (responseJson != null) {
        console.log(
          "Se guardaron los datos ok, el usuario yappLife es: " + responseJson
        );
        saveUserIdStorage(
          STATIC_TOKEN_CONNECTION + "?" + JSON.stringify(responseJson)
        );
        
        Alert.alert(
          "¡Muy Bien!",
          "Has creado tu cuenta exitosamente, ahora podrás disfrutar de descuentos, alertas e información de tu beneficio.",
          [
            { text: "Entendido", onPress: () => this._handleRedirection(false) }
          ],
          { cancelable: false }
        );
      } else {
        console.log(
          "No se lograron enviar los datos del profile, status: " + responseJson
        );
        Alert.alert(
          "Error al enviar datos de usuario, código status: " + responseJson
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Fin post profile");
      /*if(!isRedirectYappLife){
                    this.props.navigation.navigate('Home');
                }else{
                    this.props.navigation.navigate('ProfileCreate');
                }    */
    }
  }

  _handleRedirection(isRedirectYappLife) {
    console.log("handleRedirection Final");

    if (isRedirectYappLife) {
      this._openYappLifeWeb("https://yapp.cl/");
    } else {
      this.props.navigation.navigate("Home");
    }
  }

  _openYappLifeWeb(url) {
    this.props.navigation.navigate("Web", {
      urlWeb: url,
      webViewTitle: "Yapp Life"
    });
  }

  _renderComponentProfileTwo = (name, lastname) => {
    this.setState({
      isShowCreateProfileOne: false,
      isShowCreateProfileTwo: true,
      userName: name,
      userLastName: lastname,
      navigationCount: this.state.navigationCount + 1
    });
    console.log(
      "Name, Lastname: " +
        name +
        " , " +
        lastname +
        ", " +
        this.state.navigationCount
    );
  };

  _renderComponentProfileThree = rut => {
    this.setState({
      isShowCreateProfileTwo: false,
      isShowCreateProfileThree: true,
      userRut: rut,
      navigationCount: this.state.navigationCount + 1
    });
    console.log("Rut: " + rut + ", " + this.state.navigationCount);
  };

  _renderComponentProfileFour = birthDate => {
    this.setState({
      isShowCreateProfileThree: false,
      isShowCreateProfileFour: true,
      userBirthDate: birthDate,
      navigationCount: this.state.navigationCount + 1
    });
    console.log("Birthday: " + birthDate + ", " + this.state.navigationCount);
  };

  _renderComponentProfileFive = email => {
    this.setState({
      isShowCreateProfileFour: false,
      isShowCreateProfileFive: true,
      userEmail: email,
      navigationCount: this.state.navigationCount + 1
    });
    console.log("Email: " + email + ", " + this.state.navigationCount);
  };

  _renderComponentProfileSix = password => {
    this.setState({
      isShowCreateProfileFive: false,
      isShowCreateProfileSix: true,
      userPassword: password,
      navigationCount: this.state.navigationCount + 1
    });
    console.log("Password: " + password + ", " + this.state.navigationCount);
  };

  _renderComponentProfileToWebYappLife = isRedirectYappLife => {
    this.setState({ isShowCreateProfileSix: false });

    this._sendDataProfile(isRedirectYappLife);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.isShowCreateProfileOne ? (
          <CreateProfileOne
            action={this._renderComponentProfileTwo}
            navigation={this.props.navigation}
          />
        ) : (
          <Text />
        )}

        {this.state.isShowCreateProfileTwo ? (
          <CreateProfileTwo
            action={this._renderComponentProfileThree}
            navigation={this.props.navigation}
          />
        ) : (
          <Text />
        )}

        {this.state.isShowCreateProfileThree ? (
          <CreateProfileThree
            action={this._renderComponentProfileFour}
            navigation={this.props.navigation}
          />
        ) : (
          <Text />
        )}

        {this.state.isShowCreateProfileFour ? (
          <CreateProfileFour
            action={this._renderComponentProfileFive}
            navigation={this.props.navigation}
          />
        ) : (
          <Text />
        )}

        {this.state.isShowCreateProfileFive ? (
          <CreateProfileFive
            action={this._renderComponentProfileSix}
            navigation={this.props.navigation}
          />
        ) : (
          <Text />
        )}

        {this.state.isShowCreateProfileSix ? (
          <CreateProfileSix
            action={this._renderComponentProfileToWebYappLife}
            navigation={this.props.navigation}
          />
        ) : (
          <Text />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6578ff",
    paddingTop: Constants.statusBarHeight
  }
});

export default CreateProfile;
