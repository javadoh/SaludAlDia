import React, { PureComponent } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import styles from "./styles";
import { Svg } from "expo";
import ModalAlertMessage from '@components/ModalAlertMessage/ModalAlertMessage';

const { G, Path, Ellipse, Circle } = Svg;

class OnBoardTwo extends PureComponent {
  constructor(props) {
    super(props);

    this._renderModalAction = this._renderModalAction.bind(this);
    
    this.state = {
      textComunaSelected: "",
      idComunaSelected: null,
      data: [],
      dataFiltered: [],
      isFocusInput: false,
      btnBackGroundColor: "#eeeeee",
      modalMessage: { txtLabel: "", txtMessage: "", isShow: false }
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.dataComunas,
      dataFiltered: this.props.dataComunas
    });
  }

  _handleComunaSelection(comuna) {
    this._dataComunaFiltered(comuna);

    this.setState({
      textComunaSelected: comuna
    });
    if (comuna.length > 3) {
      this.setState({
        btnBackGroundColor: "#1ea39e"
      });
    }
  }

  _selectedComuna(comuna) {
    this.setState({
      textComunaSelected: comuna.name,
      idComunaSelected: comuna.id,
      btnBackGroundColor: "#1ea39e",
      isFocusInput: false
    });
  }

  _handleAction(idComuna, isContinue) {

    if (idComuna != null && isContinue) {
      this.props.actionOb2(idComuna);
    }

    if (idComuna == null && isContinue) {
      this.setState({
        modalMessage: {
          txtLabel: "Info",
          txtMessage: 'Debe seleccionar una comuna para continuar',
          isShow: true
        }
      });
    }

    if (idComuna == null && !isContinue) {
      this.props.actionOb2(null);
    }

    if (idComuna != null && !isContinue) {
      this.setState({
        modalMessage: {
          txtLabel: "Info",
          txtMessage: 'Debe continuar, ya se ha seleccionado una comuna',
          isShow: true
        }
      });
    }
  }

  _handleOnFocus() {
    this.setState({
      isFocusInput: true
    });
  }

  _dataComunaFiltered(comuna) {
    var arrayComunasFiltered = [];
    const textRegex = new RegExp(`^${comuna}`, "gm");

    this.state.data.map((comunaFilter, i) => {
      if (textRegex.test(comunaFilter.name)) {
        arrayComunasFiltered.push(comunaFilter);
      }
    });

    this.setState({
      dataFiltered: arrayComunasFiltered
    });
  }

  _renderModalAction() {
    this.setState({
      modalMessage: { txtLabel: "", txtMessage: "", isShow: false }
    });
  }

  render() {
    const dataComunasList = this.state.dataFiltered.map((comuna, i) => {
      return (
        <Text
          key={i}
          onPress={() => this._selectedComuna(comuna)}
          style={styles.textProductNameRes}
        >
          {comuna.name}
        </Text>
      );
    });

    return (
      <View style={styles.container}>

      {this.state.modalMessage.isShow == true ? (
                <ModalAlertMessage
                  txtLabel={this.state.modalMessage.txtLabel}
                  txtMessage={this.state.modalMessage.txtMessage}
                  backColorBtn={'#1ea39e'}
                  action={this._renderModalAction}
                />
              ) : null}

        <View style={styles.body}>
          {this.state.isFocusInput ? (
            <ScrollView
              style={styles.containerSearchResults}
              showsVerticalScrollIndicator={false}
            >
              {dataComunasList}
            </ScrollView>
          ) : (
            <View style={styles.imgOb2}>
              <Svg
                style={{
                  height: "70%",
                  width: "100%",
                  resizeMode: "container"
                }}
              >
                <G fillRule="nonzero" fill="none" transform={{ scale: "1, 1" }}>
                  <Path
                    d="M294.127 128.69c0 9.09-4.246 17.33-11.135 23.334a38.08 38.08 0 0 1-5.546 4.02c-.079.05-.16.097-.242.145l-.445.262-.14.082a43.38 43.38 0 0 1-21.332 5.466H57.14c-13.663 0-26.032-4.747-34.994-12.42-8.961-7.672-14.484-18.29-14.484-30A47.324 47.324 0 0 1 0 93.67C0 67.64 20.85 46.536 46.57 46.536c.911 0 1.814.031 2.71.081C65.42 19.152 101.825 0 144.118 0c26 0 49.767 7.234 67.972 19.186a45.902 45.902 0 0 1 22.607-5.92c25.716 0 46.57 21.102 46.57 47.134a48.451 48.451 0 0 1-.263 4.93A47.234 47.234 0 0 1 301 104.04a47.337 47.337 0 0 1-6.873 24.65z"
                    fill="#6C65DB"
                    opacity={0.1}
                  />
                  <G transform="translate(19 21.5)">
                    <Path
                      d="M33.444 111l-.444-.1c4.948-22.052 17.384-42.077 35.017-56.386 27.1-21.959 63.583-28.368 96.523-16.957 32.939 11.412 57.68 39.031 65.46 73.074l-.443.1c-10.476-46.087-50.785-78.275-98.027-78.275-46.622 0-87.873 33.032-98.086 78.544z"
                      fill="#3F3D56"
                    />
                    <Ellipse
                      fill="#FFBA4A"
                      cx={206}
                      cy={45.5}
                      rx={13}
                      ry={12.5}
                    />
                    <Path fill="#3F3D56" d="M201 95h1v17h-1z" />
                    <Path
                      d="M206 96.48c.03 6.35-4.447 11.52-4.447 11.52s-4.524-5.128-4.553-11.48c-.03-6.35 4.447-11.52 4.447-11.52s4.524 5.128 4.553 11.48z"
                      fill="#1A908C"
                    />
                    <Circle
                      fill="#DB6580"
                      opacity={0.4}
                      cx={115}
                      cy={52}
                      r={7}
                    />
                    <Circle
                      fill="#DB6580"
                      opacity={0.4}
                      cx={101.5}
                      cy={55.5}
                      r={5.5}
                    />
                    <Circle
                      fill="#DB6580"
                      opacity={0.4}
                      cx={48.5}
                      cy={69.5}
                      r={5.5}
                    />
                    <Circle
                      fill="#DB6580"
                      opacity={0.4}
                      cx={196}
                      cy={52}
                      r={7}
                    />
                    <Path
                      d="M13.104 110.764c.342 1.38 1.517 2.236 1.517 2.236s.618-1.383.275-2.764c-.342-1.38-1.517-2.236-1.517-2.236s-.618 1.383-.275 2.764z"
                      fill="#3F3D56"
                    />
                    <Path
                      d="M13.76 109.898C14.866 110.727 15 112 15 112s-1.656-.07-2.76-.898C11.134 110.273 11 109 11 109s1.656.07 2.76.898z"
                      fill="#6C63FF"
                    />
                    <Path
                      d="M153.104 110.764c.342 1.38 1.517 2.236 1.517 2.236s.618-1.383.275-2.764c-.342-1.38-1.517-2.236-1.517-2.236s-.618 1.383-.275 2.764z"
                      fill="#3F3D56"
                    />
                    <Path
                      d="M153.76 109.898c1.105.829 1.24 2.102 1.24 2.102s-1.656-.07-2.76-.898C151.134 110.273 151 109 151 109s1.656.07 2.76.898z"
                      fill="#6C63FF"
                    />
                    <Path
                      fill="#3F3D56"
                      d="M14 98l9.96-8h21.842l.971 1.084.227 1.135-8.32 8.879-9.6 1.902-13.12-3.805z"
                    />
                    <Path
                      fill="#D8D8D8"
                      d="M49.856 89h-3.085l.002 2.084-.97-1.084-7.857 7.216-1.31 1.285L35 112h18V97.537l-3.144-3.508z"
                    />
                    <Path fill="#F8F8F8" d="M14 98h23v14H14z" />
                    <Path fill="#3F3D56" d="M30 103h5v4h-5z" />
                    <Path fill="#D8D8D8" d="M24 101h4v11h-4z" />
                    <Path
                      fill="#3F3D56"
                      d="M19 104v-1h-2v1h1.833zM18.833 106H17v1h2v-1zM20 103h2v1h-2zM20 106h2v1h-2zM46 104v-1h-2v1h1.833zM45.833 106H44v1h2v-1zM47 103h2v1h-2zM47 106h2v1h-2zM106 97.61l8.96-8.066c13.032-.192 20.378-.192 22.04 0-.17 1.835.164 2.726 1 2.675l-8.32 8.879-9.6 1.902-13.12-3.805-.96-1.585z"
                    />
                    <Path
                      fill="#D8D8D8"
                      d="M140.856 89h-3.085v1.586l-.97-1.084L129 98l-1.31 1.286-1.69 5.643 2.946 7.071H144V97.537l-3.144-3.508z"
                    />
                    <Path fill="#F8F8F8" d="M105 98h24v14h-24z" />
                    <Path fill="#3F3D56" d="M122 103h5v4h-5z" />
                    <Path fill="#D8D8D8" d="M115 101h4v11h-4z" />
                    <Path
                      fill="#3F3D56"
                      d="M110 104v-1h-2v1h1.833zM109.833 106H108v1h2v-1zM111 103h2v1h-2zM111 106h2v1h-2zM137 104v-1h-2v1h1.833zM136.833 106H135v1h2v-1zM139 103h2v1h-2zM139 106h2v1h-2zM63 71.057L70.768 65h22.684L93 71.057 78.596 81l-15.03-7.698z"
                    />
                    <Path
                      fill="#D8D8D8"
                      d="M97.523 69.371v-4.215H94.56v1.032L93.452 65l-7.233 7.792-2.83 1.87L79 106.44l6.618 6.56H101V73.104z"
                    />
                    <Path fill="#F8F8F8" d="M63 71h25v41H63z" />
                    <Path fill="#D8D8D8" d="M73 102h4v11h-4z" />
                    <Path
                      fill="#3F3D56"
                      d="M67 105v-1h-2v1h1.833zM66.833 107H65v1h2v-1zM68 104h2v1h-2zM68 107h2v1h-2zM80 105v-1h-2v1h1.833zM79.833 107H78v1h2v-1zM81 104h2v1h-2zM81 107h2v1h-2zM94 74v-1h-2v1h1.833zM93.833 75H92v1h2v-1zM94 73h2v1h-2zM94 75h2v1h-2zM94 82v-1h-2v1h1.833zM93.833 84H92v1h2v-1zM94 81h2v1h-2zM94 84h2v1h-2zM94 91v-1h-2v1h1.833zM93.833 93H92v1h2v-1zM94 90h2v1h-2zM94 93h2v1h-2zM94 100v-1h-2v1h1.833zM93.833 102H92v1h2v-1zM94 99h2v1h-2zM94 102h2v1h-2zM65 75h18v3H65zM65 81h18v3H65zM65 89h18v3H65zM65 97h18v3H65zM154 72.06c1.965-1.934 4.554-4.288 7.768-7.06 15.756.054 23.65.054 23.684 0 1.737 1.846 1.253 4.198-1.452 7.057L169.596 82l-15.03-7.698A127.184 127.184 0 0 0 154 72.06z"
                    />
                    <Path
                      fill="#D8D8D8"
                      d="M189.523 69.371v-4.215h-2.964v1.032L185.452 65l-7.233 7.792-2.83 1.87L171 106.44l6.618 6.56H193V73.104z"
                    />
                    <Path fill="#F8F8F8" d="M154 72.06h25V112h-25z" />
                    <Path fill="#D8D8D8" d="M164 102h4v11h-4z" />
                    <Path
                      fill="#3F3D56"
                      d="M159 105v-1h-2v1h1.833zM158.833 107H157v1h2v-1zM160 104h2v1h-2zM160 107h2v1h-2zM172 105v-1h-2v1h1.833zM171.833 107H170v1h2v-1zM174 104h2v1h-2zM174 107h2v1h-2zM186 74v-1h-2v1h1.833zM185.833 75H184v1h2v-1zM187 73h2v1h-2zM187 75h2v1h-2zM186 82v-1h-2v1h1.833zM185.833 84H184v1h2v-1zM187 81h2v1h-2zM187 84h2v1h-2zM186 91v-1h-2v1h1.833zM185.833 93H184v1h2v-1zM187 90h2v1h-2zM187 93h2v1h-2zM186 100v-1h-2v1h1.833zM185.833 102H184v1h2v-1zM187 99h2v1h-2zM187 102h2v1h-2zM158 75h18v3h-18zM158 81h18v3h-18zM158 89h18v3h-18zM158 97h18v3h-18zM206 71l6.768-6h23.684L234 72.057 219.596 82l-11.18-8.5z"
                    />
                    <Path
                      fill="#D8D8D8"
                      d="M240.523 69.371v-4.215h-2.964v1.032L236.452 65l-7.233 7.792-2.83 1.87L222 106.44l6.618 6.56H244V73.104z"
                    />
                    <Path fill="#F8F8F8" d="M206 71h25v41h-25z" />
                    <Path fill="#D8D8D8" d="M214 102h4v11h-4z" />
                    <Path
                      fill="#3F3D56"
                      d="M210 105v-1h-2v1h1.833zM209.833 107H208v1h2v-1zM211 104h2v1h-2zM211 107h2v1h-2zM224 105v-1h-2v1h1.833zM223.833 107H222v1h2v-1z"
                    />
                    <Path
                      fill="#3F3D56"
                      d="M223 104h2v1h-2zM223 107h2v1h-2zM236 74v-1h-2v1h1.833zM235.833 75H234v1h2v-1zM238 73h2v1h-2zM238 75h2v1h-2zM236 82v-1h-2v1h1.833zM235.833 84H234v1h2v-1zM238 81h2v1h-2zM238 84h2v1h-2zM236 91v-1h-2v1h1.833zM235.833 93H234v1h2v-1zM238 90h2v1h-2zM238 93h2v1h-2zM236 100v-1h-2v1h1.833zM235.833 102H234v1h2v-1zM238 99h2v1h-2zM238 102h2v1h-2zM208 75h18v3h-18zM208 81h18v3h-18zM208 89h18v3h-18zM208 97h18v3h-18zM0 112h260v1H0zM57 95h1v17h-1z"
                    />
                    <Path
                      d="M62 96.48c.03 6.35-4.447 11.52-4.447 11.52S53.03 102.872 53 96.52C52.97 90.17 57.447 85 57.447 85S61.97 90.128 62 96.48z"
                      fill="#1EA39E"
                    />
                    <Path fill="#3F3D56" d="M103 95h1v17h-1z" />
                    <Path
                      d="M108 96.48c.03 6.35-4.447 11.52-4.447 11.52S99.03 102.872 99 96.52c-.03-6.35 4.447-11.52 4.447-11.52s4.524 5.128 4.553 11.48z"
                      fill="#1EA39E"
                    />
                    <Path fill="#3F3D56" d="M194 95h1v17h-1z" />
                    <Path
                      d="M199 96.48c.03 6.35-4.447 11.52-4.447 11.52s-4.524-5.128-4.553-11.48c-.03-6.35 4.447-11.52 4.447-11.52s4.524 5.128 4.553 11.48z"
                      fill="#1EA39E"
                    />
                    <Ellipse
                      fill="#6578FF"
                      cx={134}
                      cy={32.5}
                      rx={9}
                      ry={1.5}
                    />
                    <Path
                      d="M142 8.993C142 13.959 133.5 28 133.5 28S125 13.96 125 8.993C125 4.026 128.806 0 133.5 0s8.5 4.026 8.5 8.993z"
                      fill="#6578FF"
                    />
                    <Circle fill="#F2F2F2" cx={133.5} cy={8.5} r={4.5} />
                  </G>
                </G>
              </Svg>

              <Text style={styles.bodyMessage}>
                Para entregarte el resultado necesitamos saber un poco más de ti
              </Text>
            </View>
          )}
        </View>
        <View style={styles.footer}>
          <Text>¿En qué comuna vives?</Text>
          <TextInput
            onChangeText={text => {
              this._handleComunaSelection(text);
            }}
            placeholder=""
            onFocus={() => this._handleOnFocus()}
            style={styles.textSearchButton}
            value={this.state.textComunaSelected}
          />
          <TouchableOpacity
            style={[
              styles.btnContinue,
              { backgroundColor: this.state.btnBackGroundColor }
            ]}
            onPress={() =>
              this._handleAction(this.state.idComunaSelected, true)
            }
          >
            <Text style={styles.textBtnStart}>Siguiente</Text>
          </TouchableOpacity>
          <Text
            style={styles.txtOmitir}
            onPress={() =>
              this._handleAction(this.state.idComunaSelected, false)
            }
          >
            Omitir
          </Text>
        </View>
      </View>
    );
  }
}

export default OnBoardTwo;
