import { CALL_API, RSAA } from "redux-api-middleware";
import CryptoJS from "crypto-js";
import moment from "moment";
import { normalize, schema } from "normalizr";
import { paramsToSubStr } from "../parsers/endPointParser";
const PRIVATE_KEY = "022a55a7d2c04a04d1611f49fdce30dac148e0a1";
const PUBLIC_KEY = "27a0cb6328cd58ff67619f0219b5005f";
/**
 * Middleware to append the requests to Marvel api with keys.
 * also manages parsing query boject and ppending it to end point
 */
export const marvelRequestMiddleWare = store => next => action => {
  if (action[CALL_API]) {
    let { queryObj } = action;
    queryObj = queryObj ? queryObj : {};
    const rsaa = action[CALL_API];
    let { endpoint } = rsaa;
    const ts = moment().unix();
    const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString(
      CryptoJS.enc.Hex
    );
    const apikey = PUBLIC_KEY;

    //handle the request to get data by id;
    if (queryObj.id) {
      endpoint += `/${queryObj.id}`;
      delete queryObj.id;
    }
    const query = paramsToSubStr({ ...queryObj, apikey, ts, hash });
    if (query.length) {
      query;
      endpoint += `?${query}`;
    }

    rsaa.endpoint = endpoint;
    delete action.queryObj;
  }
  next(action);
};
