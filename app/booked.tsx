import { StyleSheet, Text, ScrollView, View, Pressable, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RoomPreCard } from '../components/roomprecart'
import { Colors } from '@/consts/colors';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { linkServe } from '@/consts/link';
import { useRouter, useFocusEffect} from 'expo-router';
import { user } from '@/consts/user';
import { BookedCart } from '@/components/bookedcart';

export default function BookedRooms() {
    const [bookedID, setBookedID] = useState([]);
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            fetchBooking();
        }, [])
    );

    useEffect(() => {
        fetchBooking();
    }, []);

    const fetchBooking = async () => {
        const response = await axios.get(linkServe + ":1880/getBooked?idUser="+ user.id);
        setBookedID(response.data)
    }

    return(
        <View style={styles.main}>
            <View style={styles.filters}>
                <Pressable style={{marginLeft: 10}} onPress={() => router.back()}>
                    <Image source={require('../assets/images/back.png')} style={{height:32, width:32}}/>
                </Pressable>
                <Text style={styles.Label} >Забронированные номера</Text>
                <View style={{width:26}}/>
            </View>

            <ScrollView style={styles.scroll}>
                <View style={styles.numbers}>
                    <StatusBar style='dark' />
                    {
                        bookedID.map((bookingid, index) => (
                                <BookedCart key={index} bookingId={bookingid.id} roomId={bookingid.idRoom}/>
                        ))
                    }
                </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
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
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        height: 94
    },
    numbers:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        padding: 4,
        backgroundColor: Colors.orangrGray
    },
    Label:{
        marginBottom: 4,
        fontSize: 20,
        color: Colors.darkNight,
        fontWeight: '500'
    }
})