import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    Modal,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { inputContainerStyles } from "@/styles/inputContainerStyles";

import HandCard from "./HandCard";
import SelectorCard from "./SelectorCard";

const suits = ["S", "H", "C", "D"];
const ranks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
];

const allCards: Card[] = [];

for (const suit of suits) {
    for (const rank of ranks) {
        allCards.push({
            rank,
            suit,
            color: suit === "H" || suit === "D" ? "red" : "black",
            index: rank + suit,
        });
    }
}

type Card = {
    rank?: string;
    suit?: string;
    color?: string;
    index: string;
};

export default function InputContainer() {
    const [isMyCrib, setIsMyCrib] = useState(true);
    const [players, setPlayers] = useState(2);
    const [hand, setHand] = useState<Card[]>(Array.from({ length: 6 }));
    const [cardSelectorActive, setCardSelectorActive] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState(-1);

    const changePlayerCount = () => {
        if (players === 2) {
            setPlayers(3);
            removeLastCard();
            if (getFirstUnknownCard() === hand.length - 1) {
                setSelectedSpot(0);
            }
        } else {
            setPlayers(2);
            addCard();
            if (getFirstUnknownCard() === hand.length) {
                setSelectedSpot(5);
            }
        }
    };

    const closeCardSelector = () => {
        setCardSelectorActive(false);
        setSelectedSpot(-1);
    };

    function removeLastCard() {
        setHand((prevHand) => {
            return prevHand.slice(0, -1);
        });
    }

    function addCard() {
        setHand((prevHand) => {
            let newHand: Card[] = Array.from({ length: 6 }, (_, i) => ({
                index: `${i + 1}`,
            }));
            for (let i = 0; i < prevHand.length; i++) {
                newHand[i] = prevHand[i];
            }
            return newHand;
        });
    }

    function getFirstUnknownCard() {
        for (let i = 0; i < hand.length; i++) {
            if (hand[i]?.rank === undefined) {
                return i;
            }
        }

        return hand.length;
    }

    function handleOpenCardSelector(spot: number) {
        setCardSelectorActive(true);
        const firstEmptySpot = getFirstUnknownCard();
        if (spot > firstEmptySpot) {
            spot = firstEmptySpot;
        }
        setSelectedSpot(spot);
    }

    function isCardTaken(card: Card) {
        for (let i = 0; i < hand.length; i++) {
            if (hand[i]?.index === undefined) {
                return false;
            } else if (hand[i]?.index === card.index) {
                return true;
            }
        }
        return false;
    }

    function updateHand(card: Card) {
        if (isCardTaken(card)) {
            return;
        }
        setHand((prevHand) => {
            const updatedHand = [...prevHand];
            updatedHand[selectedSpot] = card;
            return updatedHand;
        });
        setSelectedSpot(selectedSpot + 1);

        if (selectedSpot >= hand.length - 1) {
            setSelectedSpot(-1);
            setCardSelectorActive(false);
        }
    }

    return (
        <View>
            {cardSelectorActive && (
                <TouchableOpacity
                    onPress={closeCardSelector}
                    style={inputContainerStyles.modalContainer}
                    activeOpacity={1}
                >
                    <FlatList
                        data={allCards}
                        keyExtractor={(item) => item.index}
                        numColumns={13}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={
                                    inputContainerStyles.selectorCardContainer
                                }
                                onPress={() => updateHand(item)}
                                activeOpacity={0.7}
                            >
                                <SelectorCard
                                    suit={item?.suit}
                                    rank={item?.rank}
                                    color={item?.color}
                                    isTaken={isCardTaken(item)}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </TouchableOpacity>
            )}

            <TouchableOpacity
                onPress={() => setCardSelectorActive(false)}
                style={inputContainerStyles.inputContainer}
            >
                <View style={inputContainerStyles.playerCountContainer}>
                    <View style={inputContainerStyles.toggleContainer}>
                        <TouchableOpacity
                            onPress={() => setIsMyCrib(true)}
                            activeOpacity={0.2}
                        >
                            <Text
                                style={[
                                    inputContainerStyles.toggleOption,
                                    isMyCrib &&
                                        inputContainerStyles.activeToggle,
                                ]}
                            >
                                My Crib
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsMyCrib(false)}
                            activeOpacity={0.2}
                        >
                            <Text
                                style={[
                                    inputContainerStyles.toggleOption,
                                    !isMyCrib &&
                                        inputContainerStyles.activeToggle,
                                ]}
                            >
                                Op's Crib
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={inputContainerStyles.toggleContainer}>
                        <TouchableOpacity
                            onPress={changePlayerCount}
                            activeOpacity={0.2}
                        >
                            <Text
                                style={[
                                    inputContainerStyles.toggleOption,
                                    players === 2 &&
                                        inputContainerStyles.activeToggle,
                                ]}
                            >
                                2 Players
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={changePlayerCount}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    inputContainerStyles.toggleOption,
                                    players === 3 &&
                                        inputContainerStyles.activeToggle,
                                ]}
                            >
                                3 Players
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={inputContainerStyles.handContainer}
                    activeOpacity={0.7}
                >
                    {hand.map((card, index) => (
                        <HandCard
                            onPress={() => handleOpenCardSelector(index)}
                            key={index}
                            rank={card?.rank}
                            suit={card?.suit}
                            color={card?.color}
                            selected={index === selectedSpot}
                        />
                    ))}
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
}
