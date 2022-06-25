import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    Button,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import defaultStyles from "../constants/default-styles";

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const [buttonWidth, setButtonWidth] = useState(
        Dimensions.get("window").width / 4
    );

    const numberInputHandler = (inputText) => {
        //drop any non numeric value
        setEnteredValue(inputText.replace(/[^0-9]/g, ""));
    };

    const resetInputHandler = () => {
        setEnteredValue("");
    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get("window").width / 4);
        };
        Dimensions.addEventListener("change", updateLayout);
        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        };
    });

    const confirmInputHanler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                "Invalid Number",
                "Value must be a number between 1 and 99.",
                [
                    {
                        text: "OK",
                        style: "destructive",
                        onPress: resetInputHandler,
                    },
                ]
            );
            return;
        }
        setConfirmed(true);
        setSelectedValue(chosenNumber);
        setEnteredValue("");
        Keyboard.dismiss();
    };

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You Selected</Text>
                <NumberContainer>{selectedValue}</NumberContainer>
                <MainButton
                    onPress={props.onStartGame.bind(this, selectedValue)}>
                    START GAME
                </MainButton>
            </Card>
        );
    }

    return (
        //we will wrap it by this component to listen to touches and close the keyboard
        <ScrollView>
            <KeyboardAvoidingView
                behavior='position'
                keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a New Game!</Text>
                        <Card style={styles.inputContainer}>
                            <Text style={defaultStyles.bodyText}>
                                Select a Number
                            </Text>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                keyboardType='number-pad'
                                autoCorrect={false}
                                maxLength={2}
                                autoCapitalize='none'
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{ width: buttonWidth }}>
                                    <Button
                                        title='Reset'
                                        color={colors.accent}
                                        onPress={resetInputHandler}
                                    />
                                </View>
                                <View style={{ width: buttonWidth }}>
                                    <Button
                                        title='Confirm'
                                        color={colors.primary}
                                        onPress={confirmInputHanler}
                                    />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    inputContainer: {
        width: "80%",
        maxWidth: "95%",
        minWidth: 300,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: "open-sans-bold",
    },
    // button: {
    //     // width: 100,
    //     width: Dimensions.get("window").width / 4,
    // },
    input: {
        width: 50,
        textAlign: "center",
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center",
    },
});

export default StartGameScreen;
