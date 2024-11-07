// 0/1 Knapsack Algorithm
export function Knapsack(touristSpots, touristSpotsBudget, budgetCap) {
  // Calculate the adjusted cost based on rating
  const adjustedSpots = touristSpots.map((spot) => ({
    ...spot,
    type: "itinerary_tourist_spot",
    budget_allocated: Math.min((budgetCap / 5) * spot.rating, budgetCap),
    total_budget: Math.min((budgetCap / 5) * spot.rating, budgetCap) + spot.cost,
  }));

  // Sort spots by rating descending to prioritize higher-rated spots
  adjustedSpots.sort((a, b) => b.rating - a.rating);

  const n = adjustedSpots.length;

  // Initialize dp array for storing maximum ratings
  const dp = Array(n + 1)
    .fill(0)
    .map(() => Array(touristSpotsBudget + 1).fill(0));

  // Fill dp array using the knapsack algorithm
  for (let i = 1; i <= n; i++) {
    const { rating, total_budget } = adjustedSpots[i - 1];
    for (let budget = 1; budget <= touristSpotsBudget; budget++) {
      if (total_budget <= budget) {
        dp[i][budget] = Math.max(dp[i - 1][budget], dp[i - 1][budget - total_budget] + rating);
      } else {
        dp[i][budget] = dp[i - 1][budget];
      }
    }
  }

  // Backtrack to find selected spots that fit within budget
  let budget = touristSpotsBudget;
  const selectedSpots = [];
  for (let i = n; i > 0 && budget > 0; i--) {
    if (dp[i][budget] !== dp[i - 1][budget]) {
      selectedSpots.push(adjustedSpots[i - 1]);
      budget -= adjustedSpots[i - 1].total_budget;
    }
  }

  // Return only the selected spots
  return { settings: selectedSpots.reverse(), excessBudget: budget }; // Reverse to maintain original order
}

// [GREEDY] 0/1 Knapsack Algorithm
// export function Knapsack(touristSpots, touristSpotsBudget, budgetCap) {
//   // Calculate adjusted costs and sort by rating (highest first)
//   const adjustedSpots = touristSpots
//     .map((spot) => ({
//       ...spot,
//       type: "itinerary_tourist_spot",
//       budget_allocated: Math.min((budgetCap / 5) * spot.rating, budgetCap),
//       total_budget: Math.min((budgetCap / 5) * spot.rating, budgetCap) + spot.cost,
//     }))
//     .sort((a, b) => b.rating - a.rating || a.total_budget - b.total_budget); // Sort by rating then by cost

//   const selectedSpots = [];
//   let remainingBudget = touristSpotsBudget;

//   // Select highest rated spots within budget
//   for (let spot of adjustedSpots) {
//     if (spot.total_budget <= remainingBudget) {
//       selectedSpots.push(spot);
//       remainingBudget -= spot.total_budget;
//     }
//   }

//   return selectedSpots;
// }
