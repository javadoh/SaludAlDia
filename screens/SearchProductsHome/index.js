import React, { Component } from 'react';
import { View, Text, ScrollView, BackHandler, TouchableOpacity, Image, Alert, AsyncStorage } from 'react-native';
import ToolBar from '@components/ToolBar/ToolBar';
import SearchBar from '@components/SearchBar/SearchBar';
import PromoBanner from '@components/PromoBanner/PromoBanner';
import NoticeBanner from '@components/NoticeBanner/NoticeBanner';
import SearchProductsHomeResults from './index.results';
import styles from './styles';
import SearchBarData from '@components/SearchBar/SearchBarData';
import { _handleBackButtonMsg } from '@utils/Utils';
import * as api from '@utils/Api';
import Images from '@assets/images';
import LoadSpin from '@components/LoadSpin/LoadSpin';

class SearchProductsHome extends Component {
    
    constructor(props) {
    super(props);
    this._handlerShowSearchBarData = this._handlerShowSearchBarData.bind(this);
    this._handlerSearchSelectedProduct = this._handlerSearchSelectedProduct.bind(this);
    this._handleUnmountToolBar = this._handleUnmountToolBar.bind(this);
    //_handleBackButtonMsg = _handleBackButtonMsg.bind(this);//ANDROID BACK BTN

    this.state = { loading: true, 
      isShowSearchBarData: false, 
      isShowPromoComponent: true, 
      isShowNoticeComponent: true, 
      isShowProductsResult: false, 
      dataSearch: [], 
      textSearch: '',
      productFromSearch: null, 
      userDataSession: null,
      userDataAnonymous: null,
      dataPromos: [],
      dataNotices: [],
      dataProductSelected: [],
      renderToolBar: true
    };

    }
    
    static navigationOptions = {
		header: null
  }

	async componentWillMount(){

    const userId = await AsyncStorage.getItem('userId');
    if(userId != null){
      this.setState({userDataSession: userId})
    }
    
     const userIdAnonymous = await AsyncStorage.getItem('userIdAnonymous');
      if(userIdAnonymous != null){
        this.setState({userDataAnonymous: userIdAnonymous})
      }

    console.log('Entro en async component Will Mount Search Home');
    this._getPromosNotices();

    BackHandler.addEventListener('hardwareBackPress', _handleBackButtonMsg);

		await Expo.Font.loadAsync({
			proximanova: require("@assets/fonts/proximanova.ttf"),
    });
    this.setState({ loading: false });

    console.log('HOME CDM USER ID DATA SESSION: '+userId+' , '+this.state.userDataSession+ ', USER ID ANONYMOUS: '+userIdAnonymous+ ', '+this.state.userDataAnonymous);
    }

    componentDidMount(){
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        _handleBackButtonMsg;
      });
    }

    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', _handleBackButtonMsg);
    }

    /****** BUSQUEDA DE PROMOS Y NOTICIAS GENERALES ******/
    async _getPromosNotices(){
      try {
        console.log('BUSCANDO PROMOS');
            const responseJson = await api.GET_PROMOS_NOTICES.getGeneralPromosNotices();
              
              if(responseJson.advertisingList.length > 0){
                this.setState({
                dataPromos: responseJson.advertisingList 
                });
              }

              if(responseJson.newsList.length > 0){
                this.setState({
                dataNotices: responseJson.newsList
                })
              }
          
      } catch (error) {
        console.error(error);
      }finally{
        console.log('Se cargaron los datos de Promos: '+this.state.dataPromos+' , y data de Notices: '+this.state.dataNotices);
      }
    }

    /****** BUSQUEDA DE PRODUCTOS PARA AUTOCOMPLETADO BAR PREVIA SELECCION ES2017 ******/
    async _getProductsFromApi(text) {
    try {   
        if(text.length > 2){   
          const responseJson = await api.GET_PRODUCTS_LIVE_SEARCH.getProductsLiveToSearch(text);

            if(responseJson.length > 0){
                this.setState({
                    dataSearch: responseJson,
                    textSearch: text
                    });
            }
        }else{
            this.setState({
                dataSearch: [],
                textSearch: text
                });
        }    
    } catch (error) {
      console.error(error);
    }finally{
      console.log('Loading false');
    }
  }

  /****** BUSQUEDA DE PRODUCTOS ******/
  async _getProductResults(product) {
    try {
      console.log('Product: '+product);
      //USER ID MIENTRAS BACKEND NO SEGMENTE
      let userId = this.state.userDataSession != null ? this.state.userDataSession : this.state.userDataAnonymous;
      userId = userId.substring(userId.lastIndexOf("?") + 1, userId.length);
      console.log(userId);

          const responseJson = await api.GET_PRODUCT_RESULTS.getProductResults(product.exactSearch, product.id, userId);

            if(responseJson.yappLife.length > 0 || responseJson.bioequivalent.length > 0 || responseJson.other.length > 0 || responseJson.product != null){
              this.setState({
                dataProductSelected: responseJson,
                isShowSearchBarData: false, 
                isShowProductsResult: true,
                productFromSearch: product
              });
            }else{
              Alert.alert('Este producto no podemos rescatarlo, lo sentimos.');
            }
    } catch (error) {
      console.error(error);
    }finally{
      console.log('Se cargaron los datos del producto buscado: '+this.state.dataProductSelected);
    }
  }

    _handlerShowSearchBarData = (isShow, text) => {
      if(isShow){
        this.setState({isShowSearchBarData: true, isShowPromoComponent: false, isShowNoticeComponent: false, isShowProductsResult: false 
        });  
        this._getProductsFromApi(text);
      }else{
        this.setState({
          isShowSearchBarData: false, isShowPromoComponent: true, isShowNoticeComponent: true, isShowProductsResult: false 
        });
      }
    }

    _handlerSearchSelectedProduct = (product) => {
      console.log('Producto seleccionado: '+product.name);
      this._getProductResults(product);
    }

    _registerFromBanner(){
      this.props.navigation.navigate('ProfileCreate');
    }


    _handleUnmountToolBar(){
      this.setState({renderToolBar: false});
    }

    render(){
        if(this.state.loading){
			return <Expo.AppLoading />
    }
    
        return(
          <View style={styles.container}>
          {this.state.renderToolBar ? (
            <View style={styles.header} >
                <ToolBar navigation={this.props.navigation} userDataSession={this.state.userDataSession} userDataAnonymous={this.state.userDataAnonymous}/>
                <SearchBar action={this._handlerShowSearchBarData} />
            </View>
          ): (null)}
            
            {this.state.isShowPromoComponent && this.state.dataPromos.length > 0 && this.state.isShowPromoComponent && this.state.dataNotices.length > 0 ? (

              <ScrollView showsVerticalScrollIndicator={false}>

              {this.state.userDataSession == null ? (
              
              <TouchableOpacity style={styles.bannerRegisterYappLife} onPress={() => this._registerFromBanner()}>
                <View style={styles.rowAux}>
                  <Image style={styles.imgBanner} source={Images.bannerWoman} />
                  <Image style={styles.imgBanner} source={Images.bannerMan} />
                  
                  <View>
                  <Text style={styles.txtBanner1}>Para obtener los mejores precios</Text>
                  <Text style={styles.txtBanner2}>¡Crea tu cuenta yapp!</Text>
                  </View>
                </View>
              </TouchableOpacity>

              ) : (
                <Text></Text>
              )
            } 
              <Text style={styles.labelTitle}>Beneficios</Text>
              <PromoBanner navigation={this.props.navigation} webViewTitle='Promociones Yapp' dataPromos={this.state.dataPromos} />
            
              <Text style={styles.labelTitle}>Noticias</Text>
              <NoticeBanner navigation={this.props.navigation} webViewTitle='Noticias Yapp' dataNotices={this.state.dataNotices} />
              </ScrollView>
            ):(
              <Text></Text>
            )}
            {this.state.isShowProductsResult || this.state.isShowSearchBarData || (this.state.dataPromos.length > 0 && this.state.dataNotices.length > 0) ? (<Text></Text>):(
                <LoadSpin />
              )}
            
            

            {this.state.isShowSearchBarData ? (
              <ScrollView style={styles.containerSearchResults} showsVerticalScrollIndicator={false}>
              <SearchBarData action={this._handlerSearchSelectedProduct} 
                             dataSearch={this.state.dataSearch} textSearch={this.state.textSearch} />
              </ScrollView>
                  ): (
                  <Text></Text>
                  )
            }

            {this.state.isShowProductsResult ? (
              <SearchProductsHomeResults style={styles.bodyProductsResults} navigation={this.props.navigation} 
                                         data={this.state.dataProductSelected} 
                                         brandProductMatch={false} 
                                         productFromSearch={this.state.productFromSearch} 
                                         unMountToolBar={this._handleUnmountToolBar} 
                                         userDataSession={this.state.userDataSession} 
                                         userDataAnonymous={this.state.userDataAnonymous} />
              ):(
              <Text></Text>
              )
            }
          </View>
        );
    }
}

export default SearchProductsHome;