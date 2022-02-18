import {
  getNewsListStartAction,
  getNewsListErrorAction,
  getNewsListSuccessAction,
  getNewsPopularListSuccessAction,
} from "../actions/getNewsActions";
import {
  getNewsListRequest,
  getPopularNewsListRequest,
} from "../../../services/domain";

export const getNewsListThunk = (queryParams) => {
  return (dispatch) => {
    dispatch(getNewsListStartAction);
    return getNewsListRequest(queryParams)
      .then((response) => {
        dispatch(getNewsListSuccessAction(response.articles));
      })
      .catch((error) => {
        dispatch(getNewsListErrorAction(error));
      });
  };
};

export const getPopularNewsListThunk = () => {
  return (dispatch) => {
    dispatch(getNewsListStartAction);
    return getPopularNewsListRequest()
      .then((response) => {
        dispatch(getNewsPopularListSuccessAction(response.articles));
      })
      .catch((error) => {
        dispatch(getNewsListErrorAction(error));
      });
  };
};
