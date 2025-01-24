import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance';

const EditTradeDetails = () => {
  const { id } = useParams(); // Get the trade ID from the URL
  const navigate = useNavigate();
  const [trade, setTrade] = useState({
    currency_pair: '',
    traders_idea_name: '',
    trade_signal: '',
    is_active: false,
    idea_candle: null,
    signal_candle: null,
    entry_candle: null,
    line_graph_candle: null,
    hour_candle: null,
    two_hour_candle: null,
    breakeven_candle: null,
    take_profit1_candle: null,
    take_profit2_candle: null,
  });

  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState({});

  useEffect(() => {
    // Fetch trade details
    const fetchTrade = async () => {
      try {
        const response = await axiosInstance.get(`/api/tradedetails/tradedetails/${id}/`);
        setTrade(response.data);
        setImagePreviews({
          idea_candle: response.data.idea_candle,
          signal_candle: response.data.signal_candle,
          entry_candle: response.data.entry_candle,
          line_graph_candle: response.data.line_graph_candle,
          hour_candle: response.data.hour_candle,
          two_hour_candle: response.data.two_hour_candle,
          breakeven_candle: response.data.breakeven_candle,
          take_profit1_candle: response.data.take_profit1_candle,
          take_profit2_candle: response.data.take_profit2_candle,
        });
      } catch (error) {
        console.error('Error fetching trade details:', error);
      }
    };
    fetchTrade();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrade((prevTrade) => ({
      ...prevTrade,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      // Set the file for submission
      setTrade((prevTrade) => ({
        ...prevTrade,
        [name]: file,
      }));
      // Generate preview
      setImagePreviews((prevPreviews) => ({
        ...prevPreviews,
        [name]: URL.createObjectURL(file),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!trade.currency_pair) newErrors.currency_pair = 'Currency pair is required';
    if (!trade.traders_idea_name) newErrors.traders_idea_name = "Trader's idea name is required";
    if (!trade.trade_signal) newErrors.trade_signal = 'Trade signal is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    
    const formData = new FormData();
    formData.append('currency_pair', trade.currency_pair);
    formData.append('traders_idea_name', trade.traders_idea_name);
    formData.append('trade_signal', trade.trade_signal);
    formData.append('is_active', trade.is_active);
    formData.append('signal_candle', trade.signal_candle);
    formData.append('entry_candle', trade.entry_candle);
    formData.append('breakeven_candle', trade.breakeven_candle);
    formData.append('take_profit1_candle', trade.take_profit1_candle);
    formData.append('take_profit2_candle', trade.take_profit2_candle);
    formData.append('two_hour_candle', trade.two_hour_candle);

    // Retrieve user information (assuming it's saved in local storage)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
        formData.append('user', user.id); // Assuming user ID is saved
    } else {
        console.error('User is not authenticated or user data is missing.');
    }

    // Log the FormData content
    console.log('FormData being sent:', Object.fromEntries(formData.entries()));

    try {
      const response = await axiosInstance.put(`/api/tradedetails/tradedetails/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Trade updated successfully:', response.data);
      navigate('/trade-list'); // Redirect to trade list or another page
    } catch (error) {
      console.error('Error updating trade:', error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Edit Trade Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Currency Pair:</label>
          <input
            type="text"
            name="currency_pair"
            value={trade.currency_pair}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          {errors.currency_pair && <p className="text-red-500">{errors.currency_pair}</p>}
        </div>
        <div>
          <label className="block font-medium">Trader's Idea Name:</label>
          <input
            type="text"
            name="traders_idea_name"
            value={trade.traders_idea_name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          {errors.traders_idea_name && <p className="text-red-500">{errors.traders_idea_name}</p>}
        </div>
        <div>
          <label className="block font-medium">Trade Signal:</label>
          <input
            type="text"
            name="trade_signal"
            value={trade.trade_signal}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          {errors.trade_signal && <p className="text-red-500">{errors.trade_signal}</p>}
        </div>
        <div>
          <label className="block font-medium">Is Active:</label>
          <input
            type="checkbox"
            name="is_active"
            checked={trade.is_active}
            onChange={(e) => setTrade({ ...trade, is_active: e.target.checked })}
            className="w-6 h-6"
          />
        </div>
        {['idea_candle', 'signal_candle', 'entry_candle', 'line_graph_candle', 'hour_candle', 'two_hour_candle', 'breakeven_candle', 'take_profit1_candle', 'take_profit2_candle'].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field.replace(/_/g, ' ')}:</label>
            {imagePreviews[field] && <img src={imagePreviews[field]} alt={`${field} preview`} className="h-20 mb-2" />}
            <input
              type="file"
              name={field}
              onChange={handleImageChange}
              className="w-full"
            />
          </div>
        ))}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Update Trade
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTradeDetails;
