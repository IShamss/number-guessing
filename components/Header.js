import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import colors from "../constants/colors";

const Header = (props) => {
    return (
        <View
            style={{
                ...styles.headerBase,
                ...Platform.select({
                    ios: styles.headerIOS,
                    android: styles.headerAndroid,
                }),
            }}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: "100%",
        height: 90,
        paddingTop: 39,
        alignItems: "center",
        justifyContent: "center",
    },
    headerIOS: {
        backgroundColor: "white",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    headerAndroid: {
        backgroundColor: colors.primary,
    },
    headerTitle: {
        color: "black",
        fontSize: 20,
        fontFamily: "open-sans-bold",
        color: Platform.OS === "ios" ? colors.primary : "white",
    },
});

export default Header;
