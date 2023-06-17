import { HomePage } from './containers/HomePage/index'
import { StyleSheet, Text, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { PersonalCabinet } from './containers/PersonalCabinet'
import { createStackNavigator } from '@react-navigation/stack'
import { PaperProvider } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { AddReportPage } from './containers/AddReportPage'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const Home = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePage} options={{ headerTitle: 'FreeWord' }} />
        </Stack.Navigator>
    )
}

const App = () => {
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
                                    size={48}
                                    style={{ position: 'absolute', top: -20 }}
                                    color={tabInfo.focused ? '#006600' : '#8e8e93'}
                                />
                            )
                        },
                        title: 'Добавить',
                    }}
                />
                <Tab.Screen
                    name="Личный кабинет"
                    component={PersonalCabinet}
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
