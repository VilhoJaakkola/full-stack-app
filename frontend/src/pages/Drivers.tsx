/**
 * File is used to display the list of drivers.
 * File is used by admin to view or edit the list of drivers.
 */
import axios from "axios";
import React, { useState } from "react";
import endpoints from "../apiConfig";
import DriverType from "../components/types/DriverType";
import ShowDrivers from "../components/driver/ShowDrivers";
import AddDriverForm from "../components/driver/CreateDriver";
// import axios from "axios";
// import { endpoints } from "../endpoints";

const Drivers = () => {
  const [newDriver, setNewDriver] = useState<DriverType>({
    _id: null,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    cardClass: "",
    cardClassEndDate: "",
    professionalQualificationsStartDate: "",
    professionalQualificationsEndDate: "",
    journeys: [],
    user: "",
  });
  const [driverState, setDriverState] = useState<string>("showing");

  // Näytetään kuljettajat
  // const fetchDrivers = () => {
  //   setDriverState("showing");
  //   axios
  //     .get(endpoints.driver, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((response) => {
  //       setDrivers(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching drivers", error);
  //     });
  // };

  // Näytetään kuljettaja näkymä
  const showDriversState = () => {
    setDriverState("showing");
  };

  // vaihdetaan tila kuljettajan lisäykseen
  const driverForm = () => {
    setDriverState("creating");
  };

  return (
    <div className="px-10 py-5 font-bold">
      <h1>Drivers</h1>
      <button
        onClick={showDriversState}
        className="hover:bg-black bg-white text-amber-500 py-3 px-4 rounded-lg transition duration-300 ease-in-out border border-amber-500"
      >
        Fetch drivers
      </button>
      <button
        onClick={driverForm}
        className="hover:bg-black bg-white text-amber-500 py-3 px-4 rounded-lg transition duration-300 ease-in-out border border-amber-500 ml-3"
      >
        Add Driver
      </button>
      {driverState === "showing" && <ShowDrivers />}
      {driverState === "creating" && <AddDriverForm />}
    </div>
  );
};

export default Drivers; // This is the default export of the file
