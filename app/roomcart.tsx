import { ScrollView, Dimensions, StyleSheet, Text, Image, View, FlatList, Pressable, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/consts/colors';
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { linkServe } from '@/consts/link';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Heart from '@/components/ui/heart';
import RedHeart from '@/components/ui/redheart';
import { user } from '@/consts/user';
import { Button } from '@/components/button';

export default function RoomCart() {
    const params = useLocalSearchParams();
    const checkInDate = params.checkInDate
    const checkOutDate = params.checkOutDate
    const roomId = params.roomId;
    const [roomData, setRoomData] = useState([{"RoomType":"Люкс","Price":4000,"RoomSize":50,"BedCount":4,"RoomDescription":"Шикарный выбор для роскошного отдыха","Advantages":"Вид из окна и крутой санузел"}]);
    const [roomDops, setRoomDops] = useState([{"conditioner":"y","hairdryer":"y","refrigerator":"y","telephone":"y","TV":"y","Iron":"y"}]);
    const [photos, setPhotos] = useState([]);
    const [cBeds, setCBeds] = useState([]);
    const [isHeartRed, setIsHeartRed] = useState(false);
    const [countStars, setCountStars] = useState(3);

    const router = useRouter();

    const w = Dimensions.get('screen').width;

    const fetchRoomData = async () => {
        const response = await axios.get(linkServe + ':1880/getRoomData?id=' + roomId);
        setRoomData(response.data)
    };

    const fetchRoomBeds = async () => {
        const response = await axios.get(linkServe + ':1880/getBeds?id=' + roomId);
        setCBeds(response.data)
    };

    const fetchRoomDops = async () => {
        const response = await axios.get(linkServe + ':1880/getRoomDops?id=' + roomId);
        setRoomDops(response.data)
    };

    const fetchIsSaved = async () => {
        const response = await axios.get(linkServe + ':1880/isSaved?idRoom=' + roomId + "&idUser=" + user.id);
        setIsHeartRed(response.data == "true")
    };

    const fetchImg = async () => {
        try {
            const response = await axios.get(linkServe + ':1880/getRoomsIMG?id=' + roomId);
            const data = response.data;
      
            const formattedPhotos = data.map((item, index) => ({
              id: index.toString(),
              uri: linkServe + ':8080/images/' + item.URL,
            }));
      
            setPhotos(formattedPhotos);
          } catch (error) {
            console.error('Ошибка при загрузке изображений:', error);
          }        
      };
    
    const PressHeart = async() => {
        await axios.get(linkServe + ':1880/updSaved?idRoom=' + roomId + "&idUser=" + user.id);
        setIsHeartRed(!isHeartRed)
    }

    useEffect(() => {
        fetchRoomData();
    }, []);

    useEffect(() => {
        fetchRoomBeds();
    }, []);

    useEffect(() => {
        fetchRoomDops();
    }, []);

    useEffect(() => {
        fetchImg();
    }, [roomId]);

    useEffect(() => {
        if (roomData[0].RoomType === 'Люкс') {
        setCountStars(5);
        } else if (roomData[0].RoomType === 'Комфорт') {
        setCountStars(4);
        } else {
        setCountStars(3);
        }
    }, [roomData]);

    useEffect(() => {
        fetchIsSaved();
    }, []);

    return(
        <ScrollView style={{backgroundColor: Colors.lightOrange, width: w}}>
            <StatusBar style='dark' />
            <View style={RooomStyle.Main}>

                <View style={[RooomStyle.verhStr, {width: w}]}>
                    <Pressable style={{marginLeft: 10}} onPress={() => router.back()}>
                        <Image source={require('../assets/images/back.png')} style={{height:32, width:32}}/>
                    </Pressable>
                    <Image source={require('../assets/images/Hotel-Cocktail.png')} resizeMode='contain' style={{height: 32, width:120}}/>
                    <Pressable style={{marginRight: 18}} onPress={PressHeart}>
                        {!isHeartRed ? <Heart /> : <RedHeart />} 
                    </Pressable>
                </View>

                <View style={RooomStyle.Container}>
                    <View style={[RooomStyle.typeView, {width: w-30} ]}>
                        <Text style={RooomStyle.roomType}>{roomData[0].RoomType}</Text>
                        <View style = {RooomStyle.starsContainer}>
                            {Array(countStars).fill(null).map((_, index) => (
                                <Ionicons key={index} name="star" size={22} color={Colors.yellow}/>
                            ))}
                            {Array(5 - countStars).fill(null).map((_, index) => (
                                <Ionicons key={index} name="star" size={22} color={Colors.ligthgray}/>
                            ))}
                        </View>
                    </View>

                    <View style={{width: w-10, height:(w-10)/1.6}}> 
                        <FlatList
                            data={photos}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <Image source={{ uri: item.uri }} style={[RooomStyle.roomImage, {width: w-20,}]} />
                            )}
                        />
                    </View>

                    <View style={[RooomStyle.CenView, {width: w-30}]}>
                        <Text style={RooomStyle.Price}>{roomData[0].Price}</Text>
                        <Text style={RooomStyle.PriceTxt}>руб/сутки</Text>
                        <Text style={RooomStyle.GostTxt}>{roomData[0].RoomSize} м²</Text>
                        <View style={RooomStyle.Count}>
                            <Ionicons name="person" size={20} color="#555" />
                            <Text style={RooomStyle.GostTxt}>{roomData[0].BedCount}</Text>
                        </View>
                    </View>

                    <View style={{alignItems: 'flex-start', width: w-50}}>
                        {cBeds.map((item, index) => {
                            if (item.BedType == '1') {
                                return (
                                    <Text key={index} style={RooomStyle.Options}>
                                        Односпальных кроватей: {item.CountBed}
                                    </Text>
                                );
                            }
                            if (item.BedType == '2') {
                                return (
                                    <Text key={index} style={RooomStyle.Options}>
                                        Двуспальных кроватей: {item.CountBed}
                                    </Text>
                                );
                            }
                        })}
                        <View style={{height: 10}}/>
                    </View>
                </View>

                <View style={[RooomStyle.Container2, {width: w-10}]}>
                    <Text style={RooomStyle.Title}>Описание номера:</Text>
                    <Text style={RooomStyle.Description}>{roomData[0].RoomDescription}</Text>
                    <Text style={RooomStyle.Title}>Преимущества:</Text>
                    <Text style={RooomStyle.Description}>{roomData[0].Advantages}</Text>
                </View>

                <View style={[RooomStyle.Container3, {width: w-10}]}>
                    <Text style={RooomStyle.Title}>Опции и удобства:</Text>
                    <View style={{flexDirection:'row', width: w-60, alignSelf:'center', justifyContent: 'space-around'}}>
                        <View>
                            <Text style={RooomStyle.Options}>Wi-fi</Text>
                            <Text style={RooomStyle.Options}>Сейф</Text>
                            <Text style={RooomStyle.Options}>Зеркало</Text>
                            <Text style={RooomStyle.Options}>Розетки у кровати</Text>
                            <Text style={RooomStyle.Options}>Шкаф</Text>
                            <Text style={RooomStyle.Options}>Тумбочки</Text>
                            <Text style={RooomStyle.Options}>Обслуживание номеров {'\n'}(круглосуточно)</Text>
                            <Text style={RooomStyle.Options}>Отопление</Text>
                            { roomDops[0].conditioner === 'y' && 
                            <Text style={RooomStyle.Options}>Кондиционер</Text>}
                            { roomDops[0].refrigerator === 'y' && 
                            <Text style={RooomStyle.Options}>Холодильник</Text>}
                            { roomDops[0].telephone === 'y' && 
                            <Text style={RooomStyle.Options}>Телефон</Text>}
                            { roomDops[0].TV === 'y' && 
                            <Text style={RooomStyle.Options}>Телевизор</Text>}
                        </View>
                        <View />
                        <View>
                            <Text style={RooomStyle.Options}>Санузел</Text>
                            <Text style={RooomStyle.Options}>Ванна</Text>
                            <Text style={RooomStyle.Options}>Душ</Text>
                            <Text style={RooomStyle.Options}>Халаты</Text>
                            <Text style={RooomStyle.Options}>Тапочки</Text>
                            <Text style={RooomStyle.Options}>Полотенца</Text>
                            <Text style={RooomStyle.Options}>Мыло</Text>
                            <Text style={RooomStyle.Options}>Гель и шампунь</Text>
                            <Text style={RooomStyle.Options}>Зубные щётки</Text>
                            { roomDops[0].hairdryer === 'y' && 
                            <Text style={RooomStyle.Options}>Фен</Text>}
                            { roomDops[0].Iron === 'y' && 
                            <Text style={RooomStyle.Options}>Приборы глажки</Text>}
                        </View>
                    </View>
                </View>

                <View style={[RooomStyle.Container2, {width: w-10}]}>
                    <Text style={RooomStyle.Title}>Условия бронирования:</Text>
                    <Text style={RooomStyle.Description}>В случае отмены или изменения бронирования уплаченные средства не возвращаются.</Text>
                    <Text style={RooomStyle.Title}>Условия оплаты:</Text>
                    <Text style={RooomStyle.Description}>Оплата происходит в момент бронирования.</Text>
                </View>

                <View style={[RooomStyle.Container2, {width: w-10}]}>
                    <Text style={RooomStyle.Title}>Правила отеля</Text>
                    <Text style={RooomStyle.RulesTitle}>Заезд и выезд:</Text>
                    <Text style={RooomStyle.RulesDescription}>Заезд с 14:00. Выезд до 12:00.</Text>
                    <Text style={RooomStyle.RulesTitle}>Стойка регистрации:</Text>
                    <Text style={RooomStyle.RulesDescription}>Круглосуточная стойка регистрации.</Text>
                    <Text style={RooomStyle.RulesTitle}>Домашние животные:</Text>
                    <Text style={RooomStyle.RulesDescription}>Проживание с животными запрещено.</Text>
                </View>

            </View>
            <Button style={RooomStyle.but} text='Забронировать' onPress={() => router.push(`/booking?checkInDate=${checkInDate || 'null'}&checkOutDate=${checkOutDate || 'null'}&cBeds=${roomData[0].BedCount}&Price=${roomData[0].Price}&roomId=${roomId}`)}/>
        </ScrollView>
    );
}

const RooomStyle = StyleSheet.create({
    Main: {
        alignItems: 'center',
        backgroundColor: Colors.lightOrange,
        gap: 6,
        paddingBottom:6
    },
    verhStr: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 90,
        backgroundColor: Colors.white,
        paddingBottom:10,
    },
    Container: {
        alignItems: 'center',
        backgroundColor:Colors.white,
        borderRadius:10
    },
    Container2: {
        alignItems: 'flex-start',
        backgroundColor:Colors.white,
        borderRadius:10,
        padding: 14
    },
    Container3: {
        alignItems: 'flex-start',
        backgroundColor:Colors.white,
        borderRadius:10,
        padding: 14
    },
    typeView: {
        flexDirection: 'row',
        marginBottom: 4,
        marginTop: 6,
        alignItems: 'center',
    },
    starsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    roomType: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.darkNight
    },
    roomImage: {
        aspectRatio: 5 / 3,
        borderRadius: 8,
        margin: 5
    },
    CenView:{
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 8,
        gap: 8
    },
    Count: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    Price:{
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.darkGray,
        marginLeft:8
    },
    PriceTxt:{
        fontSize: 16,
        color: Colors.darkGray,
        marginRight:12
    },
    GostTxt:{
        fontSize: 18,
        color: Colors.darkGray
    },
    Title:{
        fontSize: 18,
        color: Colors.darkGray,
        fontWeight: 'bold'
    },
    Description:{
        fontSize: 16,
        color: Colors.darkGray,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        marginTop: 6
    },
    Options : {
        fontSize: 15,
        color: Colors.darkGray,
    },
    RulesTitle: {
        fontSize: 16,
        color: Colors.darkGray,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 6
    },
    RulesDescription: {
        fontSize: 16,
        color: Colors.darkGray,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 6,
    },
    but: {
        marginHorizontal: 8,
        marginBottom: 4
    }
})