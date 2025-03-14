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
    averageHandScore?: number;
    averageCribScore?: number;
    averageTotalValue?: number;
    lowestHandScore?: number;
    highestHandScore?: number;
};

type OptionProps = {
    hand: Hand;
    section: string;
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
                        {props.hand.thrownCards?.length === 1 && (
                            <Pressable
                                style={rankingsStyles.fillerCardContainer}
                            />
                        )}
                    </View>
                </View>
            </View>
            <View style={rankingsStyles.statsContainer}>
                {props.section === "Highest Average Score" && (
                    <AddStatistic
                        title="Average Hand Score"
                        value={props.hand.averageHandScore}
                        isHighlighted={false}
                    />
                )}

                {props.section !== "Highest Average Score" && (
                    <Statistic
                        title="Average Hand Score"
                        value={props.hand.averageHandScore}
                        isHighlighted={false}
                    />
                )}

                <Statistic
                    title="Maximum Hand Score"
                    value={props.hand.highestHandScore}
                    isHighlighted={props.section === "Highest Potential Score"}
                />

                {props.section !== "Highest Average Score" && (
                    <Statistic
                        title="Average Crib Score"
                        value={props.hand.averageCribScore}
                        isHighlighted={false}
                    />
                )}

                {props.section === "Highest Average Score" && (
                    <AddStatistic
                        title="Average Crib Score"
                        value={props.hand.averageCribScore}
                        isHighlighted={false}
                    />
                )}

                <Statistic
                    title="Minimum Hand Score"
                    value={props.hand.lowestHandScore}
                    isHighlighted={props.section === "Highest Base Score"}
                />
                <Statistic
                    title="Average Total Value"
                    value={props.hand.averageTotalValue}
                    isHighlighted={props.section === "Highest Average Score"}
                />
            </View>
        </View>
    );
}

type StatisticProps = {
    title: string;
    value?: number;
    color?: string;
    isHighlighted: boolean;
};

function AddStatistic(props: StatisticProps) {
    return (
        <View style={rankingsStyles.statisticContainer}>
            <Text
                style={
                    props.isHighlighted
                        ? rankingsStyles.highlightedSubtext
                        : rankingsStyles.subtext
                }
            >
                {props.title}:
            </Text>
            <Text
                style={[
                    props.isHighlighted
                        ? rankingsStyles.highlightedSubtext
                        : rankingsStyles.subtext,
                    props.value !== undefined && props.value < 0
                        ? rankingsStyles.redSubtext
                        : rankingsStyles.greenSubtext,
                ]}
            >
                {props.value === 0
                    ? "0"
                    : props.value
                    ? `${props.value > 0 ? "+" : ""}${props.value.toFixed(2)}`
                    : "-"}
            </Text>
        </View>
    );
}

function Statistic(props: StatisticProps) {
    return (
        <View style={rankingsStyles.statisticContainer}>
            <Text
                style={
                    props.isHighlighted
                        ? rankingsStyles.highlightedSubtext
                        : rankingsStyles.subtext
                }
            >
                {props.title}:
            </Text>
            <Text
                style={[
                    props.isHighlighted
                        ? rankingsStyles.highlightedSubtext
                        : rankingsStyles.subtext,
                ]}
            >
                {props.value === 0
                    ? "0"
                    : props.value
                    ? props.value.toFixed(2)
                    : "-"}
            </Text>
        </View>
    );
}
