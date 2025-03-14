import { StyleSheet } from "react-native";
import {
    colors,
    viewportHeight,
    viewportScreenHeight,
    viewportWidth,
} from "@/styles/constants";

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
        height: viewportScreenHeight,
        zIndex: 100,
        backgroundColor: colors.semiTransparentBackground,
        flexDirection: "column",
    },
    iconStyle: {
        fontSize: 35,
        color: colors.blue,
    },
    overviewContainer: {
        marginTop: viewportHeight * 0.075,
        paddingHorizontal: viewportWidth * 0.05,
        width: viewportWidth,
    },
    header: {
        color: colors.blue,
        fontSize: 25,
        fontWeight: "700",
        alignSelf: "center",
    },
    instructionContainer: {
        display: "flex",
        flexDirection: "column",
        marginTop: viewportHeight * 0.005,
    },
    instructionHeader: {
        color: colors.blue,
        fontSize: 25,
        fontWeight: "700",
        alignSelf: "center",
    },
    stepHeader: {
        color: colors.white,
        fontWeight: "500",
        fontSize: 20,
        marginTop: 5,
    },
    selectCardsImage: {
        alignSelf: "center",
        width: viewportWidth * 0.7,
        resizeMode: "contain",
        marginVertical: -250,
    },
    toggleImage: {
        width: viewportWidth * 0.9,
        resizeMode: "contain",
        marginVertical: -30,
    },
    explanationText: {
        color: colors.white,
        fontSize: 17.5,
        fontStyle: "italic",
    },
});
