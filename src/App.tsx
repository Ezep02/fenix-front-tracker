import React from "react";
import { AuthContextProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  );
};

export default App;
