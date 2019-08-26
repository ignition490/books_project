import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Image
} from "react-native";
//import { ShelfButton } from "./common";
import { handleStateChange } from "../actions";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import * as BooksAPI from "../../BooksAPI";

class SectionListItem extends Component {
  state = {
    animation: new Animated.Value(0)
  };

  toggleOpen = () => {
    const toValue = this._open ? 0 : 1;

    Animated.timing(this.state.animation, {
      toValue,
      duration: 200
    }).start();

    this._open = !this._open;
  };

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
        left: 20
      },
      option: {
        backgroundColor: "#00B15E"
      },
      other: {
        backgroundColor: "#FFF"
      },
      blocked: {
        backgroundColor: "#B22222"
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
      clearStyle: {
        transform: [
          { scale: this.state.animation },
          {
            translateX: this.state.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 180]
            })
          }
        ]
      },
      readStyle: {
        transform: [
          { scale: this.state.animation },
          {
            translateX: this.state.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 135]
            })
          }
        ]
      },
      wantToReadStyle: {
        transform: [
          { scale: this.state.animation },
          {
            translateX: this.state.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 90]
            })
          }
        ]
      },
      currentlyReadingStyle: {
        transform: [
          { scale: this.state.animation },
          {
            translateX: this.state.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 45]
            })
          }
        ]
      }
    };

    const {
      container,
      elementsContainer,
      button,
      option,
      other,
      thumbnailStyle,
      titleText,
      authorText,
      readStyle,
      wantToReadStyle,
      currentlyReadingStyle,
      clearStyle,
      blocked
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
              this.toggleOpen();
              BooksAPI.moveToShelf(this.props.item.id, " ");
              this.props.handleStateChange(this.props.item, " ");
            }}
          >
            <Animated.View style={[button, other, clearStyle]}>
              <Icon name="ban" size={20} color="#B22222" />
            </Animated.View>
          </TouchableWithoutFeedback>
          {this.props.item.shelf != "currentlyReading" ? (
            <TouchableWithoutFeedback
              onPress={() => {
                this.toggleOpen();
                BooksAPI.moveToShelf(this.props.item.id, "currentlyReading");
                this.props.handleStateChange(
                  this.props.item,
                  "currentlyReading"
                );
              }}
            >
              <Animated.View style={[button, other, currentlyReadingStyle]}>
                <Icon name="book" size={20} color="#555" />
              </Animated.View>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback disabled>
              <Animated.View style={[button, blocked, currentlyReadingStyle]}>
                <Icon name="book" size={20} color="#FFF" />
              </Animated.View>
            </TouchableWithoutFeedback>
          )}
          {this.props.item.shelf != "wantToRead" ? (
            <TouchableWithoutFeedback
              onPress={() => {
                this.toggleOpen();
                BooksAPI.moveToShelf(this.props.item.id, "wantToRead");
                this.props.handleStateChange(this.props.item, "wantToRead");
              }}
            >
              <Animated.View style={[button, other, wantToReadStyle]}>
                <Icon name="bookmark" size={20} color="#555" />
              </Animated.View>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback disabled>
              <Animated.View style={[button, blocked, wantToReadStyle]}>
                <Icon name="bookmark" size={20} color="#FFF" />
              </Animated.View>
            </TouchableWithoutFeedback>
          )}
          {this.props.item.shelf != "read" ? (
            <TouchableWithoutFeedback
              onPress={() => {
                this.toggleOpen();
                BooksAPI.moveToShelf(this.props.item.id, "read");
                this.props.handleStateChange(this.props.item, "read");
              }}
            >
              <Animated.View style={[button, other, readStyle]}>
                <Icon name="archive" size={20} color="#555" />
              </Animated.View>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback disabled>
              <Animated.View style={[button, blocked, readStyle]}>
                <Icon name="archive" size={20} color="#FFF" />
              </Animated.View>
            </TouchableWithoutFeedback>
          )}
          <TouchableWithoutFeedback onPress={this.toggleOpen}>
            <View style={[button, option]}>
              <Icon name="caret-down" size={15} color="#FFF" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { books, searchResult, query, auxiliar } = state.books;

  return { books, searchResult, query, auxiliar };
};

export default connect(
  mapStateToProps,
  { handleStateChange }
)(SectionListItem);
