import { useContext, useEffect, useState } from "react";
import { VerifySession, VerifyUserInfo } from "../configs/session_service";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { authenticatedUser, setAuthenticatedUser, setUserInfo } = useContext(AuthContext)!;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        let res = await VerifySession();
        if (res) {
          setAuthenticatedUser(res.user);
        }
      } catch (error) {
        console.warn("")
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        let res = await VerifyUserInfo();
        if (res) {
          setUserInfo(res);
        }
      } catch (error) {
        console.warn("")
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);
  return { authenticatedUser, loading };
};

export default useAuth;
