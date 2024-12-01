import { useEffect, useState } from "react";
import CropService from "../service/CropService"; // Adjust the import path based on your project structure
import { Crop } from "../entity/Crop";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const cropService = new CropService();

function Crops() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSelectvariety = (id: string) => {
    navigate(`variety?cropid=${id}`);

  };

  useEffect(() => {
    cropService.getAllCrops().then((response: any) => {
      setCrops(response.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Cây trồng</h1>
        {/* Grid layout with 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {crops.length > 0 ? (
            crops.map((crop: Crop) => (
              <div
                key={crop.id}
                className="p-4 bg-white shadow rounded-lg flex flex-col items-center text-center"
              >
                <img
                  src="/images/seed-1.jpg"
                  alt={crop.name}
                  className="w-32 h-32 object-cover mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-700">{crop.name}</h2>
                <button
                  onClick={() => handleSelectvariety(crop.id)}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Chọn
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Tải cây trồng...</p>
          )}
        </div>
      </div>
    </div>

  );
}

export default Crops;
