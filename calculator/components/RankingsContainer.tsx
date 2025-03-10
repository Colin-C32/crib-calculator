import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { rankingsStyles } from "@/styles/rankingsStyles";
import RankingSection from "./RankingSection";
import { useHandContext } from "@/hooks/handContext";
import digestHandScoring from "@/calculations/calculator";

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

export default function RankingsContainer() {
    const { hand } = useHandContext();
    const [highestAverageHand, setHighestAverageHand] = useState<Hand>({});
    const [highestPotentialHand, setHighestPotentialHand] = useState<Hand>({});
    const [highestBaseHand, setHighestBaseHand] = useState<Hand>({});

    function calculateHighestAverageHand(newHand: Card[]): Hand {
        if (!newHand || newHand.length === 0) return {};

        const keptCards = newHand.slice(0, 4); // First 4 cards
        const thrownCards = newHand.slice(4); // Remaining cards

        const averageHandValue = keptCards.length * 5;
        const averageCribValue = thrownCards.length * 3;
        const averageTotalValue = averageHandValue + averageCribValue;

        return {
            keptCards,
            thrownCards,
            averageHandValue,
            averageCribValue,
            averageTotalValue,
            highestPossibleScore: 50, // Placeholder
            lowestPossibleScore: 10, // Placeholder
        };
    }
    useEffect(() => {
        if (!hand) return;

        if (hand[5]?.rank != undefined) {
            const trialHand = digestHandScoring(hand);
        }

        const newHighestAverageHand = calculateHighestAverageHand(hand);

        setHighestAverageHand(newHighestAverageHand);
        setHighestPotentialHand(newHighestAverageHand);
        setHighestBaseHand(newHighestAverageHand);
    }, [hand]);

    return (
        <View style={rankingsStyles.rankingsContainer}>
            <RankingSection
                title={"Highest Average Score"}
                hand={highestAverageHand}
            />
            <RankingSection
                title={"Highest Potential Score"}
                hand={highestPotentialHand}
            />
            <RankingSection
                title={"Highest Base Score"}
                hand={highestBaseHand}
            />
        </View>
    );
}
