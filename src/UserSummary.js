
function UserSummary() {

  return (
    <div className="UserSummary">
      <h1 className="UserSummary-Header m-3 text-center">User Name</h1>
      <div className="m-3">
        <label htmlFor="UserSummary-UserGivenName" className="mt-3">Given Name</label>
        <input id="UserSummary-UserGivenName" value="User First Name" className="form-control" disabled></input>
        <label htmlFor="UserSummary-UserFamilyName" className="mt-3">Family Name</label>
        <input id="UserSummary-UserFamilyName" value="User Last Name" className="form-control" disabled></input>
        <label htmlFor="UserSummary-UserFullName" className="mt-3">Full Name</label>
        <input id="UserSummary-UserFullName" value="User Full Name" className="form-control" disabled></input>
      </div>
    </div>
  );
}

export default UserSummary;