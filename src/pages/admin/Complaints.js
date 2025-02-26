import React, { useState, useEffect } from "react";
import axios from "axios";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [shopStats, setShopStats] = useState({}); // Store shop stats
  const [newComplaint, setNewComplaint] = useState({ description: "" });

  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData?.token;
  const role = userData?.role;
  const userId = userData?.data?._id; // User ID
  
  // Ensure vendorId is defined
  const vendorId = role === "vendor" ? userId : null;
  
  if (!userId || role !== "admin") {
    console.error("Required IDs or role are missing.");
  }
  

  useEffect(() => {
    let endpoint = "";
    if (role === "vendor" && vendorId) {
      endpoint = `https://aquarise-intelflow-backend.vercel.app/api/complaints/vendor/${vendorId}`;
    } else if (role === "admin") {
      endpoint = `https://aquarise-intelflow-backend.vercel.app/api/complaints`;
    } else {
      console.error("Required IDs or role are missing.");
      return;
    }

    axios
      .get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const fetchedComplaints = response.data.data;
        setComplaints(fetchedComplaints);

        // Fetch shop stats for each complaint
        fetchedComplaints.forEach((complaint) => {
          if (complaint.shop) {
            fetchShopStats(complaint.shop);
          }
        });
      })
      .catch((error) => console.error("Error fetching complaints:", error));
  }, [role, vendorId, token]);

  // Fetch Shop Stats
  const fetchAllComplaints = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiSauce.get(`/api/complaints?role=admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.ok) {
        console.log("All Complaints:", response.data);
      } else {
        console.error("Failed to fetch complaints:", response.problem);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-left">Vendor Complaints</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left border-b">Complaint ID</th>
              <th className="p-3 text-left border-b">User</th>
              <th className="p-3 text-left border-b">Description</th>
              <th className="p-3 text-left border-b">Shop Stats</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length > 0 ? (
              complaints.map((comp) => (
                <tr key={comp._id} className="border-b">
                  <td className="p-3">{comp._id}</td>
                  <td className="p-3">{comp.user?.name || "Unknown"}</td>
                  <td className="p-3">{comp.description}</td>
                  <td className="p-3">
                    {shopStats[comp.shop] ? (
                      <div>
                        <p>Total Orders: {shopStats[comp.shop].totalOrders}</p>
                        <p>Revenue: ${shopStats[comp.shop].totalRevenue}</p>
                      </div>
                    ) : (
                      "Loading..."
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No Complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Complaints;
