import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    Dimensions,
} from "react-native";
import defaultStyles from "../constants/default-styles";
import colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
        Dimensions.get("window").width
    );
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
        Dimensions.get("window").height
    );

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceHeight(Dimensions.get("window").height);
            setAvailableDeviceWidth(Dimensions.get("window").width);
        };

        Dimensions.addEventListener("change", updateLayout);

        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        };
    });

    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={defaultStyles.title}>The Game is over !</Text>
                <View
                    style={{
                        ...styles.imageContainer,
                        ...{
                            width: availableDeviceWidth * 0.7,
                            height: availableDeviceWidth * 0.7,
                            borderRadius: (availableDeviceWidth * 0.7) / 2,
                            marginVertical: availableDeviceHeight / 20,
                        },
                    }}>
                    <Image
                        style={styles.image}
                        source={require("../assets/success.png")}
                        resizeMode='cover'
                    />
                </View>
                {/* text inherit the styles this is the only exception */}
                <View
                    style={{
                        ...styles.resultContainer,
                        ...{ marginVertical: availableDeviceHeight / 40 },
                    }}>
                    <Text
                        style={{
                            ...styles.resultText,
                            ...defaultStyles.bodyText,
                            ...{
                                fontSize: availableDeviceHeight < 400 ? 16 : 20,
                            },
                        }}>
                        Your phone needed{" "}
                        <Text style={styles.highlight}>{props.rounds}</Text>{" "}
                        rounds to guess the number{" "}
                        <Text style={styles.highlight}>{props.usrNumber}</Text>.
                    </Text>
                </View>
                <MainButton onPress={props.newGame}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        borderWidth: 3,
        borderColor: "black",
        overflow: "hidden",
    },
    resultContainer: {
        marginHorizontal: 40,
    },
    highlight: {
        color: colors.primary,
        fontFamily: "open-sans-bold",
    },
    resultText: {
        textAlign: "center",
    },
});

export default GameOverScreen;
