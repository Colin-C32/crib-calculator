import { View, Text, Modal } from "react-native";
import { selectorCardStyles } from "@/styles/selectorCardStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
    rank?: string;
    suit?: string;
    color?: string;
    isTaken: boolean;
};

export default function SelectorCard(props: Props) {
    function getSuitIcon() {
        switch (props.suit) {
            case "H":
                return "cards-heart";
            case "D":
                return "cards-diamond";
            case "C":
                return "cards-club";
            default:
                return "cards-spade";
        }
    }

    return (
        <View
            style={[
                selectorCardStyles.selectorContainer,
                props.isTaken ? selectorCardStyles.taken : null,
            ]}
        >
            <MaterialCommunityIcons
                name={getSuitIcon()}
                style={[
                    selectorCardStyles.suitIcon,
                    props.color === "red"
                        ? selectorCardStyles.redCard
                        : selectorCardStyles.blackCard,
                ]}
            />
            <Text
                style={[
                    selectorCardStyles.rankStyle,
                    props.color === "red"
                        ? selectorCardStyles.redCard
                        : selectorCardStyles.blackCard,
                ]}
            >
                {props.rank}
            </Text>
        </View>
    );
}
