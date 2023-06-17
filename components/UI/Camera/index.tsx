import { StatusBar } from 'expo-status-bar'
import * as MediaLibrary from 'expo-media-library'

import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Camera } from 'expo-camera'
const tag = '[CAMERA]'

interface props {
    capturedImage: any
    setCapturedImage: any
    onClose: any
    onSubmit?: any
}

export const CameraComponent: React.FC<props> = ({
    capturedImage,
    setCapturedImage,
    onClose,
    onSubmit,
}) => {
    const [hasPermission, setHasPermission] = useState<any>(null)
    const [previewVisible, setPreviewVisible] = useState(false)
    // const [capturedImage, setCapturedImage] = useState<any>(null)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.on)
    const [startOver, setStartOver] = useState(true)
    const [type, setType] = useState(Camera.Constants.Type.back)
    let camera: Camera
    useEffect(() => {
        ;(async () => {
            const { status } = await Camera.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])
    // const closeCamera = () => {
    //     setStartOver(true)
    // }
    const takePicture = async () => {
        if (!camera) return
        const photo = await camera.takePictureAsync()
        console.log(photo)
        setPreviewVisible(true)
        setCapturedImage(photo)
    }

    const saveImage = async (uri) => {
        try {
            // Request device storage access permission
            const { status } = await MediaLibrary.requestPermissionsAsync()
            if (status === 'granted') {
                // Save image to media library
                await MediaLibrary.saveToLibraryAsync(uri)

                Alert.alert('Фотография успешно сохранена')
            }
        } catch (error) {
            console.log(error)
        }
    }

    // const takePhoto = async () => {}
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <View
                style={{
                    flex: 1,
                }}
            >
                {previewVisible ? (
                    <ImageBackground
                        source={{ uri: capturedImage && capturedImage.uri }}
                        style={{
                            flex: 1,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                padding: 15,
                                justifyContent: 'flex-end',
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => setPreviewVisible(false)}
                                    style={{
                                        width: 130,
                                        height: 40,

                                        alignItems: 'center',
                                        borderRadius: 4,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 20,
                                        }}
                                    >
                                        Re-take
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        onSubmit
                                            ? onSubmit(capturedImage.uri)
                                            : () => saveImage(capturedImage.uri)
                                    }}
                                    style={{
                                        width: 130,
                                        height: 40,

                                        alignItems: 'center',
                                        borderRadius: 4,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 20,
                                        }}
                                    >
                                        save photo
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                ) : (
                    <Camera
                        style={{ flex: 1 }}
                        type={type}
                        flashMode={flash}
                        ref={(r) => {
                            camera = r
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}
                        >
                            <View
                                style={{
                                    position: 'absolute',
                                    top: '5%',
                                    right: '5%',
                                }}
                            >
                                <TouchableOpacity onPress={onClose}>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 20,
                                        }}
                                    >
                                        <Icon name="ios-close" size={32} color={'#fff'} />
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    flexDirection: 'row',
                                    flex: 1,
                                    width: '100%',
                                    padding: 20,
                                    justifyContent: 'space-between',
                                }}
                            >
                                <TouchableOpacity
                                    // style={{}}
                                    onPress={() => {
                                        setFlash(
                                            flash === Camera.Constants.FlashMode.on
                                                ? Camera.Constants.FlashMode.off
                                                : Camera.Constants.FlashMode.on,
                                        )
                                    }}
                                >
                                    {flash === Camera.Constants.FlashMode.off ? (
                                        <Icon name="flash" size={32} color={'#fff'} />
                                    ) : (
                                        <Icon name="flash-off" size={32} color={'#fff'} />
                                    )}
                                </TouchableOpacity>
                                <View
                                    style={{
                                        alignSelf: 'center',
                                        flex: 1,
                                        alignItems: 'center',
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={takePicture}
                                        style={{
                                            width: 70,
                                            height: 70,
                                            bottom: 0,
                                            borderRadius: 50,
                                            backgroundColor: '#fff',
                                        }}
                                    />
                                </View>
                                <TouchableOpacity
                                    // style={{}}
                                    onPress={() => {
                                        setType(
                                            type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back,
                                        )
                                    }}
                                >
                                    <Icon name="sync-outline" size={32} color={'#fff'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Camera>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
