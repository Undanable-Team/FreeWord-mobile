import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

export const OverlayLoader = () => {
    return (
        <View
            style={{
                flex: 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ActivityIndicator animating={true} color={'#fff'} size="large" />
        </View>
    )
}
