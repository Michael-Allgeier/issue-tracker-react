function TestCaseItem({ testCase }) {
  return (
    <div id={`testCase-${testCase.id}`} className="TestCaseItem card my-2">
      <div>
        <div id={`testCase-${testCase.id}-testCaseText`} className="card-text fs-5 testCase-text px-2"><a href="#testCase">{testCase.testCase}</a></div>
        <div className="mx-2 text-muted">
          Created By {testCase.author} on {testCase.dateCreated}
        </div>
        <div>
          {testCase.execution === "Passed" && (
            <div className="d-flex align-items-center text-muted">
              <div className="mx-2">Executed By {testCase.executedBy} on {testCase.dateExecuted}</div>
              <div id={`testCase-${testCase.id}-execution`} className="card-text testCase-execution mx-2 text-success">{testCase.execution}</div>
            </div>
          )}
          {testCase.execution === "Failed" && (
            <div className="d-flex align-items-center text-muted">
            <div className="mx-2">Executed By {testCase.executedBy} on {testCase.dateExecuted}</div>
            <div id={`testCase-${testCase.id}-execution`} className="card-text testCase-execution mx-2 text-danger">{testCase.execution}</div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestCaseItem;