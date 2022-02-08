import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//Components
import { Spin, Pagination, Empty } from "antd";
import SettingsComponent from "./components/SettingsComponent/SettingsComponent";
import SearchNewsComponent from "./components/SearchNewsComponent/SearchNewsComponent";
import { StyledNewsConteiner } from "./styled.components";

//Thunks
import ArticleCard from "./components/ArticleConteiner";
import {
  getNewsListThunk,
  getSearchNewsListThunk,
  newsSortFreshThunk,
  newsSortOldThunk,
} from "../../../Domains/thunks/getNewsThunk";

//Constants
import {
  DEFAULT_MAX_VALUE,
  DEFAULT_MIN_VALUE,
  CURRENT_PAGE,
} from "./components/ArticleConteiner/constants";
import { createSelector } from "reselect";

// import { sortedListDateUp, sortedListDateDown } from "../../../Domains/reducers/getNews-selectors";

const NewsContainer = () => {
  const dispatch = useDispatch();
  const [minValue, setMinValue] = useState(DEFAULT_MIN_VALUE);
  const [maxValue, setMaxValue] = useState(DEFAULT_MAX_VALUE);
  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);
  const news = useSelector((state) => state.news);
  const { newsList, loading, error } = news;

  //Selector for sorting news
  const sortedListDateUp = createSelector(
    [(state) => state.newsList],
    (newsList) => {
      console.log("Create selector ", newsList);
      return newsList.sort((a, b) => {
        if (a.publishedAt > b.publishedAt) {
          return -1;
        } else if (a.publishedAt < b.publishedAt) {
          return 1;
        }
        return 0;
      });
    }
  );

  //Primary array news from Redux store
  console.log("Before sort", newsList);

  // Call selector at component render stage (work)
  // console.log("Sort", sortedListDateUp(news));

  useEffect(() => {
    dispatch(getNewsListThunk());
  }, []);

  const onChangePagination = (pageNumber) => {
    setCurrentPage(pageNumber);

    if (pageNumber <= 1) {
      setMinValue(DEFAULT_MIN_VALUE);
      setMaxValue(DEFAULT_MAX_VALUE);
    } else {
      setMinValue((pageNumber - 1) * DEFAULT_MAX_VALUE);
      setMaxValue(pageNumber * DEFAULT_MAX_VALUE);
    }
  };

  const onSearch = (value) => {
    dispatch(getSearchNewsListThunk(value));
  };

  const handleChangeSorting = (value) => {
    if (value === "publishedAtUp") {
      //Use selector if the user has selected the latest news (dosen't work)
      sortedListDateUp(news);
      return;
    }

    if (value === "publishedAtDown") {
      dispatch(newsSortOldThunk(newsList));
    }
  };

  return (
    <StyledNewsConteiner>
      <h1>News Container</h1>
      <SearchNewsComponent onSearch={onSearch} loading={loading} />
      <div className="news">
        {loading ? (
          <Spin style={{ fontSize: 36 }} />
        ) : (
          <React.Fragment>
            <SettingsComponent handleChange={handleChangeSorting} />
            <div className="news-articles">
              {newsList.slice(minValue, maxValue).map((article) => {
                return <ArticleCard article={article} key={article.url} />;
              })}
            </div>

            {!newsList.length && <Empty />}

            <Pagination
              defaultCurrent={CURRENT_PAGE}
              total={newsList.length}
              current={currentPage}
              defaultPageSize={DEFAULT_MAX_VALUE}
              onChange={onChangePagination}
              disabled={loading}
            />
          </React.Fragment>
        )}
      </div>
    </StyledNewsConteiner>
  );
};

export default React.memo(NewsContainer);
