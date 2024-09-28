import "./Header.css";
import { ScanSearch } from "lucide-react";
import { Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <ScanSearch className="title-icon" />
        <h1 className="title">Neutral Lens</h1>
      </div>

      <div className="setting-container">
        <label className="switch">
          <input type="checkbox"></input>
          <span className="slider round"></span>
        </label>
        <Settings size={20} color="#7d7d7d" />
      </div>
    </header>
  );
}
