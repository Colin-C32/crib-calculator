import React, { useState } from "react";
import { Pressable, View, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { infoOverlayStyles } from "@/styles/infoOverlayStyles";

export default function InfoOverlay() {
    const [isOpen, setIsOpen] = useState(true);

    if (isOpen) {
        return (
            <View style={infoOverlayStyles.topContainer}>
                <Pressable onPress={() => setIsOpen(false)}>
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
            >
                <Pressable onPress={() => setIsOpen(true)}>
                    <MaterialCommunityIcons
                        name="close-circle-outline"
                        style={infoOverlayStyles.iconStyle}
                    />
                </Pressable>

                <View></View>
            </TouchableOpacity>
        );
    }
}
