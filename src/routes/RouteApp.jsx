import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { paths } from "../constant/Config"; /*if need enable this */

const Segment = lazy(() => import("../components/pages/Segment"));

function RouteApp() {
  return (
    <BrowserRouter>
      <Routes>
      <Route
          path={"/"}
          element={
            <Suspense fallback={""}>
              <Segment />
            </Suspense>}
     /*--you can acces by giving this path file also */
        // <Route
        //   path={paths.Segment}
        //   element={
        //     <Suspense fallback={""}>
        //       <Segment />
        //     </Suspense>
        //   }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default RouteApp;
