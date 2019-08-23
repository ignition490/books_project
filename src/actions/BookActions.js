import { Actions } from "react-native-router-flux";
import * as BooksAPI from "../../BooksAPI";
import _ from "lodash";
import { BOOKS_UPDATE, SEARCH_BOOKS, QUERY_UPDATE } from "./types";

export const booksUpdate = ({}) => {
  return dispatch => {
    BooksAPI.getAll().then(response =>
      dispatch({ type: BOOKS_UPDATE, payload: response })
    );
  };
};

export const queryUpdate = query => {
  return dispatch => {
    dispatch({ type: QUERY_UPDATE, payload: query });
  };
};

export const searchBooks = query => {
  return dispatch => {
    BooksAPI.search(query).then(books => {
      dispatch({ type: SEARCH_BOOKS, payload: books });
    });
  };
};
