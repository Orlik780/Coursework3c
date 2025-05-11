import { Dimensions, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/consts/colors';
import { Button } from '@/components/button';
import { auth } from '../../firebaseConfig';
import { user} from '../../consts/user';
import axios from 'axios';
import { linkServe } from '@/consts/link';

export default function Account() {
    const w = Dimensions.get('screen').width;
    const router = useRouter();

    const deleteAccount = async () => {
        try {
          const FBuser = auth.currentUser;
          await axios.get(linkServe + ':1880/delUser?email=' + user.id);
          await FBuser.delete();
          Alert.alert("Уведомление", "Аккаунт успешно удалён")
          router.replace('/');
        } catch (error) {
          console.error('Ошибка при удалении аккаунта:', error.message);
        }
    }

    const handleDeleteAccount = async () => {
        Alert.alert(
            'Подтвердите действие',
            'Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить.',
            [
            {
                text: 'Отмена',
                style: 'cancel',
            },
            {
                text: 'Удалить',
                onPress: async () => {
                await deleteAccount();
                },
                style: 'destructive',
            },
            ]
        );
    }
    return(
        <View style={AccountStyle.main}>
            <StatusBar style='dark' />

            <View style={[AccountStyle.acc1, {width: w-10, height: "30%"}]}>
                <Text style={AccountStyle.label1 }>Настройки аккаунта</Text>
                <Button text='Изменение данных' onPress={() => router.navigate('/userInfo')}/>
                <View style={AccountStyle.twob}>
                    <Button text='Удаление аккаунта' style={{width:'49%'}} onPress={() => handleDeleteAccount()}/>
                    <Button text='Сброс пароля' style={{width:'49%'}} onPress={() => router.navigate('/resetpas')}/>
                </View>
            </View>
            

            <Pressable style={{width: w-10, height: "18%"}} onPress={() => router.navigate('/saved')}>
                <View style={AccountStyle.acc}>
                    <Text style={AccountStyle.label}>Отложенные номера</Text>
                </View>
            </Pressable>

            <Pressable style={{width: w-10, height: "18%"}} onPress={() => router.navigate('/booked')}>
                <View style={AccountStyle.acc}>
                    <Text style={AccountStyle.label}>Бронирования</Text>
                </View>
            </Pressable>

            <Pressable style={{width: w-10, height: "18%"}} onPress={() => router.navigate('/prava')}>
                <View style={AccountStyle.acc}>
                    <Text style={AccountStyle.label}>Правила отеля</Text>
                </View>
            </Pressable>

            <Pressable style={{width: w-10, height: "10%"}} onPress={() => router.navigate('/polit')}>
                <View style={AccountStyle.acc}>
                    <Text style={AccountStyle.labelPolit}>Политика конфиденциальности</Text>
                </View>
            </Pressable>


        </View>
    );
}

const AccountStyle = StyleSheet.create({
    main:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: Colors.orangrGray
    },
    acc1:{
        backgroundColor: Colors.white,
        borderRadius: 10,
        alignItems: 'stretch',
        paddingHorizontal: 10,
        justifyContent: 'center',
        gap: 10
    },
    acc:{
        flex:1,
        backgroundColor: Colors.white,
        borderRadius: 10,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingHorizontal: 10,
        gap: 10
    },
    label1:{
        fontSize: 22,
        color: Colors.darkNight,
        alignSelf: 'center',
    },
    label:{
        fontSize: 22,
        color: Colors.darkNight,
        alignSelf: 'center',
        marginBottom: 10,
    },
    labelPolit:{
        fontSize: 18,
        color: Colors.darkNight,
        marginBottom: 6,
        alignSelf: 'center'
    },
    twob:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})