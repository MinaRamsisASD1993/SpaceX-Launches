import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import LaunchItem from "./LaunchItem";
import MissionKeys from "./MissionKeys";

const LAUNCHES_QUERY = gql`
  {
    launches {
      flight_number
      launch_success
      launch_date_local
      mission_name
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

class Launches extends Component {
  render() {
    return (
      <div>
        <h2 className="display-4 my-4">Launches</h2>
        <MissionKeys />
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error :(</p>;
            return data.launches.map(launch => (
              <LaunchItem key={launch.flight_number} launch={launch} />
            ));
          }}
        </Query>
      </div>
    );
  }
}
export default Launches;
