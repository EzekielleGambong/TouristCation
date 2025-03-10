import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStorePlan = create(
  persist(
    (set, get) => ({
      province: "",
      accommodation: "",
      stayPeriodFrom: "",
      stayPeriodTo: "",
      noOfTravellers: 1,
      wholeBudget: "",
      accommodationBudget: "",
      touristSpotsBudget: "",
      excessBudget: "",
      touristSpots: [],
      budgetCap: "",
      selectedFood: [], // Store selected food recommendations

      setProvince: (province) => set(() => ({ province })),
      setTouristSpots: (touristSpots) => set(() => ({ touristSpots })),
      setAccommodation: (accommodation) => set(() => ({ accommodation })),
      setStayPeriodFrom: (stayPeriodFrom) => set(() => ({ stayPeriodFrom })),
      setStayPeriodTo: (stayPeriodTo) => set(() => ({ stayPeriodTo })),
      setNoOfTravellers: (noOfTravellers) =>
        set((state) => ({
          noOfTravellers: typeof noOfTravellers === "function" ? noOfTravellers(state.noOfTravellers) : noOfTravellers,
        })),
      setWholeBudget: (wholeBudget) => set(() => ({ wholeBudget })),
      setAccommodationBudget: (accommodationBudget) => set(() => ({ accommodationBudget })),
      setTouristSpotsBudget: (touristSpotsBudget) => set(() => ({ touristSpotsBudget })),
      setExcessBudget: (excessBudget) => set(() => ({ excessBudget })),
      setBudgetCap: (budgetCap) => set(() => ({ budgetCap })),
      setSelectedFood: (food) => set(() => ({ food })),
      

      
    }),
  )
);
