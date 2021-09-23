import React, { useGlobal, useState, useEffect } from "reactn";
import { currentUser as currentUserApi } from "api/Auth/login";

const useAuth = () => {
  const setUser = useGlobal("user")[1];
  const [error, setError] = useGlobal("error");
  const [firstAuthLoading, setFirstAuthLoading] = useState(true);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const user = await currentUserApi();
        setUser(user);
        setFirstAuthLoading(false);
      } catch (err) {
        setUser(null);
        setFirstAuthLoading(false);
      }
    }
    getCurrentUser();
    setError(false);
  }, [setUser]);

  return [error, firstAuthLoading];
};
export default useAuth;
