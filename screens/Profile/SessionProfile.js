import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  Image
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as api from "@utils/Api";
import LoadSpinner from '@components/LoadSpin/LoadSpin';
import {ImagePicker, Permissions, Constants} from 'expo';

const { width, height } = Dimensions.get("window");

/*const dataUser = [
  {
    id: 1,
    name: "Luis",
    lastname: "Liberal",
    imgProfile: "https://www.downloadroms.io/images/no-cover.png",
    convenios: [
      {
        id: 1,
        name: "Ahumada",
        urlImage:
          "http://cumafar.helencaltum.com/wp-content/uploads/2016/11/paracetamol.jpg"
      },
      {
        id: 2,
        name: "Salcobrand",
        urlImage: "https://www.downloadroms.io/images/no-cover.png"
      },
      {
        id: 3,
        name: "Cruz verde",
        urlImage: "https://www.downloadroms.io/images/no-cover.png"
      },
      {
        id: 4,
        name: "Cruz verde",
        urlImage: "https://www.downloadroms.io/images/no-cover.png"
      },
      {
        id: 5,
        name: "Cruz verde",
        urlImage: "https://www.downloadroms.io/images/no-cover.png"
      },
      {
        id: 6,
        name: "Cruz verde",
        urlImage: "https://www.downloadroms.io/images/no-cover.png"
      },
      {
        id: 7,
        name: "Cruz verde",
        urlImage: "https://www.downloadroms.io/images/no-cover.png"
      }
    ],
    pedidos: [
      {
        id: 1,
        totalProducts: 5,
        date: "31-05-2019",
        totalPrice: "$30.000",
        status: "En curso"
      },
      {
        id: 2,
        totalProducts: 2,
        date: "29-04-2019",
        totalPrice: "$12.000",
        status: "En curso"
      }
    ],
    recetasMedicas: [
      { id: 1, urlReceta: "https://www.downloadroms.io/images/no-cover.png" },
      { id: 2, urlReceta: "https://www.downloadroms.io/images/no-cover.png" },
      { id: 3, urlReceta: "https://www.downloadroms.io/images/no-cover.png" },
      { id: 4, urlReceta: "https://www.downloadroms.io/images/no-cover.png" },
      { id: 5, urlReceta: "https://www.downloadroms.io/images/no-cover.png" },
      { id: 6, urlReceta: "https://www.downloadroms.io/images/no-cover.png" },
      { id: 7, urlReceta: "https://www.downloadroms.io/images/no-cover.png" }
    ]
  }
];*/

class SessionProfile extends Component {
  static navigationOptions = {
    title: "Mi Perfil"
  };

  constructor(props) {
    super(props);
    this.state = {
      dataUser: null, 
      image: null
    };
  }

  async componentWillMount() {
     try {
            let userId = this.props.navigation.getParam('userId');
            userId = userId.substring(userId.lastIndexOf('?')+1, userId.length);

            console.log('BUSCANDO PERFIL DEL USUARIO '+userId);
                const responseJson = await api.GET_USER_PROFILE.getUserProfile(userId);
                  
                  if(responseJson != null){
                    this.setState({
                        dataUser: responseJson
                    });
                  }else{
                    console.log('No se obtuvo el perfil del usuario, error: '+responseJson);
                  }      
          } catch (error) {
            console.error(error);
          }finally{
            console.log('Se cargo el perfil del usuario: '+this.state.dataUser);
          }
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Lo sentimos, necesitamos permisos de acceso a la cámara!');
      }
    }
  }

  _pickImage = async () => {
    console.log('IMAGEN');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _closeSession() {
    console.log("Cerrando sesión deshabilitado porque no existe sesión en back");
  }

  _deleteAccount() {
    console.log("Borrando cuenta");
  }

  render() {
    /* A LA ESPERA DE DESARROLLO BACKEND 

    const dataPedidos = dataUser[0].pedidos.map((pedido, i) => {
            return (
                <View key={i} style={styles.pedidosContainer}>
                    <Text>{pedido.status}</Text>
                    <Text>{pedido.date}</Text>
                    <Text>{pedido.totalProducts}</Text>
                    <Text>{pedido.totalPrice}</Text>
                </View>
            );
        });*/

    let { image } = this.state;

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {this.state.dataUser != null ? (
        <View>
        <View style={styles.header}>
          <Image style={styles.imgHeader} source={{ uri: image != null ? image : 'https://www.downloadroms.io/images/no-cover.png' }} />
          <Feather
            name="camera"
            onPress={this._pickImage}
            style={styles.iconHeader}
            size={32}
          />
          <Text style={styles.name}>{this.state.dataUser.firstName} {this.state.dataUser.lastName}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.labelTitle}>Tus convenios</Text>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={this.state.dataUser.allianceSet}
            renderItem={({ item: rowData }) => {
              return (
                <Image
                  source={{ uri: 'https://www.downloadroms.io/images/no-cover.png' }}
                  style={styles.imgConvenio}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />

          <Text style={styles.labelTitle}>Tus pedidos</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              //dataPedidos 
            }
          </ScrollView>
          {/*COMENTADO A LA ESPERA DE DESARROLLO BACKEND

          <Text style={styles.labelTitle}>Tus recetas médicas</Text>
                    
                    <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={dataUser[0].recetasMedicas}
                    renderItem={({item: rowData}) => {
                        return <Image source={{ uri: rowData.urlReceta}} style={styles.imgReceta} />
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />*/}
        </View>
        </View>
        ): <View style={styles.containerSpin}><LoadSpinner/></View>}
        {/* NO EXISTE EL SERVICIO DE BORRAR CUENTA Y TAMPOCO HAY SESION DESDE BACKEND SE COMENTA

        <View style={styles.footer}>
          <Text style={styles.txtFooter} onPress={() => this._closeSession()}>
            Cerrar sesión
          </Text>
          <Text style={styles.txtFooter} onPress={() => this._deleteAccount()}>
            Eliminar cuenta
          </Text>
        </View>*/}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: "#eeeeee",
  },
  header: {
    paddingTop: '3%',
    paddingBottom: '2%',
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: height * 0.24
  },
  body: {
    backgroundColor: "#eeeeee",
    width: "90%",
    alignSelf: 'baseline',
    marginHorizontal: 20
  },
  footer: {
    backgroundColor: "#eeeeee",
    width: "100%",
    height: height * 0.1,
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 20
  },
  /**** HEADER *****/
  imgHeader: {
    width: width * 0.3,
    height: "80%",
    marginTop: '5%',
    borderRadius: 400 / 2
  },
  iconHeader: {
    alignItems: "center",
    alignSelf: "center",
    paddingLeft: width * 0.2,
    paddingTop: "10%",
    position: "absolute"
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '1%',
    marginBottom: '5%'
  }, 
  /**** BODY *****/
  labelTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#282e55",
    textAlign: "left",
    marginTop: 15,
    marginBottom: 15
  },
  imgConvenio: {
    width: width * 0.25,
    height: height * 0.1,
    borderRadius: 400 / 2
  },
  pedidosContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  imgReceta: {
    width: width * 0.25,
    height: height * 0.1,
    borderRadius: 8
  },
  /*** FOOTER ****/
  txtFooter: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#282e55",
    textAlign: "left"
  },
  containerSpin: {
    height: height * 0.8
  },
});

export default SessionProfile;
