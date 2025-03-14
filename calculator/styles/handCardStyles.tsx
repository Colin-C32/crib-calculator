import { StyleSheet } from "react-native";
import { colors } from "@/styles/constants";

export const handCardStyles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.white,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        height: 78.75,
        width: 56.25,
    },
    suitIcon: {
        fontSize: 30,
        marginTop: 5,
    },
    rankStyle: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 5,
    },
    redCard: {
        color: colors.red,
    },
    blackCard: {
        color: colors.black,
    },
    highlight: {
        borderWidth: 3,
        borderColor: colors.blue,
    },
    emptyCard: {
        fontSize: 40,
        fontWeight: "bold",
        color: colors.grey,
    },
});
