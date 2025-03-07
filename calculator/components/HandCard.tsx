import { View, Text, Pressable } from "react-native";
import { handCardStyles } from "@/styles/handCardStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";

type Props = {
    rank?: string;
    suit?: string;
    color?: string;
    selected?: boolean;
    onPress?: () => void;
};
export default function HandCard(props: Props) {
    function getSuitIcon() {
        switch (props.suit) {
            case "H":
                return "cards-heart";
            case "D":
                return "cards-diamond";
            case "C":
                return "cards-club";
            case "S":
                return "cards-spade";
            default:
                return "blank";
        }
    }

    if (props?.rank === undefined) {
        return (
            <Pressable
                style={[
                    handCardStyles.cardContainer,
                    props.selected ? handCardStyles.highlight : null,
                ]}
                onPress={props.onPress}
            >
                <Text style={handCardStyles.emptyCard}>?</Text>
            </Pressable>
        );
    } else {
        return (
            <Pressable
                style={[
                    handCardStyles.cardContainer,
                    props.selected ? handCardStyles.highlight : null,
                ]}
                onPress={props.onPress}
            >
                <MaterialCommunityIcons
                    name={getSuitIcon()}
                    style={[
                        handCardStyles.suitIcon,
                        props.color === "red"
                            ? handCardStyles.redCard
                            : handCardStyles.blackCard,
                    ]}
                />
                <Text
                    style={[
                        handCardStyles.rankStyle,
                        props.color === "red"
                            ? handCardStyles.redCard
                            : handCardStyles.blackCard,
                    ]}
                >
                    {props.rank}
                </Text>
            </Pressable>
        );
    }
}
