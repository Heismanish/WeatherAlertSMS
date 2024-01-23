// Import necessary libraries
import React, { FormEvent, ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define types for the form data
interface FormData {
  name: string;
  phone: string;
  city: string;
  country: string;
}

// Create the SignupForm component
const Signup: React.FC = () => {
  const navigate = useNavigate(); // Add useHistory hook

  // State to hold form data
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    city: "",
    country: "",
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
        "http://localhost:5001/signup",
        formData
      );
      console.log("Signup successful:", response.data);
      navigate("/login");

      // You can redirect or perform other actions after successful signup
    } catch (error: unknown) {
      console.error("Error during signup:", error);
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

        <label className="block text-gray-700 text-sm font-bold mb-2">
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </label>

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </label>

        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

// Export the component
export default Signup;
