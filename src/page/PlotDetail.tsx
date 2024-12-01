import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlotService from '../service/PlotService';

const plotService = new PlotService();

function PlotDetail() {
  const { plotNumber } = useParams<{ plotNumber: string }>();
  const [plot, setPlot] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!plotNumber) {
      setError('Plot number is required.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    plotService
      .getPlotById(plotNumber)
      .then((response:any) => {
        setPlot(response); // Assuming response is the plot data
        setLoading(false);
      })
      .catch((err:any) => {
        setError(err.message || 'Failed to fetch plot details.');
        setLoading(false);
      });
  }, [plotNumber]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin text-primary">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  }

  if (!plot) {
    return (
      <div className="bg-yellow-100 text-yellow-700 p-4 rounded">
        Plot not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen mx-auto p-5 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-500 text-white p-4">
            <h3 className="text-xl font-semibold">Plot Details</h3>
          </div>
          <div className="p-4">
            <table className="table-auto w-full border-collapse">
              <tbody>
                <tr>
                  <th className="text-left p-2 font-medium">Plot Number</th>
                  <td className="p-2">{plot.plot_number}</td>
                </tr>
                <tr>
                  <th className="text-left p-2 font-medium">Width</th>
                  <td className="p-2">{plot.width} units</td>
                </tr>
                <tr>
                  <th className="text-left p-2 font-medium">Length</th>
                  <td className="p-2">{plot.length} units</td>
                </tr>
                <tr>
                  <th className="text-left p-2 font-medium">Area</th>
                  <td className="p-2">{plot.area} square units</td>
                </tr>
                <tr>
                  <th className="text-left p-2 font-medium">Status</th>
                  <td className="p-2">{plot.status}</td>
                </tr>
                <tr>
                  <th className="text-left p-2 font-medium">pH</th>
                  <td className="p-2">{plot.ph}</td>
                </tr>
                <tr>
                  <th className="text-left p-2 font-medium">Humidity</th>
                  <td className="p-2">{plot.humidity}%</td>
                </tr>
                <tr>
                  <th className="text-left p-2 font-medium">Temperature</th>
                  <td className="p-2">{plot.temperature}°C</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-gray-100 text-sm text-gray-600 p-4">
            <small>Last updated on {new Date().toLocaleString()}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlotDetail;
