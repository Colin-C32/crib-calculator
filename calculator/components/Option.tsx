import React from "react";
import {
    View,
    Text,
    Pressable,
    Modal,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { rankingsStyles } from "@/styles/rankingsStyles";
import RankingCard from "./RankingCard";

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

export default function Option(hand: Hand) {
    return (
        <View style={rankingsStyles.optionContainer}>
            <View style={rankingsStyles.cardSection}>
                <View style={rankingsStyles.keepSection}>
                    <Text style={rankingsStyles.text}>Keep:</Text>

                    <View style={rankingsStyles.cardFlex}>
                        <RankingCard />
                        <RankingCard />
                        <RankingCard />
                        <RankingCard />
                    </View>
                </View>

                <View style={rankingsStyles.keepSection}>
                    <Text style={rankingsStyles.text}>Throw:</Text>

                    <View style={rankingsStyles.cardFlex}>
                        <RankingCard />
                        <RankingCard />
                    </View>
                </View>
            </View>
            <View style={rankingsStyles.statsContainer}>
                <Statistic title="Average Total Score" value={10.2} />
                <Statistic title="Highest Possible Score" value={12} />
                <Statistic title="Average Hand Score" value={6.8} />
                <Statistic title="Average Crib Score" value={3.4} />
                <Statistic title="Lowest Possible Score" value={4} />
            </View>
        </View>
    );
}

type Props = {
    title: string;
    value: number;
};
function Statistic(props: Props) {
    return (
        <View style={rankingsStyles.statisticContainer}>
            <Text style={rankingsStyles.subtext}>{props.title}:</Text>
            <Text style={[rankingsStyles.subtext, rankingsStyles.valueText]}>
                {props.value}
            </Text>
        </View>
    );
}
