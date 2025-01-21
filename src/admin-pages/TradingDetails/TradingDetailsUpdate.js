import React, { useEffect, useState } from "react";
import axiosInstance from "../../auth/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

const TradingDetailsUpdate = () => {
  const { id } = useParams(); // Get the trade detail ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currency_pair: "",
    traders_idea_name: "",
    trade_signal: "",
    is_active: false,
  });

  const [images, setImages] = useState({
    idea_candle: null,
    line_graph_candle: null,
    signal_candle: null,
    hour_candle: null,
    two_hour_candle: null,
    entry_candle: null,
    breakeven_candle: null,
    take_profit_one_candle: null,
    take_profit_two_candle: null,
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  // Fetch existing trade detail data
  useEffect(() => {
    const fetchTradeDetail = async () => {
      try {
        const response = await axiosInstance.get(`/api/tradedetails/tradedetails/${id}/`);
        const data = response.data;
        setFormData({
          currency_pair: data.currency_pair || "",
          traders_idea_name: data.traders_idea_name || "",
          trade_signal: data.trade_signal || "",
          is_active: data.is_active || false,
        });

        setImages({
          idea_candle: data.idea_candle || null,
          line_graph_candle: data.line_graph_candle || null,
          signal_candle: data.signal_candle || null,
          hour_candle: data.hour_candle || null,
          two_hour_candle: data.two_hour_candle || null,
          entry_candle: data.entry_candle || null,
          breakeven_candle: data.breakeven_candle || null,
          take_profit_one_candle: data.take_profit_one_candle || null,
          take_profit_two_candle: data.take_profit_two_candle || null,
        });
      } catch (error) {
        console.error("Error fetching trade detail:", error);
        setToast({ message: "Failed to fetch trade detail.", type: "error" });
      }
    };
    fetchTradeDetail();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImages({
      ...images,
      [name]: files[0],
    });
  };

  const validateForm = () => {
    if (!formData.currency_pair || !formData.traders_idea_name || !formData.trade_signal) {
      setToast({ message: "All fields are required.", type: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast({ message: "", type: "" }); // Clear existing toast messages

    const formPayload = new FormData();

    // Add non-image fields to payload
    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });

    // Add image fields to payload
    Object.entries(images).forEach(([key, value]) => {
      if (value instanceof File) {
        formPayload.append(key, value);
      }
    });

    try {
      const response = await axiosInstance.put(`/api/tradedetails/tradedetails/${id}/`, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Trade detail updated successfully:", response.data);
      setToast({ message: "Trade detail updated successfully!", type: "success" });
      setTimeout(() => navigate("/tradedetails"), 2000); // Navigate back to the list after 2 seconds
    } catch (error) {
        console.error("Error updating trade detail:", error.response?.data || error.message);
      setToast({ message: "Failed to update trade detail. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Edit Trade Detail</h1>

      {/* Toast Messages */}
      {toast.message && (
        <div
          className={`mb-4 p-4 rounded ${
            toast.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="currency_pair"
            value={formData.currency_pair}
            onChange={handleInputChange}
            placeholder="Currency Pair"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="traders_idea_name"
            value={formData.traders_idea_name}
            onChange={handleInputChange}
            placeholder="Trader's Idea Name"
            className="border border-gray-300 p-2 rounded"
          />
          <select
            name="trade_signal"
            value={formData.trade_signal}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="">Select Trade Signal</option>
            <option value="BUYS">BUYS</option>
            <option value="SELLS">SELLS</option>
          </select>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleInputChange}
              className="form-checkbox"
            />
            <span>Active</span>
          </label>
          {Object.keys(images).map((key) => (
            <div key={key}>
              <label className="block mb-1 capitalize">{key.replace(/_/g, " ")}</label>
              <input
                type="file"
                name={key}
                onChange={handleImageChange}
                className="border border-gray-300 p-2 rounded"
                accept="image/*"
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`mt-4 px-4 py-2 rounded ${
            loading ? "bg-gray-400" : "bg-blue-500 text-white"
          }`}
        >
          {loading ? "Updating..." : "Update Trade Detail"}
        </button>
      </form>
    </div>
  );
};

export default TradingDetailsUpdate;
