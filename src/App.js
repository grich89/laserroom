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
import './App.css';

function App() {
  const badCode = "Nope";
  const goodCode = "Yep";

  const [code, setCode] = useState("");
  const [denied, setDenied] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (code === badCode) {
      setDenied(true);
    } else {
      setDenied(false);
    }

    if (code === goodCode) {
      setAccepted(true);
    } else {
      setAccepted(false);
    }
  }, [code]);

  useEffect(() => {
    setTimeout(() => {
      setDenied(false);
    }, [3000])
  }, [denied]);

  useEffect(() => {
    setTimeout(() => {
      setAccepted(false);
      setUnlocked(true);
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
              <label for="text">ENTER_CODE_</label>
              <div className="inputContainer">
                <input type="text" id="enterCode" value={code} placeholder="_" onChange={(e) => setCode(e.target.value)} />
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
      </div>
    </div>
  );
}

export default App;
