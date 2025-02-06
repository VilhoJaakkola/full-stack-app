import { useEffect, useState } from "react";
import DriverType from "../types/DriverType";
import axios from "axios";
import endpoints from "../../apiConfig";

const ShowDrivers = () => {
  const [drivers, setDrivers] = useState<DriverType[]>([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Näytetään kuljettajat
  const fetchDrivers = () => {
    axios
      .get(endpoints.driver, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setDrivers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching drivers", error);
      });
  };

  return (
    <ul className="list-none">
      {drivers.map((driver) => (
        <li key={driver._id} className="border border-black p-2 my-2 w-1/2">
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
        </li>
      ))}
    </ul>
  );
};

export default ShowDrivers;
