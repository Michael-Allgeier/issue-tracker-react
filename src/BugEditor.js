import _ from "lodash";
import { nanoid } from "nanoid";
import { useState } from "react";
import CommentItem from "./CommentItem";
import TestCaseItem from "./TestCaseItem";

function BugEditor() {

  const [comments, setComments] = useState([
    { id: nanoid(), comment: "This is a comment", author: "Michael Allgeier", dateCreated: "NOV 6, 2021"},
    { id: nanoid(), comment: "This is also a comment", author: "Mike Jones", dateCreated: "NOV 9, 2021"},
    { id: nanoid(), comment: "This is also also a comment", author: "Adam Smith", dateCreated: "NOV 10, 2021"},
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  const [testCases, setTestCases] = useState([
    { id: nanoid(), testCaseTitle: "This is a test case", testCaseBody:"", author: "Michael Allgeier", dateCreated: "NOV 8, 2021", execution: "Unexecuted"},
    { id: nanoid(), testCaseTitle: "This is also a test case", testCaseBody:"", author: "Mike Jones", dateCreated: "NOV 11, 2021", execution: "Passed", dateExecuted: "NOV 12, 2021", executedBy: "John Doe"},
    { id: nanoid(), testCaseTitle: "This is also also a test case", testCaseBody:"", author: "Adam Smith", dateCreated: "NOV 12, 2021", execution: "Failed", dateExecuted: "NOV 12, 2021", executedBy: "John Doe"},
  ]);

  const [newTestCaseTitle, setNewTestCaseTitle] = useState('');
  const [newTestCaseBody, setNewTestCaseBody] = useState('');

  function onPostComment(evt) {
    evt.preventDefault();
    if (newCommentText) {
      const comment = { id: nanoid(), comment: newCommentText, author: "Michael Allgeier", dateCreated: "placeholder" };
      setComments([...comments, comment]);
      setNewCommentText('');
    }
  }

  function onPostTestCase(evt) {
    evt.preventDefault();
    if (newTestCaseTitle && newTestCaseBody) {
      const testCase = { id: nanoid(), testCaseTitle: newTestCaseTitle, testCaseBody: newTestCaseBody, author: "Mike Jones", dateCreated: "NOV 14, 2021", execution: "Failed", dateExecuted: "NOV 15, 2021", executedBy: "John Doe"};
      setTestCases([...testCases, testCase]);
      setNewTestCaseTitle('');
      setNewTestCaseBody('');
    }
  }

  function onChangeCommentText(evt) {
    const newValue = evt.currentTarget.value;
    console.log(newValue);
    setNewCommentText(newValue);
  }

  function onChangeTestCaseTitle(evt) {
    const newValue = evt.currentTarget.value;
    setNewTestCaseTitle(newValue);
  }

  function onChangeTestCaseBody(evt) {
    const newValue = evt.currentTarget.value;
    setNewTestCaseBody(newValue);
  }

  return (
    <div className="BugEditor">
      <h1 className="BugEditor-Header m-3 text-center">Bug Name</h1>
      <form className="BugEditor-EditBug-Form m-3 p-3">
        <h2 className="BugEditor-EditBug-Header">Edit Bug</h2>
        <label htmlFor="BugEditor-EditBug-BugName" className="form-label">Name</label>
        <input id="BugEditor-EditBug-BugName" className="form-control"/>
        <label htmlFor="BugEditor-EditBug-BugDescription" className="mt-3 form-label">Description</label>
        <textarea id="BugEditor-EditBug-BugDescription" className="form-control"/>
        <label htmlFor="BugEditor-EditBug-BugStepsToReproduce" className="mt-3 form-label">Steps To Reproduce</label>
        <textarea id="BugEditor-EditBug-BugStepsToReproduce" className="form-control"/>
        <label htmlFor="BugEditor-BugAuthor" className="mt-3 form-label">Author</label>
        <input id="BugEditor-BugAuthor" className="form-control" readOnly/>
        <label htmlFor="BugEditor-BugDateCreated" className="mt-3 form-label">Date Created</label>
        <input id="BugEditor-BugDateCreated" type="date" className="form-control" readOnly/>
        <label htmlFor="BugEditor-EditBug-BugAssignment" className="mt-3 form-label">Assigned To</label>
        <input id="BugEditor-EditBug-BugAssignment" className="form-control"/>
        <label htmlFor="BugEditor-EditBug-BugClassification" className="mt-3 form-label">Classification</label>
        <input id="BugEditor-EditBug-BugClassification" className="form-control"/>
        <button type="button" className="EditBug-Submit btn btn-success my-3">Submit Edit</button>
      </form>
      <div className="BugEditor-CommentList m-3">
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
      </form>
    </div>
  );
}

export default BugEditor;