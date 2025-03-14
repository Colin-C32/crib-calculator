import { StyleSheet } from "react-native";
import { colors, viewportHeight, viewportWidth } from "@/styles/constants";

export const inputContainerStyles = StyleSheet.create({
    inputContainer: {
        position: "fixed",
        bottom: 0,
        height: viewportHeight * 0.25,
        paddingVertical: viewportHeight * 0.15,
        justifyContent: "flex-end",
        flexDirection: "column",
    },
    modalContainer: {
        position: "absolute",
        display: "flex",
        alignSelf: "center",
        alignItems: "center",
        height: viewportHeight * 0.8,
        bottom: viewportHeight * 0.25,
        width: viewportWidth,
        paddingTop: viewportHeight * 0.575,
        zIndex: 10,
        backgroundColor: colors.transparentBackground,
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    selectorCardContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-end",
    },
    playerCountContainer: {
        flexDirection: "row",
        height: viewportHeight * 0.1,
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: viewportWidth * 0.05,
    },
    players: {
        fontSize: 30,
        color: colors.white,
    },
    clearButton: {
        borderColor: colors.red,
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
        borderRadius: 5,
        borderColor: colors.blue,
        borderWidth: 2,
    },
    toggleOption: {
        fontSize: 12.5,
        color: colors.blue,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    activeToggle: {
        backgroundColor: colors.blue,
        color: colors.white,
    },
    handContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: viewportWidth * 0.05,
        marginVertical: viewportHeight * 0.01,
    },
});
