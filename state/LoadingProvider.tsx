import React, { createContext, useState } from "react";

export const LoadingContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);

interface LoadingContextProps {}

const LoadingProvider: React.FC<LoadingContextProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={[loading, setLoading]}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
