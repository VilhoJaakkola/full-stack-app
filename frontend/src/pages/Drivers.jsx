import { useState } from "react";
import axios from "axios";
import { endpoints } from "../apiConfig";

import "./Drivers.css";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);

  const fetchDrivers = () => {
    axios
      .get(endpoints.driver, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  };

  return (
    <div>
      <h1>Drivers</h1>
      <button onClick={fetchDrivers} className="show-button">
        Show Drivers
      </button>
      {drivers && (
        <ul>
          {drivers.map((driver) => (
            <li key={driver._id} className="driver-details">
              <p>Firstname: {driver.firstName}</p>
              <p>Lastname: {driver.lastName}</p>
              <p>Email: {driver.email}</p>
              <p>Phone number: {driver.phoneNumber}</p>
              <p>Card class: {driver.cardClass}</p>
              <p>Card class end date: {driver.cardClassEndDate}</p>
              <p>
                Professional qualifications start date:{" "}
                {driver.professionalQualificationsStartDate}
              </p>
              <p>
                Professional qualifications end date:{" "}
                {driver.professionalQualificationsEndDate}
              </p>
              <p>Journeys: {driver.journeys}</p>
              <p></p>
              {console.log(driver)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Drivers;
