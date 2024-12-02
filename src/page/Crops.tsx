import { useContext, useEffect, useState } from "react";
import CropService from "../service/CropService"; // Adjust the import path based on your project structure
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { CropVariety } from "../entity/CropVariety";
import UserContext from "../context/UserContext";

const cropService = new CropService();
const DIGIFORCE_DOMAIN = import.meta.env.VITE_DIGIFORCE_API_URL
  ? import.meta.env.VITE_DIGIFORCE_API_URL.replace(/\/$/, '')
  : ''

function Crops() {
  const [crops, setCrops] = useState<CropVariety[]>([]);
  const navigate = useNavigate(); // Initialize navigate hook
  const userContext = useContext(UserContext)
  const screenSizeDevice = userContext?.screenSizeDevice
  const handleSelectvariety = (id: string) => {
    WA.player.state.varietyId = id
    WA.player.state.screen = screenSizeDevice
    WA.player.state.saveVariable("openListCrops", false)
    WA.player.state.saveVariable("openConfirmPlant", true)

  };

  useEffect(() => {
    cropService.getAllVariety().then((response: any) => {
      console.log(response);
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
            crops.map((crop: CropVariety) => (
              <div
                key={crop.id}
                className="p-4 bg-white shadow rounded-lg flex flex-col items-center text-center"
              >
                <img
                  src={DIGIFORCE_DOMAIN + crop.avatar[0].url} alt={crop.name}
                  className="w-32 h-32 object-cover mb-4 rounded-full"
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
