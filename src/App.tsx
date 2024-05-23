import { useEffect, useState } from "react";
import "./App.css";

// Mapping of Safari versions to macOS versions
const safariToMacOS = [
  { safariVersion: "14.1.2", macOSVersion: "10.14" },
  {
    safariVersion: "15.6.1",
    macOSVersion: "10.15",
  },
  {
    safariVersion: "16.6.1",
    macOSVersion: "11",
  },
  {
    safariVersion: "17.5",
    macOSVersion: ">=12",
  },
];

function getMacOSVersion(safariVersion: string) {
  console.log("safariVersion", safariVersion);

  const match = safariToMacOS.find((entry) => {
    console.log("comparing", entry.safariVersion, String(safariVersion));
    return entry.safariVersion === String(safariVersion);
  });

  console.log("match", match);

  if (match) {
    return match.macOSVersion;
  } else {
    return "Unknown";
  }
}

// Function to extract Safari version from the user agent string
function getSafariVersion() {
  const userAgent = navigator.userAgent;
  const safariVersionMatch = userAgent.match(/Version\/(\d+\.\d+)/);

  if (safariVersionMatch) {
    return safariVersionMatch[1];
  } else {
    return null;
  }
}

function App() {
  const [os, setOs] = useState("loading...");
  const [safariVersion, setSafariVersion] = useState("loading...");

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

    const safariVersion = getSafariVersion();

    if (safariVersion) {
      setSafariVersion(getMacOSVersion(safariVersion));
    }

    fetchOs();
  }, []);

  return (
    <div>
      <div>Experimental Api says: {os}</div>
      <div>Safari version to OS says: {safariVersion}</div>
    </div>
  );
}

export default App;
