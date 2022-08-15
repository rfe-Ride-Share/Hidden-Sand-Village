import React from 'react';

import AddTripView from './components/add-trip-view/add-trip-view';
import Chat from './components/chat/chat';
import DropdownMenu from './components/dropdown-menu/dropdown-menu';
import ProfileView from './components/profile-view/profile-view';
import SearchView from './components/search-view/search-view';
import RiderTripView from './components/trip-view/rider-trip-view/rider-trip-view';

function App() {
  const tripInfo = {
    date: '4:00 PM August 27th, 2022',
    startPoint: '20 W 34th St., New York, NY 10001',
    endPoint: '3701 Osceola Pkwy, Bay Lake, FL 32830',
    totalCost: '$250',
    riderCostLow: 25,
    riderCostHigh: 125,
  }

  return (
    <RiderTripView tripInfo={tripInfo} />
  )
}

export default App;
