import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { getCurrentTabUrl } from "./logic/getCurrentTabURL";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import BiasGraph from "./components/BiasGraph";

const BACKEND_URL = "http://127.0.0.1:5000/get-transcript-responses";

type ApiResponse = Array<{
  duration: number;
  response: Array<{
    labels: string[];
    token: string;
  }>;
  start: number;
}>;

function App() {
  const [inputUrl, setInputUrl] = useState<string>("");
  const [settingOpen, setSettingOpen] = useState<boolean>(false);
  const [info, setInfo] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUrl = async () => {
      const url = await getCurrentTabUrl();
      if (url) {
        setInputUrl(url);
        console.log("Current tab URL:", url);
      } else {
        console.log("Unable to get current tab URL");
      }
    };

    fetchUrl();
  }, []);

  const extractYouTubeCode = (url: string) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(event.target.value);
  };

  const copyText = () => {
    navigator.clipboard.writeText(inputUrl);
  };

  const submitVideo = async () => {
    const videoCode = extractYouTubeCode(inputUrl);

    if (!videoCode) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BACKEND_URL}/${videoCode}`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setInfo(data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again.");
      setInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main">
      <div className="content">
        <Header settingOpen={settingOpen} setSettingOpen={setSettingOpen} />
        {info && (
          <div>
            <BiasGraph data={info} />
            {/* <pre>{JSON.stringify(info, null, 2)}</pre> */}
          </div>
        )}
        {isLoading ? <Loader /> : <></>}
        {error && <p className="error">{error}</p>}
        <p style={{ marginTop: "20px" }}>Current URL:</p>
        <input
          type="text"
          className="input"
          placeholder="YouTube Link"
          value={inputUrl}
          onChange={handleInputChange}
        />
        <section className="button-container">
          <button className="button" onClick={copyText}>
            Copy URL
          </button>
          <button
            className="button-detect"
            onClick={submitVideo}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Detect Bias"}
          </button>
        </section>

        <Footer />
      </div>
    </main>
  );
}

export default App;
