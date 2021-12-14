/* eslint-disable no-restricted-globals */
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import InputField from './InputField';
import axios from 'axios';

function TestCaseEditor({auth, showError, showSuccess}) {
  const { bugId, testId } = useParams();
  const [testCase, setTestCase] = useState(null);
  const [testCaseText, setTestCaseText] = useState('');
  const [testCaseTitle, setTestCaseTitle] = useState('');
  const [execution, setExecution] = useState('');
  const [pending, setPending] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const testCaseTitleError = !testCaseTitle ? 'Test Case Title is required' : '';
  const testCaseTextError = !testCaseText ? 'Test Case is required' : '';

  useEffect(() => {
    if (!auth) {
      setError('Must Be Logged In');
      setPending(false);
      return;
    }

    setPending(true);
    setError('');
    setSuccess('');
    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/test/${testId}`, {
      method: 'get',
      header: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setPending(false);
        setTestCase(res.data);
        setTestCaseText(res.data.testCase);
        setTestCaseTitle(res.data.testCaseTitle);
        showSuccess('Test Case Loaded');
      })
      .catch((err) => {
        setPending(false);
        setError(err.message);
      });
  }, [auth, bugId, testId, showError, showSuccess]);

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
  }

  function onClickSubmitEdit(evt) {
    evt.preventDefault();
    if (testCaseTextError || testCaseTitleError) {
      showError('Please Fix Errors');
      return;
    }

    setPending(false);
    setError('');
    setSuccess('');
    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/test/${testId}`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: { testCase: testCaseText, testCaseTitle: testCaseTitle },
    })
      .then((res) => {
        setPending(false);
        setError('');
        setSuccess('Test Case Updated');
        showSuccess('Test Case Updated');
      })
      .catch((err) => {
        setPending(false);
        const resError = err?.response?.data?.error;
        if (resError) {
          console.error(resError);
          if (typeof resError === 'string') {
            setError(resError);
          } else if (resError.details) {
            setError(_.map(resError.details, (x) => <div>{x.message}</div>));
          } else {
            setError(JSON.stringify(resError));
          }
        } else {
          console.error(err);
          setError(err.message);
        }
      });
  }

  function onClickExecuteTestCase(evt) {
    evt.preventDefault();
    setPending(true);
    setError('');
    setSuccess('');
    console.log(execution);

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/test/${testId}/execute`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: { execution: execution },
    })
      .then((res) => {
        setPending(false);
        setError('');
        setSuccess('Test Case Executed');
        showSuccess('Test Case Executed');
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

  function onClickDeleteTestCase(evt) {
    evt.preventDefault();
    if (confirm('Are you sure you want to delete this test case?')) {
      axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/test/${testId}`, {
        method: 'delete',
        headers: {
          authorization: `Bearer ${auth?.token}`,
        },
      })
        .then((res) => {
          setPending(false);
          setError('');
          showSuccess(`${testCase?.testCaseTitle} Deleted!`);
        })
        .catch((err) => {
          setPending(false);
          const resError = err?.response?.data?.error;
          if (resError) {
            console.error(resError);
            setError(resError);
            if (typeof resError === 'string') {
              setError(resError);
            } else if (resError.details) {
              setError(_.map(resError.details, (x) => <div>{x.message}</div>));
            } else {
              setError(JSON.stringify(resError));
            }
          } else {
            console.error(err);
            setError(err.message);
          }
        });
    }
  }

  return (
    <div className="TestCaseEditor">
      {pending && (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!pending && (
        <div className="TestCaseEditor-Form p-3">
          <h1 className="TestCaseEditor-Header m-3 text-center">{testCase?.testCaseTitle}</h1>
          <form>
            <h2>Edit Test Case</h2>
            <InputField
              label="Test Case Title"
              id="TestCaseEditor-Title"
              type="text"
              value={testCaseTitle}
              onChange={(evt) => onInputChange(evt, setTestCaseTitle)}
              error={testCaseTitleError}
            />
            <InputField
              label="Test Case"
              id="TestCaseEditor-TestCase"
              type="text"
              value={testCaseText}
              onChange={(evt) => onInputChange(evt, setTestCaseText)}
              error={testCaseTextError}
            />
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary mt-1" onClick={(evt) => onClickSubmitEdit(evt)}>
                <FaEdit className="me-2 mb-1" />
                Submit Edit
              </button>
              <button type="submit" className="btn btn-danger mt-1" onClick={(evt) => onClickDeleteTestCase(evt)}>
                <FaTrashAlt className="me-2 mb-1" />
                Delete Test Case
              </button>
            </div>
          </form>
          <form>
            <div className="input-group my-3">
              <select
                aria-label="Execution"
                id="TestCaseEditor-Execution"
                type="text"
                onChange={(evt) => onInputChange(evt, setExecution)}
                className="form-select"
                value={execution}
              >
                <option value="">Select Execution....</option>
                <option value="Passed">Passed</option>
                <option value="Failed">Failed</option>
              </select>
              <button className="btn btn-primary" type="submit" onClick={(evt) => onClickExecuteTestCase(evt)}>
                Execute
              </button>
            </div>
          </form>
          {error && <div className="mt-1 text-danger">{error}</div>}
          {success && <div className="mt-1 text-success">{success}</div>}
        </div>
      )}
    </div>
  );
}

export default TestCaseEditor;
