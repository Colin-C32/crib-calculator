import { View, Text } from 'react-native';
import { handCardStyles } from '@/styles/handCardStyles';

type Props = { 
    rank: string;
    suit: string;
}
export default function HandCard(props: Props) {

    return (
        <View style={handCardStyles.cardContainer}>

        </View>
    );
}