import React from 'react';

import { Link, Route, Routes } from 'react-router-dom';

import AddTripView from './components/add-trip-view/add-trip-view';
import Chat from './components/chat/chat';
import DropdownMenu from './components/dropdown-menu/dropdown-menu';
import ProfileView from './components/profile-view/profile-view';
import SearchView from './components/search-view/search-view';
import RiderTripView from './components/trip-view/rider-trip-view/rider-trip-view';
import DriverTripView from './components/trip-view/driver-trip-view/driver-trip-view';
import TripListView from './components/trip-list-view/trip-list-view';
import ReviewView from './components/review-view/review-view';
import { ProtectedRoute } from './components/profile-view/protected-route';

function App() {
  return (
    <div>
      <DropdownMenu></DropdownMenu>
      <ReviewView />
      <Routes>
        <Route path="/" element={<SearchView />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/trip" element={<RiderTripView />} />
        <Route
          path="/profile"
          element={<ProtectedRoute component={ProfileView} />}
          // element={<ProfileView />}
        />
      </Routes>

      {/* <div>This is a very important message!!</div>
      <div>Put your component here when you want to test it out.</div>
      <div>Please save these divs in a comment below when testing.</div>
      <div>So that you are able to restore this component to exactly</div>
      <div>the way it was to avoid merge conflicts.</div>
      <div>This message is coming to you from App.jsx</div> */}
    </div>
  );
}

export default App;
