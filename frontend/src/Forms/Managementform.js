import { useEffect, useState } from "react";
import axios from "axios";

const ManageListingsForm = () => {
  const [listings, setListings] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    crop: "",
    photoUrls: "",
    quantityAvailable: "",
    location: "",
    phoneNumber: ""
  });

  const userId = localStorage.getItem("userId");

  const fetchMyListings = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/listing/user/${userId}`)
      .then((res) => setListings(res.data))
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  const deleteListing = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/api/listing/del/${id}`)
      .then(() => fetchMyListings())
      .catch((err) => console.error("Delete error:", err));
  };

  const handleEditClick = (item) => {
    setEditId(item._id);
    setShowEditForm(true);
    setFormData({
      cropType: item.cropType,
      photoUrls: item.photoUrls.join(", "),
      quantityAvailable: item.quantityAvailable,
      location: item.location,
      phoneNumber: item.phoneNumber
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/listing/update/${editId}`, {
        ...formData,
        photoUrls: formData.photoUrls.split(",").map((url) => url.trim())
      })
      .then(() => {
        setShowEditForm(false);
        setEditId(null);
        fetchMyListings();
      })
      .catch((err) => console.error("Update error:", err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Listings</h2>

      {listings.map((item) => (
        <div
          key={item._id}
          className="bg-gray-300 shadow-lg rounded-xl mb-6 flex flex-col md:flex-row md:items-center"
        >
          <div className="w-full md:w-1/3 h-48 md:h-full p-2">
            <img
              src={item.photoUrls?.[0] || "https://via.placeholder.com/300"}
              alt="Listing"
              className="object-cover h-48 rounded-lg md:w-48 w-full"
            />
          </div>
          <div className="p-4 flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.cropType}</h3>
            <p className="text-gray-700"><strong>Location:</strong> {item.location}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {item.phoneNumber}</p>
            <p className="text-gray-700"><strong>Qty:</strong> {item.quantityAvailable}</p>
          </div>
          <div className="p-4 flex flex-col md:flex-row md:items-center gap-2">
            <button
              onClick={() => handleEditClick(item)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteListing(item._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}


      {showEditForm && (
        <div className="bg-black flex bg-opacity-70 fixed mt-5 inset-0 justify-center items-center w-full h-lvh">
          <form onSubmit={handleUpdate} className="flex flex-col gap-1 bg-gray-200 p-8 rounded w-2/4 min:w-2/4">
            <h3 className="text-xl font-bold mb-4">Edit Listing</h3>
            <div className="flex flex-row gap-2">
              <div className="mb-2">
                <label className="block mb-1">Crop Type</label>
                <input
                  value={formData.cropType}
                  onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                  className="border-2 rounded-md p-2 w-full border-green-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Phone Number</label>
                <input
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="border-2 rounded-md p-2 w-full border-green-600"
                  required
                />
              </div>
              
              <div className="mb-2">
                <label className="block mb-1">Quantity Available</label>
                <input
                  type="number"
                  value={formData.quantityAvailable}
                  onChange={(e) => setFormData({ ...formData, quantityAvailable: e.target.value })}
                  className="border-2 rounded-md p-2 w-full border-green-600"
                  required
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="block mb-1">Photo URLs</label>
              <textarea
                value={formData.photoUrls}
                onChange={(e) => setFormData({ ...formData, photoUrls: e.target.value })}
                className="w-full border-2 p-2 rounded h-24 border-green-600"
                required
              />
            </div>


            <div className="mb-2">
              <label className="block mb-1">Location</label>
              <input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="border-2 rounded-md p-2 w-full border-green-600"
                required
              />
            </div>

            

            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
              <button type="button" onClick={() => setShowEditForm(false)} className="text-gray-600">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageListingsForm;