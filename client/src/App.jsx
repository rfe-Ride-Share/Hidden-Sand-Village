import React from 'react';

import AddTripView from './components/add-trip-view/add-trip-view';
import Chat from './components/chat/chat';
import DropdownMenu from './components/dropdown-menu/dropdown-menu';
import ProfileView from './components/profile-view/profile-view';
import SearchView from './components/search-view/search-view';
import TripView from './components/trip-view/trip-view';


function App() {
  return (
    <div>
      <AddTripView />
      <Chat />
      <DropdownMenu />
      <ProfileView />
      <SearchView />
      <TripView />
    </div>
  )
}

export default App;
