import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        paddingTop: 39,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        color: "black",
        fontSize: 20,
        fontFamily: "open-sans-bold",
    },
});

export default Header;
