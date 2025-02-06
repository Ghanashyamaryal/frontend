import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";

const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 16);
  }, [center, map]);
  return null;
};

const App = () => {
  const [currentLocation, setCurrentLocation] = useState([51.505, -0.09]);
  const [searchLocation, setSearchLocation] = useState("");
  const [destination, setDestination] = useState(null);
  const [addressDetails, setAddressDetails] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation([position.coords.latitude, position.coords.longitude]);
            setLoadingLocation(false);
          },
          async (error) => {
            console.error("Error with geolocation: ", error);
            setLoadingLocation(true);
            await fetchFallbackLocation();
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      } else {
        console.warn("Geolocation not available in this browser.");
        await fetchFallbackLocation();
      }
    };

    const fetchFallbackLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        if (data && data.latitude && data.longitude) {
          setCurrentLocation([data.latitude, data.longitude]);
        } else {
          console.error("Failed to fetch location from IP API.");
        }
      } catch (error) {
        console.error("Error fetching fallback location: ", error);
      } finally {
        setLoadingLocation(false);
      }
    };

    getLocation();
  }, []);

  const handleSearch = async () => {
    if (!searchLocation) {
      alert("Please enter a location.");
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchLocation
        )}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const destCoords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        setDestination(destCoords);
        fetchAddressDetails(destCoords[0], destCoords[1]);
      } else {
        alert("Location not found! Try another.");
      }
    } catch (error) {
      console.error("Error fetching search location: ", error);
    }
  };

  const fetchAddressDetails = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      setAddressDetails(data.display_name || "Address details not available.");
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };

  const refreshPage = () => {
    setSearchLocation("");
    setDestination(null);
    setAddressDetails("");
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation([position.coords.latitude, position.coords.longitude]);
        setLoadingLocation(false);
      },
      async () => {
        await fetchFallbackLocation();
      }
    );
  };
  const RoutingMachine = () => {
    const map = useMap();

    useEffect(() => {
      if (destination) {
        const routingControl = L.Routing.control({
          waypoints: [
            L.latLng(destination),
            L.latLng(currentLocation),
          ],
          routeWhileDragging: true,
          lineOptions: {
            styles: [{ color: "blue", weight: 8 }],
          },
          createMarker: function (i, waypoint) {
            const icon = L.icon({
              iconUrl:
                i === 0
                  ? "https://cdn-icons-png.flaticon.com/512/684/684908.png"
                  : "https://cdn-icons-png.flaticon.com/512/684/684923.png",
              iconSize: [40, 40],
            });
            return L.marker(waypoint.latLng, { icon });
          },
        }).addTo(map);

        return () => {
          map.removeControl(routingControl);
        };
      }
    }, [destination, currentLocation, map]);
    return null;
  };

  return (
    <div className="relative h-screen w-full bg-gray-100">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 p-4 bg-white rounded-full shadow-lg transition-transform hover:scale-105">
        <input
          type="text"
          placeholder="Enter location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="p-2 border text-black rounded-full focus:outline-none focus:ring-2 focus:ring-[#ADBBDA] "
        />
        <button
          onClick={handleSearch}
          className="p-2 px-4 bg-[#004aad]  text-white rounded-full shadow hover:bg-blue-600 transition-transform hover:scale-105"
        >
          Search
        </button>
        <button
          onClick={refreshPage}
          className="p-2 px-4 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition-transform hover:scale-105"
        >
          Refresh
        </button>
      </div>
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          right: "5%",
          bottom: "5%",
        }}
      >
        {loadingLocation ? (
          <p>Loading your current location...</p>
        ) : (
          <MapContainer
            center={destination || currentLocation}
            zoom={16}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            <ChangeView center={destination || currentLocation} />
            <RoutingMachine />
            {destination && (
              <Marker position={destination}>
                <Popup className="text-black">{addressDetails || "Fetching address details..."}</Popup>
              </Marker>
            )}
            <Marker position={currentLocation}>
              <Popup>You are here</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default App;
