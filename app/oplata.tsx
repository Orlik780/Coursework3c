import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Alert, Image, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/consts/colors';
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TextInputMask } from 'react-native-masked-text';
import { Button } from '@/components/button';
import { linkServe } from '@/consts/link';

export default function Oplata() {
    const router = useRouter()
    const [chislo, setChislo] = useState<string>('');
    const { idBooking } = useLocalSearchParams();

    const handleBack = async () => {
        router.back()
        axios.get(linkServe + ':1880/delBooking?ID=' + idBooking)
    }

    const oplatka = async() => {
        const generatedNumber = Math.floor(Math.random() * 3) + 1;
        const isDivisible = parseInt(chislo, 10) % generatedNumber === 0;
        if (isDivisible) {
            Alert.alert("Успех", "Оплата прошла успешно")
            router.replace('/(tabs)/account')
        } else {
            if (generatedNumber == 3) {
                Alert.alert("Ошибка", "Во время оплаты произошёл сбой. Попробуйте ещё раз")
            } else {
                Alert.alert("Ошибка", "Недостаточно средств")
            }
            handleBack()
        }
    }

    return(
        <View style={OplataStyle.main}>
            <View style={OplataStyle.firstview}>
                <TouchableOpacity onPress={() => handleBack()}>
                    <Image source={require('../assets/images/back.png')} style={{height:32, width:32}}/>
                </TouchableOpacity>
                <Text style={OplataStyle.glavtxt}>Оплата</Text>
                <View style={{height:32, width:2}}/>
            </View>
            <View style={{flex:2}}/>
            <View style={OplataStyle.content}>
                <StatusBar style='dark' />
                <Image source={require('../assets/images/logo.png')} resizeMode='contain' style={{height:100, width: 250}}/>
                <View>
                    <Text style={OplataStyle.ttl}>Введите любое</Text>
                    <Text style={OplataStyle.ttl}>двузначное число</Text>
                </View>
                <TextInputMask type={'custom'} options={{ mask: '99' }} keyboardType="numeric" value={chislo}
                    onChangeText={setChislo} style={OplataStyle.maskInpt} placeholder="Двузначное число" placeholderTextColor={Colors.gray}/>
                <Button text='Оплатить' onPress={() => oplatka()}/>
            </View>
            <View style={{flex:3}}/>
        </View>
    );
}

const OplataStyle = StyleSheet.create({
    main:{
        backgroundColor: Colors.lightOrange,
        flex: 1,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 50,
        gap: 10,
        flex: 1
    },
    firstview: {
        flexDirection: 'row',
        height: 100,
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 10,
        color: 'black'
    },
    glavtxt: {
        fontSize: 22,
        fontWeight: '500',
        color: Colors.darkNight,
        marginBottom: 4
    },
    maskInpt: {
        height: 56,
        backgroundColor: Colors.white,
        paddingHorizontal: 24,
        borderRadius: 10,
        borderColor: Colors.darkGray,
        borderWidth: 1,
        fontSize: 16
      },
      ttl: {
        fontSize: 22,
        color: Colors.darkGray,
        fontWeight: "500",
        alignSelf: 'center'
    },
})