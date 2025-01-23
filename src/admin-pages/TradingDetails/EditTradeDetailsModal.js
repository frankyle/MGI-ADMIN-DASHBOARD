import React, { useState } from 'react';

const EditTradeDetailsModal = ({ open, handleClose, trade, onUpdate }) => {
  const [formData, setFormData] = useState({ ...trade });

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
          [fieldName]: reader.result, // Set the image preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData); // Call the update function passed from the parent
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Trade Details</h2>
        <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="mb-4">
            <label className="block mb-1">Currency Pair:</label>
            <input
              type="text"
              name="currency_pair"
              value={formData.currency_pair}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Traders Idea Name:</label>
            <input
              type="text"
              name="traders_idea_name"
              value={formData.traders_idea_name}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Trade Signal:</label>
            <input
              type="text"
              name="trade_signal"
              value={formData.trade_signal}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Status:</label>
            <select
              name="is_active"
              value={formData.is_active ? 'true' : 'false'}
              onChange={(e) => handleChange({ target: { name: 'is_active', value: e.target.value === 'true' } })}
              className="border rounded w-full p-2"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Idea Candle:</label>
            <img src={formData.idea_candle} alt="Idea Candle" className="w-24 h-24 object-contain mb-2" />
            <input type="file" onChange={(e) => handleImageChange(e, 'idea_candle')} />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Signal Candle:</label>
            <img src={formData.signal_candle} alt="Signal Candle" className="w-24 h-24 object-contain mb-2" />
            <input type="file" onChange={(e) => handleImageChange(e, 'signal_candle')} />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Entry Candle:</label>
            <img src={formData.entry_candle} alt="Entry Candle" className="w-24 h-24 object-contain mb-2" />
            <input type="file" onChange={(e) => handleImageChange(e, 'entry_candle')} />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Line Graph Candle:</label>
            <img src={formData.line_graph_candle} alt="Line Graph Candle" className="w-24 h-24 object-contain mb-2" />
            <input type="file" onChange={(e) => handleImageChange(e, 'line_graph_candle')} />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Hour Candle:</label>
            <img src={formData.hour_candle} alt="Hour Candle" className="w-24 h-24 object-contain mb-2" />
            <input type="file" onChange={(e) => handleImageChange(e, 'hour_candle')} />
          </div>

          <div className="mb-4">
            <label className="block mb-1">2-Hour Candle:</label>
            <img src={formData.two_hour_candle} alt="2-Hour Candle" className="w-24 h-24 object-contain mb-2" />
            <input type="file" onChange={(e) => handleImageChange(e, 'two_hour_candle')} />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Breakeven Candle:</label>
            <img src={formData.breakeven_candle} alt="Breakeven Candle" className="w-24 h-24 object-contain mb-2" />
            <input type="file" onChange={(e) => handleImageChange(e, 'breakeven_candle')} />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Take Profit 1 Candle:</label>
            <img src={formData.take_profit1_candle} alt="Take Profit 1 Candle" className="w-24 h-24 object-contain mb-2" />
            <input type="file" onChange={(e) => handleImageChange(e, 'take_profit1_candle')} />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Take Profit 2 Candle:</label>
            <img src={formData.take_profit2_candle} alt="Take Profit 2 Candle" className="w-24 h-24 object-contain mb-2" />
            <input type="file" onChange={(e) => handleImageChange(e, 'take_profit2_candle')} />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={handleClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Save Changes
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTradeDetailsModal;