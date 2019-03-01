import {
  CHARACTER_SELECT,
  CHARACTER_FETCH,
  CHARACTER_FETCH_SUCCESS
} from "../constants/ActionTypes";
import { URL_LINKS } from "../constants";
import { union } from "lodash/Array";
const INITIAL_STATE = {
  offset: 0,
  limit: 0,
  total: 0,
  count: 0,
  result: [],
  charactersById: {},
  selectedId: null,
  urlLinks: URL_LINKS,
  isCharactersLoading:false
};
export function charactersList(state = INITIAL_STATE, action) {
  const { type } = action;

  switch (type) {
    case CHARACTER_SELECT: {
      const { id } = action;
      return { ...state, selectedId: id };
    }
    case CHARACTER_FETCH:{
      const isCharactersLoading = true;
      return { ...state, isCharactersLoading };
    }
    case CHARACTER_FETCH_SUCCESS: {
      const { payload } = action;
      const isCharactersLoading = false;
      let { offset, limit, total, count, result, charactersById } = payload;
      if(offset){
        result = union(state.result, result);
        charactersById = { ...state.charactersById, ...charactersById };
      }
      return { ...state, offset, limit, total, count, result, charactersById, isCharactersLoading };
    }
    default:
      return state;
  }
}
