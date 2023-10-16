import { StyleSheet, Dimensions } from 'react-native';

const BLACK = '#000000';
const {height} = Dimensions.get('window');

export default StyleSheet.create({
//***** SEARCH BAR *****//
searchRectangle: {
    flexDirection: 'row',
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    borderRadius: 8,
    elevation: 5, 
    backgroundColor: '#FFFFFF', 
    padding: 10, 
    margin: 10
  },
    searchIcon: {
    paddingRight: 10
    },
textSearchButton: {
    "fontFamily":"proximanova",
    "fontSize":18,
    "color":"#ACACAC", 
    justifyContent: 'center', 
    alignItems: 'center', 
    color: BLACK   
    },
//***** SEARCH BAR RESULTS ******//
containerSearchResults: {
    shadowColor: 'rgba(101, 101, 101, 0.34)',
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 6, 
    elevation: 5, 
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 15, 
    height: height * 0.68 
}, 
textProductNameRes: {
    padding: 15, 
    fontSize: 16,
    fontWeight: 'bold', 
    color: '#666666', 
    backgroundColor: '#FFFFFF' 
}
});