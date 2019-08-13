import React, { Component } from "react";
import {
  View,
  SectionList,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SectionListItem from "./SectionListItem";
import * as BooksAPI from "../../BooksAPI";
import { Actions } from "react-native-router-flux";
import { Header } from "./common";

class BookList extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      refresh: 0
    };
    this.handleStateChange = this.handleStateChange.bind(this);
    //this.refreshState = this.refreshState.bind(this);
  }

  handleStateChange(book, shelf) {
    this.setState(state => {
      const books = state.books.map(item => {
        if (item.id === book.id) {
          this.state.refresh = 1;
          return {
            ...item,
            shelf
          };
        } else {
          return item;
        }
      });
      if (!this.state.refresh) {
        book.shelf = shelf;
        return { books: [...state.books, book] };
      } else {
        return {
          books,
          refresh: 0
        };
      }
    });
  }

  /*refreshState() {
    console.log(this.state.refresh);
    this.setState(state => {
      if (state.refresh) {
        return { refresh: 0 };
      } else {
        return { refresh: 1 };
      }
    });
  }*/

  componentDidMount() {
    BooksAPI.getAll().then(response => this.setState({ books: response }));
  }

  dividingWeConquer() {
    this.shelfs.currentlyReading = [];
    this.shelfs.wantToRead = [];
    this.shelfs.read = [];
    return this.state.books.map(book => {
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
    console.log("render");
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
            Actions.bookSearch({
              handleStateChange: this.handleStateChange
            });
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

export default BookList;
