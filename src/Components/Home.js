import React, { useState, useMemo } from "react";
import networkRequests from "../Utils/networkRequests";
import TableContent from "./TableContent";
import DisplaySeats from "./DisplaySeats";

const Home = () => {
  const [fromLocation, setFromLocation] = useState();
  const [toLocation, setToLocation] = useState();
  const [dateOfJourney, setDateOfJourney] = useState();
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [viewSeatsClicked, setViewSeatsClicked] = useState(false);
  const [seatNames, setSeatNames] = useState([]);
  const [bookedSeat, setBookedSeat] = useState([]);
  const [seatsAvailable, setSeatsAvailable] = useState([]);
  const [fare,setFare] = useState();
  const [noBusFound, setNoBusFound] = useState(false);

  const updateFromLocation = event =>
    setFromLocation(event.target.value.toLowerCase());
  const updateToLocation = event =>
    setToLocation(event.target.value.toLowerCase());
  const updateDateOfJourney = event => setDateOfJourney(event.target.value);

  const viewSeats = row => {
    let rowValue = row.row.original;
    console.log(rowValue);
    const { seatNames, bookedSeat, seatsAvailable,fare } = rowValue;
    setSeatNames(seatNames);
    setBookedSeat(bookedSeat);
    setSeatsAvailable(seatsAvailable);
    setViewSeatsClicked(true);
    setFare(fare);
  };
  const columns = useMemo(
    () => [
      {
        id: "Date",
        Header: "Date",
        accessor: "journeyDate"
      },
      {
        id: "busName",
        Header: "Bus Name",
        accessor: "name"
      },
      {
        id: "busNumber",
        Header: "Bus Number",
        accessor: "busNumber"
      },
      {
        id: "seatsAvailable",
        Header: "Available Seats",
        accessor: "noOfSeatsAvailable"
      },
      {
        id: "fare",
        Header: "Price",
        accessor: "fare"
      },
      {
        id: "selection",
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: "Select Seats",
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: row => (
          <div>
            <button
              className="btn-success"
              onClick={e => {
                viewSeats(row);
              }}
            >
              View Seats
            </button>
          </div>
        )
      }
    ],
    []
  );

  const formSubmit = event => {
    event.preventDefault();
    setIsSearchButtonClicked(true);
    networkRequests("/busSearch", "POST", {
      fromLocation,
      toLocation,
      dateOfJourney
    })
      .then(response => {
        console.log("response");
        console.log(response);
        if (response.message === "No bus for this route") {
          setNoBusFound(true);
        } else setTableData(response);
      })
      .catch(error => {
        console.log("some error");
      });
  };

  return (
    <div className="">
      <div className="d-flex justify-content-center text-white">
        <div className="mt-5">
          <form onSubmit={formSubmit} className="request-form ftco-animate">
            <h2>Make your trip</h2>
            <div className="form-group">
              <label htmlFor="" className="label">
                From Location
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="City, Airport, Station, etc"
                onChange={updateFromLocation}
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="label">
                To Location
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="City, Airport, Station, etc"
                onChange={updateToLocation}
              />
            </div>
            <div className="d-flex">
              <div className="form-group mr-2">
                <label htmlFor="" className="label">
                  Date of Journey
                </label>
                <input
                  type="Date"
                  className="form-control"
                  id="book_pick_date"
                  placeholder="Date"
                  onChange={updateDateOfJourney}
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary py-3 px-4"
              />
            </div>
          </form>
        </div>

        {isSearchButtonClicked && noBusFound === false ? (
          <div className="mt-5">
            <section className="">
              <TableContent columns={columns} data={tableData} />
            </section>
          </div>
        ) : null}

        {viewSeatsClicked ? (
          <div className="mt-5">
            <DisplaySeats
              seatNames={seatNames}
              bookedSeat={bookedSeat}
              seatsAvailable={seatsAvailable}
              fare={fare}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
