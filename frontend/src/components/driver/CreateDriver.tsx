import { useState } from "react";
import axios from "axios";
import DriverType from "../types/DriverType";
import endpoints from "../../apiConfig";

const AddDriverForm = () => {
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

  // Kuljettajan lisäyksen vastausviestit
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Kuljettajan lisäyksen logiikka
  const createDriver = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Estää sivun päivittämisen

    try {

    const userResponse = await axios.get(
      `${endpoints.user}?email=${newDriver.email}&firstName=${newDriver.firstName}&lastName=${newDriver.lastName}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Lisää token headeriin
        },
      }
    );

    const foundUser = userResponse.data[0];

    // Tarkista, löytyykö käyttäjä
    if (foundUser && foundUser._id) {
      console.log("User found", foundUser);

      // Asetetaan käyttäjän ID kohtaan `user`
      setNewDriver((prevDriver) => ({
        ...prevDriver,
        user: foundUser._id,
      }));
    } else {
      // Heitetään virhe, jos käyttäjää ei löydy
      console.log("No matching user found, make sure there is a user for driver");
      throw new Error("No matching user found. A user must exist before creating a driver.")
    }


      const driverResponse = await axios.post(endpoints.driver, newDriver, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Lisää token headeriin
        },
      });
      setResponseMessage("Driver created successfully");
      setErrorMessage(null);
      console.log("Driver created: ", driverResponse.data);

    } catch (error: any) {
      // Käsitellään virheet
      if(error.message) {
        console.log("Error:", error.message);
        setErrorMessage(error.message)
      } else if(error.response) {
        console.log("Error adding driver:", error.response.data);
        setErrorMessage(
          error.response?.data?.message ||
            "An error occurred while adding driver."
        );
      } else {
        console.log("Unexpected error:", error);
        setErrorMessage("An unexpected errro occured.")
      }
      setResponseMessage(null);
    }
  };

  // lomakkeen kentän muutoksen logiikka
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDriver({ ...newDriver, [name]: value });
  };

  return (
    <div>
      <h1>Add New Driver</h1>
      <form onSubmit={createDriver}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="fistName"
            value={newDriver.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={newDriver.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={newDriver.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newDriver.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cardClass">Card Class</label>
          <input
            type="text"
            id="cardClass"
            name="cardClass"
            value={newDriver.cardClass}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cardClassEndDate">Card Class End Date</label>
          <input
            type="date"
            id="cardClassEndDate"
            name="cardClassEndDate"
            value={newDriver.cardClassEndDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="professionalQualificationsStartDate">
            Professional Qualifications Start Date
          </label>
          <input
            type="date"
            id="professionalQualificationsStartDate"
            name="professionalQualificationsStartDate"
            value={newDriver.professionalQualificationsStartDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="professionalQualificationsEndDate">
            Professional Qualifications End Date
          </label>
          <input
            type="date"
            id="professionalQualificationsEndDate"
            name="professionalQualificationsEndDate"
            value={newDriver.professionalQualificationsEndDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Create Driver</button>
      </form>
      {/* Näytä onnistumis- tai virheilmoitus */}
      {responseMessage && (
        <p className="text-green-500 mt-4">{responseMessage}</p>
      )}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default AddDriverForm;
