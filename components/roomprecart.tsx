import React, { useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable, PressableProps} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/consts/colors';
import axios from 'axios';
import { linkServe } from '@/consts/link';

export function RoomPreCard({roomId, ...props} : PressableProps & {roomId: number}) {
  const [roomData, setRoomData] = useState([{"RoomType":"Люкс","Price":1,"RoomSize":1,"BedCount":1}]);
  const [roomDops, setRoomDops] = useState([{"conditioner":"y","hairdryer":"y","refrigerator":"y","telephone":"y","TV":"y","Iron":"n"}]);
  const [roomUrl, setRoomUrl] = useState([{"URL":"lol.png"}]);
  const [countStars, setCountStars] = useState(3);

  const fetchRoomData = async () => {
    const response = await axios.get(linkServe + ':1880/getRoomData?id=' + roomId);
    setRoomData(response.data)
  };

  const fetchRoomDops = async () => {
    const response = await axios.get(linkServe + ':1880/getRoomDops?id=' + roomId);
    setRoomDops(response.data)
  };

  const fetchImg = async () => {
    const response = await axios.get(linkServe + ':1880/getRoomMainIMG?id=' + roomId);
    setRoomUrl(response.data)
  };

  useEffect(() => {
    fetchRoomData();
  }, []);

  useEffect(() => {
    fetchRoomDops();
  }, []);

  useEffect(() => {
    fetchImg();
  }, []);

  useEffect(() => {
    if (roomData[0].RoomType === 'Люкс') {
      setCountStars(5);
    } else if (roomData[0].RoomType === 'Комфорт') {
      setCountStars(4);
    } else {
      setCountStars(3);
    }
  }, [roomData]);

  const { width } = Dimensions.get('window'); 
  return (
    <Pressable style={[styles.card, { width: width - 10}]} {...props}>
      <View style={styles.typeView}>
        <Text style={styles.roomType}>{roomData[0].RoomType}</Text>
        <View style = {styles.starsContainer}>
          {Array(countStars).fill(null).map((_, index) => (
            <Ionicons key={index} name="star" size={20} color={Colors.yellow}/>
          ))}
          {Array(5 - countStars).fill(null).map((_, index) => (
            <Ionicons key={index} name="star" size={20} color={Colors.ligthgray}/>
          ))}
        </View>
      </View>
      <View style={styles.topSection}>
        <Image source={{ uri: linkServe + ':8080/images/' + roomUrl[0].URL }} style={styles.roomImage} />
        <View style={styles.infoContainer}>
          
          <View>
            <Text style={styles.price}>{roomData[0].Price}</Text>
            <Text style={styles.pricetext}>руб/сутки</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>{roomData[0].RoomSize} м²</Text>
            <View style={styles.capacity}>
              <Ionicons name="person" size={18} color="#555" />
              <Text style={styles.detailText}>{roomData[0].BedCount}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.iconsContainer}>
        <Image source={require('../assets/images/conditioner.png')} style={[styles.icos, {backgroundColor: roomDops[0].conditioner === 'y' ? '#cff0ca': '#fbe1e3'}]} />
        <Image source={require('../assets/images/hairdryer.png')} style={[styles.icos, {backgroundColor: roomDops[0].hairdryer === 'y' ? '#cff0ca': '#fbe1e3'}]} />
        <Image source={require('../assets/images/refrigerator.png')} style={[styles.icos, {backgroundColor: roomDops[0].refrigerator === 'y' ? '#cff0ca': '#fbe1e3'}]} />
        <Image source={require('../assets/images/telephone.png')} style={[styles.icos, {backgroundColor: roomDops[0].telephone === 'y' ? '#cff0ca': '#fbe1e3'}]} />
        <Image source={require('../assets/images/tv-screen.png')} style={[styles.icos, {backgroundColor: roomDops[0].TV === 'y' ? '#cff0ca': '#fbe1e3'}]} />
        <Image source={require('../assets/images/iron.png')} style={[styles.icos, {backgroundColor: roomDops[0].Iron === 'y' ? '#cff0ca': '#fbe1e3'}]} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  typeView: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 4,
    alignItems: 'center'
  },
  starsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  roomImage: {
    width: '72%',
    aspectRatio: 16 / 9,
    borderRadius: 7,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  roomType: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black
  },
  price: {
    fontSize: 18,
    color: Colors.darkNight,
  },
  pricetext: {
    fontSize: 16,
    color: Colors.darkNight,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: Colors.darkGray,
  },
  capacity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  icos: { 
    width: 34, 
    height: 34,
    borderRadius:10
  }
});