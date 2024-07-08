import React, { useEffect } from "react";

const UploadWidget = ({ onUpload, details, setState }) => {
  useEffect(() => {
    const myWidget = window.cloudinary.createUploadWidget(
      details,
      (error, result) => {
        if (!error && result && result.event === "success") {
          onUpload && onUpload(result.info.secure_url);
          setState && setState((prev) => [...prev, result.info.secure_url]);
        }
      }
    );

    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget?.open();
      },
      false
    );
  }, [onUpload]);

  return (
    <button id="upload_widget" className="cloudinary-button">
      Upload Image
    </button>
  );
};

export default UploadWidget;
