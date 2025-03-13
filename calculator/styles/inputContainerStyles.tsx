import { FlatList, StyleSheet } from "react-native";
import { colors, viewportHeight, viewportWidth } from "@/styles/constants";

export const inputContainerStyles = StyleSheet.create({
    inputContainer: {
        position: "fixed",
        bottom: 0,
        height: viewportHeight * 0.3 - 30,
        paddingVertical: 30,
        justifyContent: "flex-end",
        flexDirection: "column",
    },
    modalContainer: {
        position: "absolute",
        bottom: viewportHeight * 0.28 - 30,
        alignItems: "center",
        height: viewportHeight * 0.72,
        paddingTop: viewportHeight * 0.49,
        zIndex: 10,
        backgroundColor: colors.transparentBackground,
    },
    selectorCardContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    playerCountContainer: {
        flexDirection: "row",
        height: viewportHeight * 0.1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: viewportWidth * 0.025,
    },
    players: {
        fontSize: 30,
        color: colors.white,
    },
    clearButton: {
        borderColor: colors.red,
        marginHorizontal: 5,
        borderRadius: 5,
        borderWidth: 2,
    },
    clearText: {
        color: colors.red,
        fontSize: 12.5,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    toggleContainer: {
        flexDirection: "row",
        marginHorizontal: 5,
        borderRadius: 5,
        borderColor: colors.toggleActive,
        borderWidth: 2,
    },
    toggleOption: {
        fontSize: 12.5,
        color: colors.toggleActive,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    activeToggle: {
        backgroundColor: colors.toggleActive,
        color: colors.white,
    },
    handContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        marginHorizontal: 15,
        marginVertical: 10,
    },
});
