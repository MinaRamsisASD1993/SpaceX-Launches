import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

class LaunchDetails extends Component {
  state = {
    flight_number: ""
  };
  componentDidMount() {
    const flight_number = this.props.match.params.id;
    this.setState({ flight_number });
  }
  render() {
    const { flight_number } = this.state;
    let LAUNCH_QUERY;
    if (flight_number !== "") {
      LAUNCH_QUERY = gql`
    {
        launch(flight_number: ${flight_number}){
            launch_success
            launch_date_local
            mission_name
            launch_year
            rocket{
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
    `;
    }

    return (
      <div>
        <h2 className="display-4 my-4">
          Launch number {flight_number} details
        </h2>
        {flight_number !== "" ? (
          <Query query={LAUNCH_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>ERROR ...</p>;
              console.log(data);
              const { rocket } = data.launch;
              const { rocket_id, rocket_name, rocket_type } = rocket;
              return (
                <div>
                  <h3>
                    Mission: <span>{data.launch.mission_name}</span>
                  </h3>
                  <ul className="list-group mb-3">
                    <li className="list-group-item">
                      Date: {dateFormat(data.launch.launch_date_local)}
                    </li>
                    <li className="list-group-item">
                      Launch Success:{" "}
                      {data.launch.launch_success ? (
                        <span className="text-success">Yes</span>
                      ) : (
                        <span className="text-danger">No</span>
                      )}
                    </li>
                    <li className="list-group-item">
                      Launch Year: {data.launch.launch_year}
                    </li>
                  </ul>
                  <h4>Rocket Details</h4>
                  <ul className="list-group mb-3">
                    <li className="list-group-item">Rocket ID: {rocket_id}</li>
                    <li className="list-group-item">
                      Rocket Name: {rocket_name}
                    </li>
                    <li className="list-group-item">
                      Rocket Type: {rocket_type}
                    </li>
                  </ul>
                  <Link className="btn btn-secondary" to="/">
                    {" "}
                    Go Back
                  </Link>
                </div>
              );
            }}
          </Query>
        ) : null}
      </div>
    );
  }
}
export default LaunchDetails;
