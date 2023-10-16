import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from "react-native";
import { Constants } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import ModalAlertMessage from '@components/ModalAlertMessage/ModalAlertMessage';

const { height } = Dimensions.get("window");
var dataConveniosAuxForCheckBox = [];

class SelectedItemsArrayComponent {
  constructor() {
    selectedItemsArray = [];
  }

  pushItem(option) {
    selectedItemsArray.push(option);
  }

  getArray() {
    return selectedItemsArray;
  }
}

class Checkbox extends Component {
  constructor() {
    super();

    this.state = { checked: null };
  }

  componentWillMount() {
    if (this.props.checked) {
      this.setState({ checked: true }, () => {
        this.props.selectedArrayObject.pushItem({
          key: this.props.keyValue,
          label: this.props.label,
          value: this.props.value
        });
      });
    } else {
      this.setState({ checked: false });
    }
  }

  toggleState(key, label, value) {
    this.setState({ checked: !this.state.checked }, () => {
      if (this.state.checked) {
        this.props.selectedArrayObject.pushItem({
          key: key,
          label: label,
          value: value
        });
      } else {
        this.props.selectedArrayObject
          .getArray()
          .splice(
            this.props.selectedArrayObject
              .getArray()
              .findIndex(x => x.key == key),
            1
          );
      }
    });
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.toggleState.bind(
          this,
          this.props.keyValue,
          this.props.label,
          this.props.value
        )}
        underlayColor="transparent"
        style={{ marginVertical: 10 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                <MaterialIcons name="check-box" size={24} />
              </View>
            ) : (
              <View style={styles.uncheckedView}>
                <MaterialIcons name="check-box-outline-blank" size={24} />
              </View>
            )}
          </View>

          <Text
            style={[styles.checkBoxLabelText, { color: this.props.labelColor }]}
          >
            {this.props.label}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

class OnBoardFour extends Component {
  constructor(props) {
    super(props);

    selectedArrayOBJ = new SelectedItemsArrayComponent();
    this._renderModalAction = this._renderModalAction.bind(this);
    
    this.state = {
      selectedConvenios: [],
      data: [],
      selectedItems: [],
      modalMessage: { txtLabel: "", txtMessage: "", isShow: false }
    };
  }

  componentDidMount() {
    var arrayConvenios = this.props.dataConvenios;
    for (var i = 0; i < arrayConvenios.length; i++) {
      dataConveniosAuxForCheckBox.push({
        id: arrayConvenios[i].id,
        name: arrayConvenios[i].name,
        isChecked: false
      });
      this.setState({
        data: dataConveniosAuxForCheckBox
      });
    }
  }

  getSelectedItems = continueProfile => {
    if (selectedArrayOBJ.getArray().length == 0 && continueProfile) {
      this.setState({
        modalMessage: {
          txtLabel: "Info",
          txtMessage: 'Debes seleccionar algún convenio para continuar',
          isShow: true
        }
      });
    }

    if (selectedArrayOBJ.getArray().length == 0 && !continueProfile) {
      this.props.actionOb4(
        selectedArrayOBJ
          .getArray()
          .map(item => item.value)
          .join(),
        continueProfile
      );
    }

    if (selectedArrayOBJ.getArray().length > 0 && continueProfile) {
      this.setState(() => {
        return {
          selectedItems: selectedArrayOBJ
            .getArray()
            .map(item => item.value)
            .join()
        };
      });

      this.props.actionOb4(
        selectedArrayOBJ
          .getArray()
          .map(item => item.value)
          .join(),
        continueProfile
      );
    }

    if (selectedArrayOBJ.getArray().length > 0 && !continueProfile) {
      this.setState(() => {
        return {
          selectedItems: selectedArrayOBJ
            .getArray()
            .map(item => item.value)
            .join()
        };
      });

      this.setState({
        modalMessage: {
          txtLabel: "Info",
          txtMessage: 'Ya has seleccionado convenios, completa con tu perfil',
          isShow: true
        }
      });
    }
  };

  _handleAction(continueProfile) {
    this.getSelectedItems(continueProfile);
  }

  _handleCheck(convenio) {

    const { selectedConvenios } = this.state;
    let newArr = [];

    if (!selectedConvenios.includes(convenio.id)) {
      newArr = [...selectedConvenios, convenio.id];
    } else {
      newArr = selectedConvenios.filter(a => a !== convenio.id);
    }
    this.setState({ selectedConvenios: newArr });
  }

  _renderModalAction() {
    this.setState({
      modalMessage: { txtLabel: "", txtMessage: "", isShow: false }
    });
  }

  render() {
    const dataConveniosList = this.state.data.map((convenio, i) => {
      return (
        <View key={i} style={styles.lineConvenio}>
          <Checkbox
            size={30}
            keyValue={0}
            selectedArrayObject={selectedArrayOBJ}
            checked={false}
            label={convenio.name}
            value={convenio.id}
          />
        </View>
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

        <View style={styles.bodyConveniosList}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/***** BARRA DATOS AUTOCOMPLETADO *****/}
            {dataConveniosList}
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <Text style={styles.textMessage}>¿Tienes algún convenio?</Text>

          <TouchableOpacity
            style={styles.btnEnd}
            onPress={() => this._handleAction(true)}
          >
            <Text style={styles.textBtnEnd}>Terminar de crear mi perfil</Text>
          </TouchableOpacity>
          <Text
            style={styles.txtOmitir}
            onPress={() => this._handleAction(false)}
          >
            Omitir
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //ONBOARD4
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginBottom: "5%",
    padding: 10,
    paddingTop: Constants.statusBarHeight
  },
  bodyConveniosList: {
    height: height * 0.55,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  lineConvenio: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "center"
  },
  textConvenio: {
    fontSize: 16,
    marginLeft: 20,
    textAlign: "center",
    alignItems: "center"
  },
  textMessage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#282e55",
    marginTop: '10%'
  },
  footer: {
    marginTop: "2%",
    height: height * 0.3
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  txtOmitir: {
    marginTop: 20,
    color: "#1ea39e",
    textAlign: "center",
    fontWeight: "bold"
  },
  btnEnd: {
    marginTop: '10%',
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#1ea39e"
  },
  textBtnEnd: {
    color: "#FFFFFF",
    textAlign: "center"
  }
});

export default OnBoardFour;
