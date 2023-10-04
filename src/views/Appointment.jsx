import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; // Import the format function from date-fns
import { useStateContext } from "../contexts/ContextsProvider";
import axiosClient from "../axios-client";

export default function Appointment() {
  const [selectedDate, setSelectedDate] = useState(null);
  const { user } = useStateContext();
  const [message, setMessage] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate = selectedDate
      ? format(selectedDate, "yyyy-MM-dd HH:mm:ss") // Format the date
      : "";

    const endTime = new Date(selectedDate.getTime() + 30 * 60000);

    const formattedDate1 = endTime
      ? format(selectedDate, "yyyy-MM-dd HH:mm:ss") // Format the date
      : "";

    const newEvent = {
      student_id: user.id,
      start_time: formattedDate,
      end_time: formattedDate1,
    };
    console.log(newEvent);
    axiosClient
      .post("/Appointment", newEvent)
      .then(() => {
        setMessage(
          "Thanks For Appointment In Speaking Exam"
        );
      })
      .catch((error) => {
        setMessage(
          "You have already booked or you have booked for an appointment that has already been booked"
        );
      });
  };

  return (
    <>
      <h2 className="text-center mt-5 pt-5">Appointment Booking</h2>
      <div
        className="d-flex aling-items-center justify-content-center text-center"
        // style={{ height: "40vh" }}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-2">
              <label>Select Date</label>
              <br />
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()} // Prevent selecting past dates
                dateFormat="dd/MM/yyyy"
                showTimeInput
                timeInputLabel="Time:"
                timeFormat="HH:mm"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Book Appointment
            </button>
          </form>
        </div>
      </div>
      <div
        className="d-flex justify-content-center"
        style={{ position: "relative", height: "40vh" }}
      >
        {message && (
          <div
            className="alert alert-warning mt-4 text-center"
            role="alert"
            style={{ width: "20%", height: "fit-content" }}
          >
            <strong>{message}</strong>
          </div>
        )}
      </div>
    </>
  );
}
