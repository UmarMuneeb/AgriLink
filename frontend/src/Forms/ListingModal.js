import React from "react";

const ListingModal = ({ listing, onClose }) => {
  if (!listing) return null;

  // Extract latitude and longitude (assuming stored as "lat,lng" string)
  let lat = "", lng = "";
  if (typeof listing.location === "string" && listing.location.includes(",")) {
    [lat, lng] = listing.location.split(",").map(Number);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 max-w-md p-6 relative shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        {/* Image */}
        <img
          src={listing.photoUrls[0]}
          alt={listing.tobaccoType}
          className="h-48 w-full object-cover rounded mb-4"
        />

        {/* Details */}
        <h2 className="text-xl font-bold mb-2">{listing.tobaccoType}</h2>
        <p><strong>Quantity:</strong> {listing.quantityAvailable}</p>
        <p><strong>Phone:</strong> {listing.phoneNumber}</p>
        <p><strong>Coordinates:</strong> {listing.location}</p>
        <p><strong>Posted On:</strong> {new Date(listing.createdAt).toLocaleString()}</p>

        {/* View on Map */}
        {lat && lng && (
          <a
            href={`https://www.google.com/maps?q=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mt-3 inline-block"
          >
            📍 View on Google Maps
          </a>
        )}
      </div>
    </div>
  );
};

export default ListingModal;
