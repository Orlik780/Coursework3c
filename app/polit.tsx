import{ StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/button';
import { useRouter } from 'expo-router';
import { Colors } from '@/consts/colors';

export default function Polit() {
    const router = useRouter();
    return(
        <View style={styles.main}>
            <Text style={styles.txt}>Ми не знать чо эт у нас такого нет</Text>
            <Button text='назад' onPress={router.back}/>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingHorizontal: 14
    },
    txt: {
        fontSize: 52,
        alignSelf: 'center'
    }
})