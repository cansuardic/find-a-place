import React from "react";
import VenueDataService from "../services/VenueDataService";
import VenueReducer from "../services/VenueReducer";
import Header from "./Header";
import VenueList from "./VenueList";
import { useNavigate } from "react-router-dom";

function Admin() {
  var navigate = useNavigate();

  const [venues, dispatchVenues] = React.useReducer(VenueReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  React.useEffect(() => {
    dispatchVenues({ type: "FETCH_INIT" });

    let token = sessionStorage.getItem("venue-token");

    if (token) {
      VenueDataService.listAllVenues(token)
        .then((result) => {
          dispatchVenues({
            type: "FETCH_SUCCESS",
            payload: result.data,
          });
        })
        .catch(() => {
          navigate("/login");
          dispatchVenues({ type: "FETCH_FAILURE" });
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Header headerText="Yönetici" motto="Mekanlarınızı Yönetin!" />
      {venues.isError ? (
        <p>
          <strong>Birşeyler ters gitti! ...</strong>
        </p>
      ) : venues.isLoading ? (
        <p>
          <strong>Mekanlar Yükleniyor ...</strong>
        </p>
      ) : (
        venues.isSuccess && (
          <div className="row">
            <VenueList venues={venues.data} admin={true} />
          </div>
        )
      )}
    </>
  );
}

export default Admin;
