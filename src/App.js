import { useState, useEffect } from "react";
import Top from './images/top.png';
import Bars from './images/bars.png';
import ScopeArmed from './images/Scope_Armed.gif';
import LaserBarsArmed from './images/Laser_Bars_Armed.gif';
import DisarmBox from './images/Disarm_Box.gif';
import DeniedScreen from './images/Denied_Screen.gif';
import AcceptedScreen from './images/Success_Screen.gif';
import ArmBox from './images/disarmed/Arm_Box.gif';
import BarsDisarmed from './images/disarmed/Laser_Bars_Disarmed.gif';
import ScopeDisarmed from './images/disarmed/Scope_Disarmed.gif';
import Dots from './images/Dots.png';
import './App.css';

function App() {
  const goodCode = "XAAVZ5GAJDL";

  const [code, setCode] = useState("");
  const [denied, setDenied] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleClick = () => {
    if (code.toLowerCase() === goodCode.toLowerCase()) {
      if (unlocked) {
        setUnlocked(false);
      } else {
        setDenied(false);
        setAccepted(true);
      }
    } else {
      setDenied(true);
      setAccepted(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setDenied(false);
    }, [3000])
  }, [denied]);

  useEffect(() => {
    setTimeout(() => {
      if (accepted) {
        setAccepted(false);
        setUnlocked(true);
      }
    }, [5000])
  }, [accepted]);

  return (
    <div className="App">
      <div className="App-container">
        <header className="App-header">
          <img src={Top} alt="Header" />
          <img className="bars" src={Bars} alt="Header bars" />
        </header>

        {denied || accepted ? (
          <>
            {denied && (
              <div className="deniedScreen">
                <img src={DeniedScreen} alt="Access Denied" />
              </div>
            )}

            {accepted && (
              <div className="acceptedScreen">
                <img src={AcceptedScreen} alt="Access Granted" />
              </div>
            )}
          </>
        ) : (
          <>
            <main className="App-main">
              <label htmlFor="text">ENTER_CODE_</label>
              <div className="inputContainer">
                <form id="codeEnteringForm">
                  <input type="text" id="enterCode" value={code} placeholder="_" onChange={(e) => setCode(e.target.value)} />
                  <button type="submit" onClick={() => handleClick()}>Submit</button>
                </form>
              </div>
            </main>

            <footer className="App-footer">
              {unlocked ? (
                <img src={ScopeDisarmed} alt="Scope Disarmed" width={336} />
              ) : (
                <img src={ScopeArmed} alt="Scope Armed" width={336} />
              )}

              <div className="lasersContainer">
                {unlocked ? (
                  <img src={BarsDisarmed} width={263} alt="Laser Bars Disarmed" />
                ) : (
                  <img src={LaserBarsArmed} width={263} alt="Laser Bars" />
                )}
                <span>LASERS:</span>
                <span>STATUS</span>
                <span>{"<<"}{unlocked ? "DISARMED" : "ACTIVE"}{">>"}</span>
              </div>

              {unlocked ? (
                <img src={ArmBox} alt="Arm" width={524} />
              ) : (
                <img src={DisarmBox} alt="Disarm" width={524} />
              )}
            </footer>
          </>
        )}


        <div className="dots">
          <img src={Dots} alt="Dots" />
          {accepted && (
            <span>SYSTEM_SHUTTING_DOWN...</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
