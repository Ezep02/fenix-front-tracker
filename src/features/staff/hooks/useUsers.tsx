import { useContext, useEffect } from "react";
import { StaffContext } from "../context/StaffContext";
import { allUserList } from "../services/users";

const useUsers = () => {
  const { setUsersList, usersList } = useContext(StaffContext)!;

  useEffect(() => {
    const fetchUsers = async () => {
      let res = await allUserList();
      if (res) {
        setUsersList(res);
      }
    };

    fetchUsers();
  }, []);

  return {
    usersList,
  };
};

export default useUsers;
