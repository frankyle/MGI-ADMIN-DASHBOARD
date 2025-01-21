import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance';

const TradeDetailsTable = () => {
  const [tradeDetails, setTradeDetails] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchTradeDetails = async () => {
      try {
        const response = await axiosInstance.get('/api/tradedetails/tradedetails/');
        console.log('API Response:', response.data); // Debugging
        if (response.data && Array.isArray(response.data.results)) {
          // Sort the results array
          const sortedTrades = response.data.results.sort((a, b) => b.is_active - a.is_active);
          setTradeDetails(sortedTrades);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching trade details:', error);
      }
    };
    

    fetchTradeDetails();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short', // Optional: for day of the week (e.g., "Thu")
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Currency Pair</th>
            <th scope="col" className="px-6 py-3">Traders Idea Name</th>
            <th scope="col" className="px-6 py-3">Trade Signal</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Idea Candle</th>
            <th scope="col" className="px-6 py-3">Signal Candle</th>
            <th scope="col" className="px-6 py-3">Entry Candle</th>
            <th scope="col" className="px-6 py-3">Line Graph Candle</th>
            <th scope="col" className="px-6 py-3">Hour Candle</th>
            <th scope="col" className="px-6 py-3">2-Hour Candle</th>
            <th scope="col" className="px-6 py-3">Breakeven Candle</th>
            <th scope="col" className="px-6 py-3">Take Profit 1 Candle</th>
            <th scope="col" className="px-6 py-3">Take Profit 2 Candle</th>
            <th scope="col" className="px-6 py-3">Created At</th>
          </tr>
        </thead>
        <tbody>
          {tradeDetails.map((trade) => (
            <tr key={trade.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{trade.currency_pair}</td>
              <td className="px-6 py-4">{trade.traders_idea_name}</td>
              <td className="px-6 py-4">{trade.trade_signal}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 ${trade.is_active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {trade.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.idea_candle}
                  alt="Idea Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.idea_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.signal_candle}
                  alt="Signal Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.signal_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.entry_candle}
                  alt="Entry Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.entry_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.line_graph_candle}
                  alt="Line Graph Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.line_graph_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.hour_candle}
                  alt="Hour Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.hour_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.two_hour_candle}
                  alt="2-Hour Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.two_hour_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.breakeven_candle}
                  alt="Breakeven Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.breakeven_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.take_profit1_candle}
                  alt="Take Profit 1 Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.take_profit1_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.take_profit2_candle}
                  alt="Take Profit 2 Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.take_profit2_candle)}
                />
              </td>
              <td className="px-6 py-4">{formatDate(trade.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-full max-h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeDetailsTable;
