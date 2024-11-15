import useNearbyLocations from '../hooks/useHaversine';

const fixedLat = 16.329656856540606; 
const fixedLon = 120.3421257749749;

function Sample() {
  const nearbyLocations = useNearbyLocations(fixedLat, fixedLon);

  return (
    <div>
      <h2>Nearby Attractions within 10 km</h2>
      <ul>
        {nearbyLocations.map((location, index) => (
          <li key={index}>
            {location.name} - Distance: {location.distance.toFixed(2)} km
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sample;
