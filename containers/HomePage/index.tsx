import axios from 'axios'
import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, ImageBackground, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const HomePage = ({ navigation }: any) => {
    const [data, setData] = useState({
        title: 'Аким John Doe проигнорировал заявку ',
        desc: 'Несколько дней назад, один человек пожаловался на замусоренный район, но Аким этого района John Doe решил проигнорировать это',
        fullDesc:
            'Много людей были недовольны тем что им приходится ходить по таким грязным улицам, но John Doe это не интересовало. Ему лишь бы заработать денег',
    })
    const onClick = () => {
        navigation.navigate('FullPost', { data })
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onClick}>
                <View style={styles.cont}>
                    <ImageBackground
                        source={{
                            uri: 'https://s7d1.scene7.com/is/image/scom/PFG_default_pass_scaled?$900p$',
                        }}
                        style={styles.imageBackground}
                    >
                        <View style={styles.overlay}>
                            <Text style={styles.title}>{data.title}</Text>
                            <Text style={styles.desc}>{data.desc}</Text>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    imageBackground: {
        width: 360,
        height: 240,
        resizeMode: 'cover',
        overflow: 'hidden',
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        marginBottom: 25,
        color: 'white',
    },
    desc: {
        fontSize: 18,
        marginBottom: 25,
        color: 'white',
    },
    cont: {
        shadowColor: 'black',
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 12,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 8,
        padding: 20,
    },
    container: {
        padding: 25,
    },
})
