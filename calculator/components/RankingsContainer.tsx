import React from "react";
import { View } from "react-native";
import { rankingsStyles } from "@/styles/rankingsStyles";
import RankingSection from "./RankingSection";

export default function RankingsContainer() {
    return (
        <View style={rankingsStyles.rankingsContainer}>
            <RankingSection title={"Highest Average Score"} />
            <RankingSection title={"Highest Potential Score"} />
            <RankingSection title={"Highest Base Score"} />
        </View>
    );
}
