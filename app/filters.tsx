import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Image, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { Colors } from '@/consts/colors';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/button';
import { linkServe } from '@/consts/link';

interface AmenitiesState {
  "Кондиционер": boolean;
  "Фен": boolean;
  "Холодильник": boolean;
  "Телефон": boolean;
  "Телевизор": boolean;
  "Средства глажки": boolean;
}

const FiltersPage: React.FC = () => {
  const params = useLocalSearchParams();
  const checkInDate = params.checkInDate
  const checkOutDate = params.checkOutDate
  const router = useRouter();
  const [withType, setWithType] = useState<boolean>(false);
  const [withCount , setWithCount] = useState<boolean>(false);
  const [withPrice, setWithPrice] = useState<boolean>(false);
  const [withSize, setWithSize] = useState<boolean>(false);
  const [withUd, setWithUd] = useState<boolean>(false);
  const [roomType, setRoomType] = useState<string>('Стандарт');
  const [priceRange, setPriceRange] = useState<[number, number]>([3000, 20000]);
  const [areaRange, setAreaRange] = useState<[number, number]>([20, 120]);
  const [beds, setBeds] = useState<number>(1);
  const [amenities, setAmenities] = useState<AmenitiesState>({
    "Кондиционер": false,
    "Фен": false,
    "Холодильник": false,
    "Телефон": false,
    "Телевизор": false,
    "Средства глажки": false,
  });

  const toggleAmenity = (key: keyof AmenitiesState) => {
    setAmenities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  
  const useFilters = async () => {
    const queryParams: string[] = [];

    if(withType){
        queryParams.push(`type=${encodeURIComponent(roomType)}`);
    }

    if (withPrice) {
        queryParams.push(`minprice=${priceRange[0]}&maxprice=${priceRange[1]}`);
    }

    if (withCount){
        queryParams.push(`bedscount=${beds}`);
    }
  
    if (withSize) {
        queryParams.push(`minsize=${areaRange[0]}&maxsize=${areaRange[1]}`);
    }

    if (withUd){
        const amenitiesMapping: Record<string, string> = {
            "Кондиционер": "conditioner",
            "Фен": "hairdryer",
            "Холодильник": "refrigerator",
            "Телефон": "telephone",
            "Телевизор": "TV",
            "Средства глажки": "Iron",
          };
        
          for (const [key, value] of Object.entries(amenities)) {
            const paramKey = amenitiesMapping[key];
            queryParams.push(`${paramKey}=${value ? 'y' : 'n'}`);
          }
    }

    if (checkOutDate != 'null') {
      queryParams.push(`CheckInDate=${checkInDate}&DepartureDate=${checkOutDate}`);
    }

    const queryString = queryParams.join('&');

    router.push(`/(tabs)/numbers?${queryString}`);
  };

  return (
    <ScrollView style={styles.container}>
        <View style={{height: 60, justifyContent: 'flex-end'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => router.navigate('/(tabs)/numbers')}>
                <Image source={require('../assets/images/back.png')} style={{height:32, width:32}}/>
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.label1}>Фильтры</Text>
            </View>
            <View style={{width: 32}}/>
        </View>
        </View>

      <View style={styles.filterSectionSecond}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.label}>Тип номера:</Text>
            <Switch value={withType} onValueChange={() => setWithType(!withType)}
                trackColor={{ false: Colors.gray, true: Colors.pinkoRed }} thumbColor={Colors.lightOrange}/>
        </View>
        
        <Picker selectedValue={roomType} onValueChange={(itemValue: string) => setRoomType(itemValue)} style={styles.picker}>
          <Picker.Item label="Стандарт" value="Стандарт" />
          <Picker.Item label="Комфорт" value="Комфорт" />
          <Picker.Item label="Люкс" value="Люкс" />
        </Picker>
      </View>

      <View style={styles.filterSectionSecond}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.label}>Число спальных мест:</Text>
            <Switch value={withCount} onValueChange={() => setWithCount(!withCount)}
                trackColor={{ false: Colors.gray, true: Colors.pinkoRed }} thumbColor={Colors.lightOrange}/>
        </View>

        <View style={styles.Container}>
          <TouchableOpacity onPress={() => beds > 1 && setBeds(beds - 1)} style={styles.button}>
            <Text style={styles.buttonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.Count}>{beds}</Text>
          <TouchableOpacity onPress={() => beds < 6 && setBeds(beds + 1)} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filterSectionSecond}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.label}>Стоимость номера:</Text>
            <Switch value={withPrice} onValueChange={() => setWithPrice(!withPrice)}
                trackColor={{ false: Colors.gray, true: Colors.pinkoRed }} thumbColor={Colors.lightOrange}/>
        </View>


        <View style={styles.sumContainer}>

            <View style={{flexDirection: 'row', gap: 40, alignItems: 'center'}}>
                <Text style={styles.checkboxLabel}>От:</Text>
                <View style={styles.Container}>
                    <TouchableOpacity onPress={() => priceRange[0] > 3000 && setPriceRange([priceRange[0] - 500, priceRange[1]])} style={styles.button}>
                        <Text style={styles.buttonText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.Count}>{priceRange[0]} руб/сутки</Text>
                    <TouchableOpacity onPress={() => priceRange[0] < 20000 && setPriceRange([priceRange[0] + 500, priceRange[1]])} style={styles.button}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{flexDirection: 'row', gap: 40, alignItems: 'center'}}>
                <Text style={styles.checkboxLabel}>До:</Text>
                <View style={styles.Container}>
                    <TouchableOpacity onPress={() => priceRange[1] > 3000 && setPriceRange([priceRange[0], priceRange[1] - 500])} style={styles.button}>
                        <Text style={styles.buttonText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.Count}>{priceRange[1]} руб/сутки</Text>
                    <TouchableOpacity onPress={() => priceRange[1] < 20000 && setPriceRange([priceRange[0], priceRange[1] + 500])} style={styles.button}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
      </View>

      <View style={styles.filterSectionSecond}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.label}>Площадь:</Text>
            <Switch value={withSize} onValueChange={() => setWithSize(!withSize)}
                trackColor={{ false: Colors.gray, true: Colors.pinkoRed }} thumbColor={Colors.lightOrange}/>
        </View>

        <View style={styles.sumContainer}>

            <View style={{flexDirection: 'row', gap: 40, alignItems: 'center'}}>
                <Text style={styles.checkboxLabel}>От:</Text>
                <View style={styles.Container}>
                    <TouchableOpacity onPress={() => areaRange[0] > 20 && setAreaRange([areaRange[0] - 10, areaRange[1]])} style={styles.button}>
                        <Text style={styles.buttonText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.Count}>{areaRange[0]} м²</Text>
                    <TouchableOpacity onPress={() => areaRange[0] < 120 && setAreaRange([areaRange[0] + 10, areaRange[1]])} style={styles.button}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{flexDirection: 'row', gap: 40, alignItems: 'center'}}>
                <Text style={styles.checkboxLabel}>До:</Text>
                <View style={styles.Container}>
                    <TouchableOpacity onPress={() => areaRange[1] > 20 && setAreaRange([areaRange[0], areaRange[1] - 10])} style={styles.button}>
                        <Text style={styles.buttonText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.Count}>{areaRange[1]} м²</Text>
                    <TouchableOpacity onPress={() => areaRange[1] < 120 && setAreaRange([areaRange[0], areaRange[1] + 10])} style={styles.button}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
      </View>

      <View style={styles.filterSectionSecond}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.label}>Удобства в номере:</Text>
            <Switch value={withUd} onValueChange={() => setWithUd(!withUd)}
                trackColor={{ false: Colors.gray, true: Colors.pinkoRed }} thumbColor={Colors.lightOrange}/>
        </View>
        
        <View style={styles.checkboxContainer}>
          {Object.keys(amenities).map((key) => (
            <TouchableOpacity key={key} onPress={() => toggleAmenity(key as keyof AmenitiesState)} style={styles.checkboxWrapper}>
              <Text style={styles.checkboxLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
              <Switch value={amenities[key as keyof AmenitiesState]} onValueChange={() => toggleAmenity(key as keyof AmenitiesState)}
                trackColor={{ false: Colors.gray, true: Colors.pinkoRed }} thumbColor={Colors.lightOrange}/>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Button text='Применить' style={{marginBottom: 30}} onPress={() => useFilters()}/>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  filterSectionFirst: {
    gap: 10,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filterSectionSecond: {
    gap: 10,
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkNight
  },
  label1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.darkNight
  },
  picker: {
    height: 52,
    width: 200,
    fontSize: 16,
    color: Colors.darkGray
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
  sumContainer: {
    gap: 10,
    alignItems: 'center',
  },
  checkboxContainer: {

  },
  checkboxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 16,
    color: Colors.darkGray
  },
});

export default FiltersPage;