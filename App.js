import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
    return Font.loadAsync({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
};

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);
    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError={(err) => console.log(err)}
            />
        );
    }

    const newGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    };

    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
    };

    const gameOverHandler = (roundsNum) => {
        setGuessRounds(roundsNum);
    };

    let content =
        userNumber && guessRounds <= 0 ? (
            <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
        ) : guessRounds > 0 ? (
            <GameOverScreen
                rounds={guessRounds}
                usrNumber={userNumber}
                newGame={newGameHandler}
            />
        ) : (
            <StartGameScreen onStartGame={startGameHandler} />
        );

    return (
        <View style={styles.screen}>
            <Header title='Guess a Number' />
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
