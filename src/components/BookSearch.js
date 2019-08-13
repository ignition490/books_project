import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import _ from "lodash";
import FlatListItem from "./FlatListItem";
import { SearchBar } from "react-native-elements";
import * as BooksAPI from "../../BooksAPI";
class BookSearch extends Component {
  state = {
    books: [],
    auxiliar: { error: "empty query", items: [] },
    query: ""
  };

  handleSearch = query => {
    this.setState(
      { query },
      _.debounce(
        () =>
          BooksAPI.search(this.state.query).then(books =>
            this.setState({ books })
          ),
        0
      )
    );
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

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    const { query } = this.state;

    return (
      <View style={styles.container}>
        {JSON.stringify(this.state.books) !==
        JSON.stringify(this.state.auxiliar) ? (
          <FlatList
            data={this.state.books}
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
            ListFooterComponent={this.renderFooter}
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
            ListFooterComponent={this.renderFooter}
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

export default BookSearch;
