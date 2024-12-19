import React from "react";
import { useSearchParams } from "react-router-dom";
const BedButton: React.FC = () => {
  const [searchParams] = useSearchParams();
  const buttonParam = searchParams.get("button") || "";
  const buttonArray: string[] = buttonParam.split(",");

  return (
    <div className="p-1 shadow-md rounded-lg items-center">
      <button
        className="px-4 w-full opacity-90 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition"
        onClick={() => WA.player.state.saveVariable('openBedDetail', true)}
      >
        Thông tin luống
      </button>
      {buttonArray.includes("planting") && (
        <button
          className="px-2 w-full mt-2 opacity-90 py-2 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 transition"
          onClick={() => WA.player.state.saveVariable('openListCrops', true)}
        >
          Trồng cây
        </button>

      )}
      {buttonArray.includes("watering") && (
        <button
          className="px-4 w-full mt-2  opacity-90 py-2 bg-blue-200 text-white font-semibold rounded-md shadow hover:bg-blue-400 transition"
          onClick={() => WA.player.state.saveVariable("openConfirmWatering", true)}
        >
          Tưới cây
        </button>
      )}
    </div>
  );
};

export default BedButton;
