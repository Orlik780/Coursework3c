import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Alert, Image, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/consts/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { linkServe } from '@/consts/link';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/components/button';
import { user} from '../consts/user';

type DateType = 'checkIn' | 'checkOut' | null;

export default function Booking() {
    const router = useRouter();
    const [id, setid] = useState<string>(null);
    const [maxPeop, setMaxPeop] = useState<number>(1);
    const [withEat, setWithEat] = useState<boolean>(false);
    const [earlychin, setearlychin] = useState<boolean>(false);
    const [lastchout, setlastchout] = useState<boolean>(false);
    const [wlastchout, setwlastchout] = useState<boolean>(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
    const [selectedDateType, setSelectedDateType] = useState<DateType>(null);
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [countPeop, setCountPeop] = useState<number>(1);
    const [price, setPrice] = useState<number>(1);
    const [available,setAvailable] = useState([{"Available":1,"AvailableCheckOut":1,"AvailableCheckIn":1}])

    const params = useLocalSearchParams();
    const kekInDate = params.checkInDate
    const roomId = params.roomId
    const departureDate = params.checkOutDate
    const cBeds = params.cBeds
    const strPrice = params.Price

    const days = checkOutDate != null? Math.round(Math.abs(checkInDate.getTime() - checkOutDate.getTime()) / (1000 * 60 * 60 * 24)): 0;
    const basePrice = withEat ? 4500 * days * countPeop : 0;
    const earlyCheckinPrice = earlychin ? price : 0;
    const lateCheckoutPrice = lastchout ? price / 2 : 0;
    const weekendLateCheckoutPrice = wlastchout ? price : 0;
    const totalPrice = basePrice + earlyCheckinPrice + lateCheckoutPrice + weekendLateCheckoutPrice + price * days;

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const showDatePicker = (type: DateType) => {
        setSelectedDateType(type);
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
    if (selectedDateType === 'checkIn') {
        setCheckInDate(date);
    } else if (selectedDateType === 'checkOut') {
        setCheckOutDate(date);
    }
    hideDatePicker();
    };

    const handleLastChin = async () =>{
        setlastchout(!lastchout)
        if(!lastchout){
            setwlastchout(false)
        }
    }

    const handleWLastChin = async () =>{
        setwlastchout(!wlastchout)
        if(!wlastchout){
            setlastchout(false)
        }
    }

    useEffect(()=>{
        setMaxPeop(parseInt(cBeds))
        setCountPeop(parseInt(cBeds))
        setPrice(parseInt(strPrice))
        if (departureDate != 'null') {
            const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
            const match = kekInDate.match(dateRegex);
            const day = parseInt(match[1], 10);
            const month = parseInt(match[2], 10) - 1;
            const year = parseInt(match[3], 10);
            setCheckInDate(new Date(year, month, day))
            const match1 = departureDate.match(dateRegex);
            const day1 = parseInt(match1[1], 10);
            const month1 = parseInt(match1[2], 10) - 1;
            const year1 = parseInt(match1[3], 10);
            setCheckOutDate(new Date(year1, month1, day1))
            }
    }, [])

    const bookingHandle = async () => {
        if(checkOutDate == null){
            Alert.alert("Внимание", "Выберите даты поездки")
            return
        }
        const sqlchindate = checkInDate?.getFullYear()+ '-' +(checkInDate?.getMonth() + 1)+ '-' +checkInDate?.getDate()
        const sqldepdate = checkOutDate?.getFullYear()+ '-' +(checkOutDate?.getMonth() + 1)+ '-' +checkOutDate?.getDate()
        const responce = await axios.get(linkServe + ':1880/isAvailable?idRoom='+ roomId +'&CheckInDate='+sqlchindate+'&DepartureDate='+sqldepdate);
        setAvailable(responce.data)
        
        if(responce.data[0].Available == 1){
            Alert.alert("Внимание", "На выбранные даты номер занят")
            return
        }
        if(earlychin){
            if (responce.data[0].AvailableCheckIn == 1){
                Alert.alert("Внимание", "В выбранный вамми день ранний заезд невозможен")
                return
            }
        }
        if(lastchout || wlastchout){
            if (responce.data[0].AvailableCheckOut == 1){
                Alert.alert("Внимание", "В выбранный вамми день поздний выезд невозможен")
                return
            }
        }
        const ear = earlychin? 'y': 'n'
        const las = lastchout? 'y': wlastchout? 'w': 'n'
        const eat = withEat? 'y': 'n'
        const responce2 = await axios.get(linkServe + ':1880/booking?idRoom='+ roomId +'&idUser='+ user.id +'&CheckInDate='+sqlchindate+'&DepartureDate='+sqldepdate+'&EarlyCheckIn='+ ear +'&LateDeparture='+ las +'&Meal='+ eat +'&Peoples='+countPeop+'&TotalPrice='+totalPrice);
        setid(responce2.data.insertId)
        //Alert.alert("Успех", "Номер забронирован")
        router.navigate(`/oplata?idBooking=${responce2.data.insertId}`)
    }

    return(
        <ScrollView style={{backgroundColor: Colors.lightOrange,}}>
            <StatusBar style='dark' />
            <View style={BookingStyle.firstview}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={require('../assets/images/back.png')} style={{height:32, width:32}}/>
                </TouchableOpacity>
                <Text style={BookingStyle.glavtxt}>Бронирование номера</Text>
                <View style={{height:32, width:2}}/>
            </View>
            <View style={BookingStyle.main}>

                <View style={BookingStyle.filters}>

                    <View style={BookingStyle.datas}>

                        <Text style={BookingStyle.txt}>С</Text>

                        <TouchableOpacity style={BookingStyle.datePicker} onPress={() => showDatePicker('checkIn')}>
                            <Ionicons name="calendar" size={20} color={Colors.miniDarkGray} />
                            <Text style={{}}>
                                {checkInDate ? checkInDate.toLocaleDateString() : 'Заезд'}
                            </Text>
                        </TouchableOpacity>

                        <Text style={BookingStyle.txt}>  По</Text>

                        <TouchableOpacity style={BookingStyle.datePicker} onPress={() =>{
                                if (!checkInDate) {
                                    Alert.alert('Внимание', 'Сначала выберите дату заезда');
                                } else {
                                    showDatePicker('checkOut');
                                }}}>
                            <Ionicons name="calendar" size={20} color={Colors.miniDarkGray} />
                            <Text style={{}}>
                                {checkOutDate ? checkOutDate.toLocaleDateString() : 'Выезд'}
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <DateTimePickerModal isVisible={isDatePickerVisible} mode="date"
                    onConfirm={handleConfirm} onCancel={hideDatePicker} minimumDate={
                        selectedDateType === 'checkIn'
                            ? tomorrow
                            : checkInDate
                            ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
                            : tomorrow
                    }/>
                </View>

                <View style = {BookingStyle.options}>
                    <View style={BookingStyle.optionItem}>
                    <Text style={BookingStyle.optiontxt1}>Количество людей</Text>
                        <View style={BookingStyle.Container}>
                            <TouchableOpacity onPress={() => countPeop > 1 && setCountPeop(countPeop - 1)} style={BookingStyle.button}>
                                <Text style={BookingStyle.buttonText}>−</Text>
                            </TouchableOpacity>
                            <Text style={BookingStyle.Count}>{countPeop}</Text>
                            <TouchableOpacity onPress={() => countPeop < maxPeop && setCountPeop(countPeop + 1)} style={BookingStyle.button}>
                                <Text style={BookingStyle.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={BookingStyle.optionItem}>
                        <Text style={BookingStyle.optiontxt}>Питание (завтраки, обеды и ужины; швецкий стол)</Text>
                        <Switch value={withEat} onValueChange={() => setWithEat(!withEat)}
                            trackColor={{ false: Colors.gray, true: Colors.pinkoRed }} thumbColor={Colors.lightOrange}/>
                    </View>
                    
                    <View style={BookingStyle.optionItem}>
                        <Text style={BookingStyle.optiontxt}>Ранний заезд (до 14:00)</Text>
                        <Switch value={earlychin} onValueChange={() => setearlychin(!earlychin)}
                            trackColor={{ false: Colors.gray, true: Colors.pinkoRed }} thumbColor={Colors.lightOrange}/>
                    </View>
                    <View style={BookingStyle.optionItem}>
                        <Text style={BookingStyle.optiontxt}>Поздний выезд (после 12:00 до 18:00)</Text>
                        <Switch value={lastchout} onValueChange={() => handleLastChin()}
                            trackColor={{ false: Colors.gray, true: Colors.pinkoRed }} thumbColor={Colors.lightOrange}/>
                    </View>
                    <View style={BookingStyle.optionItem}>
                        <Text style={BookingStyle.optiontxt}>Поздний выезд (после 18:00)</Text>
                        <Switch value={wlastchout} onValueChange={() => handleWLastChin()}
                            trackColor={{ false: Colors.gray, true: Colors.pinkoRed }} thumbColor={Colors.lightOrange}/>
                    </View>
                </View>

                <View style = {BookingStyle.options}>
                    <Text style={BookingStyle.Sumtitle}>Итоговая стоимость:</Text>
                    {earlychin &&
                    <View style={BookingStyle.sumContainer}>
                        <Text style={BookingStyle.txt}>Ранний заезд:</Text>
                        <Text style={BookingStyle.txt}>{price} руб.</Text>
                    </View>}
                    {lastchout &&
                    <View style={BookingStyle.sumContainer}>
                        <Text style={BookingStyle.txt}>Поздний выезд:</Text>
                        <Text style={BookingStyle.txt}>{price/2} руб.</Text>
                    </View>}
                    {wlastchout &&
                    <View style={BookingStyle.sumContainer}>
                        <Text style={BookingStyle.txt}>Поздний выезд:</Text>
                        <Text style={BookingStyle.txt}>{price} руб.</Text>
                    </View>}
                    {withEat &&
                    <View style={BookingStyle.sumContainer}>
                        <Text style={[BookingStyle.txt, {alignSelf: 'flex-start'}]}>Питание:</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={BookingStyle.txt}></Text>
                            <View style={{alignItems:'flex-end'}}>
                                <Text style={BookingStyle.txt}>4500руб. x {countPeop}чел. = {4500*countPeop} руб.</Text>
                                <Text style={BookingStyle.txt}>за день </Text>
                            </View>
                        </View>
                    </View>}
                    <View style={BookingStyle.sumContainer}>
                        <Text style={[BookingStyle.txt, {alignSelf: 'flex-start'}]}>Цена номера:</Text>
                        <View style={{alignItems:'flex-end'}}>
                            <Text style={BookingStyle.txt}>{price} руб.</Text>
                            <Text style={BookingStyle.txt}>за день </Text>
                        </View>
                    </View>
                    {checkOutDate == null ?
                    <View style={BookingStyle.sumContainer}>
                        <Text style={BookingStyle.txt}>Выберите даты поездки!!!</Text>
                    </View>: 
                    <View style={BookingStyle.sumContainer}>
                        <Text style={BookingStyle.txt}>Дней: </Text>
                        <Text style={[BookingStyle.txt, {marginRight: 6}]}>{days} дн.</Text>
                    </View>}
                    {checkOutDate != null &&
                    <View style={BookingStyle.sumContainer}>
                        <Text style={BookingStyle.ttl}>Итог:</Text>
                        <Text style={BookingStyle.txt}>{totalPrice} рублей</Text>
                    </View>}
                </View>
                <Button text="Забронировать" onPress={() => bookingHandle()}/>
            </View>
        </ScrollView>
    );
}

const BookingStyle = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor: Colors.lightOrange,
        gap: 6,
        padding: 6
    },
    scroll : {
        backgroundColor: Colors.orangrGray,
    },
    filters: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 8,
        gap: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderRadius: 10
    },
    datas:{
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        marginLeft: 10
    },
    datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        gap: 4,
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
    txt: {
        fontSize: 16,
        color: Colors.darkGray,
    },
    ttl: {
        fontSize: 16,
        color: Colors.darkGray,
        fontWeight: "500"
    },
    options: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 12,
        gap:8
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    optiontxt: {
        width: '85%',
        fontSize: 16,
        color: Colors.darkGray,
    },
    optiontxt1: {
        width: '60%',
        fontSize: 16,
        color: Colors.darkGray,
    },
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        padding: 4,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: Colors.pinkoRed,
        borderRadius: 5,
      },
      buttonText: {
        color: Colors.white,
        fontSize: 16,
      },
      Count: {
        marginHorizontal: 14,
        fontSize: 16,
      },
      Sumtitle: {
        fontSize: 18,
        color: Colors.darkGray,
        fontWeight: 'bold',
      },
      sumContainer:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'
      }
})