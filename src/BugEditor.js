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

  const [testCases, setTestCases] = useState([
    { id: nanoid(), testCase: "This is a test case", author: "Michael Allgeier", dateCreated: "NOV 8, 2021", execution: "Unexecuted"},
    { id: nanoid(), testCase: "This is also a test case", author: "Mike Jones", dateCreated: "NOV 11, 2021", execution: "Passed", dateExecuted: "NOV 12, 2021", executedBy: "John Doe"},
    { id: nanoid(), testCase: "This is also also a test case", author: "Adam Smith", dateCreated: "NOV 12, 2021", execution: "Failed", dateExecuted: "NOV 12, 2021", executedBy: "John Doe"},
  ]);

  return (
    <div className="BugEditor">
      <h1 className="BugEditor-Header m-3 text-center">Bug Name</h1>
      <form className="BugEditor-EditBug-Form m-3">
        <h2 className="BugEditor-EditBug-Header">Edit Bug</h2>
        <label htmlFor="BugEditor-EditBug-BugName">Name</label>
        <input id="BugEditor-EditBug-BugName" className="form-control"/>
        <label htmlFor="BugEditor-EditBug-BugDescription" className="mt-3">Description</label>
        <textarea id="BugEditor-EditBug-BugDescription" className="form-control"/>
        <label htmlFor="BugEditor-EditBug-BugStepsToReproduce" className="mt-3">Steps To Reproduce</label>
        <textarea id="BugEditor-EditBug-BugStepsToReproduce" className="form-control"/>
        <label htmlFor="BugEditor-BugAuthor" className="mt-3">Author</label>
        <input id="BugEditor-BugAuthor" className="form-control" readOnly/>
        <label htmlFor="BugEditor-BugDateCreated" className="mt-3">Date Created</label>
        <input id="BugEditor-BugDateCreated" type="date" className="form-control" readOnly/>
        <label htmlFor="BugEditor-EditBug-BugAssignment" className="mt-3">Assigned To</label>
        <input id="BugEditor-EditBug-BugAssignment" className="form-control"/>
        <label htmlFor="BugEditor-EditBug-BugClassification" className="mt-3">Classification</label>
        <input id="BugEditor-EditBug-BugClassification" className="form-control"/>
        <button type="button" className="EditBug-Submit btn btn-success my-3">Submit Edit</button>
      </form>
      <form className="BugEditor-BugComments-Form m-3">
        <h2 className="BugEditor-BugComments-Header">Add Comment</h2>
        <label htmlFor="BugEditor-BugComments-AddComment">Comment</label>
        <input id="BugEditor-BugComments-AddComment" className="form-control"/>
        <button type="button" className="AddComment-Submit btn btn-success my-3">Post Comment</button>
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
      <form className="BugEditor-BugTestCases-Form m-3">
        <h2 className="BugEditor-BugTestCases-Header">Add Test Case</h2>
        <label htmlFor="BugEditor-BugTestCases-AddTestCase">Test Case</label>
        <input id="BugEditor-BugTestCases-AddTestCase" className="form-control"/>
        <button type="button" className="AddTestCase-Submit btn btn-success my-3">Post Test Case</button>
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
    </div>
  );
}

export default BugEditor;