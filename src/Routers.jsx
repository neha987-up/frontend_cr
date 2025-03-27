import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@pages/auth/Login";
import Dashboard from "@pages/dashboard/Home";
import PageNotFound from "@components/common/PageNotFound";
import PrivateCheck from "@layouts/ProtectedRoute";
import DashboardLayout from "@layouts/DashboardLayout";
import AuthLayout from "@layouts/AuthLayout";
import { ScrollTop } from "./utilities/helper";
import { screenPath } from "./constants/screenPath";

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route element={<PrivateCheck auth={true} />}>
            <Route exact path={screenPath.HOME.DASHBOARD} element={<Dashboard />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<PrivateCheck auth={false} />}>
            <Route path={screenPath.Auth.LOGIN} element={<Login />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
