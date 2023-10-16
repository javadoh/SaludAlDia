import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class SearchBarData extends Component {

    constructor(props){
        super(props);
        this.state = {
            product: null 
        }
    }

    componentDidMount(){
        console.log(this.props.textSearch);
    }

    _handleProductSelection(product){
        this.setState({
            product: product 
        });
        this.props.action(product);
    }

    render(){
        const productsListAsSearch = this.props.dataSearch.map((product, i) => {
            return (
                
                <Text key={i} onPress={() => this._handleProductSelection(product)} style={styles.textProductNameRes}>{product.name}</Text>
               
            )
          })

        return(
                <View>
                {productsListAsSearch}
                </View>

        );
    }
}

export default SearchBarData;