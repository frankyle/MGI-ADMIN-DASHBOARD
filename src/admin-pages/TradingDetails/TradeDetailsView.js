import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import EditTradeDetailsModal from './EditTradeDetailsModal';


const TradeDetailsView = () => {
  const [trade, setTrade] = useState(null);
  const { id } = useParams(); // Get the trade id from the URL
  const navigate = useNavigate();

  // Inside TradeDetailsView
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleUpdate = (updatedTrade) => {
    setTrade(updatedTrade); // Update the trade details in the parent component
    setModalOpen(false);
};

  useEffect(() => {
    const fetchTradeDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/tradedetails/tradedetails/${id}/`);
        if (response.data) {
          setTrade(response.data);
        } else {
          console.error('No trade data found for this ID');
        }
      } catch (error) {
        console.error('Error fetching trade details:', error);
      }
    };

    fetchTradeDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!trade) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Trade Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div>
          <strong>Currency Pair:</strong> {trade.currency_pair}
        </div>
        <div>
          <strong>Traders Idea Name:</strong> {trade.traders_idea_name}
        </div>
        <div>
          <strong>Trade Signal:</strong> {trade.trade_signal}
        </div>
        <div>
          <strong>Status:</strong>
          <span className={`px-2 py-1 ${trade.is_active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {trade.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
        <div>
          <strong>Created At:</strong> {formatDate(trade.created_at)}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Candles</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <strong>Idea Candle:</strong>
          <img src={trade.idea_candle} alt="Idea Candle" className="w-24 h-24 object-contain" />
        </div>
        <div>
          <strong>Signal Candle:</strong>
          <img src={trade.signal_candle} alt="Signal Candle" className="w-24 h-24 object-contain" />
        </div>
        <div>
          <strong>Entry Candle:</strong>
          <img src={trade.entry_candle} alt="Entry Candle" className="w-24 h-24 object-contain" />
        </div>
        <div>
          <strong>Line Graph Candle:</strong>
          <img src={trade.line_graph_candle} alt="Line Graph Candle" className="w-24 h-24 object-contain" />
        </div>
        <div>
          <strong>Hour Candle:</strong>
          <img src={trade.hour_candle} alt="Hour Candle" className="w-24 h-24 object-contain" />
        </div>
        <div>
          <strong>2-Hour Candle:</strong>
          <img src={trade.two_hour_candle} alt="2-Hour Candle" className="w-24 h-24 object-contain" />
        </div>
        <div>
          <strong>Breakeven Candle:</strong>
          <img src={trade.breakeven_candle} alt="Breakeven Candle" className="w-24 h-24 object-contain" />
        </div>
        <div>
          <strong>Take Profit 1 Candle:</strong>
          <img src={trade.take_profit1_candle} alt="Take Profit 1 Candle" className="w-24 h-24 object-contain" />
        </div>
        <div>
          <strong>Take Profit 2 Candle:</strong>
          <img src={trade.take_profit2_candle} alt="Take Profit 2 Candle" className="w-24 h-24 object-contain" />
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => navigate('/trade-details')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Back to Trade Details
        </button>

        <button
            onClick={() => navigate(`/trade-details/edit/${id}`)} // Navigate to the edit page
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-700"
          >
            Edit Trade
        </button>

      
        <EditTradeDetailsModal
          open={isModalOpen}
          handleClose={handleModalClose}
          trade={trade}
          onUpdate={handleUpdate} 
        />
      </div>
    </div>
  );
};

export default TradeDetailsView;
