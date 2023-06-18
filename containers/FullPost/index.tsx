import React, { useEffect, useState } from 'react'
import { View, ScrollView, ImageBackground, StyleSheet, Text } from 'react-native'
import { Card } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5'

const FullPost = ({ route }: any) => {
    const [data, setData] = useState(route.params.data)

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.title}>{data.title}</Text>
                    <View style={styles.wrap}>
                        <View style={styles.iconContainer}>
                            <Icon name="calendar" size={18} color={'#4f4f50'} />
                            <Text style={styles.iconText}>17.04.2022</Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <Icon name="eye" size={18} color={'#4f4f50'} />
                            <Text style={styles.iconText}>999</Text>
                        </View>
                    </View>
                    <Text style={styles.fullDesc}>{data.desc2}</Text>
                </Card.Content>
                <View style={styles.cont}>
                    <ImageBackground
                        source={{ uri: data.poster }}
                        style={styles.imageBackground}
                    ></ImageBackground>
                </View>
                <Card.Content>
                    <Text style={styles.title}>Подробнее</Text>
                    <View style={styles.wrap}>
                        <Text style={styles.fullDesc}>{data.fullDesc}</Text>
                    </View>
                </Card.Content>
            </Card>
            <Card style={styles.commentCard}>
                <Card.Content>
                    <Text style={styles.commentTitle}>Комментарии</Text>
                    <Text style={styles.commentText}>Да, эти улицы просто ужасны.</Text>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 10,
    },
    card: {
        width: '95%',
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 4,
        marginBottom: 20,
    },
    cont: {
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    imageBackground: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 8,
        overflow: 'hidden',
    },
    title: {
        fontSize: 24,
    },
    title2: {
        fontSize: 25,
        marginBottom: 25,
        color: 'white',
    },
    desc: {
        fontSize: 18,
        marginBottom: 25,
        color: 'white',
    },
    wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    iconText: {
        marginLeft: 5,
        color: '#4f4f50',
    },
    fullDesc: {
        fontSize: 16,
        marginTop: 10,
    },
    commentCard: {
        width: '95%',
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 4,
    },
    commentTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentText: {
        fontSize: 16,
    },
})

export default FullPost
