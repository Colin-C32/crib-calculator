import React from "react";
import { View, StatusBar } from "react-native";
import InputContainer from "@/components/InputContainer";
import RankingsContainer from "@/components/RankingsContainer";
import { mainStyles } from "@/styles/mainStyles";

export default function RootLayout() {
    return (
        <View style={mainStyles.pageContainer}>
            <StatusBar hidden={true} />
            <RankingsContainer />
            <InputContainer />
        </View>
    );
}
