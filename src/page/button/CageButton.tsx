import React from "react";
import { useSearchParams } from "react-router-dom";

const CageButton: React.FC = () => {
  const [searchParams] = useSearchParams();
  const quantity = parseInt(searchParams.get("quantity") || "0", 10);

  return (
    <div
      className={`grid gap-2 p-4 rounded-lg ${quantity > 0 ? "grid-cols-2" : "grid-cols-1"
        }`}
    >
      {/* <button
        className="px-2 opacity-75 py-2 shadow-md  bg-orange-500 text-white font-semibold rounded-md  hover:bg-orange-600 transition"
        onClick={() => WA.player.state.saveVariable("openCoopInformation", true)}
      >
        Thông tin truồng
      </button> */}
      <button
        className="px-2 opacity-75 py-2 shadow-md  bg-orange-500 text-white font-semibold rounded-md  hover:bg-orange-600 transition"
        onClick={() => {
          if (WA.player.state.loadVariable("openListChickens")) {
            WA.player.state.saveVariable("openListChickens", false);
          }
          WA.player.state.saveVariable("openListChickens", true);
        }}
      >
        Mua gà
      </button>

      {/* Nút "Cho ăn" chỉ hiển thị khi quantity > 0 */}
      {quantity > 0 && (
        <button
          className="px-2 opacity-75 py-2 shadow-md  bg-green-500 text-white font-semibold rounded-md  hover:bg-green-600 transition"
          onClick={() => {
            if (WA.player.state.loadVariable("openConfirmFeedingPrice")) {
              WA.player.state.saveVariable("openConfirmFeedingPrice", false)
            }
            WA.player.state.saveVariable("openConfirmFeedingPrice", true)
          }}
        >
          Cho ăn
        </button>
      )}
    </div>
  );
};

export default CageButton;
