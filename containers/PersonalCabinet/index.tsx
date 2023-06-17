import { Alert, Image, StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native'
import { Button, Card, Divider, Menu, PaperProvider, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { RequestPage } from './RequestPage'
import { NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react'
import { Camera } from 'expo-camera'
import { CameraComponent } from '../../components/UI/Camera'

const Tab = createMaterialTopTabNavigator()

export interface User {
    firstname: string
    lastname: string
    avatar?: string
}

export const PersonalCabinet = () => {
    const [user, setUser] = useState<User>({
        firstname: 'Руслан',
        lastname: 'Булах',
        avatar: 'https://cdn-icons-png.flaticon.com/512/21/21104.png',
    })

    const [userDraft, setUserDraft] = useState<User>({
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar,
    })
    const [edit, setEdit] = useState<boolean>(false)
    const [avatarEditMenuStatus, setAvatarEditMenuStatus] = useState<boolean>(true)
    const [takePictureStatus, setTakePictureStatus] = useState<boolean>(false)
    const [capturedImage, setCapturedImage] = useState<any>(false)

    const change = (text: string, key: string) => {
        setUserDraft((prev) => {
            return {
                ...prev,
                [key]: text,
            }
        })
    }

    const cancelEdit = () => {
        setUserDraft(user)
        setEdit(false)
    }

    const closeMenu = () => setAvatarEditMenuStatus(false)
    const openMenu = () => setAvatarEditMenuStatus(true)

    const saveEditData = () => {
        setUser((prev) => {
            return { ...prev, ...userDraft }
        })
        setEdit(false)
    }

    if (takePictureStatus) {
        return (
            <CameraComponent
                capturedImage={capturedImage}
                setCapturedImage={setCapturedImage}
                onClose={() => setTakePictureStatus(false)}
                onSubmit={(imageUri) => {
                    setUserDraft((prev) => {
                        return { ...prev, avatar: imageUri }
                    })
                    setTakePictureStatus(false)
                }}
            />
        )
    }

    return (
        <NavigationContainer independent={true}>
            <PaperProvider>
                <SafeAreaView
                    style={{
                        alignItems: 'center',
                        marginTop: 50,
                        backgroundColor: '#fff',
                        paddingBottom: 20,
                        flex: 1,
                    }}
                >
                    {/* <Text>Personal Cabinet</Text> */}
                    {edit ? (
                        <View style={[styles['user-info'], { height: 500 }]}>
                            <TouchableOpacity onPress={openMenu}>
                                <Image source={{ uri: userDraft.avatar }} style={styles.avatar} />
                            </TouchableOpacity>
                            <Menu
                                visible={avatarEditMenuStatus}
                                onDismiss={closeMenu}
                                anchor={
                                    <Button
                                        mode="contained"
                                        onPress={openMenu}
                                        style={{
                                            opacity: 1,
                                        }}
                                    >
                                        Show menu
                                    </Button>
                                }
                            >
                                <Menu.Item
                                    onPress={() => setTakePictureStatus(true)}
                                    title="Сделать фотографию"
                                />
                                <Menu.Item onPress={() => {}} title="Выбрать из галереи" />
                            </Menu>
                            {/* <Text style={styles.username}>
                              {user.firstname} {user.lastname}
                          </Text> */}
                            <View style={{ gap: 10, width: 300, marginTop: 15 }}>
                                <TextInput
                                    label="Имя"
                                    value={userDraft.firstname}
                                    style={styles.input}
                                    onChangeText={(text) => change(text, 'firstname')}
                                />
                                <TextInput
                                    label="Фамилия"
                                    value={userDraft.lastname}
                                    style={styles.input}
                                    onChangeText={(text) => change(text, 'lastname')}
                                />
                            </View>
                            <View style={styles['user-data']}>
                                <Button
                                    icon={() => <Icon name="pen" color={'#f2f2f2'} />}
                                    style={styles['user-data-item']}
                                    mode="contained"
                                    buttonColor="#2b54a5"
                                    onPress={saveEditData}
                                >
                                    Сохранить
                                </Button>
                                <Button
                                    icon={() => <Icon name="ban" color={'#f2f2f2'} />}
                                    style={styles['user-data-item']}
                                    mode="contained"
                                    buttonColor="red"
                                    onPress={cancelEdit}
                                >
                                    Отменить
                                </Button>
                            </View>
                        </View>
                    ) : (
                        <View style={styles['user-info']}>
                            <Image
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/512/21/21104.png',
                                }}
                                style={styles.avatar}
                            />
                            <Text style={styles.username}>
                                {user.firstname} {user.lastname}
                            </Text>
                            <View style={styles['user-data']}>
                                {/* <Button
                            style={styles['user-data-item']}
                            mode="contained"
                            onPress={() => console.log('Pressed')}
                        >
                            Персональная информация
                        </Button> */}
                                <Button
                                    icon={() => <Icon name="pen" color={'#f2f2f2'} />}
                                    style={styles['user-data-item']}
                                    mode="contained"
                                    buttonColor="#2b54a5"
                                    onPress={() => setEdit(true)}
                                >
                                    Редактировать
                                </Button>
                            </View>
                        </View>
                    )}
                </SafeAreaView>
            </PaperProvider>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#ADD5D0',
                    tabBarInactiveTintColor: '#66A49D',
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                    },
                    tabBarStyle: {
                        paddingTop: 20,
                    },
                }}
            >
                <Tab.Screen name="Ваши жалобы" component={RequestPage} />
                <Tab.Screen name="Счета" component={RequestPage} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    ['user-info']: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    username: {
        fontSize: 20,
    },
    ['user-data']: {
        display: 'flex',
        // flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        gap: 10,
    },
    input: {
        width: '100%',
    },

    ['user-data-item']: {},
})
