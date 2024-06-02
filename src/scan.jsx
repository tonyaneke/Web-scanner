import React, { useState } from "react";
import { useEffect } from "react";

const ScannerComponent = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Load the scanner.js script
    const script = document.createElement("script");
    script.src = "https://cdn.asprise.com/scannerjs/scanner.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const scanToJpg = () => {
    scanner.scan(displayImagesOnPage, {
      output_settings: [
        {
          type: "return-base64",
          format: "jpg",
        },
      ],
    });
  };

  const displayImagesOnPage = (successful, mesg, response) => {
    if (!successful) {
      console.error("Failed: " + mesg);
      return;
    }

    if (
      successful &&
      mesg != null &&
      mesg.toLowerCase().indexOf("user cancel") >= 0
    ) {
      console.info("User cancelled");
      return;
    }

    const scannedImages = scanner.getScannedImages(response, true, false);
    if (scannedImages instanceof Array) {
      const newImages = scannedImages.map((scannedImage) => ({
        src: scannedImage.src,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  return (
    <div>
      <h2>Scanner.js: scan as JPG and display on the web page</h2>
      <button type="button" onClick={scanToJpg}>
        Scan
      </button>
      <div id="images">
        {images.map((image, index) => (
          <img
            key={index}
            className="scanned"
            src={image.src}
            alt={`Scanned ${index}`}
            style={{ height: "200px", marginRight: "12px" }}
          />
        ))}
      </div>

      <div className="asprise-footer" style={{ marginTop: "48px" }}>
        <a
          href="http://asprise.com/document-scan-upload-image-browser/direct-to-server-php-asp.net-overview.html"
          target="_blank"
          title="Opens in new tab"
        >
          Scanner.js Homepage
        </a>{" "}
        |{" "}
        <a
          href="http://asprise.com/scan/scannerjs/docs/html/scannerjs-javascript-guide.html"
          target="_blank"
          title="Opens in new tab"
        >
          Developer's Guide to ScannerJs
        </a>{" "}
        |{" "}
        <a
          href="https://github.com/Asprise/scannerjs.javascript-scanner-access-in-browsers-chrome-ie.scanner.js"
          target="_blank"
          title="Opens in new tab"
        >
          Sample code on Github
        </a>
      </div>
    </div>
  );
};

export default ScannerComponent;
