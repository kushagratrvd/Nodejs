/**
 * Calculate distance between two geographical coordinates using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

/**
 * Sort schools by distance from user location
 * @param {Array} schools - Array of school objects
 * @param {number} userLat - User's latitude
 * @param {number} userLon - User's longitude
 * @returns {Array} Sorted array of schools with distance information
 */
const sortSchoolsByDistance = (schools, userLat, userLon) => {
  return schools.map(school => ({
    ...school,
    distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
  })).sort((a, b) => a.distance - b.distance);
};

export {
  calculateDistance,
  sortSchoolsByDistance
}; 