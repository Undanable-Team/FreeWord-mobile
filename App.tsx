// App.tsx

import { HomePage } from './containers/HomePage/index'
import { StyleSheet, Text, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { PersonalCabinet } from './containers/PersonalCabinet'
import { createStackNavigator } from '@react-navigation/stack'
import { PaperProvider } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { AddReportPage } from './containers/AddReportPage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { AuthPage } from './containers/AuthPage'
import FullPost from './containers/FullPost'
import { RegisterPage } from './containers/RegisterPage'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const Home = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePage} options={{ headerTitle: 'FreeWord' }} />
            <Stack.Screen
                name="FullPost"
                component={FullPost}
                options={{ headerTitle: 'FreeWord' }}
            />
        </Stack.Navigator>
    )
}

export const storeData = async (value: string, updateToken) => {
    try {
        await AsyncStorage.setItem('@jwt_token', value)
        updateToken(value)
    } catch (e) {
        console.log(e) // Обработка ошибок сохранения
    }
}

export const removeToken = async (updateToken) => {
    // Передаем функцию updateToken
    try {
        await AsyncStorage.removeItem('@jwt_token')
        updateToken(null) // Вызываем функцию updateToken с аргументом null для обновления токена в App
    } catch (e) {
        console.log(e) // Обработка ошибок удаления
    }
}

export const getToken = async (): Promise<any> => {
    try {
        const value = await AsyncStorage.getItem('@jwt_token')
        if (value) {
            return value
        }
    } catch (error) {
        console.log(error)
    }
}

const App = () => {
    const [token, setToken] = useState<string | undefined>()

    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('@jwt_token')
                if (value) {
                    setToken(value)
                } else {
                    setToken(null)
                }
            } catch (e) {
                console.log(e) // Обработка ошибок чтения
            }
        }

        getData()
    }, [])

    if (token) {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Главная"
                        component={Home}
                        options={{
                            headerShown: false,
                            tabBarIcon: (tabInfo) => {
                                return (
                                    <Icon
                                        name="home"
                                        size={24}
                                        color={tabInfo.focused ? '#006600' : '#8e8e93'}
                                    />
                                )
                            },
                        }}
                    />
                    <Tab.Screen
                        name="AddReportPage"
                        component={AddReportPage}
                        options={{
                            headerShown: false,
                            tabBarIcon: (tabInfo) => {
                                return (
                                    <Icon
                                        name="plus-circle"
                                        size={28}
                                        style={{ position: 'absolute' }}
                                        color={tabInfo.focused ? '#006600' : '#8e8e93'}
                                    />
                                )
                            },
                            title: 'Добавить жалобу',
                        }}
                    />
                    <Tab.Screen
                        name="Личный кабинет"
                        component={() => <PersonalCabinet setToken={setToken} />}
                        options={{
                            headerShown: false,
                            tabBarIcon: (tabInfo) => {
                                return (
                                    <Icon
                                        name="user-circle"
                                        size={24}
                                        color={tabInfo.focused ? '#006600' : '#8e8e93'}
                                    />
                                )
                            },
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="auth"
                        component={({ navigation }) => (
                            <AuthPage setToken={setToken} navigation={navigation} />
                        )}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="register"
                        component={({ navigation }) => (
                            <RegisterPage setToken={setToken} navigation={navigation} />
                        )}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default function Main() {
    return (
        <PaperProvider>
            <App />
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
