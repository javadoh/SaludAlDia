import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import Images from '@assets/images';
import { Svg } from "expo";

const { Defs,
    LinearGradient,
    Stop,
    G,
    Ellipse,
    Path,
    Circle,
    Rect } = Svg;

const { width, height } = Dimensions.get('window');

class NoDataFound extends PureComponent {

    render(){

        return(
            <View style={styles.container}>
                <Image 
                source={Images.notFound}
                style={styles.image} />
                <Text style={styles.txtMessage}>No hemos podido encontrar lo que buscas</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        width: width,
        height: height,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '40%'
    },
    image: {
        resizeMode: 'stretch'
    },
    txtMessage: {
        fontFamily: 'proximanova',
        marginTop: '10%',
        color: '#282e55',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default NoDataFound;