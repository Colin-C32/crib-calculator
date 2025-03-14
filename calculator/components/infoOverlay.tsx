import React, { useState } from "react";
import { Pressable, View, TouchableOpacity, Text, Image } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { infoOverlayStyles } from "@/styles/infoOverlayStyles";

export default function InfoOverlay() {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <View style={infoOverlayStyles.topContainer}>
                <Pressable onPress={() => setIsOpen(true)}>
                    <MaterialCommunityIcons
                        name="help-circle-outline"
                        style={infoOverlayStyles.iconStyle}
                    />
                </Pressable>
            </View>
        );
    } else {
        return (
            <TouchableOpacity
                style={infoOverlayStyles.fullScreenContainer}
                activeOpacity={1}
                onPress={() => setIsOpen(false)}
            >
                <View style={infoOverlayStyles.topContainer}>
                    <Pressable onPress={() => setIsOpen(false)}>
                        <MaterialCommunityIcons
                            name="close-circle-outline"
                            style={infoOverlayStyles.iconStyle}
                        />
                    </Pressable>
                </View>

                <View style={infoOverlayStyles.overviewContainer}>
                    <Text style={infoOverlayStyles.header}>Overview</Text>
                    <View>
                        <Text style={infoOverlayStyles.explanationText}>
                            New to cribbage? This calculator helps you make the
                            best card choices by analyzing your hand, the crib,
                            and the number of players — whether you're aiming
                            for the highest possible score, guaranteeing a
                            minimum score, or the best average outcome.
                        </Text>
                    </View>
                    <View style={infoOverlayStyles.instructionContainer}>
                        <Text style={infoOverlayStyles.instructionHeader}>
                            How To Use
                        </Text>
                        <Text style={infoOverlayStyles.stepHeader}>
                            1) Select Cards
                        </Text>
                        <Text style={infoOverlayStyles.explanationText}>
                            Click on any of the bottom cards and select which
                            cards are in your hand from the popup.
                        </Text>
                        <Image
                            source={require("@/assets/images/SelectCribCards.png")}
                            style={infoOverlayStyles.selectCardsImage}
                        />
                        <Text style={infoOverlayStyles.stepHeader}>
                            2) Toggle Crib and Player Count
                        </Text>
                        <Text style={infoOverlayStyles.explanationText}>
                            Adjust the toggles to reflect if its your's or your
                            opponents crib, and how many players there are.
                        </Text>
                        <Image
                            source={require("@/assets/images/TogglePicture.png")}
                            style={infoOverlayStyles.toggleImage}
                        />
                        <Text style={infoOverlayStyles.stepHeader}>
                            3) Choose Hand
                        </Text>
                        <Text style={infoOverlayStyles.explanationText}>
                            Decide whether you want to pick the best hand on
                            average, hand with the highest possible score, or
                            the hand that has the highest base score.
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
