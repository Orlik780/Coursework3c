import {  StyleSheet, Pressable, View, Text, PressableProps, Animated } from "react-native";
import { Colors } from '../consts/colors';

export function ClickableText({text, ...props}: PressableProps & {text?: string}){

    const colorValue = new Animated.Value(0);

    const startAnimation = () => {
    Animated.timing(colorValue, {
        toValue: 1, 
        duration: 100, 
        useNativeDriver: false, 
    }).start();
    };

    const resetAnimation = () => {
    Animated.timing(colorValue, {
        toValue: 0, 
        duration: 400,
        useNativeDriver: false,
    }).start();
    };

    const textColor = colorValue.interpolate({
    inputRange: [0, 1], 
    outputRange: [Colors.white, Colors.blue], 
    });

    return(
        <Pressable style={clickTxtStyle.press} onPressIn={startAnimation} onPressOut={resetAnimation} {...props}>
          <View>
            <Animated.Text style={[clickTxtStyle.txt, { color: textColor }]}> {text} </Animated.Text>
          </View>
        </Pressable>
    );
}

const clickTxtStyle = StyleSheet.create({
    press: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 20
    },
    txt:{
        fontSize: 16
    }
});