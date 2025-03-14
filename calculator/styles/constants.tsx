import { Dimensions } from "react-native";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

export const viewportWidth = windowDimensions.width;
export const viewportHeight = windowDimensions.height;

export const viewportScreenWidth = screenDimensions.width;
export const viewportScreenHeight = screenDimensions.height;

export const colors = {
    blue: "rgb(102, 179, 255)",
    red: "#ff5252",
    black: "#221F1F",
    white: "#fff",
    grey: "#979797",
    transparentBackground: "rgba(34, 31, 31, 0.73)",
    semiTransparentBackground: "rgba(34, 31, 31, 0.95)",
    yellow: "#ffe431",
    green: "rgb(100, 230, 88)",
};

export const fonts = {};
