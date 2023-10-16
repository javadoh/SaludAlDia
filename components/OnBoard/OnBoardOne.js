import React, { PureComponent } from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import Images from "@assets/images";
import { Svg } from "expo";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

const { G, Path, Ellipse, Circle } = Svg;

class OnBoardOne extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange() {
    this.setState({
      checked: !this.state.checked
    });
  }

  _handleAction() {
    if (this.state.checked) {
      this.props.action();
    }
  }

  _goUrlTermsConditions(){
    Linking.openURL('http://www.yapp.cl');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={[styles.rowHeadLeft , {aspectRatio: 1 }]}>
            <Svg
              style={{ height: "100%", width: "100%", resizeMode: "container" }}
            >
              <G
                fill="none"
                fillRule="evenodd"
                transform={{ scale: "0.18, 0.18" }}
              >
                <Path
                  d="M282 303.009c29.147-21.893 48-56.75 48-96.009 0-39.26-18.853-74.116-48-96.009C302.056 95.927 326.985 87 354 87c66.274 0 120 53.726 120 120s-53.726 120-120 120c-27.015 0-51.944-8.927-72-23.991z"
                  fill="#8C9AF8"
                />
                <Path
                  d="M282 110.991c-29.147 21.893-48 56.75-48 96.009 0 39.26 18.853 74.116 48 96.009C261.944 318.073 237.015 327 210 327c-66.274 0-120-53.726-120-120S143.726 87 210 87c27.015 0 51.944 8.927 72 23.991z"
                  fill="#78C8C5"
                />
                <Path
                  d="M282 111c29.147 21.89 48 56.744 48 96s-18.853 74.11-48 96c-29.147-21.89-48-56.744-48-96s18.853-74.11 48-96z"
                  fill="#5684E0"
                />
                <Path
                  d="M282 263c29.147 21.89 48 56.744 48 96s-18.853 74.11-48 96c-29.147-21.89-48-56.744-48-96s18.853-74.11 48-96z"
                  fill="#F7A871"
                />
                <Path
                  d="M282 455.009c29.147-21.893 48-56.75 48-96.009 0-39.26-18.853-74.116-48-96.009C302.056 247.927 326.985 239 354 239c66.274 0 120 53.726 120 120s-53.726 120-120 120c-27.015 0-51.944-8.927-72-23.991z"
                  fill="#FFD592"
                />
                <Path
                  d="M282 262.991c-29.147 21.893-48 56.75-48 96.009 0 39.26 18.853 74.116 48 96.009C261.944 470.073 237.015 479 210 479c-66.274 0-120-53.726-120-120s53.726-120 120-120c27.015 0 51.944 8.927 72 23.991z"
                  fill="#DB6580"
                />
                <Path
                  d="M303 283a119.729 119.729 0 0 0 21.754-40.378A120.249 120.249 0 0 1 354.13 239c37.433 0 70.863 17.14 92.87 44-22.007 26.86-55.437 44-92.87 44a120.249 120.249 0 0 1-29.376-3.622A119.729 119.729 0 0 0 303 283z"
                  fill="#D1AC8F"
                />
                <Path
                  d="M261 283a119.729 119.729 0 0 1-21.754-40.378A120.249 120.249 0 0 0 209.87 239c-37.433 0-70.863 17.14-92.87 44 22.007 26.86 55.437 44 92.87 44 10.134 0 19.975-1.256 29.376-3.622A119.729 119.729 0 0 1 261 283z"
                  fill="#B57894"
                />
                <G transform="translate(204 150)">
                  <Path
                    d="M157 30.136V68.33c0 40.556-16.68 87.67-79.273 87.67C15.134 156 0 98.84 0 68.33V0M78 156l.5 89.5"
                    stroke="#FFF"
                    strokeWidth={23}
                    strokeLinecap="round"
                  />
                  <Ellipse
                    stroke="#FFF"
                    strokeWidth={6}
                    fill="#FFF"
                    cx={78}
                    cy={235.5}
                    rx={28}
                    ry={28.5}
                  />
                  <Circle fill="#F7A871" cx={78} cy={236} r={11} />
                </G>
                <Path
                  d="M303.036 283C319.539 263 325 243 325 243s-23.651 4.906-43 20.154c3.33 2.366 16.607 14.505 21.036 19.846z"
                  fill="#BCA485"
                />
                <Path
                  d="M260.964 283C244.461 263 239 243 239 243s23.651 4.906 43 20.154c-3.33 2.366-16.607 14.505-21.036 19.846z"
                  fill="#6E64CD"
                />
              </G>
            </Svg>
          </View>

          <View style={styles.rowHeadRight}>
            <Text style={styles.titleHeader}>
              ¡Bienvenido/a a nuestra comunidad Yapp!
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <Image style={styles.imgOb1} source={Images.ob1} />

          <Text style={styles.bodyMessage}>
            Juntos encontraremos los mejores precios en salud para ti y tu
            familia
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <View
              style={{
                width: this.props.size,
                height: this.props.size,
                backgroundColor: this.props.color,
                padding: 3
              }}
            >
              {this.state.checked ? (
                <View style={styles.checkedView}>
                  <MaterialIcons
                    name="check-box"
                    size={24}
                    onPress={() => this._handleChange()}
                  />
                </View>
              ) : (
                <View style={styles.uncheckedView}>
                  <MaterialIcons
                    name="check-box-outline-blank"
                    size={24}
                    onPress={() => this._handleChange()}
                  />
                </View>
              )}
            </View>

            <Text>Acepto </Text>
            <Text style={styles.termsConditions} onPress={() => this._goUrlTermsConditions()}>
              los términos y condiciones
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.btnContinue,
              { backgroundColor: this.state.checked ? "#1ea39e" : "#eeeeee" }
            ]}
            onPress={() => this._handleAction()}
          >
            <Text style={styles.textBtnStart}>Comenzar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default OnBoardOne;
