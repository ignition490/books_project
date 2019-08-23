import React, { Component } from "react";
import { View, FlatList } from "react-native";
import _ from "lodash";
import FlatListItem from "./FlatListItem";
import { connect } from "react-redux";
import {
  searchBooks,
  queryUpdate,
  changeRefreshState,
  changeShelf
} from "../actions";
import { SearchBar } from "react-native-elements";
import * as BooksAPI from "../../BooksAPI";
class BookSearch extends Component {
  handleStateChange = (book, shelf) => {
    this.props.searchResult.map(item => {
      if (item.id === book.id) {
        this.props.changeRefreshState(1);
        this.props.changeShelf(book, shelf);
      }
    });
    if (!this.props.refresh) {
      book.shelf = shelf;
      return { books: [...state.books, book] };
    } else {
      this.props.changeRefreshState(0);
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
        {JSON.stringify(this.props.searchResult) !==
        JSON.stringify(this.props.auxiliar) ? (
          <FlatList
            data={this.props.searchResult}
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
        ) : (
          <FlatList
            data={[]}
            renderItem={({ item, index }) => {
              return <FlatListItem item={item} index={index} />;
            }}
            keyExtractor={(item, index) => item + index}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader(query)}
          />
        )}
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
  const { books, searchResult, query, auxiliar } = state.books;

  return { books, searchResult, query, auxiliar };
};

export default connect(
  mapStateToProps,
  { searchBooks, queryUpdate, changeRefreshState, changeShelf }
)(BookSearch);
