import CarTypes from "./CarTypes";
import ClientTypes from "./ClientTypes";

interface State {
  clients: ClientTypes[];
  clientName: string;
  drivingExp: number;
  cars: CarTypes[];
  selectedCar: CarTypes[];
  rentalDays: number;
  extraDays: number;
  toPay: number;
}

export default State;
