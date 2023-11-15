import React, { useEffect, useState } from "react";

export default function () {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, "1500");
  }, []);

  return (
    <>
      {!isLoaded && (
        <div
          style={{
            width: "calc(100vw + 10px)",
            height: "100vh",
            background: "#adcff8",
            position: "fixed",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <iframe
            width="200px"
            height="200px"
            src="https://lottie.host/?file=30719c92-f973-4963-9623-fb8cd2025441/wOwp6lFDMr.json"
          ></iframe>
        </div>
      )}
    </>
  );
}
