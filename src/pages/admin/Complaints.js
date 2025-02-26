import React, { useState, useEffect } from "react";
import axios from "axios";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState({ description: "" });

  // Retrieve stored user data from localStorage
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData?.token;
  const role = userData?.role; // "admin" or "vendor"
  // For vendors, we assume the vendor's ID is stored in userData.data._id
  const vendorId = userData?.data?._id; 

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
    
    console.log("Fetching complaints from:", endpoint);
    axios
      .get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        setComplaints(response.data.data);
      })
      .catch((error) => console.error("Error fetching complaints:", error));
  }, [role, vendorId, token]);

  const handleAddComplaint = (e) => {
    e.preventDefault();
    if (!newComplaint.description) return;
    if (!userData?._id) {
      console.error("User ID is missing.");
      return;
    }
    const bodyData = {
      user: userData._id,
      shop: vendorId,
      description: newComplaint.description,
      status: "Pending",
    };

    axios
      .post("https://aquarise-intelflow-backend.vercel.app/api/complaints", bodyData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setComplaints([...complaints, response.data.data]);
        setNewComplaint({ description: "" });
      })
      .catch((error) => console.error("Error adding complaint:", error));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-left">Vendor Complaints</h2>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Submit a Complaint</h3>
        <form onSubmit={handleAddComplaint} className="flex gap-4">
          <input
            type="text"
            placeholder="Complaint Description"
            value={newComplaint.description}
            onChange={(e) => setNewComplaint({ description: e.target.value })}
            className="border p-2 rounded w-2/3"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left border-b">Complaint ID</th>
              <th className="p-3 text-left border-b">User</th>
              <th className="p-3 text-left border-b">Description</th>
              <th className="p-3 text-left border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length > 0 ? (
              complaints.map((comp) => (
                <tr key={comp._id} className="border-b">
                  <td className="p-3">{comp._id}</td>
                  <td className="p-3">{comp.user?.name || "Unknown"}</td>
                  <td className="p-3">{comp.description}</td>
                  <td className="p-3">{comp.status || "Pending"}</td>
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
