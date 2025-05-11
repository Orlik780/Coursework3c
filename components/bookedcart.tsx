import React, { useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable, PressableProps, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/consts/colors';
import axios from 'axios';
import { linkServe } from '@/consts/link';
import Galochka from './ui/galochka';
import Krest from './ui/krest';
import { Button } from './button';
import { router } from 'expo-router';

export function BookedCart({bookingId, roomId, ...props} : PressableProps & {bookingId: number} & {roomId: number}) {
    const { width } = Dimensions.get('window');
    const [countStars, setCountStars] = useState(3);
    const [roomData, setRoomData] = useState([{"RoomType":"Люкс","Price":1,"RoomSize":1,"BedCount":1}]);
    const [bookingInfo, setBookingInfo] = useState([{"CheckInDate":"2025-04-29T21:00:00.000Z","DepartureDate":"2025-04-30T21:00:00.000Z","Peoples":2,"TotalPrice":1,"EarlyCheckIn":"y","LateDeparture":"n","Meal":"y"}]);
    const [roomUrl, setRoomUrl] = useState([{"URL":"lol.png"}]);

    const date = new Date(bookingInfo[0].CheckInDate); 

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0'); 
    const year = String(date.getFullYear());

    const date2 = new Date(bookingInfo[0].DepartureDate); 

    const month2 = String(date2.getMonth() + 1).padStart(2, '0');
    const day2 = String(date2.getDate()).padStart(2, '0'); 
    const year2 = String(date2.getFullYear());

    const fetchBookingInfo = async () => {
        const response = await axios.get(linkServe + ':1880/getBookingInfo?ID=' + bookingId);
        setBookingInfo(response.data)
    };

    const fetchRoomData = async () => {
        const response = await axios.get(linkServe + ':1880/getRoomData?id=' + roomId);
        setRoomData(response.data)
    };
    
    const fetchImg = async () => {
        const response = await axios.get(linkServe + ':1880/getRoomMainIMG?id=' + roomId);
        setRoomUrl(response.data)
    };

    useEffect(() => {
        fetchBookingInfo()
    }, [])

    useEffect(() => {
        fetchRoomData()
    }, [])

    useEffect(() => {
        fetchImg()
    }, [])

    useEffect(() => {
        if (roomData[0].RoomType === 'Люкс') {
          setCountStars(5);
        } else if (roomData[0].RoomType === 'Комфорт') {
          setCountStars(4);
        } else {
          setCountStars(3);
        }
      }, [roomData]);

    const handleDel = async() => {
        Alert.alert(
            'Подтвердите действие',
            'Вы уверены, что хотите отменить бронь? Деньги за отмену брони не подлежат возврату',
            [
            {
                text: 'Отмена',
                style: 'cancel',
            },
            {
                text: 'Уверен',
                onPress: async () => {
                    axios.get(linkServe + ':1880/delBooking?ID=' + bookingId)
                    Alert.alert("Бронь отменена")
                    router.replace('/(tabs)/account')
                },
                style: 'destructive',
            },
            ]
        );
    }
      
    return(
        <Pressable style={[bookedcart.card, { width: width - 10}]} {...props}>
            <View style={bookedcart.typeView}>
                <Text style={bookedcart.roomType}>{roomData[0].RoomType}</Text>
                <View style = {bookedcart.starsContainer}>
                    {Array(countStars).fill(null).map((_, index) => (
                        <Ionicons key={index} name="star" size={20} color={Colors.yellow}/>))}
                    {Array(5 - countStars).fill(null).map((_, index) => (
                        <Ionicons key={index} name="star" size={20} color={Colors.ligthgray}/>))}
                </View>
            </View>
            <View>
                <Image source={{ uri: linkServe + ':8080/images/' + roomUrl[0].URL }} style={bookedcart.roomImage} />
                <View style={bookedcart.finfo}>
                    <View style={bookedcart.sinfo}>
                        <Text style={bookedcart.detailText}>{roomData[0].RoomSize} м²</Text>
                        <View style={bookedcart.capacity}>
                            <Ionicons name="person" size={22} color="#555" />
                            <Text style={bookedcart.detailText}> {bookingInfo[0].Peoples} из {roomData[0].BedCount}</Text>
                        </View>
                    </View>
                    <Text  style={bookedcart.detailText}>{roomData[0].Price} руб/сутки</Text>
                </View>
            </View>
            <View style={bookedcart.datas}>
                <Text style={bookedcart.txt}>С  {day}.{month}.{year}</Text>
                <Text style={bookedcart.txt}>До  {day2}.{month2}.{year2}</Text>
            </View>
            <View style={bookedcart.infContainer}>
                <Text style={bookedcart.txt}>Еда </Text>
                {bookingInfo[0].Meal == 'y'? <Galochka /> : <Krest />} 
            </View>
            <View style={bookedcart.infContainer}>
                <Text style={bookedcart.txt}>Ранний заезд </Text>
                {bookingInfo[0].EarlyCheckIn == 'y'? <Galochka /> : <Krest />} 
            </View>
            <View style={bookedcart.infContainer}>
                <Text style={bookedcart.txt}>Поздний выезд </Text>
                {bookingInfo[0].LateDeparture == 'y' || bookingInfo[0].LateDeparture == 'w'? <Galochka /> : <Krest />} 
            </View>
            <View style={bookedcart.infContainer}>
                <Text style={bookedcart.txt}>Цена </Text>
                <Text style={[bookedcart.txt, {marginRight: 6}]}>{bookingInfo[0].TotalPrice} рублей</Text>
            </View>
            {date > new Date() && <Button style={{margin:4}} text='Отменить бронь' onPress={()=>handleDel()}/>}
        </Pressable>
    );
}

const bookedcart = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 10,
        alignItems: 'stretch'
    },
    typeView: {
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 4,
        alignItems: 'center'
      },
      roomType: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.black
      },
      starsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      roomImage: {
        width: '98%',
        aspectRatio: 16 / 10,
        borderRadius: 8,
        alignSelf: 'center'
      },
      detailText: {
        fontSize: 18,
        color: Colors.darkNight,
      },
      finfo : {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between'
      },
      sinfo:{
        flexDirection: 'row',
        gap: 14
      },
      capacity: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      infContainer:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginHorizontal:10,
        marginVertical: 4
      },
      txt: {
        fontSize: 18,
        color: Colors.darkGray,
      },
      datas: {
        flexDirection: 'row',
        marginHorizontal: 8,
        marginVertical:4,
        justifyContent: 'space-between'
      }
})