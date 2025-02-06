import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { RouterProvider, Navigate } from "react-router-dom";
import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import store from "./store/Store.js";
import App from "./App.jsx";

import "./index.css";


const Home = lazy(() => import("./Component/Home/Home.jsx"));
const Destination = lazy(() => import("./pages/userpages/Destination.jsx"));
const DestinationDetails = lazy(() => import("./pages/userpages/DestinationDetails.jsx"));
const Hotels = lazy(() => import("./pages/userpages/Hotels.jsx"));
const HotelsDetails = lazy(() => import("./pages/userpages/HotelsDetails.jsx"));
const Login = lazy(() => import("./pages/userpages/Login.jsx"));
const Register = lazy(() => import("./pages/userpages/Register.jsx"));
const PlanYourTrip = lazy(() => import("./pages/userpages/PlanyourTrip.jsx"));
const NearbyAttraction = lazy(() => import("./pages/userpages/NearbyAttraction.jsx"));
const Package = lazy(() => import("./pages/userpages/Package.jsx"));
const PackageDetails = lazy(() => import("./pages/userpages/PackageDetails.jsx"));
const Contact = lazy(() => import("./pages/userpages/Contact.jsx"));
const FAQs = lazy(() => import("./Support/Faqs.jsx"));
const CustomerSupport = lazy(() => import("./Support/CustomerSupport.jsx"));
const TermsConditions = lazy(() => import("./Support/TermsandConditions.jsx"));
const Trek = lazy(() => import("./pages/userpages/Trek.jsx"));
const TrekDetails = lazy(() => import("./pages/userpages/TrekDetails.jsx"));
const Festival = lazy(() => import("./pages/userpages/Festival.jsx"));
const SearchResults = lazy(() => import("./pages/userpages/Searchresult.jsx"));


const AdminDashboard = lazy(() => import("./pages/adminpages/Dashboard.jsx"));
const HotelAdmin = lazy(() => import("./pages/adminpages/Hotels.jsx"));
const DestinationAdmin = lazy(() => import("./pages/adminpages/Destinations.jsx"));
const FestivalAdmin = lazy(() => import("./pages/adminpages/Festival.jsx"));
const PackageAdmin = lazy(() => import("./pages/adminpages/Packages.jsx"));
const PlanYourTripAdmin = lazy(() => import("./pages/adminpages/Planyourtrip.jsx"));
const TrekAdmin = lazy(() => import("./pages/adminpages/Treks.jsx"));


const PrivateRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token || userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="hotels" element={<Hotels />} />
      <Route path="hotels/:hotelId" element={<HotelsDetails />} />
      <Route path="destinations" element={<Destination />} />
      <Route path="destinations/:destinationId" element={<DestinationDetails />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="planyourtrip" element={<PlanYourTrip />} />
      <Route path="nearbyattraction" element={<NearbyAttraction />} />
      <Route path="search" element={<SearchResults />} />
      <Route path="contact" element={<Contact />} />
      <Route path="packages" element={<Package />} />
      <Route path="packages/:packageId" element={<PackageDetails />} />
      <Route path="faqs" element={<FAQs />} />
      <Route path="termsandconditions" element={<TermsConditions />} />
      <Route path="customerSupport" element={<CustomerSupport />} />
      <Route path="trek" element={<Trek />} />
      <Route path="trek/:trekId" element={<TrekDetails />} />
      <Route path="festivalsandevents" element={<Festival />} />

 
      <Route
        path="user"
        element={
          <PrivateRoute role="user">
            <div>User Dashboard Placeholder</div>
          </PrivateRoute>
        }
      />

    
      <Route
        path="admin"
        element={
          <PrivateRoute role="admin">
            <Suspense fallback={<div>Loading Admin...</div>}>
              <AdminDashboard />
            </Suspense>
          </PrivateRoute>
        }
      >
        <Route path="hotels" element={<HotelAdmin />} />
        <Route path="destinations" element={<DestinationAdmin />} />
        <Route path="packages" element={<PackageAdmin />} />
        <Route path="planyourtrip" element={<PlanYourTripAdmin />} />
        <Route path="festivals" element={<FestivalAdmin />} />
        <Route path="treks" element={<TrekAdmin />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>
);
