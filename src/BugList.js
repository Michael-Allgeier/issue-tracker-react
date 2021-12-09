import _ from 'lodash';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BugListItem from './BugListItem';
import { FaSearch, FaFilter } from 'react-icons/fa';

function BugList({ auth, showError, showSuccess }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(true);
  const [searchKeywords, setSearchKeywords] = useState('');
  const [classificationFilter, setClassificationFilter] = useState('');
  const [maxAgeFilter, setMaxAgeFilter] = useState('');
  const [minAgeFilter, setMinAgeFilter] = useState('');
  const [openFilter, setOpenFilter] = useState(null);
  const [closedFilter, setClosedFilter] = useState(null);
  const [sortByValue, setSortByValue] = useState('');

  useEffect(() => {
    if (!auth) {
      setError('Must be Logged In');
      setPending(false);
      return;
    }

    setOpenFilter(true);
    setClosedFilter(false);

    setPending(true);
    setError('');
    axios(`${process.env.REACT_APP_API_URL}/api/bug/list`, {
      method: 'get',
      params: { pageSize: 100, closed: false, open: true },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setPending(false);
        if (_.isArray(res.data)) {
          setItems(res.data);
          setError('');
          showError(null);
          showSuccess('Bugs Loaded!');
        } else {
          setError('Expected an array');
          showError('Expected an array');
        }
      })
      .catch((err) => {
        setPending(false);
        const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === 'string') {
            setError(resError);
            showError(resError);
          } else if (resError.details) {
            setError(_.map(resError.details, (x) => <div>{x.message}</div>));
          } else {
            setError(JSON.stringify(resError));
          }
        } else {
          setError(err.message);
          showError(resError);
        }
      });
  }, [auth, showError, showSuccess]);

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
  }

  function onClickSearch(evt) {
    evt.preventDefault();
    setPending(true);
    setError('');

    axios(`${process.env.REACT_APP_API_URL}/api/bug/list`, {
      method: 'get',
      params: {
        pageSize: 100,
        keywords: searchKeywords,
        classification: classificationFilter,
        maxAge: maxAgeFilter,
        minAge: minAgeFilter,
        sortBy: sortByValue,
        open: openFilter,
        closed: closedFilter,
      },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setPending(false);
        if (_.isArray(res.data)) {
          setItems(res.data);
          setError('');
          showError(null);
          showSuccess('Filters Applied!');
          const filterBtn = document.getElementById('BugList-ShowFilters');
          const filterList = document.getElementById('BugList-Filters');

          filterBtn.classList.add('d-none');
          filterList.classList.remove('d-none');
          filterList.classList.add('d-block');
        } else {
          setError('Expected an array');
          showError('Expected an array');
        }
      })
      .catch((err) => {
        setPending(false);
        const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === 'string') {
            setError(resError);
            showError(resError);
          } else if (resError.details) {
            setError(_.map(resError.details, (x) => <div>{x.message}</div>));
          } else {
            setError(JSON.stringify(resError));
          }
        } else {
          setError(err.message);
          showError(resError);
        }
      });
  }

  function onClickCheckbox(evt) {
    evt.preventDefault();

    const currentValue = evt.currentTarget.value;
    const checked = evt.currentTarget.checked;

    if (checked) {
      if (currentValue === 'open') {
        setOpenFilter(true);
      }
      if (currentValue === 'closed') {
        setClosedFilter(true);
      }
    } else {
      if (currentValue === 'open') {
        setOpenFilter(false);
      }
      if (currentValue === 'closed') {
        setClosedFilter(false);
      }
    }
  }

  function onClickShowFilters(evt) {
    evt.preventDefault();
    const filterBtn = document.getElementById('BugList-ShowFilters');
    const filterList = document.getElementById('BugList-Filters');

    filterBtn.classList.add('d-none');
    filterList.classList.remove('d-none');
    filterList.classList.add('d-block');
  }

  return (
    <div>
      <h1 className="text-center visually-hidden">Bug List</h1>
      {pending && (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <div className="BugList bg-dark rounded">
        {error && <div className="text-danger text-center fs-4 my-4">{error}</div>}
        {!error && !pending && (
          <div className="p-3 border-bottom border-light">
            <div className="Search input-group mb-3">
              <label htmlFor="BugList-Search" className="form-label visually-hidden">
                Search
              </label>
              <input
                type="text"
                id="BugList-Search"
                className="form-control"
                value={searchKeywords}
                placeholder="Search List..."
                onChange={(evt) => onInputChange(evt, setSearchKeywords)}
              />
              <button className="btn btn-primary" type="submit" onClick={(evt) => onClickSearch(evt)}>
                <FaSearch className="me-2 mb-1" />
                Search
              </button>
            </div>
            <button
              id="BugList-ShowFilters"
              className="btn btn-primary"
              type="submit"
              onClick={(evt) => onClickShowFilters(evt)}
            >
              <FaFilter className="me-2 mb-1" />
              Filter List
            </button>
            <div className="Filters d-none mt-5" id="BugList-Filters">
              <div className="mb-3">
                <label htmlFor="Filters-Classification" className="form-label visually-hidden">
                  Classification
                </label>
                <select
                  className="form-select"
                  id="Filters-Classification"
                  value={classificationFilter}
                  onChange={(evt) => onInputChange(evt, setClassificationFilter)}
                >
                  <option value="">Select Classification...</option>
                  <option value="Unclassified">Unclassified</option>
                  <option value="Unapproved">Unapproved</option>
                  <option value="Approved">Approved</option>
                  <option value="Duplicate">Duplicate</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="Filters-SortBy" className="form-label visually-hidden">
                  Sort By
                </label>
                <select
                  className="form-select"
                  id="Filters-SortBy"
                  value={sortByValue}
                  onChange={(evt) => onInputChange(evt, setSortByValue)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="title">Title</option>
                  <option value="classification">Classification</option>
                  <option value="assignedTo">Assigned To</option>
                  <option value="createdBy">Created By</option>
                </select>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="Filters-minAge" className="form-label visually-hidden">
                    Min Age
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="Filters-minAge"
                    value={minAgeFilter}
                    onChange={(evt) => onInputChange(evt, setMinAgeFilter)}
                    placeholder="Min Age..."
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="Filters-maxAge" className="form-label visually-hidden">
                    Max Age
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="Filters-maxAge"
                    value={maxAgeFilter}
                    onChange={(evt) => onInputChange(evt, setMaxAgeFilter)}
                    placeholder="Max Age..."
                  />
                </div>
              </div>
              <div>
                <span className="fs-5">
                  {openFilter === true ? (
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value="open"
                      id="Filters-Open"
                      onChange={(evt) => onClickCheckbox(evt)}
                      defaultChecked
                    />
                  ) : (
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value="open"
                      id="Filters-Open"
                      onChange={(evt) => onClickCheckbox(evt)}
                    />
                  )}
                  <label htmlFor="Filters-Open" className="form-label ms-1">
                    Open
                  </label>
                </span>
                <span className="ms-3 fs-5">
                  {closedFilter === true ? (
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value="closed"
                      id="Filters-Close"
                      onChange={(evt) => onClickCheckbox(evt)}
                      defaultChecked
                    />
                  ) : (
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value="closed"
                      id="Filters-Close"
                      onChange={(evt) => onClickCheckbox(evt)}
                    />
                  )}
                  <label htmlFor="Filters-Close" className="form-label ms-1">
                    Closed
                  </label>
                </span>
              </div>
            </div>
          </div>
        )}
        {!pending && !error && _.isEmpty(items) && (
          <div className="text-danger text-center fs-4 my-4">No Bugs Found</div>
        )}
        {_.map(items, (item) => (
          <BugListItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default BugList;
