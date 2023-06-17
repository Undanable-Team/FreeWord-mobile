import React from 'react'
import { Alert } from 'react-native'
import * as FileSystem from 'expo-file-system'

const { default: axios } = require('axios')

const freewordApi = axios.create({
    baseURL: 'https://freeword-api.onrender.com/api',
})

export const createReport = (data: any[]): Promise<any> => {
    const sendData = async () => {
        try {
            return await freewordApi.post('reports', { data: data })
        } catch (error) {
            Alert.alert('Ошибка запроса')
            console.log(error)
        }
    }
    return sendData()
}

export const uploadToStrapi = async (uri) => {
    try {
        const apiUrl = 'https://freeword-api.onrender.com/api/upload'

        const formData = new FormData()
        formData.append('files', {
            uri,
            type: 'image/jpeg', // Замените на соответствующий тип изображения
            name: 'image.jpg',
        })
        console.log(formData)

        const response = await axios.post(apiUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        if (response.status === 200) {
            // Изображение успешно загружено в Strapi
            return response
        }
    } catch (error) {
        console.error('Error uploading image:', error)
    }
}

export const loginUser = async (data: any): Promise<any> => {
    // console.log(data)
    return await freewordApi.post('auth/local', { ...data })
}
