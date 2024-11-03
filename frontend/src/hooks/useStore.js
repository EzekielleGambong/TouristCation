import { create } from "zustand";

export const useStorePlan = create((set, get) => ({
  province: "",
  setProvince: (province) => set(() => ({ province: province })),

  accommodation: "",
  setAccommodation: (accommodation) => set(() => ({ accommodation: accommodation })),

  touristSpot: [],
  setTouristSpot: (touristSpot) => set((state) => ({ touristSpot: [...state.touristSpot, touristSpot] })),
}));

export const useStoreSort = create((set, get) => ({}));

export const useStoreFilter = create((set, get) => ({}));

export const useStoreView = create((set, get) => ({
  view: "grid",
  setView: (view) => set(() => ({ view: view })),
}));
