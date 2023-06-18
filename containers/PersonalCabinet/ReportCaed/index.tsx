import React from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { Image } from 'react-native'

interface props {
    title: string
    media: string
}
export const ReportCard: React.FC<props> = ({ title, media }) => {
    return (
        <View style={{ flex: 1, marginBottom: 20 }}>
            <Image source={{ uri: media }} style={{ width: '100%', height: 150 }} />
            <Text>{title}</Text>
        </View>
    )
}
