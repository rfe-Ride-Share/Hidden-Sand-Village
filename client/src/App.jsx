import React from 'react';

import AddTripView from './components/add-trip-view/add-trip-view';
import Chat from './components/chat/chat';
import DropdownMenu from './components/dropdown-menu/dropdown-menu';
import ProfileView from './components/profile-view/profile-view';
import SearchView from './components/search-view/search-view';
import TripView from './components/trip-view/trip-view';

// import SearchBar from './components/search-view/search-bar.jsx';

function App() {
  return (
    <div>
      <SearchView />
      <div>This is a very important message!!</div>
      <div>Put your component here when you want to test it out.</div>
      <div>Please save these divs in a comment below when testing.</div>
      <div>So that you are able to restore this component to exactly</div>
      <div>the way it was to avoid merge conflicts.</div>
      <div>This message is coming to you from App.jsx</div>
    </div>
  );
}

export default App;
