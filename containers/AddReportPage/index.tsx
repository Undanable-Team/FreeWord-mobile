import { Camera } from 'expo-camera'
import { useState } from 'react'
import { CameraComponent } from '../../components/UI/Camera'
import { StyleSheet, Image, ScrollView } from 'react-native'
import { ActivityIndicator, Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { createReport, uploadImage, uploadToStrapi } from '../../api/request'
import { OverlayLoader } from '../../components/UI/OverlayLoader'

interface ReportKeys {
    title: string
    description: string
}

export const AddReportPage = () => {
    const [capturedImage, setCapturedImage] = useState<any>()
    const [cameraStatus, setCameraStatus] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)

    const [report, setReport] = useState<ReportKeys>({
        title: '',
        description: '',
    })

    const change = (text: string, key: string) => {
        setReport((prev) => {
            return { ...prev, [key]: text }
        })
    }

    const submit = () => {
        setLoading(true)
        const formData = new FormData()
        console.log(capturedImage)
        // formData.append("files", capturedImage)
        uploadToStrapi(capturedImage.uri).then((resp) =>
            createReport({ ...report, media: { ...resp.data[0] } }).then((resp) => {
                setLoading(false)
            }),
        )
    }

    if (capturedImage) {
        return (
            <SafeAreaView style={styles.form}>
                {/* {loading && <OverlayLoader />} */}
                <Image source={{ uri: capturedImage.uri }} style={{ flex: 1 }} />
                <Button
                    style={{ position: 'absolute', top: 50 }}
                    onPress={() => {
                        setLoading(false)
                        setReport({
                            title: '',
                            description: '',
                        })
                        setCapturedImage(null)
                    }}
                >
                    <Icon name="trash-alt" size={20} color={'#fff'} />
                </Button>
                <TextInput
                    label="Введите заголовок"
                    mode="outlined"
                    onChangeText={(text) => change(text, 'title')}
                    value={report.title}
                />
                <TextInput
                    label="Введите описание"
                    mode="outlined"
                    onChangeText={(text) => change(text, 'description')}
                    value={report.description}
                />
                <Button mode="contained" onPress={submit} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator animating={true} color={'#fff'} size="small" />
                    ) : (
                        'Отправить'
                    )}
                </Button>
            </SafeAreaView>
        )
    } else {
        return (
            <CameraComponent
                capturedImage={capturedImage}
                setCapturedImage={setCapturedImage}
                // onClose={() => setCameraStatus(false)}
                onSubmit={() => setCameraStatus(false)}
            />
        )
    }
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 10,
        gap: 20,
    },
})
