import React from "react";
import { useState, useEffect } from "react";

import LotteryDashboard from "../components/lottery/LotteryDashboard";
import LotteryInstructions from "../components/lottery/LotteryInstructions";
import "../styles/Lottery.css";

import lotteryContract from "../contracts/lotteryContract";
import Web3 from "web3";

const MantleLottery = () => {
  /* STATE */
  const [web3, setWeb3] = useState(null);
  const [lottery, setLottery] = useState(null);
  const [error, setError] = useState("");
  const [manager, setManager] = useState("");
  const [balance, setBalance] = useState("");
  const [players, setPlayers] = useState([]);

  /* Initial Render */
  const fetchData = async () => {
    const web3 = new Web3(window.ethereum);
    // web3.setProvider(
    //   new Web3.providers.HttpProvider()
    // );
    const _lottery = lotteryContract(web3);
    const _manager = await _lottery.methods.manager().call();
    const _players = await _lottery.methods.getPlayers().call();
    const _balance = await web3.eth.getBalance(_lottery.options.address);

    setWeb3(web3);
    setLottery(_lottery);
    setManager(_manager);
    setBalance(web3.utils.fromWei(_balance, "ether"));
    setPlayers(_players);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const connectWalletHandler = async () => {
    //Is MM present?
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        //Try connecting to MM
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // //Add web3 instance as react state
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Please install Metamask");
    }
  };

  return (
    <div className="container">
      <div className="section">
        <div className="heading-wrapper">
          <h1 className="heading-primary">Mantle Lottery</h1>
          <p>{error}</p>
          <p>
            The contract address is 0x18BBda840BE36fe6B081b87bD51F91D0A81E8413
          </p>
          <p>A winner can only be picked by the following address: {manager}</p>
          <button onClick={connectWalletHandler}>Connect Wallet</button>
        </div>
        <div className="lottery-ui grid grid--2-cols">
          <div>
            <LotteryInstructions
              lottery={lottery}
              web3={web3}
              fetchData={fetchData}
            />
          </div>
          <div>
            <LotteryDashboard balance={balance} players={players} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MantleLottery;
