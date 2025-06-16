import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Helper function to convert coordinates to readable location
const fetchReadableLocation = async (location) => {
  if (!location) return location;

  const [lat, lon] = location.split(",");
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    );
    const data = await res.json();
    const components = data.display_name.split(",").map((part) => part.trim());

    const selectedParts = [];
    if (components[0]) selectedParts.push(components[0]);

    const tehsil = components.find((c) => c.toLowerCase().includes("tehsil"));
    const district = components.find((c) => c.toLowerCase().includes("district"));
    const province = components.find((c) =>
      ["punjab", "sindh", "kpk", "balochistan"].some((p) =>
        c.toLowerCase().includes(p)
      )
    );

    if (tehsil) selectedParts.push(tehsil);
    if (district) selectedParts.push(district);
    if (province) selectedParts.push(province);

    return selectedParts.join(", ") || location;
  } catch {
    return location;
  }
};

const Items = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/listing/get`)
      .then(async (res) => {
        const slicedItems = res.data.slice(0, 4);

        const updatedItems = await Promise.all(
          slicedItems.map(async (item) => {
            const readableLocation = await fetchReadableLocation(item.location);
            return { ...item, readableLocation };
          })
        );

        setItems(updatedItems);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <>
      <div className="flex justify-between items-center px-10 font-poppins py-10">
        <div className="font-bold text-3xl">Buy Crops</div>
        <button
          onClick={() => navigate("/listings")}
          className="text-sm text-green-700 font-semibold border border-green-700 px-4 py-1 rounded hover:bg-green-700 hover:text-white transition"
        >
          Show More →
        </button>
      </div>

      <hr className="border-t-1 border-black" />

      {/* Listings */}
      <div className="w-full px-20 py-8 bg-gray-200 font-poppins flex gap-6 flex-wrap justify-center">
        {items.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-xl shadow-md w-64">
            <img
              src={item.photoUrls?.[0] || "https://via.placeholder.com/300"}
              alt={item.cropType}
              className="h-32 w-full object-cover rounded"
            />
            <h3 className="font-semibold text-lg mt-2">{item.cropType}</h3>
            <p className="text-sm text-gray-500">
              {item.readableLocation || "Loading..."}
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
      </div>

      <hr className="border-t-1 border-black" />
    </>
  );
};

export default Items;
