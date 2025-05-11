import { Pressable, PressableProps, View, StyleSheet, Animated } from "react-native";
import { Colors } from '../consts/colors';
import { Ionicons } from '@expo/vector-icons';

export function FilterButton({...props}: PressableProps){

    const scaleValue = new Animated.Value(1);

    const startAnimation = () => {
        Animated.timing(scaleValue, {
        toValue: 0.90, 
        duration: 100,
        useNativeDriver: true, 
        }).start();
    };

    const resetAnimation = () => {
        Animated.timing(scaleValue, {
        toValue: 1, 
        duration: 200,
        useNativeDriver: true,
        }).start();
    };

    return(
        <Pressable onPressIn={startAnimation} onPressOut={resetAnimation} {...props}>
            <Animated.View style={[butStyle.view, {transform: [{ scale: scaleValue }]}]}>
                <Ionicons name="options" size={24} color={Colors.white}/>
            </Animated.View>
        </Pressable>
    );
}

const butStyle = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.pinkoRed,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    textst: {
        fontSize: 17, 
        color: Colors.white
    }
});