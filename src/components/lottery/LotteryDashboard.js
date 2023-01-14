import React from "react";

import EntrantProfile from "./EntrantProfile";

const LotteryDashboard = ({ balance, players }) => {
  return (
    <div className="">
      <div className="lottery-card" id="prize-card">
        <p className="card-title">Current Pool</p>
        <span className="prize-amount">{balance} $BIT</span>
      </div>
      <div className="lottery-card" id="leaderboard">
        <p className="card-title">Current Entrants</p>
        {players.map((player) => {
          return <EntrantProfile player={player} key={player} />;
        })}
      </div>
    </div>
  );
};

export default LotteryDashboard;
