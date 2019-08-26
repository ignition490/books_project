import React, { Component } from "react";
import { View, FlatList } from "react-native";
import _ from "lodash";
import FlatListItem from "./FlatListItem";
import { connect } from "react-redux";
import { searchBooks, queryUpdate, changeShelf, addBooks } from "../actions";
import { SearchBar } from "react-native-elements";

class BookSearch extends Component {
  handleStateChange = (book, shelf) => {
    var aux = 0;
    this.props.books.map(item => {
      if (item.id === book.id) {
        aux = 1;
        this.props.changeShelf(book, shelf);
      }
    });
    if (!aux) {
      this.props.addBooks(book, shelf);
    }
  };

  handleSearch = query => {
    this.props.queryUpdate(query);
    this.props.searchBooks(query);
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = query => {
    return (
      <SearchBar
        placeholder="¡Presiona acá!..."
        lightTheme
        round
        onChangeText={this.handleSearch}
        value={query}
      />
    );
  };

  render() {
    const { query } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={
            JSON.stringify(this.props.searchResult) !==
            JSON.stringify(this.props.auxiliar)
              ? this.props.searchResult
              : []
          }
          renderItem={({ item, index }) => {
            return (
              <FlatListItem
                item={item}
                index={index}
                handleStateChange={this.handleStateChange}
              />
            );
          }}
          keyExtractor={(item, index) => item + index}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader(query)}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  search: {
    backgroundColor: "#429A6C"
  }
};

const mapStateToProps = state => {
  const { books, searchResult, query, auxiliar, refresh } = state.books;

  return { books, searchResult, query, auxiliar, refresh };
};

export default connect(
  mapStateToProps,
  { searchBooks, queryUpdate, changeShelf, addBooks }
)(BookSearch);
