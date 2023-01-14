import React, { useState } from "react";

const LotteryInstructions = ({ lottery, web3, fetchData }) => {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");

  const submitEntry = async (event) => {
    event.preventDefault();
    console.log(web3);
    let _accounts = await web3.eth.getAccounts();

    setStatus("Transaction sent! Awaiting confirmation...");

    await lottery.methods.enter().send({
      from: _accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });
    setStatus("Transaction confirmed! May the odds be ever in your favour");
    fetchData();
  };

  const pickWinner = async (event) => {
    event.preventDefault();
    try {
      let _accounts = await web3.eth.getAccounts();
      setStatus("Transaction sent! Awaiting confirmation...");
      await lottery.methods.pickWinner().send({
        from: _accounts[0],
      });
      setStatus("Transaction confirmed. A winner has been chosen!");
      fetchData();
    } catch (err) {
      setStatus(err.message);
    }
  };

  return (
    <div className="lottery-card" id="instructions-card">
      <p className="card-title">How it works</p>
      <ol className="instructions-list">
        <li>Connect your Metamask to Mantle Testnet</li>
        <li>
          Enter an amount of $BIT to submit to the lottery in the form below
          (must be > 0.001)
        </li>
        <li>
          Hit "Enter" below to send your testnet $BIT to the smart contract
        </li>
        <li>The smart contract will pick a random winner</li>
      </ol>
      <form className="form-group">
        <p className="form-feedback">{status}</p>
        <input
          onChange={(event) => setValue(event.target.value)}
          placeholder="Submit $BIT"
          className="form-input"
        ></input>
        <button onClick={submitEntry} className="form-btn">
          Enter
        </button>
      </form>
      <button onClick={pickWinner} className="form-btn">
        Pick a Winner
      </button>
    </div>
  );
};

export default LotteryInstructions;
