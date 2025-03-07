import React from "react";
import { View, Text } from "react-native";
import InputContainer from "@/components/InputContainer";
import RankingsContainer from "@/components/RankingsContainer";
import { mainStyles } from "@/styles/mainStyles";

export default function RootLayout() {
    return (
        <View style={mainStyles.pageContainer}>
            <RankingsContainer />
            <InputContainer />
        </View>
    );
}
