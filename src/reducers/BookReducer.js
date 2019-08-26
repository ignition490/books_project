import {
  BOOKS_UPDATE,
  SEARCH_BOOKS,
  QUERY_UPDATE,
  CHANGE_REFRESH_STATE,
  CHANGE_SHELF,
  ADD_BOOKS
} from "../actions/types";

const INITIAL_STATE = {
  books: [],
  searchResult: [],
  auxiliar: { error: "empty query", items: [] },
  query: "",
  refresh: 0
};

export default (state = (state = INITIAL_STATE), action) => {
  switch (action.type) {
    case BOOKS_UPDATE:
      state.books = action.payload;
      return { ...state, books: action.payload };
    case SEARCH_BOOKS:
      state.searchResult = action.payload;
      return { ...state, searchResult: action.payload };
    case QUERY_UPDATE:
      state.query = action.payload;
      return { ...state, query: action.payload };
    case CHANGE_REFRESH_STATE:
      state.refresh = action.payload;
      return { ...state, refresh: action.payload };
    case CHANGE_SHELF:
      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.payload.book.id
            ? { ...book, shelf: action.payload.shelf }
            : book
        )
      };
    case ADD_BOOKS:
      return {
        ...state,
        books: state.books.concat(
          state.searchResult.map(book =>
            book.id === action.payload.book.id
              ? { ...book, shelf: action.payload.shelf }
              : book
          )
        )
      };
    default:
      return state;
  }
};
