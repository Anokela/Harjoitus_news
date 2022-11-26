import { Image, View, Text, StyleSheet, ActivityIndicator, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';

const API_KEY = '833542157dcd49b9b8954096accb43d0';
const URL = 'https://newsapi.org/v2';

export default function News({navigation}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const criteria = 'top-headlines?country=us&category=general'
        const address = URL + '/' + criteria + '&apikey=' + API_KEY;
        fetch(address)
            .then(res => res.json())
            .then(
                (result) => {
                    setError(null);
                    setIsLoaded(true);
                    setItems(result.articles);
                }, (error) => {
                    setError(error);
                    setIsLoaded(true);
                    setItems([]);
                }
            )
    
    }, [])
    


    if (error) {
        return (
            <View style={styles.container}>
                <Text>{error.message}</Text>
            </View>
        )
    }
    else if (!isLoaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {items.map(item => (
                        <Pressable key={item.title} onPress={() => navigation.navigate('Details',{news: item})}>
                            <View style={styles.news} >
                                <Text style={styles.title}>{item.title}</Text>
                                <View style={styles.imgWrapper}>
                                    <Image
                                        style={styles.thumbnail}
                                        source={{
                                            uri: item.urlToImage,
                                        }}
                                    />
                                </View>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    news: {
        padding: 20,
        alignItems: 'stretch',
        borderTopWidth: 2,
        borderTopColor: '#333',
    },
    imgWrapper: {
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 20,
        margin: 0,
        padding: 0,
    },
    thumbnail: {
        width: 250,
        height: 250,
    }
});