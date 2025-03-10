import React, { useEffect } from "react";
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

type OptionProps = {
    hand: Hand;
};

export default function Option(props: OptionProps) {
    return (
        <View style={rankingsStyles.optionContainer}>
            <View style={rankingsStyles.cardSection}>
                <View style={rankingsStyles.keepSection}>
                    <Text
                        style={[
                            rankingsStyles.text,
                            rankingsStyles.keepSection,
                        ]}
                    >
                        Keep
                    </Text>

                    <View style={rankingsStyles.cardFlex}>
                        {props.hand.keptCards?.map((card, index) => (
                            <RankingCard
                                key={index}
                                rank={card?.rank}
                                suit={card?.suit}
                                color={card?.color}
                            />
                        ))}
                    </View>
                </View>

                <View style={rankingsStyles.throwSection}>
                    <Text
                        style={[
                            rankingsStyles.text,
                            rankingsStyles.throwSection,
                        ]}
                    >
                        Throw
                    </Text>

                    <View style={rankingsStyles.cardFlex}>
                        {props.hand.thrownCards?.map((card, index) => (
                            <RankingCard
                                key={index}
                                rank={card?.rank}
                                suit={card?.suit}
                                color={card?.color}
                            />
                        ))}
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

type StatisticProps = {
    title: string;
    value: number;
};
function Statistic(props: StatisticProps) {
    return (
        <View style={rankingsStyles.statisticContainer}>
            <Text style={rankingsStyles.subtext}>{props.title}:</Text>
            <Text style={[rankingsStyles.subtext, rankingsStyles.valueText]}>
                {props.value}
            </Text>
        </View>
    );
}
