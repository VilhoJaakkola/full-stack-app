import UserType from "./UserType";

type DriverType = {
  _id: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  cardClass: string;
  cardClassEndDate: string;
  professionalQualificationsStartDate: string;
  professionalQualificationsEndDate: string;
  journeys: string[];
  user: UserType["_id"];
};

export default DriverType; // This is the default export of the file
