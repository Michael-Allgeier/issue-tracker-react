import { useState, useEffect } from 'react';
import _, { get } from 'lodash';
import axios from 'axios';
import UserListItem from './UserListItem';
import { FaSearch, FaFilter } from 'react-icons/fa';

function UserList({ auth, showError, showSuccess }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(true);
  const [searchKeywords, setSearchKeywords] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [maxAgeFilter, setMaxAgeFilter] = useState('');
  const [minAgeFilter, setMinAgeFilter] = useState('');
  const [sortByValue, setSortByValue] = useState('');

  useEffect(() => {
    if (!auth) {
      setError('Must be Logged In');
      setPending(false);
      return;
    }

    setPending(true);
    setError('');
    axios(`${process.env.REACT_APP_API_URL}/api/user/list`, {
      method: 'get',
      params: { pageSize: 1000 },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setPending(false);
        if (_.isArray(res.data)) {
          setItems(res.data);
          setError('');
          showSuccess('Users Loaded');
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

  function onClickSearch(evt) {
    evt.preventDefault();
    setPending(true);
    setError('');

    axios(`${process.env.REACT_APP_API_URL}/api/user/list`, {
      method: 'get',
      params: {
        pageSize: 100,
        keywords: searchKeywords,
        role: roleFilter,
        maxAge: maxAgeFilter,
        minAge: minAgeFilter,
        sortBy: sortByValue,
      },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    }).then((res) => {
      setPending(false);
      if (_.isArray(res.data)) {
        setItems(res.data);
        setError('');
        showError(null);
        showSuccess('Filters Applied!');
        const filterBtn = document.getElementById('UserList-ShowFilters');
        const filterList = document.getElementById('UserList-Filters');

        filterBtn.classList.add('d-none');
        filterList.classList.remove('d-none');
        filterList.classList.add('d-block');
      } else {
        setError('Expected an Array');
        showError('Expected an array');
      }
    });
  }

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
  }

  function onClickShowFilters(evt) {
    evt.preventDefault();
    const filterBtn = document.getElementById('UserList-ShowFilters');
    const filterList = document.getElementById('UserList-Filters');

    filterBtn.classList.add('d-none');
    filterList.classList.remove('d-none');
    filterList.classList.add('d-block');
  }

  return (
    <div>
      <h1 className="text-center visually-hidden">User List</h1>
      {pending && (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <div className="UserList bg-dark rounded">
        {error && <div className="text-danger text-center fs-4 my-4">{error}</div>}
        {!error && !pending && (
          <div className="p-3 border-bottom border-light">
            <div className="Search input-group mb-3">
              <label htmlFor="UserList-Search" className="form-label visually-hidden">
                Search
              </label>
              <input type="text" id="UserList-Search" className="form-control" value={searchKeywords} placeholder="Search List..." onChange={(evt) => onInputChange(evt, setSearchKeywords)}/>
              <button className="btn btn-primary" type="submit" onClick={(evt) => onClickSearch(evt)}>
                <FaSearch className="me-2 mb-1" />
                Search
              </button>
            </div>
            <button
              id="UserList-ShowFilters"
              className="btn btn-primary"
              type="submit"
              onClick={(evt) => onClickShowFilters(evt)}
            >
              <FaFilter className="me-2 mb-1" />
              Filter List
            </button>
            <div className="Filters d-none mt-5" id="UserList-Filters">
              <div className="mb-3">
                <label htmlFor="UserList-Filters-Role" className="form-label visually-hidden">
                  Role
                </label>
                <select
                  className="form-select"
                  id="UserList-Filters-Role"
                  value={roleFilter}
                  onChange={(evt) => onInputChange(evt, setRoleFilter)}
                >
                  <option value="">Select Role...</option>
                  <option value="DEV">DEV</option>
                  <option value="BA">BA</option>
                  <option value="TM">TM</option>
                  <option value="QA">QA</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="UserList-Filters-SortBy" className="form-label visually-hidden">
                  Sort By
                </label>
                <select
                  className="form-select"
                  id="UserList-Filters-SortBy"
                  value={sortByValue}
                  onChange={(evt) => onInputChange(evt, setSortByValue)}
                >
                  <option value="givenName">Given(First) Name</option>
                  <option value="familyName">Family(Last) Name</option>
                  <option value="role">Role</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="UserList-Filters-minAge" className="form-label visually-hidden">
                    Min Age
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="UserList-Filters-minAge"
                    value={minAgeFilter}
                    onChange={(evt) => onInputChange(evt, setMinAgeFilter)}
                    placeholder="Min Age..."
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="UserList-Filters-maxAge" className="form-label visually-hidden">
                    Max Age
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="UserList-Filters-maxAge"
                    value={maxAgeFilter}
                    onChange={(evt) => onInputChange(evt, setMaxAgeFilter)}
                    placeholder="Max Age..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {!pending && !error && _.isEmpty(items) && (
          <div className="text-danger text-center fs-4 my-4">No Users Found</div>
        )}
        {_.map(items, (item) => (
          <UserListItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default UserList;
