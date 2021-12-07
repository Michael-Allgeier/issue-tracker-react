import moment from "moment";
import { Link } from 'react-router-dom';

function TestCaseItem({ testCase, bugId }) {
  return (
    <Link to={`/bug/${bugId}/test/${testCase._id}`} className="text-light text-decoration-none">
      <div id={`testCase-${testCase._id}`} className="TestCaseItem card bg-dark bg-gradient p-3">
        <div>
          <div id={`testCase-${testCase._id}-testCaseText`} className="card-text fs-5 testCase-text ms-2">
            {testCase?.testCaseTitle ? testCase.testCaseTitle : testCase.testCase}
          </div>
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
              <div className="text-muted">
                <div className="mx-2">Executed By {testCase.executedBy.fullName} &bull; {moment(testCase.executedOn).fromNow()}</div>
                <div id={`testCase-${testCase._id}-execution`} className="card-text testCase-execution mx-2 text-danger">{testCase.execution}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TestCaseItem;