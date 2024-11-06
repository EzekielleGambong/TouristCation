import { create } from "zustand";

export const useStorePlan = create((set, get) => ({
  province: "",
  accommodation: "",
  touristSpots: [],
  budgetCap: "",
  wholeBudget: "",

  setProvince: (province) => set(() => ({ province: province })),
  setAccommodation: (accommodation) => set(() => ({ accommodation: accommodation })),
  setTouristSpots: (newSpot) =>
    set((state) => {
      const existingIndex = state.touristSpots.findIndex((spot) => spot.id === newSpot.id);

      if (newSpot.rating === 0) {
        if (existingIndex !== -1) {
          const updatedTouristSpots = state.touristSpots.filter((spot) => spot.id !== newSpot.id);
          return { touristSpots: updatedTouristSpots };
        }
        return state;
      } else {
        if (existingIndex !== -1) {
          const updatedTouristSpots = [...state.touristSpots];
          updatedTouristSpots[existingIndex] = newSpot;
          // updatedTouristSpots[existingIndex] = {
          //   ...state.touristSpots[existingIndex],
          //   rating: newSpot.rating,
          // };

          return { touristSpots: updatedTouristSpots };
        } else {
          return { touristSpots: [...state.touristSpots, newSpot] };
        }
      }
    }),
  setBudgetCap: (budgetCap) => set(() => ({ budgetCap: budgetCap })),
  setWholeBudget: (wholeBudget) => set(() => ({ wholeBudget: wholeBudget })),
}));
