import { useContext, useEffect, useState } from "react";
import CropService from "../../service/CropService"; // Adjust the import path based on your project structure
import { CropVariety } from "../../entity/CropVariety";
import UserContext from "../../context/UserContext";
import { Button } from "antd";

const cropService = new CropService();
const DIGIFORCE_DOMAIN = import.meta.env.VITE_DIGIFORCE_API_URL
  ? import.meta.env.VITE_DIGIFORCE_API_URL.replace(/\/$/, '')
  : ''

function ListCrops() {
  const [crops, setCrops] = useState<CropVariety[]>([]);
  const userContext = useContext(UserContext)
  const screenSizeDevice = userContext?.screenSizeDevice
  const handleSelectvariety = (id: string) => {
    WA.player.state.varietyId = id
    WA.player.state.screen = screenSizeDevice
    WA.player.state.saveVariable("openListCrops", false)
    WA.player.state.saveVariable("openConfirmPlant", true)

  };
  const close = () => {
    WA.player.state.saveVariable("openListCrops", false)

  }
  useEffect(() => {
    cropService.getAllVariety().then((response: any) => {
      setCrops(response.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-green-50 rounded">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-gray-800 my-3">
            <span className="ml-2 inline-block bg-green-500 text-white text-sm font-medium py-1 px-3 rounded-full">
              Cây trồng
            </span>
          </h1>
          <Button type="primary" danger onClick={close} className="my-3 fixed right-5 top-0">
            x
          </Button>
        </div>

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

export default ListCrops;
