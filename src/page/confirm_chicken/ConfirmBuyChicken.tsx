import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addDaysToDate, formatDate } from "../../util/Utils";
import logoCoin from "../../assets/image/coin.png"
import ChickenService from "../../service/ChickenService";
import Loading from "../../common/Loading";
import { Chicken } from "../../entity/Chicken";
import ChickenDetail from "./component/ChickenDetail";
import GrowthStages from "./component/GrowthStages";
import VaccineSchedules from "./component/VaccineSchedule";
const DIGIFORCE_DOMAIN = import.meta.env.VITE_DIGIFORCE_API_URL
  ? import.meta.env.VITE_DIGIFORCE_API_URL.replace(/\/$/, '')
  : ''

const ConfirmBuyChicken: React.FC = () => {
  const [chicken, setChicken] = useState<Chicken | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  const [quantity, setQuantity] = useState(1);

  const [isStaticDataInitialized, setIsStaticDataInitialized] = useState(false);

  const { chickenId } = useParams<{ chickenId: string }>();
  const chickenService = new ChickenService()

  useEffect(() => {
    const fetchData = async () => {
      if (chickenId) {
        chickenService.getChickenById(chickenId).then((response: any) => {
          setIsStaticDataInitialized(true);
          setChicken(response.data);

        });
      }
    };
    fetchData();
    return () => {
      // Clean up side effects, if needed.
    };
  }, [chickenId]);

  if (!isStaticDataInitialized || !chicken) {
    return (
      <Loading />
    );
  }
  const handleQuantityChange = (e: any) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };

  const handleConfirm = () => {
    WA.player.state.product = {
      id: chicken.product.id,
      quantity: quantity
    }
    if (WA.player.state.loadVariable('confirmBuyChicken')) {
      WA.player.state.saveVariable('confirmBuyChicken', false);
    }
    WA.player.state.saveVariable('confirmBuyChicken', true);
    WA.player.state.saveVariable('openConfirmBuyChicken', false);
    WA.player.state.saveVariable('openListChickens', false);
  };

  const handleCancel = () => {
    // navigate("/chickens")
    // WA.player.state.varietyId = null;
    WA.player.state.productId = null
    WA.player.state.saveVariable('openListChickens', true);
    WA.player.state.saveVariable('openConfirmBuyChicken', false);
    WA.player.state.saveVariable('confirmBuyChicken', false);


  };

  return (
    <div className="w-99">
      <div className="w-full p-4 bg-orange-50 shadow-md rounded-lg ">
        <div className="flex justify-end items-center mb-2">
          <h2 className="text-gray-800 text-sm md:text-base font-bold">
            Chi phí: {chicken.expense}
            <img
              src={logoCoin}
              alt=""
              className="inline-block h-5 w-5 object-contain ml-2"
            />
          </h2>
        </div>

        <div className="p-2 sm:p-0 flex items-center mb-4 gap-4">
          <img
            src={DIGIFORCE_DOMAIN + chicken.avatar[0].url}
            alt="Plant Preview"
            className="w-1/3 sm:w-1/4 max-w-sm aspect-w-5 aspect-h-3 object-cover rounded-md"
          />
          <div>
            <p className="text-2xl font-bold text-gray-700">
              {chicken.name}
            </p>
            <p className="text-wrap text-sm md:text-base">
              <span className="text-gray-700 font-bold">Thời gian thu hoạch: </span>
              {formatDate(new Date(), 'DD/MM/YYYY')} -{' '}
              {formatDate(
                addDaysToDate(new Date(), chicken.product_time),
                'DD/MM/YYYY'
              )}{' '}
              ({chicken.product_time} ngày)
            </p>
            <p className="text-wrap text-sm md:text-base">
              <span className="text-gray-700 font-bold">Ưu điểm: </span>
              {chicken.advantages}
            </p>
          </div>
        </div>
        <div className=" mb-4">
          <nav className="grid grid-flow-col justify-stretch">
            <button
              className={`px-4 py-2 border  text-sm font-medium ${activeTab === 'details' ? 'text-white border-white bg-orange-600' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Chi tiết
            </button>
            <button
              className={`px-4 py-2 border  text-sm font-medium ${activeTab === 'growthStages' ? 'text-white border-white bg-orange-600' : ''}`}
              onClick={() => setActiveTab('growthStages')}
            >
              Giai đoạn phát triển
            </button>
            <button
              className={`px-4 py-2 border  text-sm font-medium ${activeTab === 'schedule' ? 'text-white border-white bg-orange-600' : ''}`}
              onClick={() => setActiveTab('schedule')}
            >
              Lịch tiêm chủng
            </button>
          </nav>
        </div>

        <div className="">
          {activeTab === 'details' && (
            <ChickenDetail chicken={chicken} />
          )}
          {activeTab === 'growthStages' && (
            <GrowthStages growthStages={chicken.pets_growth_stages} />
          )}
          {activeTab === 'schedule' && (
            <VaccineSchedules Schedule={chicken.vaccination_schedule} />
          )}
        </div>
        <div className="flex justify-end">
          <p className="text-sm md:text-base flex items-center mb-4">
            <span className="font-medium md:font-bold mr-2">Số lượng : </span>
            <input
              type="number"
              className="w-20 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
          </p>
        </div>


        <div className="flex space-x-4 ">
          <button
            onClick={handleCancel}
            className="w-1/2 bg-gray-500 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-gray-600 transition"
          >
            Quay về
          </button>
          <button
            onClick={handleConfirm}
            className="w-1/2 bg-orange-800 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-orange-600 transition"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );

};

export default ConfirmBuyChicken;
