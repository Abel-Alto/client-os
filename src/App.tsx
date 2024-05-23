import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [os, setOs] = useState("loading...");

  useEffect(() => {
    async function fetchOs() {
      // @ts-expect-error experimental
      if (!navigator.userAgentData) {
        setOs("Not supported");
        return;
      }

      // @ts-expect-error experimental
      const data = await navigator.userAgentData?.getHighEntropyValues([
        "platform",
        "platformVersion",
      ]);

      if (data) {
        setOs(`${data.platform} ${data.platformVersion}`);
      } else {
        setOs("Unknown");
      }
    }

    fetchOs();
  }, []);

  return <div>{os}</div>;
}

export default App;
