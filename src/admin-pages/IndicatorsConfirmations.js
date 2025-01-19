import React, { useState, useEffect } from 'react';
import axiosInstance from './../auth/axiosInstance';

const IndicatorsConfirnations = () => {
  const [tradingIndicators, setTradingIndicators] = useState([]);

  useEffect(() => {
    const fetchTradingIndicators = async () => {
      try {
        const response = await axiosInstance.get('/api/tradingindicators/tradingindicators/');
        setTradingIndicators(response.data);
      } catch (error) {
        console.error("Error fetching trading indicators:", error);
      }
    };

    fetchTradingIndicators();
  }, []);

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Currency Pair</th>
            <th scope="col" className="px-6 py-3">Candle Pattern</th>
            <th scope="col" className="px-6 py-3">Fibonacci Level</th>
            <th scope="col" className="px-6 py-3">Session</th>
            <th scope="col" className="px-6 py-3">5 Min Order Block</th>
            <th scope="col" className="px-6 py-3">Previous Day Color Structure</th>
            <th scope="col" className="px-6 py-3">Asian Kill Zone</th>
            <th scope="col" className="px-6 py-3">London Kill Zone</th>
            <th scope="col" className="px-6 py-3">New York Kill Zone</th>
            <th scope="col" className="px-6 py-3">Flip 4-Hour Candle</th>
            <th scope="col" className="px-6 py-3">15 Min Break of Structure</th>
            <th scope="col" className="px-6 py-3">FVG Blocks</th>
            <th scope="col" className="px-6 py-3">Color UT Alert</th>
            <th scope="col" className="px-6 py-3">Fractal & Alligator</th>
            <th scope="col" className="px-6 py-3">Pips Stoploss</th>
            <th scope="col" className="px-6 py-3">Pips Gained</th>
          </tr>
        </thead>
        <tbody>
          {tradingIndicators.length > 0 ? (
            tradingIndicators.map((indicator) => (
              <tr key={indicator.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{indicator.currency_pair}</td>
                <td className="px-6 py-4">{indicator.candle_pattern}</td>
                <td className="px-6 py-4">{indicator.fibonacci_level}</td>
                <td className="px-6 py-4">{indicator.session}</td>
                <td className="px-6 py-4">{indicator.five_min_order_block ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">{indicator.previous_day_color_structure ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">{indicator.asian_kill_zone ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">{indicator.london_kill_zone ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">{indicator.newyork_kill_zone ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">{indicator.flip_four_hour_candle ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">{indicator.fifteen_min_break_of_structure ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">{indicator.fvg_blocks ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">{indicator.change_color_ut_alert ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">{indicator.fractal_and_alligator ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">{indicator.pips_stoploss}</td>
                <td className="px-6 py-4">{indicator.pips_gained}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="16" className="px-6 py-4 text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IndicatorsConfirnations;
