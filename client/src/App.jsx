import React from 'react';

import { Link, Route, Routes } from 'react-router-dom';

import AddTripView from './components/add-trip-view/add-trip-view';
import Chat from './components/chat/chat';
import DropdownMenu from './components/dropdown-menu/dropdown-menu';
import ProfileView from './components/profile-view/profile-view';
import SearchView from './components/search-view/search-view';
import TripView from './components/trip-view/trip-view';
import DriverTripView from './components/trip-view/driver-trip-view/driver-trip-view';
import TripListView from './components/trip-list-view/trip-list-view';
import ReviewView from './components/review-view/review-view';
import Payment from './components/payment/payment';
import AgreeToPayment from './components/agree-to-payment/agree-to-payment';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';

import { ProtectedRoute } from './components/profile-view/protected-route';
const library = ['places'];

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GMAPS_API_KEY,
    libraries: library,
  });
  if (!isLoaded) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <DropdownMenu></DropdownMenu>
      <Routes>
        <Route path="/" element={<SearchView />} />
        <Route path="/chat" element={<ProtectedRoute component={Chat} />} />
        <Route path="/trip" element={<TripView />} />
        <Route
          path="/profile"
          element={<ProtectedRoute component={ProfileView} />}
        />
        <Route path="/profile" element={<ProfileView />} />
        <Route
          path="/review"
          element={<ProtectedRoute component={ReviewView} />}
        />
        <Route
          path="/driver-trip"
          element={<ProtectedRoute component={DriverTripView} />}
        />
        <Route
          path="/trips"
          element={<ProtectedRoute component={TripListView} />}
        />
        <Route
          path="/add"
          element={<ProtectedRoute component={AddTripView} />}
        />
        {/* <Route path="/add" element={<AddTripView />} /> */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirm" element={<AgreeToPayment />} />
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

{
  /* <div>This is a very important message!!</div>
      <div>Put your component here when you want to test it out.</div>
      <div>Please save these divs in a comment below when testing.</div>
      <div>So that you are able to restore this component to exactly</div>
      <div>the way it was to avoid merge conflicts.</div>
      <div>This message is coming to you from App.jsx</div> */
}
