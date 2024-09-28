import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { getCurrentTabUrl } from "./logic/getCurrentTabURL";
import Footer from "./components/Footer";

function App() {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [inputUrl, setInputUrl] = useState<string>("");

  useEffect(() => {
    const fetchUrl = async () => {
      const url = await getCurrentTabUrl();
      if (url) {
        setCurrentUrl(url);
        setInputUrl(url);
        console.log("Current tab URL:", url);
      } else {
        console.log("Unable to get current tab URL");
      }
    };

    fetchUrl();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(event.target.value);
  };

  const copyText = () => {
    navigator.clipboard.writeText(inputUrl);
  };

  return (
    <main className="main">
      <div className="content">
        <Header />
        {currentUrl && <p>Current URL: {currentUrl}</p>}
        <input
          type="text"
          className="input"
          placeholder="Link"
          value={inputUrl}
          onChange={handleInputChange}
        />
        <button className="button" onClick={copyText}>
          Copy URL
        </button>
      </div>
      <Footer />
    </main>
  );
}

export default App;
