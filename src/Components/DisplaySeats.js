import React, { useState } from "react";
import "../css/seats.css";

const DisplaySeats = ({ seatNames, bookedSeat, seatsAvailable, fare }) => {
  // seat: [
  //   ["Front1", "Front2", "Front3"],
  //   ["Middle1", "Middle2", "Middle3"],
  //   ["Back1", "Back2", "Back3"]
  // ]
  // seatsAvailable: [
  //   "Front1",
  //   "Front2",
  //   "Front3",
  //   "Middle1",
  //   "Middle2",
  //   "Middle3",
  //   "Back1",
  //   "Back2",
  //   "Back3"
  // ]
  // bookedSeat: ["Front2"]
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  // let totalPrice = 0;

  const onClickSeat = seat => {
    // let seat = event.target.key;
    console.log(seat);
    // if (bookedSeat.indexOf(seat) > -1) {
    //   seatsAvailable.concat(seat);
    //   bookedSeat.filter(res => res !== seat);
    // } else {
    //   bookedSeat.concat(seat);
    //   seatsAvailable.filter(res => res !== seat);
    // }
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter(st => {
          return st !== seat;
        })
      );
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
    let noOfSeatsSelected = selectedSeats.length;
    console.log(noOfSeatsSelected);
    setTotalPrice(noOfSeatsSelected * fare);
  };

  return (
    <div className="container">
      <table className="">
        <tbody>
          {seatNames.map((row, i) => (
            <tr key={i}>
              {row.map(seatNo => (
                <td
                  className={
                    bookedSeat.indexOf(seatNo) > -1 ? "reserved" : "available"
                  }
                  key={seatNo}
                  value={seatNo}
                  // onClick={onClickData({ seatNo })}
                >
                  {/* <i class='fas fa-couch' style={{fontSize:"48px",color:"red"}}></i> */}
                  {/* <button className="" onClick={() => onClickSeat(seatNo)}>
                    <i
                      class="fas fa-couch"
                      style={{color: "red" }}
                    >
                      {seatNo}
                    </i>
                  </button> */}

                  {/* <div onClick={onClickSeat(seatNo)}>
                    {seatNo}
                  </div> */}
                  <div class="form-check text-white">
                    <label class="form-check-label" for={seatNo}>
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id={seatNo}
                        name={seatNo}
                        value={seatNo}
                        onClick={() => onClickSeat(seatNo)}
                        disabled={
                          bookedSeat.indexOf(seatNo) > -1 ? true : false
                        }
                      />
                      {seatNo}
                    </label>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      Selected Seats :{selectedSeats.toString()}
      Price : {totalPrice}
      <button>Book Now</button>
    </div>
  );
};

export default DisplaySeats;
