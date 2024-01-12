import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import ProductsContext from "../context/products-context";
import Input from "../components/util/Input";

const ProfilePage = () => {
  const [error, setError] = useState("");
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const editProfileHandler = () => {
    setIsEditing((prev) => !prev);
  };

  const pCtx = useContext(ProductsContext);
  const userId = pCtx.userId;
  console.log(pCtx.userId);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profile-data/${userId}`
        );
        const { fullName, userEmail } = response.data;
        setFullname(fullName);
        setEmail(userEmail);
      } catch (error) {
        setError(error.response.data.error);
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [userId]);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Profile</h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <form>
        <Input
          text="Your Name"
          name="name"
          type="text"
          disabled={!isEditing}
          value={fullName}
          onChange={(e) => setFullname(e.target.value)}
        />
        <Input
          text="Email"
          name="email"
          type="email"
          disabled={!isEditing}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <button
          type="button"
          onClick={editProfileHandler}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
        {isEditing && (
          <button className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
            Update Profile
          </button>
        )} */}
      </form>
    </div>
  );
};

export default ProfilePage;
