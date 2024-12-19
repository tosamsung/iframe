import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { Button } from "antd";
import { Chicken } from "../../entity/Chicken";
import ChickenService from "../../service/ChickenService";
import Loading from "../../common/Loading";

const DIGIFORCE_DOMAIN = import.meta.env.VITE_DIGIFORCE_API_URL
    ? import.meta.env.VITE_DIGIFORCE_API_URL.replace(/\/$/, '')
    : ''

function ListChickens() {
    const [chickens, setChickens] = useState<Chicken[]>([]);
    const userContext = useContext(UserContext)
    const chickenService = new ChickenService()
    const screenSizeDevice = userContext?.screenSizeDevice

    const handleSelectvariety = (id: string) => {
        // navigate("/confirm/chicken/"+id)
        WA.player.state.chickenId = id
        WA.player.state.screen = screenSizeDevice
        if (WA.player.state.loadVariable("openConfirmBuyChicken")) {
            WA.player.state.saveVariable("openConfirmBuyChicken", false)
        }
        WA.player.state.saveVariable("openConfirmBuyChicken", true)
        WA.player.state.saveVariable("openListChickens", false)
    };
    const close = () => {
        WA.player.state.saveVariable("openListChickens", false)

    }
    useEffect(() => {
        chickenService.getAllChickens().then((response: any) => {
            setChickens(response.data);
        });
    }, []);
    if (!chickens) {
        return (
            <div className="bg-yellow-100 text-yellow-700 p-4 rounded">
                Plot not found.
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-orange-200 rounded">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold text-gray-800 my-3">
                        <span className="ml-2 inline-block bg-orange-600 text-white text-sm font-medium py-1 px-3 rounded-full">
                            Vật nuôi
                        </span>
                    </h1>
                    <Button type="primary" danger onClick={close} className="my-3 fixed right-5 top-0 text-xl">
                        <p className="text-center align-middle">x</p>
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                    {/* Grid layout with 4 columns */}
                    {chickens.length > 0 ? (
                        chickens.map((chicken: Chicken) => (
                            <div
                                key={chicken.id}
                                className="p-4 bg-white shadow rounded-lg flex flex-col items-center text-center m-3"
                            >
                                <img
                                    src={DIGIFORCE_DOMAIN + chicken.avatar[0].url}
                                    alt={chicken.name}
                                    className="w-32 h-32 object-cover mb-4 rounded"
                                />
                                <h2 className="text-lg font-semibold text-gray-700">{chicken.name}</h2>
                                <button
                                    onClick={() => handleSelectvariety(chicken.id)}
                                    className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                                >
                                    Chọn
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex justify-center items-center">
                            <Loading />
                        </div>
                    )}
                </div>


            </div>
        </div>

    );
}

export default ListChickens;
