import React, { useState } from "react";
import axios from "axios";

const EditTradeDetailsModal = ({ open, handleClose, trade, onUpdate }) => {
  const [formData, setFormData] = useState({ ...trade });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({}); // Validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [fieldName]: reader.result, // Base64-encoded image string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.currency_pair || formData.currency_pair.trim() === "") {
      newErrors.currency_pair = "Currency pair is required.";
    }
    if (!formData.traders_idea_name || formData.traders_idea_name.trim() === "") {
      newErrors.traders_idea_name = "Trader's Idea Name is required.";
    }
    if (!formData.trade_signal || formData.trade_signal.trim() === "") {
      newErrors.trade_signal = "Trade signal is required.";
    }
    if (formData.is_active === undefined) {
      newErrors.is_active = "Status must be selected.";
    }

    // Validate images (ensure at least one is uploaded)
    const imageFields = [
      "idea_candle",
      "signal_candle",
      "entry_candle",
      "line_graph_candle",
      "hour_candle",
      "two_hour_candle",
      "breakeven_candle",
      "take_profit1_candle",
      "take_profit2_candle",
    ];
    imageFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/_/g, " ")} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateFields()) {
      return; // Do not proceed if validation fails
    }

    setLoading(true);
    try {
      // Make the API request to update the trade
      const response = await axios.put(
        `/api/tradedetails/tradedetails/${formData.id}/`,
        formData
      );
      onUpdate(response.data); // Notify parent component of the update
      handleClose(); // Close the modal
    } catch (err) {
      setError("Failed to update trade details. Check console for details.");
      if (err.response) {
        console.error("Error response data:", err.response.data);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error setting up request:", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto w-[95%] md:w-[80%] lg:w-[60%]">
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Trade Details</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="mb-4">
              <label className="block mb-1 text-sm">Currency Pair:</label>
              <input
                type="text"
                name="currency_pair"
                value={formData.currency_pair}
                onChange={handleChange}
                className="border rounded w-full p-2 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Traders Idea Name:</label>
              <input
                type="text"
                name="traders_idea_name"
                value={formData.traders_idea_name}
                onChange={handleChange}
                className="border rounded w-full p-2 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Trade Signal:</label>
              <input
                type="text"
                name="trade_signal"
                value={formData.trade_signal}
                onChange={handleChange}
                className="border rounded w-full p-2 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Status:</label>
              <select
                name="is_active"
                value={formData.is_active ? "true" : "false"}
                onChange={(e) =>
                  handleChange({
                    target: { name: "is_active", value: e.target.value === "true" },
                  })
                }
                className="border rounded w-full p-2 text-sm"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            {/* Render image inputs */}
            {[
              { label: "Idea Candle", field: "idea_candle" },
              { label: "Signal Candle", field: "signal_candle" },
              { label: "Entry Candle", field: "entry_candle" },
              { label: "Line Graph Candle", field: "line_graph_candle" },
              { label: "Hour Candle", field: "hour_candle" },
              { label: "2-Hour Candle", field: "two_hour_candle" },
              { label: "Breakeven Candle", field: "breakeven_candle" },
              { label: "Take Profit 1 Candle", field: "take_profit1_candle" },
              { label: "Take Profit 2 Candle", field: "take_profit2_candle" },
            ].map(({ label, field }) => (
              <div className="mb-4" key={field}>
                <label className="block mb-1 text-sm">{label}:</label>
                {formData[field] && (
                  <img
                    src={formData[field]}
                    alt={label}
                    className="w-16 h-16 object-contain mb-2 rounded"
                  />
                )}
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, field)}
                  className="text-sm"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="mr-2 px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-sm hover:bg-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-3 py-1 ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } text-white rounded-full text-sm`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTradeDetailsModal;
