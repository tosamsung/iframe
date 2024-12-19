import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CropService from "../../service/CropService"; // Assuming CropService is correctly imported
import { addDaysToDate, formatDate } from "../../util/Utils";
import TabComponent from "../../common/TabComponent";
import GrowthStages from "./component/GrowthStages";
import VarietyDetail from "./component/VarietyDetail";
import logoCoin from "../../assets/image/coin.png"
import Loading from "../../common/Loading";
const DIGIFORCE_DOMAIN = import.meta.env.VITE_DIGIFORCE_API_URL
  ? import.meta.env.VITE_DIGIFORCE_API_URL.replace(/\/$/, '')
  : ''

const ConfirmPlant: React.FC = () => {
  const [variety, setVariety] = useState<any>(null);
  const [isStaticDataInitialized, setIsStaticDataInitialized] = useState(false);
  const { varietyId } = useParams<{ varietyId: string }>();
  const cropService = new CropService();

  useEffect(() => {
    const fetchData = async () => {
      if (varietyId) {
        cropService.getVarietyAllInfoById(varietyId).then((response: any) => {
          setIsStaticDataInitialized(true);
          setVariety(response.data);
          // WA.player.state.cropTileset = response.data.crop.tileset;
        });
      }
    };

    fetchData();

    return () => {
      // Clean up side effects, if needed.
    };
  }, [varietyId]);

  if (!isStaticDataInitialized || !variety) {
    return (
      <Loading />
    );
  }

  const handleConfirm = () => {
    WA.player.state.productId = variety.product_id
    if (WA.player.state.loadVariable('confirmPlant'))
      WA.player.state.saveVariable('confirmPlant', false);
    WA.player.state.saveVariable('confirmPlant', true);
    WA.player.state.saveVariable('openConfirmPlant', false);
    WA.player.state.saveVariable('openListCrops', false);
  };

  const handleCancel = () => {
    WA.player.state.productId = null;
    WA.player.state.saveVariable('openListCrops', true);
    WA.player.state.saveVariable('openConfirmPlant', false);

  };

  return (
    <div className="w-99">
        <div className="w-full p-6 bg-green-50 shadow-md rounded-lg">
          <div className="flex justify-end items-center mb-4">
            <h2 className="text-gray-800 text-sm md:text-base font-bold">
              Chi phí: {variety.expense}
              <img
                src={logoCoin}
                alt=""
                className="inline-block h-5 w-5 object-contain ml-2"
              />
            </h2>
          </div>

          <div className="p-2 sm:p-0 flex items-center mb-4 gap-4">
            <img
              src={DIGIFORCE_DOMAIN + variety.avatar[0].url}
              alt="Plant Preview"
              className="w-1/2 sm:w-1/3 max-w-sm aspect-w-5 aspect-h-3 object-cover rounded-md"
            />
            <div>
              <p className="text-sm md:text-base lg:text-lg font-bold text-gray-900">
                {variety.name}
              </p>
              <p className="text-wrap text-sm md:text-base">
                <span className="text-gray-700 font-bold">Thời gian trồng: </span>
                {formatDate(new Date(), 'DD/MM/YYYY')} -{' '}
                {formatDate(
                  addDaysToDate(new Date(), variety.harvest_days),
                  'DD/MM/YYYY'
                )}{' '}
                ({variety.harvest_days} ngày)
              </p>
              <p className="text-wrap text-sm md:text-base">
                <span className="text-gray-700 font-bold">Ưu điểm: </span>
                {variety.advantages}
              </p>
            </div>
          </div>

          <TabComponent
            previousButtonText="Chi tiết"
            nextButtonText="Giai đoạn phát triển"
          >
            <div>
              <VarietyDetail variety={variety} />
            </div>
            <div>
              <GrowthStages growthStages={variety.growth_stages} />
            </div>
          </TabComponent>

          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleCancel}
              className="w-1/2 bg-gray-500 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-gray-600 transition"
            >
              Quay về
            </button>
            <button
              onClick={handleConfirm}
              className="w-1/2 bg-green-800 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-green-600 transition"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>

  );

};

export default ConfirmPlant;
