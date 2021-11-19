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
      headers: {
        authorization: `Bearer ${auth?.token}`
      }
    })
    .then(res => {
      setPending(false);
      if (_.isArray(res.data)) {
        setItems(res.data);
        showSuccess('Bugs Loaded!');
      } else {
        setError('Expected an array');
        showError('Expected an array');
      }
    })
    .catch(err => {
      setPending(false);
      setError(err.message);
      showError(err.message);
    });
  }, [auth, showError, showSuccess])

  return (
    <div>
      <h1>Bug List</h1>
      {pending && (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && <div className="text-danger">{error}</div>}
      {!pending && !error && _.isEmpty(items) && (<div>No Pets Found</div>)}
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