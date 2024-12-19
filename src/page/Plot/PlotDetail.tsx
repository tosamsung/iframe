import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoCoin from "../../assets/image/coin.png"
import { Plot } from '../../entity/Plot';
import PlotService from '../../service/PlotService';
import { Button } from 'antd';
import Loading from '../../common/Loading';

const plotService = new PlotService()
function PlotDetail() {
  const { plotId } = useParams<{ plotId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [plot, setPlot] = useState<Plot | null>(null);
  const [error, setError] = useState<string | null>(null);
  // const formattedBalance = balance.toLocaleString('en-US');

  useEffect(() => {
    const fetchData = async () => {
      if (plotId) {
        plotService.getById(plotId).then((response) => {
          setPlot(response)
          setLoading(false)

        })
      }
    }
    fetchData();
    return () => {
    };
  }, [plotId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!plot) {
        close();
      }
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [plot]);
  if (loading) {
    return (
      <Loading />
    );
  }
  const close = () => {
    WA.player.state.saveVariable('openPlotDetail', false);
  };
  const registerPlot = () => {
    WA.player.state.saveVariable("registerPlot", plotId);
    // WA.player.state.saveVariable('openPlotDetail', false);

  }
  // if (error) {
  //     return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  // }

  if (!plot) {
    return (
      <div className="bg-yellow-100 text-yellow-700 p-4 rounded">
        Plot not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-slate-400 flex justify-between items-center p-3">
            <div className='flex'>

              <h3 className="ml-2 text-xl font-semibold text-white">Chi tiết lô</h3>

            </div>
            <h2 className="text-gray-800 text-sm md:text-base text-white">
              <span className='font-medium text-white'>Chi phí : </span>
              {plot.price.toLocaleString('en-US')}
              <img
                src={logoCoin}
                alt=""
                className="inline-block h-5 w-5 object-contain ml-1 mb-1"
              />
            </h2>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap">
              {/* Cột 1 */}
              <div className="w-1/2 p-2">
                <p>
                  <span className="font-medium">Mã lô : </span>
                  {plot.plot_number}
                </p>
                <p>
                  <span className="font-medium">Chiều rộng : </span>
                  {plot.width} m
                </p>
                <p>
                  <span className="font-medium">Chiều dài : </span>
                  {plot.length} m
                </p>
                <p>
                  <span className="font-medium">Diện tích : </span>
                  {plot.area} m2
                </p>
              </div>

              {/* Cột 2 */}
              <div className="w-1/2 p-2">
                <p>
                  <span className="font-medium">Status : </span>
                  {plot.status}
                </p>
                <p>
                  <span className="font-medium">Ph : </span>
                  {plot.ph}
                </p>
                <p>
                  <span className="font-medium">Độ ẩm : </span>
                  {plot.humidity}%
                </p>
                <p>
                  <span className="font-medium">Nhiệt độ : </span>
                  {plot.temperature}°C
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-400 flex justify-between items-center p-3">
            <div className='flex'>
              <Button type="default" onClick={registerPlot} className="bg-green-400 text-white">
                Đăng ký
              </Button>
              <Button type="default" onClick={close} className="ml-2 bg-red-400 text-white">
                hủy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlotDetail;
