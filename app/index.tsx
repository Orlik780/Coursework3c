import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Image, Alert } from 'react-native';
import { Input } from '../components/input';
import { Colors } from '../consts/colors';
import { Button } from '../components/button';
import { ClickableText } from '../components/clickabletext';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { loginUser } from '../hooks/auth';
import { auth } from '../firebaseConfig';
import axios from 'axios';
import { linkServe } from '@/consts/link';
import { user} from '../consts/user';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchUser = async () => {
    const response = await axios.get(linkServe + ':1880/getUser?email=' + email);
    user.updateUserInfo(
      response.data[0].firstName,
      response.data[0].lastName,
      response.data[0].middleName,
      response.data[0].email,
      response.data[0].phoneNumber,
      response.data[0].passportSeries,
      response.data[0].passportNumber,
      password,
      response.data[0].id
    )
    Alert.alert("Успех", `Добро пожаловать, ${user.lastName} ${user.firstName}`);
  };

  const handleLogin = async () => {
    if (email == '' || password == '') {
      Alert.alert("Ошибка", "Все поля должны быть заполнены");
      return;
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      Alert.alert("Ошибка", "Email должен соответствовать формату example@index.reg");
      return;
    } 
    try {
      await loginUser(email, password);
      const FBuser = auth.currentUser;
      if (FBuser && !FBuser.emailVerified) {
        Alert.alert("Ошибка", "Пожалуйста, подтвердите ваш email.");
        return;
      }
      fetchUser()
      router.replace('/numbers');
    } catch (err) {
      Alert.alert("Ошибка", err.message);
    }
  };

  return (
    <View style={LogInStyles.MainContainer}>
      <StatusBar style='auto' />
      <View style={LogInStyles.ContentContainer}>
        <Image source={require('../assets/images/logo.png')} resizeMode='contain' style={{height:100}}/>
        <View style={LogInStyles.CenterContainer}>
          <Input placeholder='Email' keyboardType="email-address" onChangeText={setEmail}/>
          <Input isPassword placeholder='Пароль' onChangeText={setPassword}/>
          <Button text='Вход' onPress={handleLogin}/>
        </View>
        <View style={LogInStyles.options}>
          <ClickableText text='Регистрация' onPress={() => router.navigate('/registration')}/> 
          <ClickableText text='Восстановление пароля' onPress={() => router.navigate('/resetpas')}/>
        </View>
      </View>
    </View>
  );
}

const LogInStyles = StyleSheet.create({
  MainContainer:{
    flex:1,
    justifyContent:'center',
    padding:55,
    backgroundColor: Colors.orange
  },
  ContentContainer:{
    alignItems:'center',
    gap:40
  },
  CenterContainer:{
    alignSelf:'stretch',
    gap:15
  },
  options : {
    alignItems:'center',
    rowGap:10
  }
});