import React, { Component } from "react";
import {
  View,
  SectionList,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SectionListItem from "./SectionListItem";
import { connect } from "react-redux";
import { booksUpdate, changeShelf } from "../actions";
import { Actions } from "react-native-router-flux";
import { Header } from "./common";

class BookList extends Component {
  componentDidMount() {
    this.props.booksUpdate({});
  }

  handleStateChange = (book, shelf) => {
    this.props.books.map(item => {
      if (item.id === book.id) {
        this.props.changeShelf(book, shelf);
      }
    });
  };

  dividingWeConquer() {
    this.shelfs.currentlyReading = [];
    this.shelfs.wantToRead = [];
    this.shelfs.read = [];
    return this.props.books.map(book => {
      if (book.shelf == "currentlyReading")
        this.shelfs.currentlyReading.push(book);
      if (book.shelf == "wantToRead") this.shelfs.wantToRead.push(book);
      if (book.shelf == "read") this.shelfs.read.push(book);
    });
  }

  shelfs = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  render() {
    this.dividingWeConquer();
    return (
      <View style={styles.container}>
        <Header headerText={"Mis Libros"} />
        <SectionList
          renderItem={({ item, index }) => {
            return (
              <SectionListItem
                handleStateChange={this.handleStateChange}
                item={item}
                index={index}
              />
            );
          }}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: "bold", left: 10, paddingTop: 10 }}>
              {title}
            </Text>
          )}
          sections={[
            {
              title:
                `Leyendo actualmente (` +
                this.shelfs.currentlyReading.length +
                `)`,
              data: this.shelfs.currentlyReading
            },
            {
              title: `Quisiera leerlo (` + this.shelfs.wantToRead.length + `)`,
              data: this.shelfs.wantToRead
            },
            {
              title: `Leído (` + this.shelfs.read.length + `)`,
              data: this.shelfs.read
            }
          ]}
          keyExtractor={(item, index) => item + index}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            Actions.bookSearch({});
          }}
        >
          <View style={[styles.button, styles.search]}>
            <Icon name="plus" size={20} color="#FFF" />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  button: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#333",
    shadowOpacity: 0.1,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: 20
  },
  search: {
    backgroundColor: "#429A6C"
  }
};

const mapStateToProps = state => {
  const { books } = state.books;

  return { books };
};

export default connect(
  mapStateToProps,
  { booksUpdate, changeShelf }
)(BookList);
