import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PostComponent }  from '../../components/post'; 
import { Colors } from '@/consts/colors';
import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { linkServe } from '@/consts/link';
import { Button } from '@/components/button';

export default function NewsScreen() {
    const [newsData, setNewsData] = useState([]);
    let intervalId: NodeJS.Timeout | null = null;

    const fetchNews = async () => {
        const response = await axios.get(linkServe + ':1880/news');
        setNewsData(response.data)
    };

    const startFetchingNews = (interval: number): void => {
        fetchNews();
        intervalId = setInterval(fetchNews, interval); 
    };

    const stopFetchingNews = (): void => {
        if (intervalId) {
            clearInterval(intervalId); 
            intervalId = null; 
        }
    };

    useEffect(() => {
        startFetchingNews(300000);
        return () => stopFetchingNews(); 
    }, []);

    return(
        <ScrollView style={NewsStyle.scroll}>
            <View style={NewsStyle.main}>
                <StatusBar style='dark' />
                {newsData.map((post, index) => (
                    <PostComponent
                        key={index}
                        PostText={post.Txt}
                        PostDate={post.PostDate}
                        withIMG={post.WithImg === 'y'}
                        imgName={post.FileName}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const NewsStyle = StyleSheet.create({
    main:{
        backgroundColor: Colors.orangrGray,
        flex: 1,
        gap: 4,
        padding: 4
    },
    scroll: {
        backgroundColor: Colors.orangrGray
    }
})