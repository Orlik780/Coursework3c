import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { useState, useEffect } from "react";
import { linkServe } from '@/consts/link';
import { Colors } from "@/consts/colors";

export function PostComponent({PostText, PostDate, withIMG, imgName, ...props}: ViewProps & {PostText: string } &
     {PostDate: string} & {withIMG: boolean} & {imgName?: string}) {
    const widthIMG = Dimensions.get('window').width - 30;
    const [aspectRatio, setAspectRatio] = useState(0);

    const imageUrl = linkServe + ':8080/images/' + imgName;

    const date = new Date(PostDate); 

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0'); 
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    useEffect(() => {
        if (withIMG && imgName) {
            Image.getSize(imageUrl, (width, height) => {
                setAspectRatio(width / height);
            }, (error) => {
                console.error('Ошибка при получении размеров изображения:', error);
            });
        }
    }, [withIMG, imgName, imageUrl]);

    return(
        <View style={postStyle.main} {...props}>
            <Text style ={postStyle.datetxt}>{`${day}.${month}.${year}  ${hours}:${minutes}`}</Text>
            {withIMG &&
            (<Image source={{uri: imageUrl}} resizeMode='contain' style={{width: widthIMG,
                 borderRadius:5, height: widthIMG/aspectRatio}}/>)}
            <Text style ={postStyle.posttxt}>{PostText}</Text> 
        </View>
    );
}

const postStyle = StyleSheet.create({
    datetxt:{
        alignSelf: 'flex-start', 
        color: Colors.miniDarkGray, 
        fontSize: 14
    },
    posttxt: {
        alignSelf: 'flex-start',
        color: Colors.darkGray,
        fontSize: 16        
    },
    main:{
        backgroundColor: Colors.white,
        borderRadius: 10,
        alignItems: 'center',
        gap:10,
        padding:10
    }
});