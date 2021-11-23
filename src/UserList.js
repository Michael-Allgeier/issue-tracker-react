import { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import UserListItem from "./UserListItem";

function UserList({ auth, showError, showSuccess }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(true);

  useEffect(() => {
    setPending(true);
    setError('');
    axios(`${process.env.REACT_APP_API_URL}/api/user/list`, {
      method: 'get',
      params: {pageSize: 1000},
      headers: {
        authorization: `Bearer ${auth?.token}`
      }
    })
    .then(res => {
      setPending(false);
      if (_.isArray(res.data)) {
        setItems(res.data); 
        showSuccess('Users Loaded');
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
    })
  }, [auth, showError, showSuccess]);

  return (
    <div>
      <h1 className="text-center">User List</h1>
      {pending && (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && <div className="text-danger">{error}</div>}
      {!pending && !error && _.isEmpty(items) && (<div>No Users Found</div>)}
      {_.map(items, item => (
        <UserListItem 
          key={item._id}
          item={item}
        />
      ))}
    </div>
  );
}

export default UserList;