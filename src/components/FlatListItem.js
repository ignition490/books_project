import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as BooksAPI from "../../BooksAPI";

class FlatListItem extends Component {
  render() {
    const styles = {
      container: {
        flex: 1,
        flexDirection: "row",
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10
      },
      elementsContainer: {
        flex: 1,
        flexDirection: "column"
      },
      button: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#333",
        shadowOpacity: 0.1,
        shadowOffset: { x: 2, y: 0 },
        shadowRadius: 2,
        borderRadius: 30,
        position: "absolute",
        top: 70
      },
      other: {
        backgroundColor: "#FFF"
      },
      thumbnailStyle: {
        height: 100,
        width: 80
      },
      titleText: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 20,
        marginRight: 10
      },
      authorText: {
        fontSize: 16,
        marginLeft: 20,
        marginRight: 10,
        color: "gray"
      },
      readStyle: {
        right: 20
      },
      wantToReadStyle: {
        right: 70
      },
      currentlyReadingStyle: {
        right: 120
      }
    };

    const {
      container,
      elementsContainer,
      button,
      other,
      thumbnailStyle,
      titleText,
      authorText,
      readStyle,
      wantToReadStyle,
      currentlyReadingStyle
    } = styles;

    return (
      <View style={container}>
        {this.props.item.imageLinks ? (
          <Image
            style={thumbnailStyle}
            source={{
              uri: this.props.item.imageLinks.thumbnail
            }}
          />
        ) : (
          <Image
            style={thumbnailStyle}
            source={{
              uri: "https://www.tanium.com/lib/imgs/global/icon-x-black.png"
            }}
          />
        )}
        <View style={elementsContainer}>
          <Text style={titleText}>{this.props.item.title}</Text>
          <Text style={authorText}>{this.props.item.authors}</Text>

          <TouchableWithoutFeedback
            onPress={() => {
              BooksAPI.moveToShelf(this.props.item.id, "currentlyReading");
              this.props.handleStateChange(this.props.item, "currentlyReading");
            }}
          >
            <Animated.View style={[button, other, currentlyReadingStyle]}>
              <Icon name="book" size={20} color="#555" />
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              BooksAPI.moveToShelf(this.props.item.id, "wantToRead");
              this.props.handleStateChange(this.props.item, "wantToRead");
            }}
          >
            <Animated.View style={[button, other, wantToReadStyle]}>
              <Icon name="bookmark" size={20} color="#555" />
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              BooksAPI.moveToShelf(this.props.item.id, "read");
              this.props.handleStateChange(this.props.item, "read");
            }}
          >
            <Animated.View style={[button, other, readStyle]}>
              <Icon name="archive" size={20} color="#555" />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

export default FlatListItem;
