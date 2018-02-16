import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  selectFilter,
  fetchCharacters,
  fetchSeries,
  fetchComics,
  onQueryChange,
  applyFilter,
  selectSearchMode,
  searchModes,
  toggleFilter
} from "../actions";
import Select from "react-select";
import Panel from "../../../components/Panel";
const SearchFilter = ({
  isComicsLoading,
  isFilterLoading,
  fetchCharacters,
  fetchSeries,
  fetchComics,
  applyFilter,
  toggleFilter,
  onQueryChange,
  query,
  searchModes,
  filterOptions,
  selectedSearchMode,
  selectSearchMode,
  selectedFilterOption,
  selectFilter,
  isFilterMaximised
}) => (
  <div className="row  mar-bottom">
    {!isFilterMaximised ? (
      <div className="col-xs-12">
        {!isComicsLoading ? (
          <button
            type="button"
            className="btn btn-sm btn-primary pull-right"
            onClick={evnt => toggleFilter(true)}
          >
            Filter
          </button>
        ) : null}
      </div>
    ) : (
      <div className="col-xs-12">
        <Panel
          title={"Filter By"}
          hasCloseButton={true}
          onClose={() => toggleFilter(false)}
        >
          <div className="col-xs-12 col-md-6">
            <div className="row">
              <div className=" mar-bottom col-xs-12">
                <div
                  className="btn-group btn-group-toggle"
                  data-toggle="buttons"
                >
                  {searchModes.map(mode => (
                    <label
                      key={mode.id}
                      className={`btn btn-primary btn-sm ${
                        selectedSearchMode.id === mode.id ? "active" : ""
                      }`}
                      onClick={() => selectSearchMode(mode.id)}
                    >
                      {mode.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="row">
              <div className=" col-xs-12">
                <Select
                  isLoading={false}
                  closeOnSelect={true}
                  onBlurResetsInput={false}
                  value={selectedFilterOption}
                  noResultsText={"Type to search"}
                  placeholder={selectedSearchMode.placeholder}
                  onInputChange={val => {
                    window.console.log(val);
                    onQueryChange(val);
                    if (val.length) {
                      switch (selectedSearchMode.id) {
                        case searchModes[0].id:
                          fetchCharacters(val);
                          break;
                        case searchModes[1].id:
                          fetchSeries(val);
                      }
                    } else {
                      selectFilter(null);
                    }
                  }}
                  onChange={option => {
                    if (option === null) {
                      selectFilter(null);
                      fetchComics();
                    } else {
                      selectFilter(option);
                      const { value } = option;
                      const { key } = selectedSearchMode;
                      const query = {};
                      query[key] = value;
                      fetchComics(query);
                    }
                  }}
                  options={filterOptions}
                />
              </div>
            </div>
          </div>
          <div className="mar-bottom col-xs-12 col-md-6 hidden">
            <div className="form-group mar-top">
              <label className="form-label mar-bottom">Name</label>
              <input className="form-control" type="text" />
            </div>
          </div>
        </Panel>
      </div>
    )}
  </div>
);

SearchFilter.propTypes = {
  selectedSearchMode: PropTypes.object,
  query: PropTypes.string,
  filterOptions: PropTypes.array,
  selectedFilterOption: PropTypes.object,
  searchModes: PropTypes.array
};
const mapStateToProps = (state, props) => {
  const {
    query,
    filterOptions,
    selectedSearchModeId,
    selectedFilterOption,
    searchModes,
    isFilterMaximised,
    isComicsLoading,
    isFilterLoading
  } = state.comicsList;
  const selectedSearchMode = searchModes[selectedSearchModeId];
  return {
    query,
    filterOptions,
    selectedSearchMode,
    searchModes,
    selectedFilterOption,
    isFilterMaximised,
    isComicsLoading,
    isFilterLoading
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCharacters,
      fetchSeries,
      applyFilter,
      onQueryChange,
      fetchComics,
      selectFilter,
      selectSearchMode,
      toggleFilter
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);
