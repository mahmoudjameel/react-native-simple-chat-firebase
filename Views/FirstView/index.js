import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import firstViewImage from '../../assets/firstview-img.png'
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
export default function FirstView({ navigation }) {
    // this const will return boolean value 
    const [loaded] = useFonts({
        Nunito: require('../../assets/fonts/Nunito-Bold.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={firstViewImage}
                />
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.heading}>Connect Together</Text>
                <Text style={styles.para}>Find your best friend with us</Text>
                <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('signupview') }}>
                    <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Get Started</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 20 }} onPress={() => { navigation.navigate('loginview') }} >
                    <Text style={{ fontFamily: 'Nunito', color: '#35354c', fontSize: 20, textAlign: 'center' }}>Log in</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        flex: 5,
        width: '100%',

        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: "80%",
        width: '80%',
        margin: 'auto'
    },
    detailsContainer: {
        flex: 5,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: { fontFamily: 'Nunito', fontSize: 35, color: '#35354c', },

    para: {
        fontFamily: 'Nunito',
        fontSize: 18,
        color: '#9c9ca9',
    },

    btn: {
        height: 65,
        padding: 10,
        width: '80%',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#35354c",
        borderRadius: 50,
        shadowColor: '#35354c',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.77,
        shadowRadius: 5.677,
        elevation: 3,

    }
    //   backgroundColor:'#35354c, #e8d9da'
});
