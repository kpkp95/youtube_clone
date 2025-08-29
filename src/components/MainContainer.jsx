import React, { useState } from "react";
import Buttonlist from "./Buttonlist";
import VideoContainer from "./VideoContainer";
 
const MainContainer = () => {
  // No tab selected initially

  return (
    <div className="flex-1 overflow-hidden">
      {/* Pass setSelectedTab to Buttonlist */}
      <Buttonlist />
      {/* Pass selectedTab to VideoContainer */}
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
