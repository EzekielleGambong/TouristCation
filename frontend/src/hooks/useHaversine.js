import { useEffect, useState } from 'react';

function useNearbyLocations(fixedLat, fixedLon, distanceThreshold = 10) {
  const [nearbyLocations, setNearbyLocations] = useState([]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch('http://localhost:8080/touristspots/coordinates');
        const locations = await response.json();

        const parsedLocations = locations
          .map(location => {
            const [lat, lon] = location.locationCoordinates.split(',').map(coord => parseFloat(coord.trim()));
            const distance = calculateHaversineDistance(fixedLat, fixedLon, lat, lon);
            return { name: location.nameOfAttractions, lat, lon, distance };
          })
          .filter(location => location.distance <= distanceThreshold)
          .sort((a, b) => a.distance - b.distance);

        setNearbyLocations(parsedLocations);
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }

    fetchLocations();
  }, [fixedLat, fixedLon, distanceThreshold]);

  function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function toRad(degrees) {
    return degrees * Math.PI / 180;
  }

  return nearbyLocations;
}

export default useNearbyLocations;
