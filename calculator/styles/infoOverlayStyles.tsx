import { StyleSheet } from "react-native";
import { colors, viewportHeight, viewportWidth } from "@/styles/constants";

export const infoOverlayStyles = StyleSheet.create({
    topContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: viewportWidth * 0.05,
        marginBottom: viewportHeight * -0.05,
        zIndex: 100,
    },
    fullScreenContainer: {
        bottom: 0,
        left: 0,
        top: 0,
        right: 0,
        alignItems: "center",
        height: viewportHeight,
        zIndex: 10,
        backgroundColor: colors.transparentBackground,
    },
    iconStyle: {
        fontSize: 35,
        color: colors.white,
    },
});
