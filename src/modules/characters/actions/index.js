import {
  CHARACTER_SELECT,
  CHARACTER_FETCH,
  CHARACTER_FETCH_SUCCESS,
  CHARACTER_FETCH_FAILURE
} from "../constants/ActionTypes";
import { CALL_API } from "redux-api-middleware";
import { normalize, schema } from "normalizr";

import * as services from "../../../services";

export const selectCharacter = id => ({ type: CHARACTER_SELECT, id });
export const fetchCharacters = () => {
  return {
    [CALL_API]: {
      types: [
        CHARACTER_FETCH,
        {
          type: CHARACTER_FETCH_SUCCESS,
          payload: (action, state, response) => {
            return response.json().then(rawData => {
              const processStrategy = value => ({
                ...value,
                comics: value.comics.items,
                series: value.series.items,
                stories: value.stories.items,
                events: value.events.items
              });
              const character = new schema.Entity(
                "charactersById",
                {},
                { processStrategy }
              );
              const { offset, limit, total, count } = rawData.data;
              const { entities, result } = normalize(rawData.data.results, [
                character
              ]);
              const { charactersById } = entities;
              return { offset, limit, total, count, charactersById, result };
            });
          }
        },
        CHARACTER_FETCH_FAILURE
      ],
      endpoint: services.CHARACTERS_FETCH,
      method: "GET"
    }
  };
};
