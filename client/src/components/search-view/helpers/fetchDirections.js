module.exports = fetchDirections = (start, end, setDirections) => {
  const service = new google.maps.DirectionsService();
  service.route(
    {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === 'OK' && result) {
        // setDirections(result);
        let miles = result.routes[0].legs[0].distance.value / 1609.34;
        let milesReadable = result.routes[0].legs[0].distance.text;
        let seconds = result.routes[0].legs[0].duration.value;
        let timeReadable = result.routes[0].legs[0].duration.text;
        let startAddress = result.routes[0].legs[0].start_address;
        let endAddress = result.routes[0].legs[0].end_address;
        let centsPerMile = 62.5;
        let cost = Number(((miles * centsPerMile) / 100).toFixed(2));
        console.log('🚙', Math.round(miles));
        console.log('⏰', seconds);
        console.log('🚪', startAddress);
        console.log('📍', endAddress);
        console.log('💰', `$${((miles * centsPerMile) / 100).toFixed(2)}`);
        console.log(result);
        setDirections({
          miles,
          milesReadable,
          seconds,
          timeReadable,
          startAddress,
          endAddress,
          cost,
        });
      }
    }
  );
};
