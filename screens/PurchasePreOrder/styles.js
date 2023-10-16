import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: "rgba(101, 101, 101, 0.34)",
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 5,
    elevation: 8,
    backgroundColor: "#FFFFFF"
  },
  containerHeader: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    paddingTop: 15,
    paddingBottom: 15,
    marginHorizontal: 10
  },
  labelHeader: {
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "flex-start",
    color: "#282e55"
  },
  subTotalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "flex-end",
    color: "#282e55"
  },
  sectionLeft: {
    width: "50%",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  sectionRight: {
    width: "50%",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  /******** CARD SECTION ********/
  card: {
    width: width * 0.95,
    padding: 10
  },
  cardTitleHeader: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
    paddingTop: 10,
    marginHorizontal: 10,
    color: "#282e55"
  },
  /**** SEPARATOR ******/
  separator: {
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 2
  },
  rowCard: {
    flexDirection: "row",
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 15
  },
  cardSectionOne: {
    width: "25%",
    flexDirection: "column"
  },
  cardImageProduct: {
    width: "75%",
    height: 40,
    padding: 10,
    marginHorizontal: 10
  },
  cardSectionTwo: {
    width: "45%",
    flexDirection: "column"
  },
  cardTitleProduct: {
    fontSize: 16,
    color: "#282e55"
  },
  cardActivePrinciple: {
    fontSize: 12,
    color: "#6d6e6e"
  },
  cardLaboratoryProduct: {
    fontSize: 12,
    color: "#6d6e6e"
  },
  /*************** CARD SECTION THREE ****************/
  cardSectionThree: {
    width: "30%",
    flexDirection: "column"
  },
  rowAuxQuantity: {
    flexDirection: "row",
    padding: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#dededf"
  },
  btnQuantity: {
    width: 30,
    height: 30,
    backgroundColor: "#FFFFFF"
  },
  txtBtnQuantity: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1ea39e",
    textAlign: "center"
  },
  cardProductQuantity: {
    fontSize: 16,
    marginHorizontal: 5
  },
  cardSubTotalPrice: {
    fontSize: 12,
    color: "#696969",
    textAlign: "right"
  },
  /******** PRICE DISCOUNTS SECTION ********/
  rowFooter: {
    flexDirection: "row",
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 5
  },
  pricesDiscountsContainer: {
    paddingTop: "5%",
    backgroundColor: "#f8f8f8",
    flexDirection: "column"
  },
  labelDescription: {
    fontSize: 14,
    alignItems: "flex-start",
    color: "#282e55",
    fontWeight: "bold"
  },
  total: {
    fontSize: 14,
    alignItems: "flex-end"
  },

  /******** DISPATCH SECTION ********/
  rowFooterDispatch: {
    flexDirection: "row",
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 15
  },
  dispatchContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    marginHorizontal: 10
  },

  dispatchLabel: {
    fontSize: 14,
    fontWeight: "bold",
    alignItems: "flex-start"
  },

  totalDispatch: {
    fontSize: 14,
    fontWeight: "bold",
    alignItems: "flex-end"
  },

  /******** USER DIRECTION SECTION ********/
  userDirection: {},
  btnUserDirectionChange: {},
  txtUserDirectionChange: {
    fontSize: 14,
    color: "#1ea39e"
  },

  /******** BUTTON PRESCRIPTION UPLOAD SECTION ********/
  btnUploadYourPrescription: {
    shadowColor: "rgba(101, 101, 101, 0.34)",
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "#f8f8f8",
    padding: 20,
    alignItems: "center"
  },
  textUploadYourPrescription: {
    color: "#1ea39e",
    fontSize: 18,
    fontWeight: "bold"
  },

  /******** BUTTON PURCHASE SECTION ********/
  btnPurchase: {
    flexDirection: "row",
    backgroundColor: "#d81d5b",
    margin: 20,
    borderRadius: 8,
    padding: 15
  },
  txtBtnPurchase: {
    width: "70%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginLeft: 10
  },
  txtBtnPurchaseQuantity: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#af1749",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16
  },
  txtBtnPurchasePrice: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "flex-end"
  },
  spinner: {
    height: height * 0.8
  }
});

export default styles;
