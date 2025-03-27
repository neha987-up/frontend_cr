import React, { createContext, useState, useEffect, useContext } from "react";

const ClientContext = createContext();
export const ClientProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <ClientContext.Provider value={isClient}>{children}</ClientContext.Provider>
  );
};
export const useClient = () => {
  return useContext(ClientContext);
};
