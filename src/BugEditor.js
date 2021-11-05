
function BugEditor() {

  return (
    <div className="BugEditor">
      <h1 className="BugEditor-Header m-3 text-center">Edit Bug</h1>
      <form className="BugEditor-Form m-3">
        <label htmlFor="BugEditor-BugName" className="mt-3">Name</label>
        <input id="BugEditor-BugName" className="form-control"></input>
        <label htmlFor="BugEditor-BugDescription" className="mt-3">Description</label>
        <textarea id="BugEditor-BugDescription" className="form-control"></textarea>
        <label htmlFor="BugEditor-BugStepsToReproduce" className="mt-3">Steps To Reproduce</label>
        <textarea id="BugEditor-BugStepsToReproduce" className="form-control"></textarea>
        <label htmlFor="BugEditor-BugAuthor" className="mt-3">Author</label>
        <input id="BugEditor-BugAuthor" className="form-control"></input>
        <label htmlFor="BugEditor-BugDateCreated" className="mt-3">Date Created</label>
        <input id="BugEditor-BugDateCreated" type="date" className="form-control"></input>
        <button type="button" className="RegisterForm-Submit btn btn-outline-primary btn-lg mt-3">Submit Edit</button>
      </form>
    </div>
  );
}

export default BugEditor;