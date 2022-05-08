import React from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";
import defaultStyles from "../constants/default-styles";
import colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text style={defaultStyles.title}>The Game is over !</Text>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require("../assets/success.png")}
                    resizeMode='cover'
                />
            </View>
            {/* text inherit the styles this is the only exception */}
            <View style={styles.resultContainer}>
                <Text
                    style={{ ...styles.resultText, ...defaultStyles.bodyText }}>
                    Your phone needed{" "}
                    <Text style={styles.highlight}>{props.rounds}</Text> rounds
                    to guess the number{" "}
                    <Text style={styles.highlight}>{props.usrNumber}</Text>.
                </Text>
            </View>
            <MainButton onPress={props.newGame}>NEW GAME</MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: "black",
        overflow: "hidden",
        marginVertical: 30,
    },
    resultContainer: {
        marginHorizontal: 40,
        marginVertical: 15,
    },
    highlight: {
        color: colors.primary,
        fontFamily: "open-sans-bold",
    },
    resultText: {
        textAlign: "center",
        fontSize: 20,
    },
});

export default GameOverScreen;
