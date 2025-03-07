import { StyleSheet } from "react-native";
import { colors, viewportHeight, viewportWidth } from "@/styles/constants";

export const rankingsStyles = StyleSheet.create({
    rankingsContainer: {
        height: viewportHeight * 0.7,
        flexDirection: "column",
        justifyContent: "flex-start",
        marginHorizontal: 20,
        marginTop: 20,
    },
    rankingSectionContainer: {},
    rankingTitle: {
        color: colors.yellow,
        fontWeight: "bold",
        fontSize: 20,
    },
});
