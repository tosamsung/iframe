import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import OwnerContext from '../context/UserContext';
import PlotService from '../service/PlotService';
const plotService = new PlotService();

function Plots() {
  const [plots, setPlots] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const context = useContext(OwnerContext);

  if (!context) {
    throw new Error('Plots must be used within an OwnerProvider');
  }

  const { id } = context;

  useEffect(() => {
    if (!id) {
      setError('Owner ID is required.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    plotService
      .getAllPlotsByOwnerId(id)
      .then((response: any) => {
        setPlots(response);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err.message || 'An error occurred while fetching plots.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin text-primary">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  }

  if (plots.length === 0) {
    return (
      <div className="bg-yellow-100 text-yellow-700 p-4 rounded">
        No plots found for the owner.
      </div>
    );
  }

  return (
    <div className="min-h-screen mx-auto p-5 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-500 text-white p-4">
            <h3 className="text-xl font-semibold">Plots</h3>
          </div>
          <div className="p-4">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 font-medium">Plot Number</th>
                  <th className="text-left p-2 font-medium">Width</th>
                  <th className="text-left p-2 font-medium">Length</th>
                  <th className="text-left p-2 font-medium">Area</th>
                  <th className="text-left p-2 font-medium">Status</th>
                  <th className="text-left p-2 font-medium">Actions</th> {/* Added column */}
                </tr>
              </thead>
              <tbody>
                {plots.map((plot) => (
                  <React.Fragment key={plot.plot_number}>
                    <tr>
                      <td className="p-2">{plot.plot_number}</td>
                      <td className="p-2">{plot.width} units</td>
                      <td className="p-2">{plot.length} units</td>
                      <td className="p-2">{plot.area} square units</td>
                      <td className="p-2">{plot.status}</td>
                      <td className="p-2">
                        <Link to={`/${context.id}/plot/${plot.id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
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

export default Plots;
