import { combineReducers } from "redux";
import { comicsList } from "../modules/comics/reducers";
import { charactersList } from "../modules/characters/reducers";
export default combineReducers({
  comicsList,
  charactersList
});
