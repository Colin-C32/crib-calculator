import { StyleSheet } from "react-native";
import { colors, viewportHeight, viewportWidth } from "@/styles/constants";

export const selectorCardStyles = StyleSheet.create({
    selectorContainer: {
        backgroundColor: colors.white,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        height: 42,
        width: 30,
        margin: 0.5,
    },
    suitIcon: {
        fontSize: 15,
        marginTop: 5,
    },
    rankStyle: {
        fontSize: 15,
        fontWeight: "bold",
    },
    redCard: {
        color: colors.red,
    },
    blackCard: {
        color: colors.black,
    },
    taken: {
        backgroundColor: colors.grey,
    },
});
