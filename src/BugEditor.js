import _ from "lodash";
import { nanoid } from "nanoid";
import { useState } from "react";
import CommentItem from "./CommentItem";

function BugEditor() {

  const [comments, setComments] = useState([
    { id: nanoid(), comment: "This is a comment", author: "Michael Allgeier", dateCreated: "NOV 6, 2021"},
    { id: nanoid(), comment: "This is also a comment", author: "Mike Jones", dateCreated: "NOV 9, 2021"},
    { id: nanoid(), comment: "This is also also a comment", author: "Adam Smith", dateCreated: "NOV 10, 2021"},
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
      <div className="BugEditor-CommentList">
        <h2 className="BugEditor-BugComments-Header m-3">Comment List</h2>
        <div className="m-3">
          {_.map(comments, comment => (
            <CommentItem
              key = {comment.id}
              comment = {comment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BugEditor;