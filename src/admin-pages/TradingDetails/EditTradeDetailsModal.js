import React, { useState } from 'react';
import axiosInstance from '../../auth/axiosInstance';

const EditTradeDetailsModal = ({ open, handleClose, trade, onUpdate }) => {
  const [formData, setFormData] = useState({ ...trade });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/api/tradedetails/tradedetails/${trade.id}/`, formData);
      if (response.status === 200) {
        onUpdate(response.data); // Call the onUpdate function to update the parent component
        handleClose();
      }
    } catch (error) {
      console.error('Error updating trade details:', error);
    }
  };

  if (!trade) return null;

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 ${open ? 'block' : 'hidden'}`}
      onClick={handleClose}
    >
      <div
        className="relative mx-auto my-20 p-8 bg-white rounded-lg shadow-xl w-96"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal on content click
      >
        <h2 className="text-xl font-semibold mb-4">Edit Trade Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Currency Pair</label>
              <input
                type="text"
                name="currency_pair"
                value={formData.currency_pair}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Trader's Idea Name</label>
              <input
                type="text"
                name="traders_idea_name"
                value={formData.traders_idea_name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Trade Signal</label>
              <input
                type="text"
                name="trade_signal"
                value={formData.trade_signal}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Status</label>
              <select
                name="is_active"
                value={formData.is_active ? 'true' : 'false'}
                onChange={(e) =>
                  handleChange({
                    target: { name: 'is_active', value: e.target.value === 'true' },
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Created At</label>
              <input
                type="text"
                name="created_at"
                value={formData.created_at}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-md mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTradeDetailsModal;
