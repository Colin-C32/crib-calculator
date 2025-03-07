import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    Modal,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
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
            setHand(Array.from({ length: 5 }));
        } else {
            setPlayers(2);
            setHand(Array.from({ length: 6 }));
        }
    };

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
            <Modal
                visible={cardSelectorActive}
                transparent
                animationType="slide"
            >
                <View style={inputContainerStyles.modalContainer}>
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
                </View>
            </Modal>

            <View style={inputContainerStyles.inputContainer}>
                <View style={inputContainerStyles.playerCountContainer}>
                    <View style={inputContainerStyles.toggleContainer}>
                        <Pressable onPress={() => setIsMyCrib(true)}>
                            <Text
                                style={[
                                    inputContainerStyles.toggleOption,
                                    isMyCrib &&
                                        inputContainerStyles.activeToggle,
                                ]}
                            >
                                My Crib
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => setIsMyCrib(false)}>
                            <Text
                                style={[
                                    inputContainerStyles.toggleOption,
                                    !isMyCrib &&
                                        inputContainerStyles.activeToggle,
                                ]}
                            >
                                Op's Crib
                            </Text>
                        </Pressable>
                    </View>
                    <View style={inputContainerStyles.toggleContainer}>
                        <Pressable onPress={changePlayerCount}>
                            <Text
                                style={[
                                    inputContainerStyles.toggleOption,
                                    players === 2 &&
                                        inputContainerStyles.activeToggle,
                                ]}
                            >
                                2 Players
                            </Text>
                        </Pressable>
                        <Pressable onPress={changePlayerCount}>
                            <Text
                                style={[
                                    inputContainerStyles.toggleOption,
                                    players === 3 &&
                                        inputContainerStyles.activeToggle,
                                ]}
                            >
                                3 Players
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <Pressable style={inputContainerStyles.handContainer}>
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
                </Pressable>
            </View>
        </View>
    );
}
