import React from "react";
import { View, StatusBar } from "react-native";
import InputContainer from "@/components/InputContainer";
import RankingsContainer from "@/components/RankingsContainer";
import { HandProvider } from "@/hooks/handContext";
import { mainStyles } from "@/styles/mainStyles";

export default function RootLayout() {
    return (
        <HandProvider>
            <View style={mainStyles.pageContainer}>
                <StatusBar hidden={true} />
                <RankingsContainer />
                <InputContainer />
            </View>
        </HandProvider>
    );
}
