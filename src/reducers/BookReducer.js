import { BOOKS_UPDATE, SEARCH_BOOKS, QUERY_UPDATE } from "../actions/types";

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
    default:
      return state;
  }
};
