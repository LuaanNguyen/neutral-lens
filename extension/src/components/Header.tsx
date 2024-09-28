import "./Header.css";
import { ScanSearch } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <ScanSearch className="title-icon" />
      <h1 className="title">Neutral Lens</h1>
    </header>
  );
}
