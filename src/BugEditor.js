import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {FaEdit, FaCommentAlt} from 'react-icons/fa';
import CommentItem from './CommentItem';
import TestCaseItem from './TestCaseItem';
import InputField from './InputField';
import axios from 'axios';
import avatar from './img/avatar.png';

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
  const [editError, setEditError] = useState('');
  const [success, setSuccess] = useState('');
  const [editSuccess, setEditSuccess] = useState('');
  const [pending, setPending] = useState(true);
  const [users, setUsers] = useState(null);
  const [comments, setComments] = useState(null);
  const [numComments, setNumComments] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const [commentSuccess, setCommentSuccess] = useState('');
  const [testCases, setTestCases] = useState(null);
  const [newTestCase, setNewTestCase] = useState('');
  const [newTestCaseTitle, setNewTestCaseTitle] = useState('');
  const [testCaseError, setTestCaseError] = useState('');
  const [testCaseSuccess, setTestCaseSuccess] = useState('');

  // const [newCommentText, setNewCommentText] = useState('');

  // const [newTestCaseTitle, setNewTestCaseTitle] = useState('');
  // const [newTestCaseBody, setNewTestCaseBody] = useState('');

  const titleError = !title ? 'Title is required' : '';

  const descriptionError = !description ? 'Description is required' : '';

  const stepsToReproduceError = !stepsToReproduce ? 'Steps to Reproduce is required' : '';

  useEffect(() => {
    if (!auth) {
      setError('Must be Logged In');
      setPending(false);
      return;
    }

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
      });
  }, [auth, bugId, showError, showSuccess]);

  useEffect(() => {
    if (!auth) {
      setError('Must be Logged In');
      setPending(false);
      return;
    }

    setError('');
    setSuccess('');
    axios(`${process.env.REACT_APP_API_URL}/api/user/list`, {
      method: 'get',
      params: { pageSize: 1000, sortBy: 'givenName' },
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
      });
  }, [auth, showError]);

  useEffect(() => {
    if (!auth) {
      setError('Must be Logged In');
      setPending(false);
      return;
    }

    setError('');
    setSuccess('');
    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/comment/list`, {
      method: 'get',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        setError(err.message);
        showError(err.message);
      });
  }, [bugId, auth, showError]);

  useEffect(() => {
    if (!auth) {
      setError('Must be Logged In');
      setPending(false);
      return;
    }

    setError('');
    setSuccess('');
    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/test/list`, {
      method: 'get',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setTestCases(res.data);
      })
      .catch((err) => {
        setError(err.message);
        showError(err.message);
      });
  }, [bugId, auth, showError]);

  function onClickSubmitEdit(evt) {
    evt.preventDefault();

    if (titleError || descriptionError || stepsToReproduceError) {
      showError('Please fix errors');
      return;
    }

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: { title, description, stepsToReproduce },
    })
      .then((res) => {
        setPending(false);
        // res.data.title = title;
        // res.data.description = description;
        // res.data.stepsToReproduce = stepsToReproduce;
        showSuccess('Bug Updated!');
      })
      .catch((err) => {
        setPending(false);
        const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === 'string') {
            showError(resError);
          } else if (resError.details) {
            setEditError(_.map(resError.details, (x) => <div>{x.message}</div>));
          } else {
            setEditError(JSON.stringify(resError));
          }
        } else {
          showError(resError);
        }
      });
  }

  function onClickSubmitClassification(evt) {
    evt.preventDefault();

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/classify`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: { classification },
    })
      .then((res) => {
        setPending(false);
        res.data.classification = classification;
        showSuccess('Bug Classified!');
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

  function onClickSubmitAssignment(evt) {
    evt.preventDefault();

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/assign`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: { assignedToUserId: assignedTo },
    })
      .then((res) => {
        setPending(false);
        res.data.assignedTo = assignedTo;
        setError('');
        showSuccess('User Assigned to Bug!');
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

  function onClickCloseBug(evt) {
    evt.preventDefault();

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/close`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: { closed },
    })
      .then((res) => {
        setPending(false);
        res.data.closed = closed;
        setError('');
        showSuccess('Bug Updated!');
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

  function onClickPostComment(evt) {
    evt.preventDefault();
    setCommentError('');
    setCommentSuccess('');
    setPending(true);

    if (!newComment) {
      setCommentError('Comment can not be empty!');
      showError('Comment can not be empty!');
      setPending(false);
    } else {
      axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/comment/new`, {
        method: 'put',
        headers: {
          authorization: `Bearer ${auth?.token}`,
        },
        data: { comment: newComment },
      })
        .then((res) => {
          setPending(false);
          res.data.comment = newComment;
          setCommentError('');
          setCommentSuccess('Comment Posted');
          showSuccess('Comment Posted');
          setComments([...comments, {comment: newComment, author: auth}]);
          document.getElementById('AddComment').value = '';
        })
        .catch((err) => {
          setPending(false);
          setCommentSuccess('');
          const resError = err?.response?.data?.error;
          if (resError) {
            if (typeof resError === 'string') {
              setCommentError(resError);
              showError(resError);
            } else if (resError.details) {
              setCommentError(_.map(resError.details, (x) => <div>{x.message}</div>));
            } else {
              setCommentError(JSON.stringify(resError));
            }
          } else {
            setCommentError(err.message);
            showError(resError);
          }
        });
    }
  }

  function onClickAddTestCase(evt) {
    evt.preventDefault();
    setCommentError('');
    setCommentSuccess('');
    setPending(true);

    if (!newTestCase || !newTestCaseTitle) {
      setTestCaseError('Inputs can not be empty!');
    }

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/test/new`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: { testCase: newTestCase, testCaseTitle: newTestCaseTitle },
    })
      .then((res) => {
        setPending(false);
        setTestCaseError('');
        setTestCases([...testCases, {testCase: newTestCase, testCaseTitle: newTestCaseTitle, createdBy: auth}])
        setTestCaseSuccess('Test Case Added');
        showSuccess('Test Case Added');
      })
      .catch((err) => {
        setPending(false);
        setCommentSuccess('');
        const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === 'string') {
            setTestCaseError(resError);
            showError(resError);
          } else if (resError.details) {
            setTestCaseError(_.map(resError.details, (x) => <div>{x.message}</div>));
          } else {
            setTestCaseError(JSON.stringify(resError));
          }
        } else {
          setTestCaseError(err.message);
          showError(resError);
        }
      });
  }

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
  }

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
          <form className="border-bottom border-light pb-3">
            <h2>Edit Bug</h2>
            <InputField
              label="Title"
              id="BugEditor-Title"
              type="text"
              value={title}
              onChange={(evt) => onInputChange(evt, setTitle)}
              error={titleError}
            />
            <label htmlFor='BugEditor-Description' className='form-label'>Description</label>
            <textarea id="BugEditor-Description" className="form-control" type="text" value={description} onChange={(evt) => onInputChange(evt, setDescription)} error={descriptionError}/>
            <label htmlFor='BugEditor-StepsToReproduce' className='form-label mt-3'>Steps To Reproduce</label>
            <textarea id="BugEditor-StepsToReproduce" className="form-control" type="text" value={stepsToReproduce} onChange={(evt) => onInputChange(evt, setStepsToReproduce)} error={stepsToReproduceError}/>
            <button className="btn btn-primary mt-3" type="submit" onClick={(evt) => onClickSubmitEdit(evt)}>
              <FaEdit className="me-2 mb-1"/>
              Submit Edit
            </button>
            {editError && <div className="mt-2 text-danger">{editError}</div>}
            {editSuccess && <div className="mt-2 text-success">{editSuccess}</div>}
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
              <button className="btn btn-primary" type="submit" onClick={(evt) => onClickSubmitClassification(evt)}>
                Classify
              </button>
            </div>
          </form>
          <form className="mt-3">
            <div className="input-group mb-3">
              <select
                aria-label="Assigned To"
                id="BugEditor-AssignedTo"
                type="text"
                onChange={(evt) => onInputChange(evt, setAssignedTo)}
                className="form-select"
                value={assignedTo}
              >
                <option value="">No User Assigned</option>
                {_.map(users, (user) => (
                  <option key={user._id} value={user._id}>
                    {user.fullName + ' '} {!user.role ? ' ' : user.role + '  '}
                  </option>
                ))}
              </select>
              <button className="btn btn-primary" type="submit" onClick={(evt) => onClickSubmitAssignment(evt)}>
                Assign Bug
              </button>
            </div>
          </form>
          <form className="mt-3">
            <div className="input-group mb-3">
              <select
                aria-label="Bug Closed"
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
              <button className="btn btn-primary" type="submit" onClick={(evt) => onClickCloseBug(evt)}>
                Update
              </button>
            </div>
          </form>
          {error && <div className="mt-1 text-danger">{error}</div>}
          {success && <div className="mt-1 text-success">{success}</div>}
          <div className="BugEditor-TestCaseList bg-dark bg-gradient rounded mt-3">
            <div className="AddTestCase p-3">
              <label htmlFor="AddTestCaseTitle" className="form-label visually-hidden"></label>
              <input type="text" className="form-control" id="AddTestCaseTitle" value={newTestCaseTitle} placeholder="Test Case Title..." onChange={(evt) => onInputChange(evt, setNewTestCaseTitle)}/>
              <label htmlFor="AddTestCase" classification="form-label visually-hidden"></label>
              <textarea className="form-control" id="AddTestCase" type="text" value={newTestCase} placeholder="Test Case..." onChange={(evt) => onInputChange(evt, setNewTestCase)}/>
              <button className="btn btn-primary my-3" type="submit" onClick={(evt) => onClickAddTestCase(evt)}>
                Add Test Case
              </button>
            </div>
          
            <div className="TestCaseList">
              <div>
                  {!_.isEmpty(testCases) ? (_.map(testCases, (testCase) => (
                    <TestCaseItem 
                      key={testCase._id}
                      testCase={testCase}
                      bugId={bugId}
                    />
                  ))) : <div className="text-light fs-4 text-center my-4">Be The First To Add A Test Case For {bug?.title}!</div>}
              </div>
            </div>
          </div>
          <div className="BugEditor-CommentList bg-dark bg-gradient rounded mt-3">
            <div className="AddComment p-3">
              {numComments}
              <div className="d-flex">
                <img src={avatar} alt="PFP" className="avatar"/>
                <textarea className="form-control ms-3" id="AddComment" type="text" value={newComment} onChange={(evt) => onInputChange(evt, setNewComment)} placeholder="Add Comment..."/>
              </div>
              <button className="btn btn-primary my-3" type="submit" onClick={(evt) => onClickPostComment(evt)}>
                <FaCommentAlt className="me-2" />
                Post
              </button>
              <div>
                {commentError && <div className="text-danger">{commentError}</div>}
                {commentSuccess && <div className="text-success">{commentSuccess}</div>}
              </div>
            </div>
            <div className="CommentList">
              {!_.isEmpty(comments) ? (_.map(comments, (comment) => (
                <CommentItem key={comment._id} comment={comment} auth={auth}/>
              ))) : <div className="text-light text-center fs-4 my-4">Be the First to Post a Comment For {bug?.title}!</div>}
            </div>
          </div>
          <div>
            {testCaseError && <div className="text-danger">{testCaseError}</div>}
            {testCaseSuccess && <div className="text-success">{testCaseSuccess}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default BugEditor;
