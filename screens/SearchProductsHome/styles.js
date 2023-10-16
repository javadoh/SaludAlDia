import { StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight
      },
      rowAux: {
          flexDirection: 'row',
          marginTop: 10
      },
    header: {
            shadowColor: 'rgba(101, 101, 101, 0.34)',
            shadowOffset: { width: 2, height: 0 },
            shadowRadius: 5,
            elevation: 5, 
            backgroundColor: '#FFFFFF',
            height: height * 0.25, 
            marginHorizontal: 10,
            marginTop: 10
    },
    bodyPromoNotice: {
            marginTop: 3,
            shadowColor: 'rgba(101, 101, 101, 0.34)',
            shadowOffset: { width: 2, height: 0 },
            shadowRadius: 5,
            elevation: 5, 
            backgroundColor: '#FFFFFF',
            height: height * 0.67, //67% de la altura de la pantalla ajustable
            marginHorizontal: 10
    },
    bodyProductsResults: {
      marginTop: 3,
      shadowColor: 'rgba(101, 101, 101, 0.34)',
      shadowOffset: { width: 2, height: 0 },
      shadowRadius: 5,
      elevation: 5, 
      backgroundColor: '#FFFFFF', 
      height: height * 0.67 //67% de la altura de la pantalla ajustable
    },
    containerSearchResults: {
        shadowColor: 'rgba(101, 101, 101, 0.34)',
        shadowOffset: { width: 2, height: 0 },
        shadowRadius: 6, 
        elevation: 5, 
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginHorizontal: 15, 
        height: height * 0.68 //68% de la altura de la pantalla ajustable
    }, 
    bannerRegisterYappLife: {
        marginHorizontal: 15, 
        marginTop: '5%',
        backgroundColor: '#6578ff',
        width: width * 0.9,
        height: height * 0.15, 
        borderRadius: 8,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    imgBanner: {
        width: 50,
        height: 50,
        borderRadius: 400 / 2,
        marginHorizontal: 5
    },
    txtBanner1: {
        fontFamily: 'proximanova',
        fontSize: 12, 
        color: '#FFFFFF',
        textAlign: 'right',
        alignSelf: 'center',
        marginLeft: 10
    },
    txtBanner2: {
        fontFamily: 'proximanova',
        fontSize: 18, 
        color: '#FFFFFF',
        textAlign: 'right',
        marginRight: 10,
        alignSelf: 'flex-end',
        fontWeight: 'bold'
    },
    labelTitle: {
        fontFamily: 'proximanova',
        fontSize: 20, 
        fontWeight: 'bold', 
        marginHorizontal: 15,
        marginTop: '5%',
        color: '#282e55'
    }
});