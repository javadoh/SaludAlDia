import React, { PureComponent } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Images from "@assets/images";
import styles from "./styles";

class CreateProfileSix extends PureComponent {
  _handleNext(isRedirectToYappLife) {
    this.props.action(isRedirectToYappLife);
  }

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  render() {
    return (
      <View>
        <Text style={styles.txtTitleProfileSix}>
          ¿Quieres aprovechar de inscribirte en Yapp Life?
        </Text>
        <View style={styles.formSection}>
          <Image style={styles.imgEndProfile} source={Images.endProfile} />
        </View>
        <Text style={styles.textBodyMsgForm}>
          Saber tu correo electrónico será necesario para entregarte información
          relevante sobre tus compras.
        </Text>

        <TouchableOpacity
          style={styles.btnNext}
          onPress={() => this._handleNext(true)}
        >
          <Text style={styles.txtBtnNext}>Sí, quiero</Text>
        </TouchableOpacity>
        <Text style={styles.txtOmitir} onPress={() => this._handleNext(false)}>
          Quizás más adelante
        </Text>
      </View>
    );
  }
}

export default CreateProfileSix;
