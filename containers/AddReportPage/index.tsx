import { Camera } from 'expo-camera'
import { useState } from 'react'
import { CameraComponent } from '../../components/UI/Camera'
import { StyleSheet } from 'react-native'

export const AddReportPage = () => {
    const [capturedImage, setCapturedImage] = useState<any>()

    return <CameraComponent capturedImage={capturedImage} setCapturedImage={setCapturedImage} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
