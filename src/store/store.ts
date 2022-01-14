// store.ts
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import ClientTypes from "@/types/ClientTypes";
import CarTypes from "@/types/CarTypes";

// define your typings for the store state
export interface State {
  clients: ClientTypes[];
  clientName: string;
  drivingExp: number;
  cars: CarTypes[];
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    //Clients
    clients: [
      { fullName: "Jan Nowak", drivingDate: "03.04.2021", id: "1" },
      { fullName: "Agnieszka Kowalska", drivingDate: "01.15.1999", id: "2" },
      { fullName: "Robert Lewandowski", drivingDate: "12.18.2010", id: "3" },
      { fullName: "Zofia Plucińska", drivingDate: "04.29.2020", id: "4" },
      { fullName: "Grzegorz Braun", drivingDate: "07.12.2015", id: "5" },
    ],
    clientName: "",
    drivingExp: 1000,

    //Cars
    cars: [
      {
        id: "1",
        brand: "Škoda Citigo",
        segment: "mini",
        typeOfFuel: "benzyna",
        price: 70,
        status: true,
      },
      {
        id: "2",
        brand: "Toyota Aygo",
        segment: "mini",
        typeOfFuel: "benzyna",
        price: 90,
        status: true,
      },
      {
        id: "3",
        brand: "Fiat 500",
        segment: "mini",
        typeOfFuel: "elektryczny",
        price: 110,
        status: true,
      },
      {
        id: "4",
        brand: "Ford Focus",
        segment: "kompakt",
        typeOfFuel: "diesel",
        price: 160,
        status: true,
      },
      {
        id: "5",
        brand: "Kia Ceed",
        segment: "kompakt",
        typeOfFuel: "benzyna",
        price: 150,
        status: true,
      },
      {
        id: "6",
        brand: "Volkswagen Golf",
        segment: "kompakt",
        typeOfFuel: "benzyna",
        price: 160,
        status: true,
      },
      {
        id: "7",
        brand: "Hyundai Kona Electric",
        segment: "kompakt",
        typeOfFuel: "elektryczny",
        price: 180,
        status: true,
      },
      {
        id: "8",
        brand: "Audi A6 Allroad",
        segment: "premium",
        typeOfFuel: "diesel",
        price: 290,
        status: true,
      },
      {
        id: "9",
        brand: "Mercedes E270 AMG",
        segment: "premium",
        typeOfFuel: "benzyna",
        price: 320,
        status: true,
      },
      {
        id: "10",
        brand: "Tesla Model S",
        segment: "premium",
        typeOfFuel: "elektryczny",
        price: 350,
        status: true,
      },
    ],
  },
  getters: {
    //Clients
    getNames(state) {
      return state.clients.map((item: ClientTypes) => {
        return item.fullName;
      });
    },
    getClient(state) {
      return state.clients.filter((item: ClientTypes) => {
        return item.fullName == state.clientName;
      });
    },
    getName: state => state.clientName
  },
  mutations: {
    //Clients
    setClientName(state, select: string) {
      state.clientName = select;
    },
    setDrivingExp(state, exp) {
      state.drivingExp = exp;
    },

    //Cars
    changeCarStatus(state) {
      if (state.drivingExp && state.drivingExp < 4) {
        state.cars.forEach((item: CarTypes) => {
          if (item.segment === "premium") {
            item.status = false;
          }
        });
      }
    },
  },
  actions: {},
});
