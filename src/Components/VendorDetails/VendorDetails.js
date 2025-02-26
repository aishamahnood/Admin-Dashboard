import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function VendorDetails() {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchShopDetails();
  }, [id]);

  const fetchShopDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token is missing. Please log in again.");
        return;
      }
  
      const response = await axios.get(
        `https://aquarise-intelflow-backend.vercel.app/api/shops/vendor/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("Fetched shop details:", response.data); // Debugging log
  
      if (response.data && response.data.data) {
        setShop(response.data.data);
      } else {
        setError("No shop found for this vendor.");
      }
    } catch (error) {
      console.error("Error fetching vendor details:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "An error occurred."}`);
    }
  };
  
  const deactivateVendor = async () => {
    if (!shop) return;
  
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://aquarise-intelflow-backend.vercel.app/api/shops/update`,
        {
          vendor: id,
          shopName: shop.shopName,
          shopAddress: shop.shopAddress,
          shopContact: shop.shopContact,
          shopImage: shop.shopImage,
          isCertified: shop.isCertified || false,
          // location: {
          //   type: "Point",
          //   coordinates: [shop.longitude, shop.latitude], // Make sure these values exist
          // },
          latitude: shop.location.coordinates[1],
          longitude:shop.location.coordinates[0],
          status: "inactive",
        },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        alert("Vendor deactivated successfully!");
        fetchShopDetails();
      } else {
        alert(`Failed to deactivate vendor: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error deactivating vendor:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "An error occurred."}`);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  if (error) return <p>{error}</p>;
  if (!shop) return <p>Loading shop details...</p>;

  return (
    <div>
      <h2>{shop.shopName || "N/A"}</h2>
      <p>Email: {shop.email || "N/A"}</p>
      <p>Phone: {shop.shopContact || "N/A"}</p>
      <p>Address: {shop.shopAddress || "N/A"}</p>
      <p>Status: <strong>{shop.status || "N/A"}</strong></p>

      {shop.status !== "inactive" && (
        <button onClick={deactivateVendor} disabled={loading}>
          {loading ? "Deactivating..." : "Deactivate Vendor"}
        </button>
      )}
    </div>
  );
}

export default VendorDetails;
