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
        textDecorationLine: "underline",
        fontWeight: "bold",
        fontSize: 20,
    },
    cardContainer: {
        backgroundColor: colors.white,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        height: 75,
        width: 50,
        gap: 2,
    },
    text: {
        color: colors.toggleActive,
        fontSize: 15,
        fontWeight: "500",
        marginVertical: 5,
    },
    subtext: {
        color: colors.white,
        fontSize: 12.5,
        fontWeight: "500",
    },
    valueText: {
        color: colors.toggleActive,
        fontSize: 12.5,
        fontWeight: "900",
    },
    optionContainer: {
        flexDirection: "column",
    },
    cardSection: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    keepSection: {
        flexDirection: "column",
        color: colors.green,
    },
    cardFlex: {
        flexDirection: "row",
        gap: 3,
    },
    throwSection: {
        flexDirection: "column",
        color: colors.red,
    },
    statsContainer: {
        marginVertical: 10,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    statisticContainer: {
        flexDirection: "row",
        gap: 5,
        width: "50%",
    },
    suitIcon: {
        fontSize: 29,
        marginTop: 5,
    },
    rankStyle: {
        fontSize: 25,
        fontWeight: "bold",
    },
    redCard: {
        color: colors.red,
    },
    blackCard: {
        color: colors.black,
    },
    highlight: {
        borderWidth: 3,
        borderColor: colors.toggleActive,
    },
    emptyCard: {
        fontSize: 40,
        fontWeight: "bold",
        color: colors.grey,
    },
});
