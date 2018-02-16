import {
  COMICS_SELECT,
  COMICS_FILTER_SELECT,
  COMICS_FILTER_FETCH,
  COMICS_FETCH,
  COMICS_FETCH_SUCCESS,
  COMICS_FILTER_QUERY_CHANGE,
  COMICS_FILTER_FETCH_SUCCESS,
  COMICS_FILTER_SERIES_SELECT,
  COMIC_FILTER_OPTION_SELECT,
  COMICS_FILTER_TOGGLE_VIEW
} from "../constants/ActionTypes";
import { SEARCH_MODES } from "../constants";
import { union } from "lodash/Array";
const INITIAL_STATE = {
  offset: 0,
  limit: 0,
  total: 0,
  count: 0,
  result: [],
  comicsById: {},
  query: "",
  selectedFilterOption: null,
  selectedSearchModeId: SEARCH_MODES[0].id,
  isFilterMaximised: false,
  searchModes: SEARCH_MODES,
  isComicsLoading: false,
  isFilterLoading: false,
  filterOptions: [],
  selectedId: null
};
export function comicsList(state = INITIAL_STATE, action) {
  const { type } = action;

  switch (type) {
    case COMICS_FILTER_FETCH: {
      const isFilterLoading = true;
      return { ...state, isFilterLoading };
    }
    case COMICS_FETCH: {
      const isComicsLoading = true;
      return { ...state, isComicsLoading };
    }
    case COMICS_SELECT: {
      const { id } = action;
      const selectedId = id;
      return { ...state, selectedId };
    }
    case COMICS_FETCH_SUCCESS: {
      const { payload } = action;
      const isComicsLoading = false;

      let { offset, limit, total, count, result, comicsById } = payload;
      comicsById = { ...state.comicsById, ...comicsById };
      result = union(state.result, result);
      const isFilterLoading = false;
      return {
        ...state,
        offset,
        limit,
        total,
        count,
        result,
        comicsById,
        isFilterLoading,
        isComicsLoading
      };
    }
    case COMICS_FILTER_FETCH_SUCCESS: {
      const isComicsLoading = false;
      const { payload } = action;
      const filterOptions = payload;
      return { ...state, filterOptions };
    }
    case COMICS_FILTER_SERIES_SELECT: {
      const isComicsLoading = false;
      const { selectedSearchModeId } = action;
      const selectedFilterOption = null;
      const filterOptions = [];
      return {
        ...state,
        selectedSearchModeId,
        selectedFilterOption,
        filterOptions
      };
    }
    case COMIC_FILTER_OPTION_SELECT: {
      const { option } = action;
      const selectedFilterOption = option;
      const filterOptions = [];
      return { ...state, selectedFilterOption, filterOptions };
    }
    case COMICS_FILTER_QUERY_CHANGE: {
      const { query } = action;
      return { ...state, query };
    }
    case COMICS_FILTER_TOGGLE_VIEW: {
      const { isFilterMaximised } = action;
      return { ...state, isFilterMaximised };
    }
    default:
      return state;
  }
}
