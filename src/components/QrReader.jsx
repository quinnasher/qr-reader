import QrScanner from "qr-scanner";
import qrFrame from "../assets/qr-img.svg";
import { useEffect, useRef, useState } from "react";

export default function QrReader() {
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(false);
  const [scannedResult, setScannedResult] = useState("");

  useEffect(() => {
    if (videoEl.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl.current, (result) => {
        console.log(result);
        setScannedResult(result);
      }, {
        onDecodeError: error => console.log(error),
        preferredCamera: "environment",
        highlightCodeOutline: true,
        calculateScanRegion: () => {
          return {
            x: 0,
            y: 0,
            width: videoEl.current.videoWidth,
            height: videoEl.current.videoHeight
          };
        },
        highlightScanRegion: true,
        overlay: qrBoxEl.current || undefined
      });

      scanner.current
        .start()
        .then(() => setQrOn(true))
        .catch(() => setQrOn(false));
    }

    return () => {
      if (!videoEl.current) {
        scanner.current.stop();
      }
    };
  }, []);

  return (
    <div className={"relative w-full h-full "}>
      <video ref={videoEl} className={"object-cover h-full w-full"}></video>
      <div ref={qrBoxEl} className={"w-full"}>
      </div>
    </div>
  );
}

export const Webcam = ({ children }) => {
  return (
    <div className="justify-cente flex w-full items-center justify-center">
      <div className="h-60 w-60 rounded-lg border border-black overflow-hidden">
        {children}
      </div>
      <hr />
    </div>
  );
};
