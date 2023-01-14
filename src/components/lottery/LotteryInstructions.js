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
        <li>
          Connect your Metamask to{" "}
          <a
            target="_blank"
            href="https://chainlist.org/?search=Mantle&testnets=true"
          >
            Mantle Testnet
          </a>{" "}
          <i>
            <p className="list-callout">
              If this is your first time using Mantle or MetaMask, check out our{" "}
              <a
                target="_blank"
                href="https://mirror.xyz/0xmantle.eth/qIDSO3AsFnXmwVLSYfODZWOpK_0K01UdvR3ZxUCtCjw"
              >
                Complete Onboarding Guide
              </a>
            </p>
          </i>
        </li>
        <li>
          Enter an amount of $BIT in the field below to submit it to the lottery
          (min = 0.001 $BIT)
          <i>
            <p className="list-callout">
              $BIT is the native token on Mantle. If you need test tokens you
              can visit our{" "}
              <a target="_blank" href="https://faucet.testnet.mantle.xyz/">
                Testnet Faucet
              </a>{" "}
              or dm me your address on{" "}
              <a target="_blank" href="https://twitter.com/midroni">
                Twitter
              </a>{" "}
              for an airdrop
            </p>
          </i>
        </li>
        <li>Click "Enter" to submit your transaction to Mantle Network!</li>
        <li>
          At some time in the future, I will trigger the smart contract to pick
          a random winner
        </li>
      </ol>
      <form className="form-group">
        <i>
          <p className="form-feedback">{status}</p>
        </i>
        <input
          onChange={(event) => setValue(event.target.value)}
          placeholder="Submit $BIT"
          className="form-input"
        ></input>
        <div className="form-btn-group">
          <button onClick={submitEntry} className="form-btn">
            Enter
          </button>
          <button onClick={pickWinner} className="form-btn">
            Pick a Winner
          </button>
        </div>
      </form>
    </div>
  );
};

export default LotteryInstructions;
