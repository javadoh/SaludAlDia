import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column',
        shadowColor: 'rgba(101, 101, 101, 0.34)', 
        shadowOffset: { width: 2, height: 0 }, 
        shadowRadius: 5, 
        elevation: 8 
    },
    modalContainer: {
        width: width * 0.9,
        height: height * 0.9,
        justifyContent: 'center'
       },
    cardContainer: {
    width: width * 0.85, 
    alignSelf: 'baseline',
    shadowColor: 'rgba(101, 101, 101, 0.34)',
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 5, 
    elevation: 8, 
    marginHorizontal: 10,
    marginTop: 10, 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 10, 
    paddingRight: 10 
    },
    titleCategory: {
    fontSize: 18, 
    fontWeight: 'bold', 
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10, 
    color: '#616870'
    },
    cardHeader: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    padding: 10 
    },
    cardHeaderSectionOne: {
    width: '60%', 
    alignItems: 'flex-start'
    }, 
    cardHeaderSectionTwo: {
    width: '40%', 
    padding: 20, 
    alignItems: 'flex-start' 
    },
    /**** LINE 1 CARD ****/
    pharmacyTopCard:{
        fontSize: 10,
        fontWeight: 'bold',
        color: '#8c90a8'
    },pharmacyStockTopCard: {
        fontSize: 10, 
        fontWeight: 'bold',
        color: '#1ea39e'
    },
    pharmacyRow: {
        flexDirection: 'row', 
        flexWrap: 'wrap'
    },
    /**** LINE 2 CARD ****/
    titleProduct: {
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#282e55', 
    marginTop: 10
    }, 
    activePrincipleGramajeProduct: {
    fontSize: 12,
    color: '#282e55'
    },
    quantityProduct: {
    fontSize: 12, 
    color: '#282e55'
    }, 
    laboratoryProduct: {
    fontSize: 12,
    color: '#a7a7a7'
    },
    /*** COLUMN 2 CARD HEADER ****/
    imageDispatch: {
        width: 40, 
        height: 40, 
        marginTop: 5 
    },
    imageProduct: {
        width: 80, 
        height: 40
    }, 
    /**** SEPARATOR ******/
    separator: {
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
    },
    /**** LINE 3 CARD ******/
    yappLifeRow: {
    flexDirection: 'row', 
    flexWrap: 'wrap'
    },
    priceLabel: {
    fontSize: 10, 
    width: '50%', 
    alignItems: 'flex-start', 
    fontWeight: 'bold',
    color: '#616870'
    },
    price: {
    width: '50%', 
    textAlign: 'right', 
    fontSize: 12, 
    fontWeight: 'bold',
    color: '#616870'
    }, 
    discountLabel: {
    fontSize: 10,
    width: '50%', 
    alignItems: 'flex-start', 
    color: '#6578ff',
    fontWeight: 'bold'
    },
    totalPriceWithDiscount: {
    width: '50%', 
    textAlign: 'right', 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#6578ff'
    }, 
    /***** FIN CARD  ******/
    btnAddProductToPreOrder: {
    width: width * 0.85, 
    shadowColor: 'rgba(101, 101, 101, 0.34)',
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 5, 
    elevation: 8, 
    marginHorizontal: 10,
    backgroundColor: '#6578ff', 
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'row', 
    padding: 15, 
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10, 
    }, 
    quantityOnButtonPrePurchase:{
        backgroundColor: '#000000', 
        alignItems: 'flex-start', 
        marginHorizontal: 4, 
        color: '#FFFFFF', 
        paddingLeft: 5,
        paddingRight: 5
    },
    txtBtnQuantityPurchase:{
        alignItems: 'center', 
        color: '#FFFFFF', 
        marginHorizontal: 5
    },
    /****** BRAND CARD ******/
    cardContainerBrand: {
        width: width * 0.85, 
        shadowColor: 'rgba(101, 101, 101, 0.34)',
        shadowOffset: { width: 2, height: 0 },
        shadowRadius: 5, 
        elevation: 8, 
        marginTop: 20, 
        flex: 1, 
        backgroundColor: '#FFFFFF', 
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingLeft: 5, 
        paddingRight: 10,
        alignSelf: 'center'
        },
        imagePharmacy: {
            width: 60, 
            height: 40
        }, 
        cardHeaderSectionOneBrand: {
            width: '25%', 
            alignItems: 'flex-start'
            }, 
            cardHeaderSectionTwoBrand: {
            width: '60%', 
            alignItems: 'flex-start',
            paddingLeft: 10
            },
            cardHeaderSectionThreeBrand: {
                width: '15%',
                alignItems: 'flex-end'
            },
            /**** LINE 1 CARD ****/
            pharmacyTopCardBrand:{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#8c90a8'
            },pharmacyStockTopCardBrand: {
                fontSize: 10, 
                fontWeight: 'bold',
                color: '#1ea39e'
            },
            pharmacyRowBrand: {
                flexDirection: 'row', 
                flexWrap: 'wrap'
            },
            laboratoryProductBrand: {
                fontSize: 10,
                color: '#a7a7a7'
                },
            btnAddProductToPreOrderBrand: {
                width: width * 0.85, 
                shadowColor: 'rgba(101, 101, 101, 0.34)',
                shadowOffset: { width: 2, height: 0 },
                shadowRadius: 5, 
                elevation: 8, 
                marginHorizontal: 10,
                marginBottom: 20,
                backgroundColor: '#6578ff', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexDirection: 'row', 
                padding: 15, 
                borderBottomLeftRadius: 10, 
                borderBottomRightRadius: 10, 
                alignSelf: 'center'
                }, 
        priceLabelBrand: {
            fontSize: 10, 
            width: '50%', 
            alignItems: 'flex-start', 
            fontWeight: 'bold',
            color: '#616870'
            },
            priceBrand: {
            width: '50%', 
            textAlign: 'right', 
            fontSize: 12, 
            fontWeight: 'bold',
            color: '#616870'
            }, 
            discountLabelBrand: {
            fontSize: 10,
            width: '50%', 
            alignItems: 'flex-start', 
            color: '#616870',
            fontWeight: 'bold'
            },
            totalPriceWithDiscountBrand: {
            width: '50%', 
            textAlign: 'right', 
            fontSize: 14, 
            fontWeight: 'bold', 
            color: '#616870'
            }, 
            textDecoration: {
                textDecorationLine: 'line-through'
            }
    });
    