import React, { useState } from "react";

const ListingModal = ({ listing, onClose }) => {
  const [selectedTransporter, setSelectedTransporter] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [mailSent, setMailSent] = useState(false);
  if (!listing) return null;

  let lat = "", lng = "";
  if (typeof listing.location === "string" && listing.location.includes(",")) {
    [lat, lng] = listing.location.split(",").map(Number);
  }

  // Dummy transporter list
  const transporters = [
    { name: "Zahid Transport", email: "zahid12344@example.com" },
    { name: "GreenTruck", email: "greentruckk@example.com" }
  ];

  const handleSendEmail = () => {
    if (!selectedTransporter || !currentLocation || !quantity) {
      alert("Please fill in all fields.");
      return;
    }
    if(quantity<=0){
      alert("Quantity Should be greater than 0");
      return;
    }
    if(quantity>listing.quantityAvailable){
      alert("Quantity Should be less than Available Quantity")
      return;
    }
    const transporter = transporters.find(t => t.name === selectedTransporter);

    // Simulate sending email
    const emailDetails = `
      To: ${transporter.email}
      Subject: Crop Transport Request
      
      Dear ${transporter.name},

      Please transport the following:
      - Crop: ${listing.cropType}
      - Quantity: ${quantity}
      - From: ${currentLocation}
      - Contact: ${listing.phoneNumber}
      - Destination Coordinates: ${listing.location}

      Thank you.
    `;
    console.log(emailDetails); // Simulate sending
    alert("Email sent to " + transporter.email);
    setMailSent(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 max-w-md p-6 relative shadow-lg">

        <button
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        <img
          src={listing.photoUrls[0]}
          alt={listing.cropType}
          className="h-48 w-full object-cover rounded mb-4"
        />

        <h2 className="text-xl font-bold mb-2">{listing.cropType}</h2>
        <p><strong>Quantity:</strong> {listing.quantityAvailable}</p>
        <p><strong>Phone:</strong> {listing.phoneNumber}</p>
        <p><strong>Coordinates:</strong> {listing.location}</p>
        <p><strong>Posted On:</strong> {new Date(listing.createdAt).toLocaleString()}</p>

        {lat && lng && (
          <a
            href={`https://www.google.com/maps?q=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            📍 View on Google Maps
          </a>
        )}

        <div className="mt-5">
          <h3 className="text-md font-semibold mb-2">Request Transport</h3>

          <label className="block mb-1 text-sm font-medium">Select Transporter</label>
          <select
            className="w-full border p-2 rounded mb-3"
            value={selectedTransporter}
            onChange={(e) => setSelectedTransporter(e.target.value)}
          >
            <option value="">-- Choose --</option>
            {transporters.map((t) => (
              <option key={t.name} value={t.name}>{t.name}</option>
            ))}
          </select>

          <label className="block mb-1 text-sm font-medium">Your Current Location</label>
          <input
            className="w-full border p-2 rounded mb-3"
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            placeholder="e.g., Sahiwal"
          />
          <label className="block mb-1 text-sm font-medium">Quantity to Transport</label>
          <input
            type="number"
            className="w-full border p-2 rounded mb-3"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g., 150 kg"
            min='1'
          />

          <button
            onClick={handleSendEmail}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Send Email to Transporter
          </button>

          {mailSent && (
            <p className="text-green-600 text-sm mt-2">✔ Email sent successfully!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingModal;
