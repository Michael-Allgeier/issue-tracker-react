import _ from "lodash";
import { useState, useEffect } from "react";
import axios from 'axios';
import BugListItem from "./BugListItem";
import InputField from './InputField'

function BugList({ auth, showError, showSuccess }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [addBugError, setAddBugError] = useState('');
  const [addBugSuccess, setAddBugSuccess] = useState('');
  const [pending, setPending] = useState(true);
  const [bugTitle, setBugTitle] = useState('');
  const [bugDescription, setBugDescription] = useState('');
  const [bugStepsToReproduce, setBugStepsToReproduce] = useState('');

  const bugTitleError = !bugTitle ? 'Bug Title is required' : '';
  const bugDescriptionError = !bugDescription ? 'Bug Description is required' : '';
  const bugStepsToReproduceError = !bugStepsToReproduce ? 'Bug Steps to Reproduce is required' : '';

  useEffect(() => {
    if(!auth) {
      setError('Must be Logged In');
      setPending(false);
      return;
    }

    setPending(true);
    setError('');
    axios(`${process.env.REACT_APP_API_URL}/api/bug/list`, {
      method: 'get',
      params: {pageSize: 1000, role: 'TM'},
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

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
  }

  function onClickAddBug(evt) {
    evt.preventDefault();
    setAddBugError('');
    setAddBugSuccess('');
    setPending(true);

    if (!bugTitle || !bugDescription || !bugStepsToReproduce) {
      setAddBugError('Inputs can not be empty!');
      showError('Fix errors');
    }

    axios(`${process.env.REACT_APP_API_URL}/api/bug/new`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: {title: bugTitle, description: bugDescription, stepsToReproduce: bugStepsToReproduce}
    })
    .then((res) => {
      setPending(false);
      setAddBugSuccess('New Bug Added!');
      showSuccess('New Bug Added!');
      setAddBugError('');
      setBugTitle('');
      setBugDescription('');
      setBugStepsToReproduce('');
    })
    .catch((err) => {
      setPending(false);
        setAddBugSuccess('');
        const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === 'string') {
            setAddBugError(resError);
            showError(resError);
          } else if (resError.details) {
            setAddBugError(_.map(resError.details, (x) => <div>{x.message}</div>));
          } else {
            setAddBugError(JSON.stringify(resError));
          }
        } else {
          setAddBugError(err.message);
          showError(resError);
        }
    });
  }


  return (
    <div>
      <h1 className="text-center visually-hidden">Bug List</h1>
      {pending && (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <div className="BugList rounded">
        {error && <div className="text-danger text-center fs-4">{error}</div>}
        {!pending && !error && _.isEmpty(items) && (<div className="text-danger text-center fs-4">No Bugs Found</div>)}
        {_.map(items, item => (
          <BugListItem 
            key={item._id}
            item={item}
          />
        ))}
      </div>
      <div className="AddBug mt-3 p-3">
        <h2>Create Bug</h2>
        <form className="AddBug-Form">
          <label htmlFor="AddBug-Title" className="form-label">Title</label>
          <input id="AddBug-Title" className="form-control" type="text" value={bugTitle} onChange={(evt) => onInputChange(evt, setBugTitle)}/>
          <div className="text-danger">{bugTitleError}</div>
          <label htmlFor="AddBug-Description" className="form-label mt-2">Description</label>
          <textarea id="AddBug-Description" className="form-control" type="text" value={bugDescription} onChange={(evt) => onInputChange(evt, setBugDescription)}/>
          <div className="text-danger">{bugDescriptionError}</div>
          <label htmlFor="AddBug-StepsToReproduce" className="form-label mt-2">Steps To Reproduce</label>
          <textarea id="AddBug-StepsToReproduce" className="form-control" type="text" value={bugStepsToReproduce} onChange={(evt) => onInputChange(evt, setBugStepsToReproduce)}/>
          <div className="text-danger">{bugStepsToReproduceError}</div>
          <button className="btn btn-primary mt-2" type="submit" onClick={(evt) => onClickAddBug(evt)}>
            Add Bug
          </button>
        </form>
      </div>
    </div>
  );
}

export default BugList;