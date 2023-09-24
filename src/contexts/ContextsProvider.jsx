import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => { },
  setToken: () => { },
  setNotification: () => { },
  paymentInfo: null,
  setPaymentInfo: () => { },
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN')); // Use localStorage to get the token
  const [notification, _setNotification] = useState('');
  const [paymentInfo, _setPaymentInfo] = useState(localStorage.getItem('PAYMENT_DONE')); // Use localStorage to get the paymentInfo

  const setToken = (newToken) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem('ACCESS_TOKEN', newToken); // Use localStorage to set the token
    } else {
      localStorage.removeItem('ACCESS_TOKEN'); // Use localStorage.removeItem to remove the token
    }
  };

  const setPaymentInfo = (newPaymentInfo) => {
    _setPaymentInfo(newPaymentInfo);
    if (newPaymentInfo) {
      localStorage.setItem('PAYMENT_DONE', newPaymentInfo); // Use localStorage to set the paymentInfo
    } else {
      localStorage.removeItem('PAYMENT_DONE'); // Use localStorage.removeItem to remove the paymentInfo
    }
  };

  const setNotification = (message) => {
    _setNotification(message);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        notification,
        setNotification,
        paymentInfo,
        setPaymentInfo,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
