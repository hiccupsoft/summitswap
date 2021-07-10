import * as React from "react";

import { useCallback, useContext, useMemo, useState } from "react";
import Web3 from "web3";

const UseWalletContext = React.createContext(null);

function useWallet() {
  const walletContext = useContext(UseWalletContext);

  if (walletContext === null) {
    throw new Error(
      "useWallet() can only be used inside of <UseWalletProvider />, " +
        "please declare it at a higher level."
    );
  }

  const { wallet } = walletContext;

  return useMemo(() => {
    return { ...wallet };
  }, [wallet]);
}

function UseWalletProvider({ children }) {
  const walletContext = useContext(UseWalletContext);

  if (walletContext !== null) {
    throw new Error("<UseWalletProvider /> has already been declared.");
  }

  const [error, setError] = useState(null);
  const [status, setStatus] = useState("disconnected");
  const [account, setAccount] = useState(null);
  const [updated,setUpdated] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const connect = useCallback(async () => {
    try {
      
      await window.ethereum.enable();
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.getAccounts();
      console.log("accounts", accounts);
      setAccount(accounts[0]);
      setStatus("connected");
    } catch (error) {
      setError(error);
    }
  }, []);
  const setUpdateFlag = () => {
    setUpdated(!updated)
  }
  const setLoadingState = (loading) =>{
    setIsLoading(loading)
  }
  const wallet = useMemo(
    () => ({
      connect,
      account,
      error,
      status,
      updated,
      isLoading,
      setUpdateFlag,
      setLoadingState
    }),
    [
      connect,
      account,
      error,
      status,
      updated,
      isLoading,
      setUpdateFlag,
      setLoadingState
    ]
  );

  return (
    <UseWalletContext.Provider
      value={{
        wallet,
      }}
    >
      {children}
    </UseWalletContext.Provider>
  );
}

function UseWalletProviderWrapper(props) {
  return <UseWalletProvider {...props} />;
}

export const withWallet = (Component) => {
  return (props) => {
    const wallet = useWallet();

    return <Component wallet={wallet} {...props} />;
  };
};

export { UseWalletProviderWrapper as UseWalletProvider, useWallet };