import axios, { Axios } from "axios";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const Postform=({FetchListings,SetShowForm})=>{
    const markerIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

    // Form state
    const [tobaccoType, setTobaccoType] = useState("Naswar");
    const [photoUrls, setPhotoUrls] = useState("");
    const [quantityAvailable, setQuantityAvailable] = useState("");
    const [location, setLocation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");

    const resetForm = () => {
        setTobaccoType("Naswar");
        setPhotoUrls("");
        setQuantityAvailable("");
        setLocation("");
        setPhoneNumber("");
        setFormError("");
        setFormSuccess("");
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        setFormSuccess("");
    
        if (
          !tobaccoType ||
          !photoUrls.trim() ||
          !quantityAvailable ||
          !location.trim() ||
          !phoneNumber.trim()
        ) {
          setFormError("Please fill out all fields.");
          return;
        }
    
        const photosArray = photoUrls
          .split(/\n|,/)
          .map((url) => url.trim())
          .filter((url) => url);
    
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setFormError("User not logged in.");
          return;
        }
    
        try {
          await axios.post("http://localhost:5000/api/listing/add", {
            userId,
            tobaccoType,
            photoUrls: photosArray,
            quantityAvailable: Number(quantityAvailable),
            location,
            phoneNumber,
          });
    
          setFormSuccess("Listing posted successfully!");
          resetForm();
          SetShowForm(false);
          FetchListings();
        } catch (err) {
          setFormError(
            err.response?.data?.message || "Failed to post listing. Try again."
          );
        }
      };
    function LocationMarker({ setLocation }) {
      const [position, setPosition] = useState(null);
          useMapEvents({
            click(e) {
              setPosition(e.latlng);
              setLocation(`${e.latlng.lat},${e.latlng.lng}`);
            },
          });

          return position === null ? null : (
            <Marker position={position} icon={markerIcon} />
          );
      }

    return(
        <div className="bg-black flex bg-opacity-70 fixed mt-10 inset-0 justify-center items-center w-full h-lvh">
          
          {formError && <p className="text-red-600 mb-2">{formError}</p>}
          {formSuccess && <p className="text-green-600 mb-2">{formSuccess}</p>}

          <form className="flex flex-col gap-2 bg-gray-200 p-2 rounded" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between gap-4">
            <label>
              Tobacco Type:
              <select
                value={tobaccoType}
                onChange={(e) => setTobaccoType(e.target.value)}
                className="w-full border-2 p-2 rounded border-green-600"
              >
                <option value="Naswar">Naswar</option>
                <option value="Cigarette">Cigarette</option>
              </select>
            </label>
            <label>
              Phone Number:
              <input
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border-2 p-2 rounded border-green-600"
              />
            </label>


            <label>
              Quantity Available in Kgs:
              <input
                type="number"
                value={quantityAvailable}
                onChange={(e) => setQuantityAvailable(e.target.value)}
                min="1"
                className="w-full border-2 p-2 rounded border-green-600"
              />
            </label>
            </div>
            <label>
              Photo URLs (one per line or comma-separated):
              <textarea
                value={photoUrls}
                onChange={(e) => setPhotoUrls(e.target.value)}
                placeholder={`https://example.com/img1.jpg\nhttps://example.com/img2.jpg`}
                className="w-full border-2 p-2 rounded h-12 border-green-600"
              />
            </label>
            
            <label>
                Location (click on map to select):
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border-2 p-2 rounded border-green-600"
                  placeholder="Latitude, Longitude"
                  readOnly
                />
            </label>
            <div className="h-40 w-full mb-4 rounded overflow-hidden">
              <MapContainer center={[30.3753, 69.3451]} zoom={5} className="h-full w-full">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <LocationMarker setLocation={setLocation} />
              </MapContainer>
            </div>
            
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
            >
              Submit Listing
            </button>
            <button type="button" onClick={() => SetShowForm(false)} className="text-gray-600">Cancel</button>
          </form>
        </div>
    )
}
export default Postform