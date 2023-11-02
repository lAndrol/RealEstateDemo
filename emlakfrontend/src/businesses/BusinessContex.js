import React, { createContext, useContext, useState } from 'react';

const BusinessContext = createContext();

export function useBusiness() {
  return useContext(BusinessContext);
}

export function BusinessProvider({ children }) {
  const [businessId, setBusinessId] = useState(null);

  return (
    <BusinessContext.Provider value={{ businessId, setBusinessId }}>
      {children}
    </BusinessContext.Provider>
  );
}
