import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

interface register {
    firstname: string
    lastname: string
    email: string
    password: string
}

export const RegisterPage = ({ navigation }) => {
    const [registerData, setRegisterData] = useState<register>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    })
    const [regStatus, setRegStatus] = useState<boolean>(false)

    const change = (text: string, key: string) => {
        setRegisterData((prev) => {
            return { ...prev, [key]: text }
        })
    }
    return (
        <SafeAreaView style={styles.form}>
            <TextInput
                label="Имя"
                mode="outlined"
                onChangeText={(text) => change(text, 'firstname')}
                value={registerData.firstname}
            />
            <TextInput
                label="Фамилия"
                mode="outlined"
                onChangeText={(text) => change(text, 'lastname')}
                value={registerData.password}
            />
            <TextInput
                label="Эл.почта"
                mode="outlined"
                onChangeText={(text) => change(text, 'email')}
                value={registerData.password}
            />
            <TextInput
                label="Пароль"
                mode="outlined"
                onChangeText={(text) => change(text, 'password')}
                value={registerData.password}
            />
            <Button mode="contained" onPress={submit} disabled={regStatus}>
                Зарегистрироваться
            </Button>

            <Pressable onPress={() => navigation.navigate('auth')}>
                <Text>Авторизоваться</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    form: {
        gap: 10,
        padding: 15,
    },
})
