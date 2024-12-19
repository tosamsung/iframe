import { Route, Routes, } from "react-router-dom";
import { lazy, Suspense } from "react";

import 'tailwindcss/tailwind.css';
import "./assets/css/style.css"
import Loading from "./common/Loading";

const ListCrops = lazy(() => import("./page/crop/ListCrops"));
const ConfirmPlant = lazy(() => import("./page/confirm_plant/ConfirmPlant"));
const ConfirmWatering = lazy(() => import("./page/confirm_watering/ConfirmWatering"));

const BedDetail = lazy(() => import("./page/bed/BedDetail"));
const Error = lazy(() => import("./page/notificate/Error"));
const NotFound = lazy(() => import("./common/NotFound"));
const Login = lazy(() => import("./page/auth/login"));
const Register = lazy(() => import("./page/auth/register"));
const UserDetail = lazy(() => import("./page/user/UserDetail"));
const PlotDetail = lazy(() => import("./page/Plot/PlotDetail"));
const Wallet = lazy(() => import("./page/user/Wallet"));
const Success = lazy(() => import("./page/notificate/Success"));
const BedStatus = lazy(() => import("./page/bed/status/BedStatus"));
const ListChickens = lazy(() => import("./page/chicken/ListChickens"));
const ConfirmBuyChicken = lazy(() => import("./page/confirm_chicken/ConfirmBuyChicken"));
const BedButton = lazy(() => import("./page/button/BedButton"));
const CageButton = lazy(() => import("./page/button/CageButton"));
const ConfirmFeedingPrice = lazy(() => import("./page/confirm_feeding/ConfirmFeedingPrice"));
function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="crops" element={<ListCrops />} />
                <Route path="confirm/plant/:varietyId" element={<ConfirmPlant />} />
                {/* <Route path="cage/:cageId" element={<CageDetail />} /> */}
                {/* user */}
                <Route path="user" element={<UserDetail />} />
                <Route path="user/wallet" element={<Wallet />} />

                <Route path="error" element={<Error />} />
                <Route path="success" element={<Success />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="plot/:plotId" element={<PlotDetail />} />
                {/* bed */}
                <Route path="bed/status" element={<BedStatus />} />
                <Route path="bed/:bedId" element={<BedDetail />} />

                {/* chicken */}
                <Route path="chickens" element={<ListChickens />} />
                <Route path="confirm/chicken/feeding" element={<ConfirmFeedingPrice />} />
                <Route path="confirm/chicken/:chickenId" element={<ConfirmBuyChicken />} />
                <Route path="confirm/watering" element={<ConfirmWatering />} />

                {/* button */}
                <Route path="button/bed" element={<BedButton />} />
                <Route path="button/cage" element={<CageButton />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>

    );
}


export default App;
