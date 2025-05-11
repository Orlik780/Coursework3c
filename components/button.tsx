import { Pressable, PressableProps, View, Text, StyleSheet, Animated } from "react-native";
import { Colors } from '../consts/colors';

export function Button({text, ...props}: PressableProps & {text: string}){

    const scaleValue = new Animated.Value(1);

    const startAnimation = () => {
        Animated.timing(scaleValue, {
        toValue: 0.95, 
        duration: 100,
        useNativeDriver: true, 
        }).start();
    };

    const resetAnimation = () => {
        Animated.timing(scaleValue, {
        toValue: 1, 
        duration: 250,
        useNativeDriver: true,
        }).start();
    };

    return(
        <Pressable onPressIn={startAnimation} onPressOut={resetAnimation} {...props}>
            <Animated.View style={[butStyle.view, {transform: [{ scale: scaleValue }]}]}>
                <Text style={butStyle.textst}> {text} </Text>
            </Animated.View>
        </Pressable>
    );
}

const butStyle = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 56, 
        borderRadius: 10,
        backgroundColor: Colors.pinkoRed
    },
    textst: {
        fontSize: 17, 
        color: Colors.white
    }
});