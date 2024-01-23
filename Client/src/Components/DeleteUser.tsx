import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

interface DeleteUserProps {}

// Define types for the form data
interface LoginFormData {
  name: string;
  phone: string;
}

const DeleteUser: React.FC<DeleteUserProps> = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    name: "",
    phone: "",
  });

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteUser = async () => {
    try {
      console.log(formData.name, formData.phone);
      const response = await axios.delete(
        `http://localhost:5001/delete?name=${formData.name}&phone=${formData.phone}`
      );
      console.log("User deleted successfully:", response.data);
      logout();
      navigate("/");
    } catch (error) {
      console.error("Error during user deletion:", error);
    }
  };

  return (
    <div className="min-w-screen flex justify-center items-center">
      <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter User ID"
            required
          />
        </label>

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Phone Number:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </label>
        <button
          onClick={handleDeleteUser}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
