// src/routes/AppRoutes.tsx
import { Suspense, lazy, type JSX } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Loader2 } from "lucide-react";
import TrackingPage from "@/pages/tracking/TrackingPage";
import { TrackingContextProvider } from "@/features/tracking/context/TrackingContext";
import { DashboardContextProvider } from "@/features/dashboard/context/DashboardContext";
import StaffPage from "@/pages/staff/StaffPage";
import { StaffContextProvider } from "@/features/staff/context/StaffContext";

// Lazy load de páginas
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const DashboardLayout = lazy(
  () => import("../pages/dashboard/DashboardLayout")
);
const DashboardOverview = lazy(() => import("../pages/dashboard/OverviewPage"));

const PageLoader = () => {
  return (
    <div className="flex flex-1 justify-center items-center h-screen">
      <div>
        <Loader2 size={24} className="animate-spin" />
      </div>
    </div>
  );
};

// PrivateRoute: Solo accesible si hay usuario autenticado
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { authenticatedUser, loading } = useAuth();

  if (loading) return <PageLoader />;

  return authenticatedUser?.id ? children : <Navigate to="/login" replace />;
};

// PublicRoute: Redirige al dashboard si ya esta autenticado
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { authenticatedUser, loading } = useAuth();

  if (loading) return <PageLoader />;

  return authenticatedUser?.id ? <Navigate to="/" replace /> : children;
};

export const AppRoutes = () => (
  <Router>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Paginas publicas */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Dashboard con rutas privadas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardContextProvider>
                <DashboardLayout />
              </DashboardContextProvider>
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          {/* Rutas adicionales del dashboard se pueden agregar aquí */}
          <Route
            path="/tracking"
            element={
              <Suspense>
                <TrackingContextProvider>
                  <TrackingPage />
                </TrackingContextProvider>
              </Suspense>
            }
          />

          <Route
            path="/staff"
            element={
              <Suspense>
                <StaffContextProvider>
                  <StaffPage />
                </StaffContextProvider>
              </Suspense>
            }
          />
        </Route>

        {/* Catch-all: redirige a dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </Router>
);
