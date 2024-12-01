import { Route, Routes } from "react-router-dom";
import 'tailwindcss/tailwind.css';
import Main from "./common/Main";
import ProtectedRoute from "./common/ProtectedRoute";
import Crops from "./page/Crops";
import Variety from "./page/Varieties";
import ConfirmPlant from "./page/confirm_plant/ConfirmPlant";
import BedDetail from "./page/bed/BedDetail";
import Warning from "./page/Warning";
import NotFound from "./common/NotFound";

function App() {
    return (
        <Routes>
            <Route path="/:ownerId" element={<Main />}>
                <Route element={<ProtectedRoute />}>
                    {/* Protected Routes */}
                    <Route path="crop" element={<Crops />} />
                    <Route path="crop/variety" element={<Variety />} />
                </Route>
            </Route>
            <Route path="confirm/plant/:varietyId" element={<ConfirmPlant />} />
            <Route path="bed/:bedId" element={<BedDetail />} />
            <Route path="warning" element={<Warning />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}


export default App;
