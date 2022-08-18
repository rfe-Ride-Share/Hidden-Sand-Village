module.exports = getDistance = (search, trip) => {
  //Calculate distance between two points on earth
  let lng1 = search.lng;
  let lat1 = search.lat;
  let lng2 = trip.lng;
  let lat2 = trip.lat;

  lng1 = (lng1 * Math.PI) / 180;
  lng2 = (lng2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  //Haversine formula
  let dlng = lng2 - lng1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlng / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  //Radius of earth in miles
  let r = 3956;

  //Calculate the result in miles
  return c * r;
};
/**
 * let distStart, distEnd, distTotal
 * check distance from start
 check distance from end
 add total
 {...object, distStart: number, distEnd: number, distTotal: number}
 sort into results array by total distance
 */
