// Import necessary libraries
import React, { FormEvent, ChangeEvent, useState } from "react";
import axios from "axios";
import { useAuth } from "../Components/AuthContext";
import { useNavigate } from "react-router-dom";

// Define types for the form data
interface LoginFormData {
  name: string;
  phone: string;
}

// Create the LoginComponent component
const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // State to hold form data
  const [formData, setFormData] = useState<LoginFormData>({
    name: "",
    phone: "",
  });

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Send a POST request to your backend with form data
    try {
      const response = await axios.post(
        "http://localhost:5001/login",
        { name: formData.name, phone: formData.phone },
        {
          withCredentials: true, //correct
        }
      );
      console.log("Login successful:", response.data);
      login();
      navigate("/");
      // You can redirect or perform other actions after successful login
    } catch (error: unknown) {
      console.error("Error during login:", error);
    }
  };

  // Render the form
  return (
    <div className="min-w-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md"
      >
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
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
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

// Export the component
export default Login;
