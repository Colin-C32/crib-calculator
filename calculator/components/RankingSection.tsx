import React from "react";
import { View, Text } from "react-native";
import { rankingsStyles } from "@/styles/rankingsStyles";

type Card = {
    rank?: string;
    suit?: string;
    color?: string;
    index: string;
};

type Hand = {
    keptCards?: Card[];
    thrownCards?: Card[];
    averageHandValue?: number;
    averageCribValue?: number;
    averageTotalValue?: number;
    highestPossibleScore?: number;
    lowestPossibleScore?: number;
};

type Props = {
    title: string;
    hands?: Card[];
};
export default function RankingSection(props: Props) {
    return (
        <View style={rankingsStyles.rankingSectionContainer}>
            <Text style={rankingsStyles.rankingTitle}>{props.title}</Text>
        </View>
    );
}
