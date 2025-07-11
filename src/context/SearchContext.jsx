import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTarget, setSearchTarget] = useState(null);

  return (
    <SearchContext.Provider value={{ searchTarget, setSearchTarget }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
