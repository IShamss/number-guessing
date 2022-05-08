import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
//this is a presentational component - applies styles to the passed component
const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;
