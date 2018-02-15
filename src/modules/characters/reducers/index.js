import {
  CHARACTER_SELECT,
  CHARACTER_FETCH_SUCCESS
} from "../constants/ActionTypes";
import { URL_LINKS } from "../constants";
const INITIAL_STATE = {
  offset: 0,
  limit: 0,
  total: 0,
  count: 0,
  result: [],
  charactersById: {},
  selectedId: null,
  urlLinks: URL_LINKS
};
export function charactersList(state = INITIAL_STATE, action) {
  const { type } = action;

  switch (type) {
    case CHARACTER_SELECT: {
      const { id } = action;
      return { ...state, selectedId: id };
    }
    case CHARACTER_FETCH_SUCCESS: {
      const { payload } = action;
      const { offset, limit, total, count, result, charactersById } = payload;
      return { ...state, offset, limit, total, count, result, charactersById };
    }
    default:
      return state;
  }
}
