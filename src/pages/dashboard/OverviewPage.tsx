import { AuthContext } from "@/context/AuthContext";
import HeaderSection from "@/features/dashboard/sections/HeaderSection";
import JourneySection from "@/features/dashboard/sections/JourneySection";

import { lazy, Suspense, useContext } from "react";


const JourneyStatSection = lazy(() => import("@/features/dashboard/sections/JourneyStatSection"))


const OverviewPage = () => {
  const { authenticatedUser } = useContext(AuthContext)!

  

  return (
    <div className="px-4 md:p-10 pt-3.5">
      
      <HeaderSection userName={authenticatedUser?.name || ""}/>

      <Suspense>
        <JourneyStatSection />
      </Suspense>

      <JourneySection/>
    </div>
  );
};

export default OverviewPage;
