import _ from "lodash";
import { useState, useEffect } from "react";
import axios from 'axios';
import BugListItem from "./BugListItem";

function BugList({ auth, showError, showSuccess }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(true);

  useEffect(() => {
    setPending(true);
    setError('');
    axios(`${process.env.REACT_APP_API_URL}/api/bug/list`, {
      method: 'get',
      params: {pageSize: 1000, closed: true},
      headers: {
        authorization: `Bearer ${auth?.token}`
      }
    })
    .then(res => {
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
    .catch(err => {
      setPending(false);
      const resError = err?.response?.data?.error;
      if(resError) {
        if (typeof resError === 'string') {
          setError(resError);
          showError(resError);
        } else if (resError.details) {
          setError(_.map(resError.details, x => <div>{x.message}</div>))
        } else {
          setError(JSON.stringify(resError));
        }
      } else {
        setError(err.message);
        showError(resError);
      }
    });
  }, [auth, showError, showSuccess])

  return (
    <div>
      <h1 className="text-center">Bug List</h1>
      {pending && (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && <div className="text-danger">{error}</div>}
      {!pending && !error && _.isEmpty(items) && (<div>No Bugs Found</div>)}
      {_.map(items, item => (
        <BugListItem 
          key={item._id}
          item={item}
        />
      ))}
    </div>
  );
}

export default BugList;