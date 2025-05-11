import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RoomPreCard } from '../../components/roomprecart'
import { Colors } from '@/consts/colors';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { linkServe } from '@/consts/link';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FilterButton } from '@/components/filterbutton';

type DateType = 'checkIn' | 'checkOut' | null;

export default function Numbers() {
    const params = useLocalSearchParams();
    const type = params.type
    const minprice = params.minprice
    const maxprice = params.maxprice
    const bedscount = params.bedscount
    const minsize = params.minsize
    const maxsize = params.maxsize
    const conditioner = params.conditioner
    const hairdryer = params.hairdryer
    const refrigerator = params.refrigerator
    const telephone = params.telephone
    const TV = params.TV
    const Iron = params.Iron
    const kekInDate = params.CheckInDate
    const DepartureDate = params.DepartureDate

    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
    const [selectedDateType, setSelectedDateType] = useState<DateType>(null);
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [roomsID, setRoomsID] = useState([]);
    const router = useRouter();

    let lin = linkServe + ':1880/getFiltredRoomsID?'
    let notFirst = false

    const today = new Date();
    const tomorrow = new Date(today);
    const plusyear = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    plusyear.setDate(today.getDate() + 365);

    const fetchRooms = async () => {
        if (type != null){
            if (notFirst) {
                lin += '&'
            }else{
                notFirst = true
            }
            lin += 'type=' + type
        }
        if (minprice != null){
            if (notFirst) {
                lin += '&'
            }else{
                notFirst = true
            }
            lin += `minprice=${minprice}&maxprice=${maxprice}`
        }
        if (bedscount != null){
            if (notFirst) {
                lin += '&'
            }else{
                notFirst = true
            }
            lin += `bedscount=${bedscount}`
        }
        if (minsize != null){
            if (notFirst) {
                lin += '&'
            }else{
                notFirst = true
            }
            lin += `minsize=${minsize}&maxsize=${maxsize}`
        }
        if (conditioner != null){
            if (notFirst) {
                lin += '&'
            }else{
                notFirst = true
            }
            lin += `conditioner=${conditioner}&hairdryer=${hairdryer}&refrigerator=${refrigerator}&telephone=${telephone}&TV=${TV}&Iron=${Iron}`
        }
        if (DepartureDate != 'null' && DepartureDate != null) {
            const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
            const match = kekInDate.match(dateRegex);
            const day = parseInt(match[1], 10);
            const month = parseInt(match[2], 10) - 1;
            const year = parseInt(match[3], 10);
            setCheckInDate(new Date(year, month, day))
            const match1 = DepartureDate.match(dateRegex);
            const day1 = parseInt(match1[1], 10);
            const month1 = parseInt(match1[2], 10) - 1;
            const year1 = parseInt(match1[3], 10);
            setCheckOutDate(new Date(year1, month1, day1))
            if (notFirst) {
                lin += '&'
            }else{
                notFirst = true
            } 
            lin += `CheckInDate=${kekInDate?.slice(6,10)}-${kekInDate?.slice(3,5)}-${kekInDate?.slice(0,2)}&DepartureDate=${DepartureDate?.slice(6,10)}-${DepartureDate?.slice(3,5)}-${DepartureDate?.slice(0,2)}`
        }
        const response = await axios.get(lin);
        setRoomsID(response.data)
    };

    useEffect(() => {
        fetchRooms();
    }, []);

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

    return(
        <View style={NumbersStyle.main}>
            <View style={NumbersStyle.filters}>
                <View style={NumbersStyle.datas}>

                    <TouchableOpacity style={NumbersStyle.datePicker} onPress={() => showDatePicker('checkIn')}>
                        <Ionicons name="calendar" size={20} color={Colors.miniDarkGray} />
                        <Text style={{}}>
                            {checkInDate ? checkInDate.toLocaleDateString() : 'Заезд'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={NumbersStyle.datePicker} onPress={() =>{
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

                <FilterButton onPress={() => router.navigate(`/filters?checkInDate=${checkInDate?.toLocaleDateString() || 'null'}&checkOutDate=${checkOutDate?.toLocaleDateString() || 'null'}`)}/>

                <DateTimePickerModal isVisible={isDatePickerVisible} mode="date"
                onConfirm={handleConfirm} onCancel={hideDatePicker} minimumDate={
                    selectedDateType === 'checkIn'
                        ? tomorrow
                        : checkInDate
                        ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
                        : tomorrow
                }
                maximumDate={
                    selectedDateType === 'checkIn' && checkOutDate
                    ? new Date(checkOutDate.getTime() - 24 * 60 * 60 * 1000)
                    : plusyear
                    }/>

            </View>

            <ScrollView style={NumbersStyle.scroll}>
                <View style={NumbersStyle.numbers}>
                    <StatusBar style='dark' />
                    {
                        roomsID.map((room, index) => (
                            <RoomPreCard key={index} onPress={() => router.push(`/roomcart?roomId=${room.id}&checkInDate=${checkInDate?.toLocaleDateString() || 'null'}&checkOutDate=${checkOutDate?.toLocaleDateString() || 'null'}`)} roomId={room.id}/>
                        ))
                    }
                    
                </View>
            </ScrollView>

        </View>
    );
}

const NumbersStyle = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor: Colors.orangrGray,
    },
    scroll : {
        backgroundColor: Colors.orangrGray,
    },
    filters: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 8,
        gap: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
    },
    datas:{
        flexDirection: 'row',
        gap: 8,
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
    filterButtonText: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.pinkoRed,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    numbers:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        padding: 4,
        backgroundColor: Colors.orangrGray
    }
})