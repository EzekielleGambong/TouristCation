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
    if (type.rating > 0) {
      const spotBudget = (budgetCap / 5) * type.rating;

      // Get spots of this type, with distance and cost calculated
      const spots = touristSpots
        .filter((spot) => spot.typeOfAttraction === type.type)
        .map((spot) => ({
          ...spot,
          distance: calculateDistance(accommodation.coordinates, spot.location),
          totalCost: spotBudget + spot.entranceFee + spot.additionalFee,
        }))
        .sort((a, b) => a.distance - b.distance); // Sort by distance

      // DP Knapsack to maximize rating within budget constraints
      const dp = Array(spots.length + 1)
        .fill(0)
        .map(() => Array(remainingBudget + 1).fill(0));

      spots.forEach((spot, i) => {
        const spotCost = spot.totalCost;
        const ratingValue = type.rating;

        for (let k = remainingBudget; k >= spotCost; k--) {
          if (dp[i + 1][k] < dp[i][k - spotCost] + ratingValue) {
            dp[i + 1][k] = dp[i][k - spotCost] + ratingValue;
            selectedSpots.push({
              name: spot.nameOfAttraction,
              type: spot.typeOfAttraction,
              distance: spot.distance.toFixed(2),
              cost: spotCost,
            });
            remainingBudget -= spotCost;
          }
        }
      });
    }
  }

  return { settings: selectedSpots.reverse(), excessBudget: remainingBudget };
}
