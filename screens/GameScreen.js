import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import defaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";

const generateNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateNumber(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (value, roundNum) => (
    <View style={styles.listItem} key={value}>
        <Text style={defaultStyles.bodyText}>#{roundNum}</Text>
        <Text style={defaultStyles.bodyText}>{value}</Text>
    </View>
);

const GameScreen = (props) => {
    const initialGuess = generateNumber(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
        Dimensions.get("window").width
    );
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
        Dimensions.get("window").height
    );
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get("window").width);
            setAvailableDeviceHeight(Dimensions.get("window").height);
        };
        Dimensions.addEventListener("change", updateLayout);
        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        };
    });

    useEffect(() => {
        if (currentGuess === userChoice) {
            //then the game is over
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);
    //if you use props.userchoice for example it renders when any of the props changes

    const nextGuessHandler = (direction) => {
        if (
            (direction === "lower" && currentGuess < props.userChoice) ||
            (direction === "greater" && currentGuess > props.userChoice)
        ) {
            Alert.alert(
                "Don't lie!",
                "You must enter the correct direction...",
                [{ test: "Sorry!", style: "cancel" }]
            );
            return;
        }
        if (direction === "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateNumber(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );
        setCurrentGuess(nextNumber);
        // setRounds((currentRounds) => currentRounds + 1);
        setPastGuesses((current) => [nextNumber, ...current]);
    };

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={defaultStyles.title}>Opponent's Guess</Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
                        <Ionicons name='md-remove' size={24} color='white' />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>

                    <MainButton
                        onPress={nextGuessHandler.bind(this, "greater")}>
                        <Ionicons name='md-add' size={24} color='white' />
                    </MainButton>
                </View>

                <View style={styles.listContainer}>
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) =>
                            renderListItem(guess, pastGuesses.length - index)
                        )}
                    </ScrollView>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={defaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card
                style={{
                    ...styles.buttonContainer,
                    ...{ marginTop: availableDeviceHeight > 600 ? 20 : 5 },
                }}>
                <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
                    <Ionicons name='md-remove' size={24} color='white' />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
                    <Ionicons name='md-add' size={24} color='white' />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) =>
                        renderListItem(guess, pastGuesses.length - index)
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: 300,
        maxWidth: "90%",
    },
    listItem: {
        borderColor: "#ccc",
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "60%",
    },
    listContainer: {
        width: Dimensions.get("window").width > 350 ? "60%" : "80%",
        // we need to add flex 1 here to work on android
        flex: 1,
    },
    list: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        // felxGrow: 1,
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
        alignItems: "center",
    },
});

export default GameScreen;
