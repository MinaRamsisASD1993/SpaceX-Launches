import React from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import classNames from "classnames";
function LaunchItem(props) {
  const { launch } = props;
  const {
    mission_name,
    launch_date_local,
    flight_number,
    launch_success
  } = launch;
  const textClasses = classNames({
    "text-success": launch_success === true ? true : false,
    "text-danger": launch_success === false ? true : false
  });
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>
            Mission: <span className={textClasses}>{mission_name}</span>{" "}
          </h4>
          <p>Date: {dateFormat(launch_date_local)}</p>
        </div>
        <div className="col-md-3">
          <Link
            to={`/launch-details/${flight_number}`}
            className="btn btn-secondary"
          >
            Launch Details
          </Link>
        </div>
      </div>
    </div>
  );
}
export default LaunchItem;
