import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import analytics from '@react-native-firebase/analytics';

const Details = ({ navigation }: any) => {

    useEffect(() => {
        // Log the screen view
        const logScreenView = async () => {
            await analytics().logScreenView({
                screen_name: 'Details',
                screen_class: 'Details'
            });
        }

        logScreenView();
    }, []);

    return (
        <View>
            <Text>Details</Text>
        </View>
    );
}

export default Details;
