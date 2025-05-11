import { Pressable, StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { Colors } from "../consts/colors";
import { useState } from "react";
import Visible from "./ui/visible";
import NotVisible from "./ui/notvisible";


export function Input ({isPassword, ...props}: TextInputProps & {isPassword?: boolean}){
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    return(
        <View style={inputStyle.wiew}>
            <TextInput style={inputStyle.input} placeholderTextColor={Colors.gray} 
            secureTextEntry={isPassword && !isPasswordVisible} {...props}/>
            {isPassword &&
            <Pressable onPress={() => setIsPasswordVisible(state => !state)} style={inputStyle.prs}>
                {isPasswordVisible ? <Visible /> : <NotVisible />} 
            </Pressable>}
        </View>
    );
}

const inputStyle = StyleSheet.create({
    input: {
        height: 56,
        backgroundColor: Colors.lightOrange,
        paddingHorizontal: 24,
        borderRadius: 10,
        fontSize: 16
    },
    prs:{
        position: 'absolute',
        right: 20
    },
    wiew:{
        justifyContent: 'center'
    }
});