import _ from "lodash";
import { nanoid } from "nanoid";
import { useState } from "react";
import BugListItem from "./BugListItem";

function BugList({ setScreen }) {

  const [bugs, setBugs] = useState([
    { id: nanoid(), title: "Bug 1", author: "Michael Allgeier", dateCreated: "NOV 5, 2021"},
    { id: nanoid(), title: "Bug 2", author: "Mike Jones", dateCreated: "NOV 8, 2021"},
    { id: nanoid(), title: "Bug 3", author: "Adam Smith", dateCreated: "NOV 9, 2021"},
  ]);

  function onEditClick(evt) {
    evt.preventDefault();
    setScreen('EditBug');
  }

  return (
    <div className="BugList">
      <h1 className="BugList-Header m-3 text-center">Bug List</h1>
      <div className="m-3">
        {_.map(bugs, bug => (
          <BugListItem
            key = {bug.id}
            bug = {bug}
            onEditClick={(evt) => onEditClick(evt)}
          />
        ))}
      </div>
    </div>
  );
}

export default BugList;