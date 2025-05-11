import { StyleSheet, Text, ScrollView, View, Pressable, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RoomPreCard } from '../components/roomprecart'
import { Colors } from '@/consts/colors';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { linkServe } from '@/consts/link';
import { useRouter, useFocusEffect} from 'expo-router';
import { user } from '@/consts/user';

export default function SavedRooms() {
    const [roomsID, setRoomsID] = useState([]);
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            fetchRooms();
        }, [])
    );

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        const response = await axios.get(linkServe + ":1880/getSaved?idUser="+ user.id);
        setRoomsID(response.data)
    }

    return(
        <View style={styles.main}>
            <View style={styles.filters}>
                <Pressable style={{marginLeft: 10}} onPress={() => router.back()}>
                    <Image source={require('../assets/images/back.png')} style={{height:32, width:32}}/>
                </Pressable>
                <Text style={styles.Label} >Отложенные номера</Text>
                <View style={{width:26}}/>
            </View>

            <ScrollView style={styles.scroll}>
                <View style={styles.numbers}>
                    <StatusBar style='dark' />
                    {
                        roomsID.map((room, index) => (
                            <RoomPreCard key={index} onPress={() => router.push(`/roomcart?roomId=${room.id}`)} roomId={room.id}/>
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