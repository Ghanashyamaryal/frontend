import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createRoutesFromElements, createBrowserRouter, Route } from "react-router-dom";
import { RouterProvider, Navigate } from "react-router";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import Home from "./Component/Home/Home.jsx";

const Destination = React.lazy(() => import("./pages/userpages/Destination.jsx"));
const Hotels = React.lazy(() => import("./pages/userpages/Hotels.jsx"));
const HotelsDetails = React.lazy(() => import("./pages/userpages/HotelsDetails.jsx"));
const Login = React.lazy(() => import("./pages/userpages/Login.jsx"));
const Register = React.lazy(() => import("./pages/userpages/Register.jsx"));
const PlanYourTrip = React.lazy(() => import("./pages/userpages/PlanyourTrip.jsx"));
const NearbyAttraction = React.lazy(() => import("./pages/userpages/NearbyAttraction.jsx"));
const Package = React.lazy(() => import("./pages/userpages/Package.jsx"));
const Contact = React.lazy(() => import("./pages/userpages/Contact.jsx"));
const FAQs = React.lazy(() => import("./Support/Faqs.jsx"));
const CustomerSupport = React.lazy(() => import("./Support/CustomerSupport.jsx"));
const TermsConditions = React.lazy(() => import("./Support/TermsandConditions.jsx"));
const Trek = React.lazy(() => import("./pages/userpages/Trek.jsx"));
const TrekDetails = React.lazy(() => import("./pages/userpages/TrekDetails.jsx"));
const Festival = React.lazy(() => import("./pages/userpages/Festival.jsx"));
const PackageDetails = React.lazy(() => import("./pages/userpages/PackageDetails.jsx"));
const SearchResults = React.lazy(() => import("./pages/userpages/Searchresult.jsx"));
const DestinationDetails = React.lazy(() => import("./pages/userpages/DestinationDetails.jsx"));
const AdminDashboard = React.lazy(() => import("./pages/adminpages/Dashboard.jsx"));
const HotelAdmin = React.lazy(() => import("./pages/adminpages/Hotels.jsx"));
const DestinationAdmin = React.lazy(() => import("./pages/adminpages/Destinations.jsx"));
const FestivalAdmin = React.lazy(() => import("./pages/adminpages/Festival.jsx"));
const PackageAdmin = React.lazy(() => import("./pages/adminpages/Packages.jsx"));
const PlanYourTripAdmin = React.lazy(() => import("./pages/adminpages/Planyourtrip.jsx"));
const TrekAdmin = React.lazy(() => import("./pages/adminpages/Treks.jsx"));

const PrivateRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token || userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

const withSuspense = (Component) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={withSuspense(Hotels)} />
      <Route path="/hotels/:hotelId" element={withSuspense(HotelsDetails)} />
      <Route path="/destinations" element={withSuspense(Destination)} />
      <Route path="/destinations/:destinationId" element={withSuspense(DestinationDetails)} />
      <Route path="/login" element={withSuspense(Login)} />
      <Route path="/register" element={withSuspense(Register)} />
      <Route path="/planyourtrip" element={withSuspense(PlanYourTrip)} />
      <Route path="/nearbyattraction" element={withSuspense(NearbyAttraction)} />
      <Route path="/search" element={withSuspense(SearchResults)} />
      <Route path="/contact" element={withSuspense(Contact)} />
      <Route path="/packages" element={withSuspense(Package)} />
      <Route path="/packages/:packageId" element={withSuspense(PackageDetails)} />
      <Route path="/faqs" element={withSuspense(FAQs)} />
      <Route path="/TermsandCondition" element={withSuspense(TermsConditions)} />
      <Route path="/customerSupport" element={withSuspense(CustomerSupport)} />
      <Route path="/trek" element={withSuspense(Trek)} />
      <Route path="/trek/:trekId" element={withSuspense(TrekDetails)} />
      <Route path="/festivalsandevents" element={withSuspense(Festival)} />
      <Route
        path="/user"
        element={
          <PrivateRoute role="user">
            <Suspense fallback={<div>Loading...</div>}>
              <div>User Dashboard Placeholder</div>
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute role="admin">
            <Suspense fallback={<div>Loading...</div>}>
              <AdminDashboard />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route path="/admin/hotels" element={withSuspense(HotelAdmin)} />
      <Route path="/admin/destinations" element={withSuspense(DestinationAdmin)} />
      <Route path="/admin/packages" element={withSuspense(PackageAdmin)} />
      <Route path="/admin/planyourtrip" element={withSuspense(PlanYourTripAdmin)} />
      <Route path="/admin/festivals" element={withSuspense(FestivalAdmin)} />
      <Route path="/admin/treks" element={withSuspense(TrekAdmin)} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
