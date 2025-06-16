import Navbar from "../Sections/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Postform from "../Forms/postform";
import ManageListingsForm from "../Forms/Managementform";
import ListingModal from "../Forms/ListingModal";


const Listingspage = () => {
  const [cropListings, setCropListings] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showManagementForm, setShowManagementForm] = useState(false);
  const [selectedCropType, setSelectedCropType] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationNames, setLocationNames] = useState({});
  const [selectedListing, setSelectedListing] = useState(null);


  const handleCropTypeChange = (e) => {
    setSelectedCropType(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setSelectedQuantity(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const fetchReadableLocation = async (location) => {
  if (!location || locationNames[location]) return;

  const [lat, lon] = location.split(",");
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    );
    const data = await res.json();
    const components = data.display_name.split(",").map(part => part.trim());

    // Extract the smallest location + Tehsil + District + Province
    const selectedParts = [];
    const lowerComponents = components.map(c => c.toLowerCase());

    if (components[0]) selectedParts.push(components[0]); // smallest unit (like village or town)

    const tehsil = components.find(c => c.toLowerCase().includes("tehsil"));
    const district = components.find(c => c.toLowerCase().includes("district"));
    const province = components.find(c => c.toLowerCase().includes("punjab") || c.toLowerCase().includes("sindh") || c.toLowerCase().includes("kpk") || c.toLowerCase().includes("balochistan"));

    if (tehsil) selectedParts.push(tehsil);
    if (district) selectedParts.push(district);
    if (province) selectedParts.push(province);

    const finalLocation = selectedParts.join(", ");

    setLocationNames((prev) => ({
      ...prev,
      [location]: finalLocation || location,
    }));
  } catch {
    setLocationNames((prev) => ({
      ...prev,
      [location]: location,
    }));
  }
};


  const filteredListings = cropListings.filter((item) => {
    const matchCropType =
      selectedCropType === "" || item.cropType === selectedCropType;
    const matchQuantity =
      selectedQuantity === "" ||
      item.quantityAvailable >= parseInt(selectedQuantity);
    const matchLocation =
      selectedLocation === "" ||
      (locationNames[item.location] &&
        locationNames[item.location]
          .toLowerCase()
          .includes(selectedLocation.toLowerCase()));
    return matchCropType && matchQuantity && matchLocation;
  });

  const fetchListings = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/listing/get`)
      .then((res) => {
        setCropListings(res.data);
        // Fetch readable location names for all listings
        res.data.forEach((item) => {
          if (item.location) {
            fetchReadableLocation(item.location);
          }
        });
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <>
      <Navbar isListingsPage={true} />

      <div className="p-4 bg-gray-100 flex justify-center gap-11">
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowPostForm(!showPostForm)}
        >
          Post Listing
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowManagementForm(!showManagementForm)}
        >
          {showManagementForm ? "Close Manage Listing" : "Manage Listing"}
        </button>
      </div>

      {showManagementForm && <ManageListingsForm />}
      {showPostForm && (
        <Postform SetShowForm={setShowPostForm} FetchListings={fetchListings} />
      )}

      <div className="flex">
        <aside className="w-64 bg-white p-4 border-r">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Crop Type Filter */}
          <div className="mb-4">
            <h3 className="font-medium">Crop Type</h3>
            {["", "Naswar", "Cigarette"].map((type) => (
              <label key={type} className="block">
                <input
                  type="radio"
                  name="cropType"
                  value={type}
                  checked={selectedCropType === type}
                  onChange={handleCropTypeChange}
                />
                {type === "" ? "All" : type}
              </label>
            ))}
          </div>

          {/* Quantity Filter */}
          <div className="mb-4">
            <h3 className="font-medium">Minimum Quantity Available</h3>
            <input
              type="number"
              className="w-full border rounded px-2 py-1 mt-1"
              placeholder="Enter minimum quantity"
              value={selectedQuantity}
              onChange={handleQuantityChange}
            />
          </div>

          {/* Location Filter */}
          <div className="mb-4">
            <h3 className="font-medium">Location</h3>
            <input
              type="text"
              className="w-full border rounded px-2 py-1 mt-1"
              placeholder="Search location"
              value={selectedLocation}
              onChange={handleLocationChange}
            />
          </div>
        </aside>

        {/* Listings */}
        <section className="flex flex-row flex-wrap justify-center items-start gap-6 p-6 bg-green-500 flex-1">
          {filteredListings.map((item) => (
            <div key={item._id} className="bg-white rounded shadow p-4 h-80 w-64 flex flex-col" onClick={() => setSelectedListing(item)}>
              <img
                src={item.photoUrls[0]}
                alt={item.cropType}
                className="h-32 w-full object-cover mb-2 rounded"
              />
              <h3 className="font-semibold text-lg">{item.cropType}</h3>
              <p className="text-sm text-gray-500">
                {locationNames[item.location] || "Loading..."}
              </p>
              <p className="text-green-700 font-bold">
                Qty: {item.quantityAvailable} Kg
              </p>
              <p className="text-sm text-gray-700">{item.phoneNumber}</p>
              <p className="text-xs text-gray-400 mt-1">
                Listed: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </section>
      </div>
      {selectedListing && (
        <ListingModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}

    </>
  );
};

export default Listingspage;
