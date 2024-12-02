import React from "react";
import StaticData from "../../../helper/StaticData";

interface Fertilizer {
  name: string;
}

interface GrowthStage {
  phase: string;
  start_day: string;
  watering_count: number;
  watering_frequency: string;
  fertilizer: Fertilizer[];
}

interface GrowthStagesProps {
  growthStages: GrowthStage[];
}

const GrowthStages: React.FC<GrowthStagesProps> = ({ growthStages }) => {
  return (
    <div className=" md:max-w-[624px] max-h-[328px]">
      <table className="min-w-full table-fixed border-collapse border border-white min-h-[328px]">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="pl-4 py-2 border border-gray-300 w-1/5">Giai đoạn</th>
            <th className="pl-4 py-2 border border-gray-300 w-1/5">Ngày</th>
            <th className="hidden sm:table-cell px-4 py-2 border border-gray-300 w-1/5">Sl tưới</th>
            <th className="hidden sm:table-cell px-4 py-2 border border-gray-300 w-1/5">Tần suất</th>
            <th className="px-4 py-2 border border-gray-300 w-1/5">Phân bón</th>
          </tr>
        </thead>
        <tbody>
          {growthStages.map((stage, index) => (
            <tr className="hover:bg-gray-100 bg-white" key={index}>
              <td className="pl-4 py-2 border border-gray-300 text-sm">{StaticData.getPhase().get(stage.phase)}</td>
              <td className="pl-4 py-2 border border-gray-300 text-sm">{stage.start_day}</td>
              <td className="hidden sm:table-cell px-4 py-2 border border-gray-300 text-sm">{stage.watering_count}</td>
              <td className="hidden sm:table-cell px-4 py-2 border border-gray-300 text-sm">{StaticData.getWaterFrequency().get(stage.watering_frequency)}</td>
              <td className="px-4 py-2 border border-gray-300 text-sm">
                {stage.fertilizer.map((fertilize) => fertilize.name).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


  );
};

export default GrowthStages;
