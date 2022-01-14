interface CarTypes {
  id: string;
  brand: string;
  segment: "mini" | "kompakt" | "premium";
  typeOfFuel: "benzyna" | "elektryczny" | "diesel";
  price: number;
  status: boolean;
}
export default CarTypes;
