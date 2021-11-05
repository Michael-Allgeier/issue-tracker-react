import BugListItem from "./BugListItem";

function BugList() {

  return (
    <div className="BugList">
      <h1 className="BugList-Header m-3 text-center">Bug List</h1>
      <div className="m-3">
        <BugListItem/>
      </div>
    </div>
  );
}

export default BugList;