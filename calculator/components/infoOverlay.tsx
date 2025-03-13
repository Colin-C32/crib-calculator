import React, { useState } from "react";
import { Pressable, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { infoOverlayStyles } from "@/styles/infoOverlayStyles";
import { colors } from "@/styles/constants";

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

                <View style={infoOverlayStyles.instructionContainer}>
                    <Text style={infoOverlayStyles.header}>Overview</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
