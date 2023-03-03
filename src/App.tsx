import React, { LegacyRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Webcam from "react-webcam";

function App() {
  //
  // const addBtn = document.querySelector(".add-button");
  // addBtn.style.display = "none";

  React.useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      let deferredPrompt: any;
      const addBtn: any = document.querySelector(".add-button");
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      addBtn.style.display = "block";

      addBtn.addEventListener("click", (e: any) => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = "none";
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
          } else {
            console.log("User dismissed the A2HS prompt");
          }
          deferredPrompt = null;
        });
      });
    });
  }, []);

  const [source, setSource] = React.useState("");

  const handleCapture = (target: any) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        console.log(newUrl);
        setSource(newUrl);
      }
    }
  };

  function handleClick() {
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
  }
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const webcamRef = React.useRef<Webcam | undefined>();
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <div className="App">
      <header className="App-header">
        <button className="add-button">Add to home screen</button>
        <Webcam
          audio={false}
          ref={webcamRef as LegacyRef<Webcam> | undefined}
          height={720}
          screenshotFormat="image/jpeg"
          allowFullScreen={true}
          capture="environment"
          width={1280}
          videoConstraints={videoConstraints}
        />
        <button onClick={capture}>Click</button>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
