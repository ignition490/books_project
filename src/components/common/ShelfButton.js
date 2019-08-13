import React from "react";
import { TouchableWithoutFeedback, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as BooksAPI from "../../../BooksAPI";

const ShelfButton = ({
  id,
  shelf,
  currentShelf,
  animation,
  handleStateChange
}) => {
  const styles = {
    button: {
      width: 35,
      height: 35,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#333",
      shadowOpacity: 0.1,
      shadowOffset: { x: 2, y: 0 },
      shadowRadius: 2,
      borderRadius: 30,
      position: "absolute",
      bottom: 0,
      right: 10
    },
    other: {
      backgroundColor: "#FFF"
    },
    blocked: {
      backgroundColor: "#B22222"
    },
    readStyle: {
      transform: [
        { scale: animation },
        {
          translateX: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -100]
          })
        }
      ]
    },
    wantToReadStyle: {
      transform: [
        { scale: animation },
        {
          translateX: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -150]
          })
        }
      ]
    },
    currentlyReadingStyle: {
      transform: [
        { scale: animation },
        {
          translateX: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -200]
          })
        }
      ]
    }
  };

  const {
    button,
    other,
    blocked,
    currentlyReadingStyle,
    wantToReadStyle,
    readStyle
  } = styles;
  console.log(id, shelf);

  return shelf != currentShelf ? (
    <TouchableWithoutFeedback
      onPress={() => {
        BooksAPI.moveToShelf({ id }, { shelf });
        handleStateChange({ id }, { shelf });
      }}
    >
      <Animated.View style={[button, other, currentShelf.concat("Style")]}>
        <Icon name="book" size={20} color="#555" />
      </Animated.View>
    </TouchableWithoutFeedback>
  ) : (
    <TouchableWithoutFeedback disabled>
      <Animated.View style={[button, blocked, currentShelf.concat("Style")]}>
        <Icon name="book" size={20} color="#FFF" />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export { ShelfButton };
