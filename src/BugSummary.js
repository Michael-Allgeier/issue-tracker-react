
function BugSummary() {

  return (
    <div className="BugSummary">
      <h1 className="BugSummary-Header m-3 text-center">Bug Title</h1>
      <div className="m-3">
        <label htmlFor="BugSummary-BugName" className="mt-3">Name</label>
        <input id="BugSummary-BugName" value="Bug Name" className="form-control" disabled></input>
        <label htmlFor="BugSummary-BugAuthor"className="mt-3">Author</label>
        <input id="BugSummary-BugAuthor" value="Bug Author" className="form-control" disabled></input>
        <label htmlFor="BugSummary-BugDescription"className="mt-3">Description</label>
        <textarea id="BugSummary-BugDescription" value="Bug Description" className="form-control" disabled></textarea>
        <label htmlFor="BugSummary-BugStepsToReproduce"className="mt-3">Steps To Reproduce</label>
        <textarea id="BugSummary-BugStepsToReproduce" value="Bug Steps to Reproduce" className="form-control" disabled></textarea>
        <label htmlFor="BugSummary-BugDateCreated"className="mt-3">Date Created</label>
        <input id="BugSummary-BugDateCreated" type="date" value="" className="form-control" disabled></input>
        <label htmlFor="BugSummary-BugAssignment"className="mt-3">Assigned To</label>
        <input id="BugSummary-BugAssignment" value="Bug Assignee" className="form-control" disabled></input>
      </div>
    </div>
  );
}

export default BugSummary;