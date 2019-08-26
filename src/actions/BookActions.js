import * as BooksAPI from "../../BooksAPI";
import _ from "lodash";
import {
  BOOKS_UPDATE,
  SEARCH_BOOKS,
  QUERY_UPDATE,
  CHANGE_REFRESH_STATE,
  CHANGE_SHELF,
  ADD_BOOKS
} from "./types";

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

export const changeRefreshState = state => {
  return dispatch => {
    dispatch({ type: CHANGE_REFRESH_STATE, payload: state });
  };
};

export const changeShelf = (book, shelf) => {
  return dispatch => {
    dispatch({ type: CHANGE_SHELF, payload: { book, shelf } });
  };
};

export const addBooks = (book, shelf) => {
  return dispatch => {
    dispatch({ type: ADD_BOOKS, payload: { book, shelf } });
  };
};
