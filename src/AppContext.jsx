import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminId, setadminId] = useState();

  const setAdmin = (admin) => {
    setadminId(admin);
  };

  return (
    <AuthContext.Provider
      value={{
        adminId,
        setAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
