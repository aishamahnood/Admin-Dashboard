import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage

        if (!token) {
          setError("Authorization token is missing. Please log in again.");
          return;
        }

        const response = await axios.get(
          `https://aquarise-intelflow-backend.vercel.app/api/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token in headers
            },
          }
        );

        // ✅ Extract `data` from response
        setUser(response.data.data);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to fetch user details.");
      }
    };

    fetchUserDetails();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address}</p>
      <p>Role: {user.role}</p>
      <p>Status: {user.status}</p>
      <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
    </div>
  );
}

export default UserDetails;
