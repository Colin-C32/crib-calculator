import { StyleSheet } from "react-native";
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
        bottom: viewportHeight * 0.3 - 30,
        alignItems: "center",
        zIndex: 10,
    },
    selectorCardContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
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
    toggleContainer: {
        flexDirection: "row",
        marginHorizontal: 5,
        borderRadius: 5,
        borderColor: colors.toggleActive,
        borderWidth: 2,
    },
    toggleOption: {
        fontSize: 17.5,
        color: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    activeToggle: {
        backgroundColor: colors.toggleActive,
    },
    handContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        marginHorizontal: 15,
        marginVertical: 10,
    },
});
