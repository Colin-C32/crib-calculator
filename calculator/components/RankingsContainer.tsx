import React from "react";
import { View } from "react-native";
import { rankingsStyles } from "@/styles/rankingsStyles";
import RankingSection from "./RankingSection";

export default function RankingsContainer() {
    return (
        <View style={rankingsStyles.rankingsContainer}>
            <RankingSection title={"Highest Expected Value:"} />
            <RankingSection title={"Highest Potential Value:"} />
            <RankingSection title={"Highest Base Value:"} />
        </View>
    );
}
