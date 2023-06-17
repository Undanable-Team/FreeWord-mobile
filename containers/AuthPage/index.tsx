import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { loginUser } from '../../api/request'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storeData } from '../../App'

export const AuthPage = () => {
    const [loginData, setLoginData] = useState<{ identifier: string; password: string }>({
        identifier: '',
        password: '',
    })

    const submit = () => {
        loginUser(loginData)
            .then((resp) => {
                console.log(resp)
                storeData(resp.data.jwt)
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
            <TextInput
                label="Логин"
                mode="outlined"
                onChangeText={(text) => change(text, 'identifier')}
                value={loginData.identifier}
            />
            <TextInput
                label="Пароль"
                mode="outlined"
                onChangeText={(text) => change(text, 'password')}
                value={loginData.password}
            />
            <Button mode="contained" onPress={submit}>
                Войти
            </Button>
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
