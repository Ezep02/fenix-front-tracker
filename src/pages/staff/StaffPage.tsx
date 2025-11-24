import StaffHeaderSection from "@/features/staff/components/sections/StaffHeaderSection";
import StaffSection from "@/features/staff/components/sections/StaffSection";

const StaffPage = () => {
  return (
    <div className="px-4 md:p-10 pt-3.5 grid grid-cols-1">
      <StaffHeaderSection />
      <StaffSection />
    </div>
  );
};

export default StaffPage;
