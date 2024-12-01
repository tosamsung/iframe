import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BedService from "../../service/BedService";

const BedDetail: React.FC = () => {
  const [bed, setBed] = useState<any>(null);
  const { bedId } = useParams<{ bedId: string }>();
  const bedService = new BedService();

  useEffect(() => {
    const fetchData = async () => {
      if (bedId) {
        bedService.getBedById(bedId).then((response: any) => {
          setBed(response.data);
        });
      }
    };

    fetchData();

    return () => {
      // Clean up side effects, if needed.
    };
  }, [bedId]);

  if (!bed) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-t-transparent border-primary border-solid rounded-full animate-spin"></div>
          <div className="absolute inset-0 border-4 border-t-transparent border-white border-solid rounded-full animate-spin delay-200"></div>
        </div>
      </div>
    );
  }

  const handleClose = () => {
    WA.player.state.saveVariable('openBedDetail', false);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="mt-4">
        <button
          onClick={handleClose}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
      <h1 className="text-xl font-bold mb-4">Bed Details</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">General Info</h2>
        <p><strong>Harvest Date:</strong> {bed.harvest_date}</p>
        <p><strong>Flowering Date:</strong> {bed.flowering_date}</p>
        <p><strong>Planting Date:</strong> {bed.planting_date}</p>
        <p><strong>Status:</strong> {bed.status}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Plot Info</h2>
        <p><strong>Plot Number:</strong> {bed.plot.plot_number}</p>
        <p><strong>Area:</strong> {bed.plot.area} m²</p>
        <p><strong>Dimensions:</strong> {bed.plot.width}m x {bed.plot.length}m</p>
        <p><strong>pH:</strong> {bed.plot.ph}</p>
        <p><strong>Temperature:</strong> {bed.plot.temperature}°C</p>
        <p><strong>Humidity:</strong> {bed.plot.humidity}%</p>
      </div>

    </div>
  );
};

export default BedDetail;
