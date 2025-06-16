import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/listing/get`)
      .then((res) => setItems(res.data.slice(0, 4))) // Show only 4 items
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

      <div className="w-full px-20 py-8 bg-gray-200 font-poppins flex gap-6 flex-wrap justify-center">
        {items.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-xl shadow-md w-64">
            <img
              src={item.photoUrls?.[0] || "https://via.placeholder.com/300"}
              alt={item.tobaccoType}
              className="h-32 w-full object-cover rounded"
            />
            <h3 className="font-semibold text-lg mt-2">{item.tobaccoType}</h3>
            <p className="text-sm text-gray-500">{item.location}</p>
            <p className="text-green-700 font-bold">Qty: {item.quantityAvailable}</p>
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
