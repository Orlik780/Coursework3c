import React, { useState } from 'react';
import { Dimensions, StyleSheet, Alert, View, Image } from 'react-native';
import { Input } from '../components/input';
import { Colors } from '../consts/colors';
import { Button } from '../components/button';
import { ClickableText } from '../components/clickabletext';
import { useRouter } from 'expo-router';
import { registrationUser } from '../hooks/auth';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { linkServe } from '@/consts/link';

export default function Regisration() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const fetchUser = async () => {
    const response = await axios.get(linkServe + ':1880/addUser?email=' + email + '&firstName=' + firstName +'&lastName=' + lastName);
  };

  const handleRegister = async () => {
    
    if (email == '' || firstName == '' || lastName == '' || password == '' || confirmPassword == '') {
      Alert.alert("Ошибка", "Все поля должны быть заполнены");
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      Alert.alert("Ошибка", "Email должен соответствовать формату example@index.reg");
      return;
    } 
    
    if (password !== confirmPassword) {
      Alert.alert("Ошибка", "Пароли не совпадают");
      return;
    }

    try {
      await registrationUser(email, password);
      Alert.alert("Успех", "Вы успешно зарегистрировались! На вашу почту было отправлено письмо для верификации");
      fetchUser();
      router.back();
    } catch (err) {
      Alert.alert("Ошибка", err.message);
    }
  };

  const filterLetters = (text: string): string => {
    return text.replace(/[^a-zA-Zа-яА-Я]/g, '');
  };

  const handleLastNameChange = (text: string): void => {
    const filteredText = filterLetters(text);
    setLastName(filteredText);
  };

  const handleFirstNameChange = (text: string): void => {
    const filteredText = filterLetters(text);
    setFirstName(filteredText);
  };

  return (
    <View style={registrationStyles.MainContainer}>
      <View style={{height:70, justifyContent:'flex-end'}}>
        <StatusBar style='auto' />
        <ClickableText text='Назад' onPress={() => router.back()} style={registrationStyles.back}/> 
      </View>
      <View style={registrationStyles.secondContain}>
      <View style={{flex:1}}/>
        <View style={registrationStyles.ContentContainer}>
          <Image source={require('../assets/images/logo.png')} resizeMode='contain' style={{height:100}}/>
          <View style={registrationStyles.CenterContainer}>
            <Input placeholder='Фамилия' value={lastName} onChangeText={handleLastNameChange}/>
            <Input placeholder='Имя' value={firstName} onChangeText={handleFirstNameChange}/>
            <Input placeholder='Email' keyboardType="email-address" onChangeText={setEmail}/>
            <Input isPassword placeholder='Пароль' onChangeText={setPassword}/>
            <Input isPassword placeholder='Повторите пароль' onChangeText={setConfirmPassword}/>
            <Button text='Зарегестрироваться' onPress={handleRegister}/>
          </View>
        </View>
        <View style={{flex:3}}/>
      </View>
    </View>
  );
}

const registrationStyles = StyleSheet.create({
  txt: {
    color: Colors.white,
    fontSize: 24,
    textShadowColor: Colors.gray,
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius: 2,
    alignSelf: 'center'
  },
  secondContain:{
    justifyContent:'center',
    padding:55,
    backgroundColor: Colors.orange,
    flex: 2
  },
  MainContainer:{
    flex:1,
    justifyContent:'center',
    backgroundColor: Colors.orange
  },
  ContentContainer:{
    alignItems:'center',
    gap:30
  },
  CenterContainer:{
    alignSelf:'stretch',
    gap:15
  },
  back:{
    left: 15
  }
});