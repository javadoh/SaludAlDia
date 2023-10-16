import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

class ErrorServer extends PureComponent {

    render(){

        return(
            <View style={{flex: 1, width: width, height: height }}>
                <Text>ERROR LO SENTIMOS</Text>
            </View>
        );
    }

}

export default ErrorServer;