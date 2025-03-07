import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { rankingsStyles } from "@/styles/rankingsStyles";
import Option from "./Option";

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
};
export default function RankingSection(props: Props) {
    const [hands, setHands] = useState<Hand[]>(Array.from({ length: 1 }));

    return (
        <View style={rankingsStyles.rankingSectionContainer}>
            <Text style={rankingsStyles.rankingTitle}>{props.title}</Text>
            <ScrollView>
                {hands.map((hand, index) => (
                    <Option key={index} hand={hand} />
                ))}
            </ScrollView>
        </View>
    );
}
