import React, { PureComponent } from "react";

import ComicsSearchFilter from "../modules/comics/containers/SearchFilter";
import ComicsList from "../modules/comics/containers/ComicsList";
import { fetchComics } from "../modules/comics/actions";
const Comics = () =>(<div>
  <h3>Comics</h3>
  <hr />
  <ComicsSearchFilter />
  <ComicsList />
</div>)

export default (Comics);
