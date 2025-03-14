import React, { useState, useEffect } from "react";
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
    averageHandScore?: number;
    averageCribScore?: number;
    averageTotalValue?: number;
    lowestHandScore?: number;
    highestHandScore?: number;
};

type Props = {
    title: string;
    hand: Hand;
};

export default function RankingSection(props: Props) {
    return (
        <View style={rankingsStyles.rankingSectionContainer}>
            <Text style={rankingsStyles.rankingTitle}>{props.title}</Text>
            <ScrollView>
                <Option hand={props.hand} section={props.title} />
            </ScrollView>
        </View>
    );
}
