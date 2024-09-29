import React from "react";
import "./Header.css";
import { ScanSearch, Settings } from "lucide-react";

export default function Header({
  settingOpen,
  setSettingOpen,
}: {
  settingOpen: boolean;
  setSettingOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(e.target.checked);
    // Add any additional dark mode logic here
  };

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <ScanSearch className="title-icon" />
          <h1 className="title">Neutral Lens</h1>
        </div>

        <div className="setting-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              onClick={() => setSettingOpen((prev) => !prev)}
            />
            <span className="slider round"></span>
          </label>
          <Settings size={20} color="#7d7d7d" style={{ cursor: "pointer" }} />
        </div>
      </header>
      {settingOpen ? <h1>Hello</h1> : <h1>Nah</h1>}
    </>
  );
}
