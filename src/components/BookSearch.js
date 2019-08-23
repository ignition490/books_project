import React, { Component } from "react";
import { View, FlatList } from "react-native";
import _ from "lodash";
import FlatListItem from "./FlatListItem";
import { connect } from "react-redux";
import { searchBooks, queryUpdate } from "../actions";
import { SearchBar } from "react-native-elements";
import * as BooksAPI from "../../BooksAPI";
class BookSearch extends Component {
  state = {
    books: [],
    auxiliar: { error: "empty query", items: [] },
    query: ""
  };

  handleSearch = query => {
    this.props.queryUpdate(query);
    _.debounce(() => this.props.searchBooks(query), 0);
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
    console.log(this.props);
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
                  handleStateChange={this.props.handleStateChange}
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

//export default BookSearch;

const mapStateToProps = state => {
  const { searchResult, query, auxiliar } = state.books;

  return { searchResult, query, auxiliar };
};

export default connect(
  mapStateToProps,
  { searchBooks, queryUpdate }
)(BookSearch);
