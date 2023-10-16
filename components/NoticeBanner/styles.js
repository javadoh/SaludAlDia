import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  cardContainer: {
    marginTop: '8%',
    marginHorizontal: 15,
    width: width * 0.8,
    height: height * 0.4,
    borderRadius: 6
  },
  cardText: {
    marginBottom: 10,
    height: height * 0.1
  },
  imageCardNotice: {
    width: width * 0.8,
    padding: 1,
    height: height * 0.25,
    borderRadius: 6
  },
  titleNotice: {
    marginTop: '3%',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  txtNotice: {
    fontSize: 12, 
    textAlign: 'left'
  }
});
