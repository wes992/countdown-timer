import React, { createContext, useContext, useState } from "react";

const CountdownContext = createContext();

const CountdownContextProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCountdown, setSelectedCountdown] = useState({});
  const [countdowns, setCountdowns] = useState([]);

  const value = {
    countdowns,
    setCountdowns,
    selectedCountdown,
    setSelectedCountdown,
    menuOpen,
    setMenuOpen,
  };

  return (
    <CountdownContext.Provider value={value}>
      <>{children}</>
    </CountdownContext.Provider>
  );
};

const useCountdownContext = () => useContext(CountdownContext);

export { CountdownContextProvider, useCountdownContext };
