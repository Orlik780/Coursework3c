import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Alert, View, Image, Text, ScrollView } from 'react-native';
import { Input } from '../components/input';
import { Colors } from '../consts/colors';
import { Button } from '../components/button';
import { ClickableText } from '../components/clickabletext';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { linkServe } from '@/consts/link';
import { TextInputMask } from 'react-native-masked-text';
import { user } from '@/consts/user';
import { getAuth } from "firebase/auth";
import { registrationUser } from '../hooks/auth';

export default function UserInfo() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [phone, setPhone] = useState('');
  const [numb, setNumb] = useState('');
  const [seria, setSeria] = useState('');
  const auth = getAuth();
  const FBuser = auth.currentUser;

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

  const handleMiddleNameChange = (text: string): void => {
    const filteredText = filterLetters(text);
    setMiddleName(filteredText);
  };

  const fetchUpdates = async () => {
    if (firstName != user.firstName && firstName != ''){
      await axios.get(linkServe + ":1880/updFName?email="+ user.email +"&firstName=" + firstName);
    }

    if (lastName != user.lastName && lastName != ''){
      await axios.get(linkServe + ":1880/updLName?email="+ user.email +"&lastName=" + lastName);
    }

    if (middleName != user.middleName && middleName != ''){
      await axios.get(linkServe + ":1880/updMName?email="+ user.email +"&middleName=" + middleName);
    }

    if (phone != user.phoneNumber && phone != ''){
      await axios.get(linkServe + ":1880/updPhoneNumber?email="+ user.email +"&phoneNumber=" + phone);
    }

    if (numb != user.passportNumber && numb != ''){
      await axios.get(linkServe + ":1880/updPassportNumber?email="+ user.email +"&passportNumber=" + numb);
    }

    if (seria != user.passportSeries && seria != ''){
      await axios.get(linkServe + ":1880/updPassportSeries?email="+ user.email +"&passportSeries=" + seria);
    }

    if (email != user.email){
      try{
        await registrationUser(email, user.passwoord);
      } catch (err) {
        Alert.alert("Ошибка", err.message);
        return;
      }
      router.replace('/');
      Alert.alert("Внимание", "После смены email, нужно верифицировать новый email и после войти в аккаунт")
      await FBuser.delete();
      await axios.get(linkServe + ":1880/updEmail?id="+ user.id +"&newemail=" + email);
    }
  }

  const onSave = async() => {
    
    if(!firstName || !lastName || !email){
      Alert.alert("Внимание!", "Поля Имя, Фамилия и Email должны быть заполнены")
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      Alert.alert("Ошибка", "Email должен соответствовать формату example@index.reg");
      return;
    }

    let text = "Сохранить изменения: \n";

    if (firstName != user.firstName && firstName != ''){
      text += `Имя: ${user.firstName} -> ${firstName}\n`
    }

    if (lastName != user.lastName && lastName != ''){
      text += `Фамилия: ${user.lastName} -> ${lastName}\n`
    }

    if (middleName != user.middleName && middleName != ''){
      text += `Отчество: ${user.middleName || 'Не указано'} -> ${middleName}\n`
    }

    if (phone != user.phoneNumber && phone != ''){
      text += `Номер телефона: ${user.phoneNumber || 'Не указано'} -> ${phone}\n`
    }

    if (email != user.email){
      text += `Email: ${user.email} -> ${email}\n`
    }

    if (numb != user.passportNumber && numb != ''){
      text += `Номер паспорта: ${user.passportNumber || 'Не указано'} -> ${numb}\n`
    }

    if (seria != user.passportSeries && seria != ''){
      text += `Серия паспорта: ${user.passportSeries || 'Не указано'} -> ${seria}\n`
    }

    if (text == "Сохранить изменения: \n"){
      Alert.alert("Внимание", "Нет изменений")
    } else {
      Alert.alert(
        'Подтвердите действие',
        text,
        [
        {
            text: 'Отмена',
            style: 'cancel',
        },
        {
            text: 'Подтвердить',
            onPress: async () => {
            await fetchUpdates();
            await updateUser();
            },
            style: 'default',
        },
        ]
      );
    }
  }

  const updateUser = async() => {
    user.updateUserInfo(
      firstName,
      lastName,
      middleName,
      email,
      phone,
      seria,
      numb
    )
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.email)
    setMiddleName(user.middleName || '')
    setPhone(user.phoneNumber || '')
    setNumb(user.passportNumber || '')
    setSeria(user.passportSeries || '')

    Alert.alert("Уведомление", "Данные успешно обновлены");
  }

  useEffect (() => {
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.email)
    setMiddleName(user.middleName || '')
    setPhone(user.phoneNumber || '')
    setNumb(user.passportNumber || '')
    setSeria(user.passportSeries || '')
  }, []);

  return (
    <ScrollView style={{backgroundColor: Colors.orange}}>
    <View style={registrationStyles.MainContainer}>
      <View style={{height:70, justifyContent:'flex-end'}}>
        <StatusBar style='auto' />
        <ClickableText text='Назад' onPress={() => router.back()} style={registrationStyles.back}/> 
      </View>
      <View style={registrationStyles.secondContain}>
        <View style={registrationStyles.ContentContainer}>
          <Text style={{fontSize:22, fontWeight: '500', color: Colors.lightOrange}}>Данные аккаунта</Text>
          <View style={registrationStyles.CenterContainer}>
            <Input placeholder='Фамилия' value={lastName} onChangeText={handleLastNameChange}/>
            <Input placeholder='Имя' value={firstName} onChangeText={handleFirstNameChange}/>
            <Input placeholder='Отчество' value={middleName} onChangeText={handleMiddleNameChange}/>
            <TextInputMask type={'custom'} options={{ mask: '+7-(999)-999-99-99' }} keyboardType="numeric" value={phone.slice(1)}
              onChangeText={setPhone} style={registrationStyles.maskInpt} placeholder="Телефон" placeholderTextColor={Colors.gray}/>
            <Input placeholder='Email' keyboardType="email-address" value={email} onChangeText={setEmail}/>
            <Text style={{fontSize:18, fontWeight: '500', color: Colors.lightOrange}}>Данные паспорта</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{alignItems:'stretch', width:'38.5%'}}>
                <TextInputMask type={'custom'} options={{ mask: '9999' }} keyboardType="numeric" value={seria}
                onChangeText={setSeria} style={registrationStyles.maskInpt} placeholder="Серия" placeholderTextColor={Colors.gray}/>
              </View>
              <View style={{alignItems:'stretch', width:'58.5%'}}>
                <TextInputMask type={'custom'} options={{ mask: '999999' }} keyboardType="numeric" value={numb}
                onChangeText={setNumb} style={registrationStyles.maskInpt} placeholder="Номер" placeholderTextColor={Colors.gray}/>
              </View>
            </View>
            <Button text='Сохранить' onPress={onSave}/>
          </View>
        </View>
      </View>
    </View>
    </ScrollView>
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
  },
  maskInpt: {
    height: 56,
    backgroundColor: Colors.lightOrange,
    paddingHorizontal: 24,
    borderRadius: 10,
    fontSize: 16
  }
});