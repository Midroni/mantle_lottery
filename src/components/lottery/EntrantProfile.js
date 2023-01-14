import React from "react";
import Jazzicon from "react-jazzicon";

function remToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

const EntrantProfile = ({ player }) => {
  return (
    <div className="row">
      <div className="entrant-profile">
        <Jazzicon
          diameter={remToPixels(3)}
          seed={Math.round(Math.random() * 1000000)}
        />
        <p className="profile-address">{player}</p>
        {/* <div className="profile-contribution">
          <span>X</span>
          <span>ETH</span>
        </div> */}
      </div>
    </div>
  );
};

export default EntrantProfile;
