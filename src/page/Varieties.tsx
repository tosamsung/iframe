import CropService from "../service/CropService"; // Adjust the import path based on your project structure
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { searchParamUrl } from "../helper/Helper";
const DIGIFORCE_DOMAIN = import.meta.env.VITE_DIGIFORCE_API_URL
    ? import.meta.env.VITE_DIGIFORCE_API_URL.replace(/\/$/, '')
    : ''

const cropService = new CropService();
const Variety: React.FC = () => {
    const cropId = searchParamUrl("cropid")
    const [cropVarieties, setCropVarieties] = useState<any[]>([]);
    const [selectedVariety, setSelectedVariety] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const userContext = useContext(UserContext)
    const screenSizeDevice = userContext?.screenSizeDevice
    useEffect(() => {
        if (cropId) {
            cropService.getAllCropVarietyByCropId(cropId).then((response: any) => {
                setCropVarieties(response.data); // Assuming response.data contains the crop varieties
            }).catch(error => {
                console.error("Error fetching crop varieties:", error);
            });
        }
    }, [cropId]);

    const handleSelectVariety = async (variety: any) => {
        WA.player.state.varietyId = variety.id
        WA.player.state.screen = screenSizeDevice
        console.log(variety);
        
        WA.player.state.saveVariable("openListCrops", false)
        WA.player.state.saveVariable("openConfirmPlant", true)

        // console.log(serviceContext?.embedWebsiteService); // This will now log the updated state after the async operation completes
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close modal
    };

    const openModal = (variety: any) => {
        setSelectedVariety(variety);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {cropVarieties.length > 0 ? (
                        cropVarieties.map((variety: any) => (
                            <div
                                key={variety.id}
                                className={`p-4 bg-white shadow rounded-lg flex flex-col items-center text-center ${selectedVariety?.id === variety.id ? "ring-2 ring-green-500" : ""
                                    }`}
                            >
                                {/* Variety Image */}
                                <img
                                    src={DIGIFORCE_DOMAIN + variety.avatar[0].url} // Replace with the correct property for the image URL
                                    alt={variety.name}
                                    className="w-32 h-32 object-cover rounded-full shadow-md mb-4"
                                />
                                {/* Variety Name */}
                                <h3 className="text-lg font-semibold text-gray-700">{variety.name}</h3>
                                {/* Variety Description */}
                                <p className="text-sm text-gray-500 mb-4">{variety.description}</p>
                                {/* Action Buttons */}
                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={() => openModal(variety)}
                                        className="px-4 py-2 bg-cyan-300 text-white rounded hover:bg-cyan-400 transition"
                                    >
                                        Chi tiết
                                    </button>
                                    <button
                                        onClick={() => handleSelectVariety(variety)}
                                        className={`px-4 py-2 rounded text-white transition bg-green-500 hover:bg-green-600"}`}>
                                        Trồng cây
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Tải giống cây...</p>
                    )}
                </div>
            </div>

            {isModalOpen && selectedVariety && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
                        <h3 className="text-2xl font-semibold text-gray-800">Variety Details</h3>
                        <p className="mt-2 text-lg text-gray-700"><strong>Name:</strong> {selectedVariety.name}</p>
                        <p className="mt-2 text-lg text-gray-700"><strong>Description:</strong> {selectedVariety.description}</p>
                        <p className="mt-2 text-lg text-gray-700"><strong>Scientific Name:</strong> {selectedVariety.scientific_name}</p>
                        <p className="mt-2 text-lg text-gray-700"><strong>Growth Duration:</strong> {selectedVariety.growth_duration} days</p>
                        <p className="mt-2 text-lg text-gray-700"><strong>Expected Yield per Plant:</strong> {selectedVariety.expected_yield_per_plant} kg</p>

                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}
export default Variety;
