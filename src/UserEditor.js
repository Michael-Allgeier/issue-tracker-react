function UserEditor() {
  return (
    <div className="UserEditor">
      <h1 className="UserEditor-Header m-3 text-center">User Name</h1>
      <form className="UserEditor-EditUser-Form m-3">
        <h2 className="UserEditor-EditUser-Header">Edit User</h2>
        <label htmlFor="UserEditor-EditUser-GivenName" className="mt-3">Given Name (First Name)</label>
        <input id="UserEditor-EditUser-GivenName" className="form-control" />
        <label htmlFor="UserEditor-EditUser-FamilyName" className="mt-3">Family Name (Last Name)</label>
        <input id="UserEditor-EditUser-FamilyName" className="form-control" />
        <label htmlFor="UserEditor-EditUser-FullName" className="mt-3">Full Name</label>
        <input id="UserEditor-EditUser-FullName" className="form-control" />
        <label htmlFor="UserEditor-EditUser-Email" className="mt-3">Email</label>
        <input id="UserEditor-EditUser-Email" className="form-control" />
        <label htmlFor="UserEditor-EditUser-ConfirmEmail" className="mt-3">Confirm Email</label>
        <input id="UserEditor-EditUser-ConfirmEmail" className="form-control" />
        <label htmlFor="UserEditor-EditUser-Password" className="mt-3">Password</label>
        <input id="UserEditor-EditUser-Password" className="form-control" />
        <label htmlFor="UserEditor-EditUser-ConfirmPassword" className="mt-3">Confirm Password</label>
        <input id="UserEditor-EditUser-ConfirmPassword" className="form-control" />
        <label htmlFor="UserEditor-EditUser-Role" className="mt-3">Role</label>
        <select className="form-select" aria-label="Default select example">
          <option selected>Current Role</option>
          <option value="DEV">DEV</option>
          <option value="QA">QA</option>
          <option value="TM">TM</option>
          <option value="BM">BM</option>
        </select>
        <button type="button" className="EditUser-Submit btn btn-success my-3">Submit Edit</button>
      </form>
    </div>
  );
}

export default UserEditor;