import React, { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { loginUser } from '../../api/request'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storeData } from '../../App'
import { Link } from '@react-navigation/native'

interface login {
    identifier: string
    password: string
}

export const AuthPage = ({ setToken, navigation }) => {
    const [loginData, setLoginData] = useState<login>({
        identifier: '',
        password: '',
    })

    const [loading, setLoading] = useState<boolean>(false)

    const submit = () => {
        setLoading(true)
        loginUser(loginData)
            .then((resp) => {
                console.log(resp)
                storeData(resp.data.jwt, setToken)
                setLoading(false)
                // setToken(resp.data.jwt) // Добавлено: сохраняем токен в состоянии
            })
            .catch((err) => console.log(err))
    }

    const change = (text: string, key: string) => {
        setLoginData((prev) => {
            return { ...prev, [key]: text }
        })
    }

    return (
        <SafeAreaView style={styles.form}>
            <Text>С возвращением в FreeWord</Text>
            <TextInput
                label="Логин"
                mode="outlined"
                onChangeText={(text) => change(text, 'identifier')}
                value={loginData.identifier}
                disabled={loading}
            />
            <TextInput
                label="Пароль"
                mode="outlined"
                onChangeText={(text) => change(text, 'password')}
                value={loginData.password}
                disabled={loading}
            />
            <Button mode="contained" onPress={submit} disabled={loading}>
                {loading ? (
                    <ActivityIndicator animating={true} size="small" color={'#fff'} />
                ) : (
                    'Войти'
                )}
            </Button>

            <Pressable onPress={() => navigation.navigate('register')}>
                <Text>Зарегистрироваться</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 15,
        gap: 15,
    },
})
