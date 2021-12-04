import moment from "moment";

function TestCaseItem({ testCase }) {
  return (
    <div id={`testCase-${testCase._id}`} className="TestCaseItem card my-2">
      <div>
        <div id={`testCase-${testCase._id}-testCaseText`} className="card-text fs-5 testCase-text px-2"><a href="#testCase">{testCase.testCase}</a></div>
        <div className="mx-2 text-muted">
          Created By {testCase.createdBy.fullName} &bull; {moment(testCase.createdOn).fromNow()}
        </div>
        <div>
          {testCase.execution === "Passed" && (
            <div className="text-muted">
              <div className="mx-2">Executed By {testCase.executedBy.fullName} &bull; {moment(testCase.executedOn).fromNow()}</div>
              <div id={`testCase-${testCase._id}-execution`} className="card-text testCase-execution mx-2 text-success">{testCase.execution}</div>
            </div>
          )}
          {testCase.execution === "Failed" && (
            <div>
              <div className="mx-2">Executed By {testCase.executedBy.fullName} &bull; {moment(testCase.executedOn).fromNow()}</div>
              <div id={`testCase-${testCase._id}-execution`} className="card-text testCase-execution mx-2 text-danger">{testCase.execution}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestCaseItem;