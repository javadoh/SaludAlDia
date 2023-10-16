import { StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        marginHorizontal: 15, 
        marginTop: '10%', 
        marginBottom: '10%',
        padding: 10, 
        paddingTop: Constants.statusBarHeight
    }, 
    body: {
        height: height * 0.45, 
        alignItems: 'center',
        marginTop: '5%', 
    }, 
    imgOb1: {
        aspectRatio: 1,
        resizeMode: 'contain'
    },
    imgOb2: {
    width: '100%' 
    },
    imgOb3: {
        width: '85%'
    },
    bodyMessage: {
        fontFamily: 'proximanova',
        marginTop: '6%', 
        fontSize: 16, 
        color: '#282e55'
    }, 
    footer: {
        marginTop: '6%', 
        height: height * 0.35
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtOmitir: {
        fontFamily: 'proximanova',
        marginTop: 20, 
        color: '#1ea39e', 
        textAlign: 'center', 
        fontWeight: 'bold'
    },
    btnContinue: {
        marginTop: 20, 
        width: '100%',
        padding: 10, 
        borderRadius: 10 
    },
    textBtnStart: {
     color: '#FFFFFF', 
     textAlign: 'center'
    }, 
    textSearchButton: {
        "fontFamily":"proximanova",
        "fontSize":18,
        "color":"#ACACAC", 
        justifyContent: 'center', 
        alignItems: 'center', 
        color: '#000000', 
        shadowColor: 'rgba(0, 0, 0, 0.17)',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 6,
        borderRadius: 8,
        elevation: 5, 
        backgroundColor: '#FFFFFF', 
        padding: 10
        },
    //***** SEARCH BAR RESULTS ******//
containerSearchResults: {
    width: '100%',
    shadowColor: 'rgba(101, 101, 101, 0.34)',
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 6, 
    elevation: 5, 
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 15, 
    height: '85%' //68% de la altura de la pantalla ajustable
}, 
textProductNameRes: {
    fontFamily: 'proximanova',
    padding: 15, 
    fontSize: 16,
    fontWeight: 'bold', 
    color: '#666666', 
    backgroundColor: '#FFFFFF' 
},
/******* ON BOARD 1 *******/
termsConditions: {
    fontFamily: 'proximanova',
    color: '#1ea39e', 
    textAlign: 'center'
},
header: {
    width: '100%',
    flexDirection: 'row', 
    height: height * 0.12, 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start'
},
rowHeadLeft: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center'
},
rowHeadRight: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center', 
    alignSelf: 'center'
},
logoHeader: {
    width: '90%', 
    height: '100%',
    alignSelf: 'center'
}, 
titleHeader: {
    fontFamily: 'proximanova',
    color: '#282e55', 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginLeft: '5%'
}
});

export default styles;