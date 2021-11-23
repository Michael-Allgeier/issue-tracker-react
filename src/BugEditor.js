import _ from "lodash";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import CommentItem from "./CommentItem";
import TestCaseItem from "./TestCaseItem";
import InputField from "./InputField";
import axios from "axios";
import SelectField from "./SelectField";

function BugEditor({ auth, showError, showSuccess }) {
  const { bugId } = useParams();
  const [bug, setBug] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [classification, setClassification] = useState('');
  const [assignedTo, setAssignedTo] = useState(null);
  const [closed, setClosed] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pending, setPending] = useState(true);
  const [users, setUsers] = useState(null);

  // const [newCommentText, setNewCommentText] = useState('');

  // const [newTestCaseTitle, setNewTestCaseTitle] = useState('');
  // const [newTestCaseBody, setNewTestCaseBody] = useState('');

  const titleError =
    !title ? 'Title is required' : '';
  
  const descriptionError =
    !description ? 'Description is required' : '';
  
  const stepsToReproduceError =
    !stepsToReproduce ? 'Steps to Reproduce is required' : '';

  useEffect(() => {
    setPending(true);
    setError('');
    setSuccess('');
    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}`, {
      method: 'get',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
    .then((res) => {
      setPending(false);
      setBug(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setStepsToReproduce(res.data.stepsToReproduce);
      setClassification(res.data.classification);
      setAssignedTo(res.data?.assignedTo?._id);
      setClosed(res.data.closed);
      showSuccess('Bug Loaded!');
    })
    .catch((err) => {
      setPending(false);
      setError(err.message);
      showError(err.message);
    })
  }, [auth, bugId, showError, showSuccess]);

  useEffect(() => {
    setError('');
    setSuccess('');
    axios(`${process.env.REACT_APP_API_URL}/api/user/list`, {
      method: 'get',
      params: {pageSize: 1000, sortBy: "givenName"},
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      setError(err.message);
      showError(err.message);
    })
  }, [auth, showError]);

  function onClickSubmitEdit(evt) {
    evt.preventDefault();

    if (titleError || descriptionError || stepsToReproduceError) {
      setError('Please fix errors');
      showError('Please fix errors');
      return;
    }

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`
      },
      data: {title, description, stepsToReproduce},
    })
    .then((res) => {
      setPending(false);
      res.data.title = title;
      res.data.description = description;
      res.data.stepsToReproduce = stepsToReproduce;
      setError('');
      setSuccess('Bug Updated!');
      showSuccess('Bug Updated!');
    })
    .catch((err) => {
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
  }

  function onClickSubmitClassification(evt) {
    evt.preventDefault();

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/classify`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`
      },
      data: {classification},
    })
    .then((res) => {
      setPending(false);
      res.data.classification = classification;
      setError('');
      setSuccess('Bug Classified!');
      showSuccess('Bug Classified!');
    })
    .catch((err) => {
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
  }

  function onClickSubmitAssignment(evt) {
    evt.preventDefault();

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/assign`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`
      },
      data: {assignedToUserId: assignedTo},
    })
    .then((res) => {
      setPending(false);
      res.data.assignedTo = assignedTo;
      setError('');
      setSuccess('User Assigned to Bug!');
      showSuccess('User Assigned to Bug!');
    })
    .catch((err) => {
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
  }

  function onClickCloseBug(evt) {
    evt.preventDefault();

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/close`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`
      },
      data: {closed},
    })
    .then((res) => {
      setPending(false);
      res.data.closed = closed;
      setError('');
      if (!closed) {
        setSuccess('Bug Opened!');
        showSuccess('Bug Opened!');
      } else {
        setSuccess('Bug Closed!');
        showSuccess('Bug Closed!');
      }
    })
    .catch((err) => {
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
  }

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
  }

  // function onPostComment(evt) {
  //   evt.preventDefault();
  //   if (newCommentText) {
  //     const comment = { id: nanoid(), comment: newCommentText, author: "Michael Allgeier", dateCreated: "placeholder" };
  //     setComments([...comments, comment]);
  //     setNewCommentText('');
  //   }
  // }

  // function onPostTestCase(evt) {
  //   evt.preventDefault();
  //   if (newTestCaseTitle && newTestCaseBody) {
  //     const testCase = { id: nanoid(), testCaseTitle: newTestCaseTitle, testCaseBody: newTestCaseBody, author: "Mike Jones", dateCreated: "NOV 14, 2021", execution: "Failed", dateExecuted: "NOV 15, 2021", executedBy: "John Doe"};
  //     setTestCases([...testCases, testCase]);
  //     setNewTestCaseTitle('');
  //     setNewTestCaseBody('');
  //   }
  // }

  // function onChangeCommentText(evt) {
  //   const newValue = evt.currentTarget.value;
  //   console.log(newValue);
  //   setNewCommentText(newValue);
  // }

  // function onChangeTestCaseTitle(evt) {
  //   const newValue = evt.currentTarget.value;
  //   setNewTestCaseTitle(newValue);
  // }

  // function onChangeTestCaseBody(evt) {
  //   const newValue = evt.currentTarget.value;
  //   setNewTestCaseBody(newValue);
  // }

  return (
    <div className="BugEditor">
      {pending && (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!pending && bug && (
        <div className="BugEditor-Form p-3">
          <h1 className="BugEditor-Header m-3 text-center">{bug?.title}</h1>
          <form>
            <h2>Edit Bug</h2>
            <InputField 
              label="Title"
              id="BugEditor-Title"
              type="text"
              value={title}
              onChange={(evt) => onInputChange(evt, setTitle)}
              error={titleError}
            />
            <InputField 
              label="Description"
              id="BugEditor-Description"
              type="text"
              value={description}
              onChange={(evt) => onInputChange(evt, setDescription)}
              error={descriptionError}
            />
            <InputField 
              label="Steps To Reproduce"
              id="BugEditor-StepsToReproduce"
              type="text"
              value={stepsToReproduce}
              onChange={(evt) => onInputChange(evt, setStepsToReproduce)}
              error={stepsToReproduceError}
            />
            <button className="btn btn-success mt-1" type="submit" onClick={(evt) => onClickSubmitEdit(evt)}>
              Submit Edit
            </button>
          </form>
          <form className="mt-3">
            <div className="input-group mb-3">
              <select 
                aria-label="Classification"
                id="BugEditor-Classification"
                type="text"
                onChange={(evt) => onInputChange(evt, setClassification)}
                className="form-select"
                value={classification}
              >
                <option value="Unclassified">Unclassified</option>
                <option value="Approved">Approved</option>
                <option value="Unapproved">Unapproved</option>
                <option value="Duplicate">Duplicate</option>
              </select>
              <button className="btn btn-success" type="submit" onClick={(evt) => onClickSubmitClassification(evt)}>
                Classify
              </button>
            </div>
          </form>
          <form className="mt-3">
            <div className="input-group mb-3">
              <select 
                label="Assigned To"
                id="BugEditor-AssignedTo"
                type="text"
                onChange={(evt) => onInputChange(evt, setAssignedTo)}
                className="form-select"
              >
                {_.map(users, user => (
                  <option key={user._id} value={user._id}>{user.fullName + ' '} {!user.role ? ' ' : user.role + '  '}</option>
                ))}
              </select>
              <button className="btn btn-success" type="submit" onClick={(evt) => onClickSubmitAssignment(evt)}>
                Assign Bug
              </button>
            </div>
          </form>
          <form className="mt-3">
            <div className="input-group mb-3">
              <select 
                label="Bug Closed"
                id="BugEditor-Closed"
                children=""
                type="text"
                onChange={(evt) => onInputChange(evt, setClosed)}
                className="form-select"
                value={closed}
              >
                <option value={true}>Close</option>
                <option value={false}>Open</option>
              </select>
              <button className="btn btn-success" type="submit" onClick={(evt) => onClickCloseBug(evt)}>
                Update
              </button>
            </div>
          </form>
          {error && <div className="mt-1 text-danger">{error}</div>}
          {success && <div className="mt-1 text-success">{success}</div>}
        </div>
      )}
      {/* <form className="BugEditor-EditBug-Form m-3 p-3">
        
        
        <label htmlFor="BugEditor-BugAuthor" className="mt-3 form-label">Author</label>
        <input id="BugEditor-BugAuthor" className="form-control" readOnly/>
        <label htmlFor="BugEditor-BugDateCreated" className="mt-3 form-label">Date Created</label>
        <input id="BugEditor-BugDateCreated" type="date" className="form-control" readOnly/>
        <label htmlFor="BugEditor-EditBug-BugAssignment" className="mt-3 form-label">Assigned To</label>
        <input id="BugEditor-EditBug-BugAssignment" className="form-control"/>
        <label htmlFor="BugEditor-EditBug-BugClassification" className="mt-3 form-label">Classification</label>
        <input id="BugEditor-EditBug-BugClassification" className="form-control"/>
        <button type="button" className="EditBug-Submit btn btn-success my-3">Submit Edit</button>
      </form> */}
      {/* <div className="BugEditor-CommentList m-3">
        <h2 className="BugEditor-BugComments-Header">Comment List</h2>
        <div>
          {_.map(comments, comment => (
            <CommentItem
              key = {comment.id}
              comment = {comment}
            />
          ))}
        </div>
      </div>
      <form className="BugEditor-BugComments-Form m-3">
        <h2 className="BugEditor-BugComments-Header visually-hidden">Add Comment</h2>
        <label htmlFor="BugEditor-BugComments-AddComment" className="form-label visually-hidden">Comment</label>
        <input id="BugEditor-BugComments-AddComment" className="form-control" placeholder="Add Comment..." value={newCommentText} onChange={(evt) => onChangeCommentText(evt)}/>
        <button type="submit" className="AddComment-Submit btn btn-success my-3" onClick={(evt) => onPostComment(evt)}>Post Comment</button>
      </form>
      <div className="BugEditor-TestCaseList m-3">
        <h2 className="BugEditor-BugTestCases-Header">Test Case List</h2>
        <div>
          {_.map(testCases, testCase => (
            <TestCaseItem
              key = {testCase.id}
              testCase = {testCase}
            />
          ))}
        </div>
      </div>
      <form className="BugEditor-BugTestCases-Form m-3">
        <h2 className="BugEditor-BugTestCases-Header">Add Test Case</h2>
        <label htmlFor="BugEditor-BugTestCases-TestCaseTitle" className="form-label">Title</label>
        <input id="BugEditor-BugTestCases-TestCaseTitle" className="form-control" value={newTestCaseTitle} onChange={(evt) => onChangeTestCaseTitle(evt)}/>
        <label htmlFor="BugEditor-BugTestCases-TestCaseBody" className="form-label mt-3">Body</label>
        <textarea id="BugEditor-BugTestCases-TestCaseBody" className="form-control" value={newTestCaseBody} onChange={(evt) => onChangeTestCaseBody(evt)}/>
        <button type="submit" className="AddTestCase-Submit btn btn-success my-3" onClick={(evt) => onPostTestCase(evt)}>Post Test Case</button>
      </form> */}
    </div>
  );
}

export default BugEditor;