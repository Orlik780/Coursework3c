import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Image, Alert } from 'react-native';
import { Input } from '../components/input';
import { Colors } from '../consts/colors';
import { Button } from '../components/button';
import { ClickableText } from '../components/clickabletext';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { resetPassword } from '../hooks/auth';

export default function Reset() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    let errorMessage = "Произошла неизвестная ошибка";

    const handleResetPassword = async () => {
      if (!email) {
        Alert.alert("Ошибка", "Пожалуйста, введите email.");
        return;
      }
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email)) {
        Alert.alert("Ошибка", "Email должен соответствовать формату example@index.reg");
        return;
      } 
      try {
        await resetPassword(email);
        Alert.alert(
          "Успех",
          "Письмо для сброса пароля отправлено на ваш email."
        );
        router.back();
      } catch (err) {
        switch (err.code) {
          case "auth/user-not-found":
            errorMessage = "Пользователь с таким email не найден.";
            break;
          case "auth/invalid-email":
            errorMessage = "Некорректный email.";
            break;
          case "auth/missing-email":
            errorMessage = "Email не был предоставлен.";
            break;
          case "auth/too-many-requests":
            errorMessage =
              "Слишком много запросов. Пожалуйста, попробуйте позже.";
            break;
          default:
            errorMessage = "Не удалось отправить письмо для сброса пароля.";
            break;
          }
        Alert.alert("Ошибка", errorMessage);
      }
    };

    return (
        <View style={ResetStyles.MainContainer}>

          <View style={{height:70, justifyContent:'flex-end'}}>
            <StatusBar style='auto' />
            <ClickableText text='Назад' onPress={() => router.back()} style={ResetStyles.back}/> 
          </View>
          
          <View style={{flex:2}}/>
          
          <View style={ResetStyles.secondContain}>

            <Image source={require('../assets/images/logo.png')} resizeMode='contain' style={{height:100, alignSelf: 'center'}}/>

            <View style={ResetStyles.CenterContainer}>
                <Input placeholder='Email' keyboardType="email-address" onChangeText={setEmail}/>
                <Button text='Сбросить пароль' onPress={handleResetPassword}/>
            </View>
              
          </View>

          <View style={{flex:3}}/>

        </View>
    );
}

const ResetStyles = StyleSheet.create({
    txt: {
        color: Colors.white,
        fontSize: 24,
        textShadowColor: Colors.gray,
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius: 2,
        alignSelf: 'center'
      },
      MainContainer:{
        flex:1,
        justifyContent:'center',
        backgroundColor: Colors.orange
      },
      secondContain:{
        flex: 2,
        justifyContent:'center',
        backgroundColor: Colors.orange,
        padding:55,
        gap: 40,
      },
      CenterContainer:{
        alignSelf:'stretch',
        gap:15
      },
      back:{
        left: 15
      }
  });