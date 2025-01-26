import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaUndo } from 'react-icons/fa';

const CandleImageCreate = () => {
  const navigate = useNavigate();

  const [tradeDetails, setTradeDetails] = useState([]);
  const [formData, setFormData] = useState({
    trade_detail: '',
    monday_candle: null,
    tuesday_candle: null,
    wednesday_candle: null,
    thursday_candle: null,
    friday_candle: null,
    saturday_candle: null,
    sunday_candle: null,
    swing_trade_candle: null,
  });

  useEffect(() => {
    const fetchTradeDetails = async () => {
      try {
        const response = await axiosInstance.get('/api/tradedetails/tradedetails/');
        if (Array.isArray(response.data)) {
          setTradeDetails(response.data);
        } else {
          console.error('Expected an array of trade details');
        }
      } catch (error) {
        console.error('Error fetching trade details:', error);
      }
    };

    fetchTradeDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append trade_detail to the form data
    data.append('trade_detail', formData.trade_detail);
    
    // Append the candle images
    Object.keys(formData).forEach((key) => {
      if (formData[key] instanceof File) {
        data.append(key, formData[key]);
      }
    });

    try {
      await axiosInstance.post('/api/candleimages/candleimages/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Candle images created successfully');
      navigate(`/candle-images`);
    } catch (error) {
      console.error('Error creating candle images:', error);
      alert('Failed to create candle images');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Create Candle Images</h1>

      <form onSubmit={handleCreate} className="space-y-6">
        {/* Select Trade Details */}
        <div className="flex flex-col gap-2">
          <label htmlFor="trade_detail" className="text-lg font-medium">Select Trade Detail:</label>
          <select
            name="trade_detail"
            id="trade_detail"
            value={formData.trade_detail}
            onChange={handleInputChange}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Trade Detail --</option>
            {Array.isArray(tradeDetails) && tradeDetails.length > 0 ? (
              tradeDetails.map((trade) => (
                <option key={trade.id} value={trade.id}>
                  {trade.trade_name} {/* Adjust according to your model field */}
                </option>
              ))
            ) : (
              <option value="">No trade details available</option>
            )}
          </select>
        </div>

        {/* Image Upload Inputs for Candles */}
        {['monday_candle', 'tuesday_candle', 'wednesday_candle', 'thursday_candle', 'friday_candle', 'saturday_candle', 'sunday_candle', 'swing_trade_candle'].map((candleType) => (
          <div key={candleType} className="flex flex-col gap-2">
            <label htmlFor={candleType} className="text-lg font-medium">{candleType.replace('_', ' ').toUpperCase()} Image:</label>
            <input
              type="file"
              name={candleType}
              onChange={handleFileChange}
              id={candleType}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}

        {/* Save and Cancel Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            <FaSave size={18} className="inline mr-2" />
            Save Candle Images
          </button>

          <button
            type="button"
            onClick={() => navigate(`/candle-images`)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            <FaUndo size={18} className="inline mr-2" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CandleImageCreate;
