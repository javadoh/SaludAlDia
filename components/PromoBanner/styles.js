import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  cardContainer: {
    marginTop: '8%',
    marginHorizontal: 15,
    width: width * 0.8,
    height: height * 0.205,
    borderRadius: 6
  },
  cardText: {
    marginBottom: 10,
    height: height * 0.1
  },
  imageCardPromo: {
    width: width * 0.8,
    padding: 1,
    height: height * 0.2,
    borderRadius: 6
  }
});
