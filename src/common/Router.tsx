import Crops from "../page/Crops";

import Variety from "../page/Varieties";
import Warning from "../page/Warning";
import BedDetail from "../page/bed/BedDetail";
import ConfirmPlant from "../page/confirm_plant/ConfirmPlant";
import Main from "./Main";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/:ownerId",
      element: (
        <Main />
      ),
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            // { path: "plot", element: <Plots /> },
            // { path: "plot/:plotNumber", element: <PlotDetail /> }, 
            { path: "crop", element: <Crops /> },
            { path: "crop/variety", element: <Variety /> },

          ],
        },
      ],
    },
    { path: "confirm/plant/:varietyId", element: <ConfirmPlant /> },
    { path: "bed/:bedId", element: <BedDetail /> },

    { path: "warning", element: <Warning /> },

    { path: "*", element: <NotFound /> },
  ],
  {
    basename: "/gsg-iframe", // Set this to your GitHub Pages repo name or base path

    future: {
      v7_partialHydration: true,
      v7_fetcherPersist: true,
      v7_skipActionErrorRevalidation: true,
      v7_normalizeFormMethod: true,
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default router;