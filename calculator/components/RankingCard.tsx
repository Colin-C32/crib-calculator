import { View, Text, Pressable } from "react-native";
import { rankingsStyles } from "@/styles/rankingsStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";

type Props = {
    rank?: string;
    suit?: string;
    color?: string;
    selected?: boolean;
    onPress?: () => void;
};
export default function RankingCard(props: Props) {
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
                    rankingsStyles.cardContainer,
                    props.selected ? rankingsStyles.highlight : null,
                ]}
                onPress={props.onPress}
            >
                <Text style={rankingsStyles.emptyCard}>?</Text>
            </Pressable>
        );
    } else {
        return (
            <Pressable
                style={[
                    rankingsStyles.cardContainer,
                    props.selected ? rankingsStyles.highlight : null,
                ]}
                onPress={props.onPress}
            >
                <MaterialCommunityIcons
                    name={getSuitIcon()}
                    style={[
                        rankingsStyles.suitIcon,
                        props.color === "red"
                            ? rankingsStyles.redCard
                            : rankingsStyles.blackCard,
                    ]}
                />
                <Text
                    style={[
                        rankingsStyles.rankStyle,
                        props.color === "red"
                            ? rankingsStyles.redCard
                            : rankingsStyles.blackCard,
                    ]}
                >
                    {props.rank}
                </Text>
            </Pressable>
        );
    }
}
