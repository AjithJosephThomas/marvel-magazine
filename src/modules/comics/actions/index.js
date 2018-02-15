import {
  COMICS_SELECT,
  COMICS_FILTER_SELECT,
  COMICS_FILTER_QUERY_CHANGE,
  COMICS_FETCH,
  COMICS_FETCH_SUCCESS,
  COMICS_FETCH_FAILURE,
  COMICS_FILTER_FETCH,
  COMICS_FILTER_SERIES_SELECT,
  COMICS_FILTER_FETCH_SUCCESS,
  CHARACTERS_FETCH,
  CHARACTERS_FETCH_SUCCESS,
  CHARACTERS_FETCH_FAILURE,
  COMIC_FILTER_OPTION_SELECT
} from "../constants/ActionTypes";
import { CALL_API } from "redux-api-middleware";
import { normalize, schema } from "normalizr";

import * as services from "../../../services";
export const selectSearchMode = selectedSearchModeId => ({
  type: COMICS_FILTER_SERIES_SELECT,
  selectedSearchModeId
});
export const selectFilter = option => ({
  type: COMIC_FILTER_OPTION_SELECT,
  option
});
export const onQueryChange = query => ({
  type: COMICS_FILTER_QUERY_CHANGE,
  query
});
export const selectComic = id => ({ type: COMICS_SELECT, id });
export const fetchComics = queryObj => {
  return {
    queryObj,
    [CALL_API]: {
      types: [
        COMICS_FETCH,
        {
          type: COMICS_FETCH_SUCCESS,
          payload: (action, state, response) => {
            return response.json().then(rawData => {
              const processStrategy = value => ({
                ...value,
                characters: value.characters.items,
                creators: value.creators.items
              });
              const comic = new schema.Entity(
                "comicsById",
                {},
                { processStrategy }
              );
              const { offset, limit, total, count } = rawData.data;
              const { entities, result } = normalize(rawData.data.results, [
                comic
              ]);
              const { comicsById } = entities;
              return { offset, limit, total, count, comicsById, result };
            });
          }
        },
        COMICS_FETCH_FAILURE
      ],
      endpoint: services.COMICS_FETCH,
      method: "GET"
    }
  };
};
export const fetchCharacters = query => {
  const queryObj = { nameStartsWith: query };
  return {
    queryObj,
    [CALL_API]: {
      types: [
        COMICS_FILTER_FETCH,
        {
          type: COMICS_FILTER_FETCH_SUCCESS,
          payload: (action, state, response) => {
            return response.json().then(rawData => {
              return rawData.data.results.map(item => {
                const { id, name } = item;
                const value = id;
                const label = name;
                return { value, label };
              });
            });
          }
        },
        COMICS_FETCH_FAILURE
      ],
      endpoint: services.CHARACTERS_FETCH,
      method: "GET"
    }
  };
};
export const fetchSeries = query => {
  const queryObj = { titleStartsWith: query };
  return {
    queryObj,
    [CALL_API]: {
      types: [
        COMICS_FILTER_FETCH,
        {
          type: COMICS_FILTER_FETCH_SUCCESS,
          payload: (action, state, response) => {
            return response.json().then(rawData => {
              return rawData.data.results.map(item => {
                const { id, title } = item;
                const value = id;
                const label = title;
                return { value, label };
              });
            });
          }
        },
        COMICS_FETCH_FAILURE
      ],
      endpoint: services.SERIES_FETCH,
      method: "GET"
    }
  };
};
