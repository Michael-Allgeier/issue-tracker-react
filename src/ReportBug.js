import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

function ReportBug({auth, showError, showSuccess}) {
  const [bugTitle, setBugTitle] = useState('');
  const [bugDescription, setBugDescription] = useState('');
  const [bugStepsToReproduce, setBugStepsToReproduce] = useState('');
  const [addBugSuccess, setAddBugSuccess] = useState('');
  const [addBugError, setAddBugError] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const bugTitleError = !bugTitle ? 'Title is required' : '';
  const bugDescriptionError = !bugDescription ? 'Description is required' : '';
  const bugStepsToReproduceError = !bugStepsToReproduce ? 'Steps to Reproduce is required' : '';

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
  }

  function onClickAddBug(evt) {
    evt.preventDefault();

    if (!auth) {
      setError('Must be Logged In');
      setPending(false);
      return;
    }

    setAddBugError('');
    setAddBugSuccess('');
    setPending(true);

    if (bugTitleError || bugDescriptionError || bugStepsToReproduceError) {
      setAddBugError('Please Fix Errors');
      showError('Please Fix Errors');
      setPending(false);
      return;
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
      navigate('/bug/list');
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
    <div className="AddBug mb-5 p-3">
        <h1 className="text-center AddBug-Header">Create Bug</h1>
        {pending && (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {error && <div className="AddBug-Error text-danger text-center fs-4 my-4 bg-dark">{error}</div>}
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
          {addBugError && (<div className="text-danger mt-2">{addBugError}</div>)}
          {addBugSuccess && (<div className="text-success mt-2">{addBugSuccess}</div>)}
        </form>
      </div>
  );
}

export default ReportBug;