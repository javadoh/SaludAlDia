import React, { PureComponent } from "react";
import { View, AsyncStorage } from "react-native";
import LoadSpinner from '@components/LoadSpin/LoadSpin';

class SplashScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userId: null
    };
  }

  performTimeConsumingTask = async () => {
    this._getUserStorageAsync();

    return new Promise(resolve =>
      setTimeout(() => {
        resolve("result");
      }, 2000)
    );
  };

  async componentDidMount() {
    
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      console.log("USERID SPLASH: " + this.state.userId);

      if (this.state.userId !== null) {
        this.props.navigation.navigate("App");
      } else {
        this.props.navigation.navigate("OnBoardApp");
      }
    }
  }

  _getUserStorageAsync = async () => {
    // ****** SOLO PARA PRUEBAS Y DEMOS COMENTAR PARA DEPLOYS
    //const removeUser = await AsyncStorage.removeItem("userId");
    //const removeUserAnonymous = await AsyncStorage.removeItem(
    //  "userIdAnonymous"
    //);
    //*******//

    const userToken = await AsyncStorage.getItem("userIdAnonymous");
    if (userToken !== null) {
      console.log("EL USER Anonymous TOKEN ES: " + userToken);
      this.setState({
        userId: userToken
      });
    } else {
      this.props.navigation.navigate("OnBoardApp");
    }
  };

  render() {
    return (
      <View style={styles.viewStyles}>  
      <LoadSpinner />
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  textStyles: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold"
  },
  logo: {
    width: '27%',
    height: '25%',
    resizeMode: 'cover'
  }
};

export default SplashScreen;
