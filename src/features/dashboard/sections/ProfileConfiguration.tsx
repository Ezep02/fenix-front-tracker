import React, { useContext } from "react";

import { AuthContext } from "@/context/AuthContext";
import PersonalInformation from "./PersonalInformation";
import ChangeUserName from "../components/dialogs/ChangeUserName";
import ForgotPassword from "../components/dialogs/ForgotPasswod";

const ProfileConfiguration: React.FC = () => {
  const { userInfo } = useContext(AuthContext)!;

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Datos principales */}
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-700">
            {userInfo?.username}
          </span>
          {userInfo && <ChangeUserName initUserData={userInfo} />}
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <ForgotPassword  userInfo={userInfo}/>
        </div>
      </div>

      {/* Información personal */}
      {userInfo && <PersonalInformation initUserData={userInfo} />}
    </div>
  );
};

export default ProfileConfiguration;
