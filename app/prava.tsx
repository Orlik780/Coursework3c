import{ Dimensions, ScrollView, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Button } from '@/components/button';
import { useRouter } from 'expo-router';
import { Colors } from '@/consts/colors';

export default function Prava() {
    const router = useRouter();
    const w = Dimensions.get('screen').width;
    return(
        <ScrollView style={{backgroundColor: Colors.lightOrange, width: w}}>
        <View style={styles.main}>
            <View style={[styles.verhStr, {width: w}]}>
                <Pressable style={{marginLeft: 10}} onPress={() => router.back()}>
                    <Image source={require('../assets/images/back.png')} style={{height:32, width:32}}/>
                </Pressable>
                <Image source={require('../assets/images/Hotel-Cocktail.png')} resizeMode='contain' style={{height: 32, width:120}}/>
                <View style={{width:'10%'}}/>
            </View>

            <View style={[styles.Container2, {width: w-10}]}>
                <Text style={styles.Title}>Условия бронирования:</Text>
                <Text style={styles.Description}>В случае отмены или изменения бронирования уплаченные средства не возвращаются.</Text>
                <Text style={styles.Title}>Условия оплаты:</Text>
                <Text style={styles.Description}>Оплата происходит в момент бронирования.</Text>
            </View>

            <View style={[styles.Container2, {width: w-10}]}>
                <Text style={styles.Title}>Правила отеля</Text>
                <Text style={styles.RulesTitle}>Заезд и выезд:</Text>
                <Text style={styles.RulesDescription}>Заезд с 14:00. Выезд до 12:00.</Text>
                <Text style={styles.RulesDescription}>- Гарантированный ранний заезд предоставляется за дополнительную плату в размере 100% стоимости предыдущих суток по полной предоплате.</Text>
                
                <Text style={styles.RulesDescription}>- Негарантированный ранний заезд возможен при наличии свободных номеров – услуга негарантированная, о возможности можно узнать в день заезда.</Text>
                <Text style={styles.RulesDescription}>- Поздний выезд до 18:00 предоставляется за дополнительную плату в размере 50% стоимости следующих суток.</Text>
                <Text style={styles.RulesDescription}>- Поздний выезд после 18:00 предоставляется за дополнительную плату в размере 100% стоимости следующих суток.</Text>
                <Text style={styles.RulesTitle}>Стойка регистрации:</Text>
                <Text style={styles.RulesDescription}>Круглосуточная стойка регистрации.</Text>
                <Text style={styles.RulesTitle}>Запрещено:</Text>
                <Text style={styles.RulesDescription}>- Проживание с животными запрещено.</Text>
                <Text style={styles.RulesDescription}>- Запрещено курить вне специально отведенных для беседках для курения.</Text>
                <Text style={styles.RulesDescription}>- Запрещено шуметь в позднее время(после 22:00).</Text>
                <Text style={styles.RulesDescription}>- Запрещено выносить еду из ресторана</Text>
                <Text style={styles.RulesDescription}>- Запрещено использовать пляжную одежду вне зоны бассейна(лобби, ресторан).</Text>
                <Text style={styles.RulesDescription}>- Запрещено перемещать мебель в номерах.</Text>
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
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
    Container2: {
        alignItems: 'flex-start',
        backgroundColor:Colors.white,
        borderRadius:10,
        padding: 14
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
    }
})