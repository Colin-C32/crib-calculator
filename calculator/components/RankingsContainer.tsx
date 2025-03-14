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
    keptCards: Card[];
    thrownCards: Card[];
    averageHandValue?: number;
    averageCribValue?: number;
    averageTotalValue?: number;
    highestPossibleScore?: number;
    lowestPossibleScore?: number;
};

export default function RankingsContainer() {
    const { hand, isMyCrib, players } = useHandContext();

    let emptyHand = {
        keptCards: Array(4)
            .fill(null)
            .map(() => ({
                index: "",
                suit: undefined,
                rank: undefined,
                color: undefined,
            })),
        thrownCards: Array(players === 2 ? 2 : 1)
            .fill(null)
            .map(() => ({
                index: "",
                suit: undefined,
                rank: undefined,
                color: undefined,
            })),
        averageHandValue: undefined,
        averageCribValue: undefined,
        averageTotalValue: undefined,
        highestPossibleScore: undefined,
        lowestPossibleScore: undefined,
    };

    const [highestAverageHand, setHighestAverageHand] =
        useState<Hand>(emptyHand);
    const [highestPotentialHand, setHighestPotentialHand] =
        useState<Hand>(emptyHand);
    const [highestBaseHand, setHighestBaseHand] = useState<Hand>(emptyHand);

    useEffect(() => {
        if (!hand) return;

        if (hand[hand.length - 1]?.rank != undefined) {
            const handData = digestHandScoring(hand, isMyCrib);

            setHighestAverageHand(handData[0] as Hand);
            setHighestPotentialHand(handData[1] as Hand);
            setHighestBaseHand(handData[2] as Hand);
        } else {
            setHighestAverageHand(emptyHand);
            setHighestPotentialHand(emptyHand);
            setHighestBaseHand(emptyHand);
        }
    }, [hand, isMyCrib, players]);

    useEffect(() => {
        setHighestAverageHand((prev) => {
            if (players === 3) {
                return {
                    ...prev,
                    thrownCards: prev.thrownCards.slice(0, 1),
                };
            } else if (players === 2) {
                return {
                    ...prev,
                    thrownCards:
                        prev.thrownCards.length < 2
                            ? [
                                  ...prev.thrownCards,
                                  {
                                      index: "",
                                      suit: undefined,
                                      rank: undefined,
                                      color: undefined,
                                  },
                              ]
                            : prev.thrownCards,
                };
            }
            return prev;
        });
        setHighestPotentialHand((prev) => {
            if (players === 3) {
                return {
                    ...prev,
                    thrownCards: prev.thrownCards.slice(0, 1),
                };
            } else if (players === 2) {
                return {
                    ...prev,
                    thrownCards:
                        prev.thrownCards.length < 2
                            ? [
                                  ...prev.thrownCards,
                                  {
                                      index: "",
                                      suit: undefined,
                                      rank: undefined,
                                      color: undefined,
                                  },
                              ]
                            : prev.thrownCards,
                };
            }
            return prev;
        });
        setHighestBaseHand((prev) => {
            if (players === 3) {
                return {
                    ...prev,
                    thrownCards: prev.thrownCards.slice(0, 1),
                };
            } else if (players === 2) {
                return {
                    ...prev,
                    thrownCards:
                        prev.thrownCards.length < 2
                            ? [
                                  ...prev.thrownCards,
                                  {
                                      index: "",
                                      suit: undefined,
                                      rank: undefined,
                                      color: undefined,
                                  },
                              ]
                            : prev.thrownCards,
                };
            }
            return prev;
        });
    }, [players, isMyCrib]);

    return (
        <View style={rankingsStyles.rankingsContainer}>
            <RankingSection title={"Optimal Hand"} hand={highestAverageHand} />
            <RankingSection
                title={"Highest Possible Score"}
                hand={highestPotentialHand}
            />
            <RankingSection
                title={"Highest Base Score"}
                hand={highestBaseHand}
            />
        </View>
    );
}
