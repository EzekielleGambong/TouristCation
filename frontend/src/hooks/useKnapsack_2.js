function calculateDistance(loc1, loc2) {
  const [lat1, lon1] = loc1.split(",").map(Number);
  const [lat2, lon2] = loc2.split(",").map(Number);

  // const R = 6371; // Earth radius in km
  const R = 6378; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

export function Knapsack(touristSpotsBudget, budgetCap, accommodation, touristTypes, touristSpots) {
  const selectedSpots = [];
  let remainingBudget = touristSpotsBudget;

  for (const type of touristTypes) {
    if (type.rating > 0 && type.count > 0) {
      const maxBudgetPerSpot = (budgetCap / 5) * type.rating;

      const spots = touristSpots
        .filter((spot) => spot.typeOfAttraction === type.type)
        .map((spot) => ({
          ...spot,
          distance: calculateDistance(accommodation.coordinates, spot.location),
          totalCost: spot.entranceFee + spot.additionalFee + maxBudgetPerSpot, // Calculate full cost
        }))
        .sort((a, b) => a.distance - b.distance); // Prioritize closest spots

      let spotsSelected = 0;

      for (const spot of spots) {
        if (
          spotsSelected < type.count && // Respect count limit
          remainingBudget >= spot.totalCost // Stay within remaining budget
        ) {
          remainingBudget -= spot.totalCost;

          selectedSpots.push({
            type: "itinerary_tourist_spot",
            distance: Math.round(spot.distance.toFixed(2) * 100) / 100,
            ...spot,
            totalBudget: spot.totalCost.toFixed(2),
          });

          spotsSelected++;
        }
      }
    }
  }

  return { settings: selectedSpots.reverse(), excessBudget: remainingBudget };
}
