import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BedService from "../../service/BedService";
import Loading from "../../common/Loading";
import DATA from "../../common/Data.json"
const BedDetail: React.FC = () => {
  const [bed, setBed] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { bedId } = useParams<{ bedId: string }>();
  const bedService = new BedService();

  useEffect(() => {
    const fetchData = async () => {
      if (bedId) {
        bedService.getBedById(bedId).then((response: any) => {
          setBed(response.data);
          setLoading(false)

        });
      }
    };

    fetchData();

    return () => {
    };
  }, [bedId]);
  const getBedStatus = (bedStatus: string): React.ReactNode => {
    switch (bedStatus) {
      case DATA.bed.status.prepare.name:
        return <span>{DATA.bed.status.prepare.message}</span>;
      case DATA.bed.status.new.name:
        return <span>{DATA.bed.status.new.message}</span>;
      case DATA.bed.status.using.name:
        return <span>{DATA.bed.status.using.message}</span>;
      default:
        return <span>Unknown status</span>;
    }
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  const handleClose = () => {
    WA.player.state.saveVariable('openBedDetail', false);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-7">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">Thông tin</h1>
        <div className="p-2 mb-4">
          <button
            onClick={handleClose}
            className="px-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            x
          </button>
        </div>

      </div>
      <div className="mb-4">

        <p><strong>Thứ tự luống:</strong> {bed.bed_number}</p>

        <p><strong>Trạng thái:</strong> {getBedStatus(bed.status)}</p>

        <p><strong>Chiều dài:</strong> {bed.length}</p>

        <p><strong>Chiều rộng:</strong> {bed.width}</p>

      </div>
    </div>
  );
};

export default BedDetail;
