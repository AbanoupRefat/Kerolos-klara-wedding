import { useState } from "react";
import "./Envelope.css";

export default function Envelope({ onComplete, onOpen }) {
  const [opening, setOpening] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    if (onOpen) onOpen();

    // Fade out wrapper after letter slides out completely
    setTimeout(() => {
      setFadeOut(true);
    }, 3200);

    // Notify parent to unlock scrolling and remove envelope overlay
    setTimeout(() => {
      onComplete();
    }, 4200); // 1s fade-out duration
  };

  return (
    <div className={`envelope-wrapper ${opening ? "opening" : ""} ${fadeOut ? "fade-out" : ""}`}>
      <div className="envelope" onClick={handleOpen}>
        
        {/* The top flap with realistic 3D flipping */}
        <div className="flap-container">
          <div className="flap-front"></div>
          <div className="flap-back"></div>
        </div>
        
        {/* The main body pocket */}
        <div className="pocket-container">
          <div className="pocket"></div>
        </div>
        
        {/* The invitation letter sliding out */}
        <div className="letter">
          <div className="letter-text">K & K</div>
          <div className="letter-subtext">You're Invited</div>
        </div>
        
        {/* Deep textured wax seal */}
        <div className="wax-seal">K</div>
      </div>
      
    </div>
  );
}
