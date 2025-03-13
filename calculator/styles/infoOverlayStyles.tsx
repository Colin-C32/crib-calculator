import { StyleSheet } from "react-native";
import { colors, viewportHeight, viewportWidth } from "@/styles/constants";

export const infoOverlayStyles = StyleSheet.create({
    topContainer: {
        position: "absolute",
        left: viewportWidth * 0.875,
        top: viewportHeight * 0.05,
        zIndex: 10,
    },
    fullScreenContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        top: 0,
        right: 0,
        height: viewportHeight,
        zIndex: 100,
        backgroundColor: colors.semiTransparentBackground,
        flexDirection: "column",
    },
    iconStyle: {
        fontSize: 35,
        color: colors.toggleActive,
    },
    instructionContainer: {
        marginTop: viewportHeight * 0.1,
        paddingHorizontal: viewportWidth * 0.05,
    },
    header: {
        color: colors.white,
        fontSize: 25,
        fontWeight: "700",
        alignSelf: "center",
    },
});
