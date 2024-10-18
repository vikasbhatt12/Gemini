import React, { useState } from "react";
import "./Sidebar.css";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} alt="menu" />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="new-chat" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="message" />
              <p>what is react ...</p>
            </div>
          </div>
        ) : null}
      </div> 
      <div className="bottom">
        <div className="bottom-items recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended?<p>Help</p>:null}
        </div>

        <div className="bottom-items recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended?<p>activity</p>:null}
        </div>

        <div className="bottom-items recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended?<p>Settings</p>:null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
